
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectMongo } from './db.js'
import Experience from './models/Experience.js'
import Slot from './models/Slot.js'
import Booking from './models/Booking.js'
import Promo from './models/Promo.js'
import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('ABCDEFGHJKLMNPQRSTUVWXYZ23456789', 8)

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

await connectMongo(process.env.MONGO_URL || 'mongodb://127.0.0.1:27017')

app.get('/', (_req, res) => res.json({ ok: true }))

app.get('/experiences', async (req, res) => {
  const q = req.query.q
  const query = q ? { title: { $regex: q, $options: 'i' } } : {}
  const items = await Experience.find(query).sort({ createdAt: -1 }).lean()
  res.json({ data: items })
})

app.get('/experiences/:id', async (req, res) => {
  const exp = await Experience.findById(req.params.id).lean()
  if (!exp) return res.status(404).json({ error: 'Not found' })
  const slots = await Slot.find({ experienceId: exp._id }).sort({ date: 1, time: 1 }).lean()
  res.json({ data: { ...exp, slots } })
})

app.post('/promo/validate', async (req, res) => {
  const { code, subtotal } = req.body || {}
  const promo = await Promo.findOne({ code: (code||'').toUpperCase(), isActive: true }).lean()
  if (!promo) return res.json({ data: { valid: false, discountAmount: 0 } })
  let discount = 0
  if (promo.type === 'percent') discount = Math.round((subtotal || 0) * (promo.value/100))
  else discount = promo.value
  res.json({ data: { valid: true, discountAmount: discount } })
})

app.post('/bookings', async (req, res) => {
  const { experienceId, slotId, qty, customer, promoCode } = req.body
  if (!experienceId || !slotId || !qty || !customer?.name || !customer?.email)
    return res.status(400).json({ error: 'Missing fields' })

  const slot = await Slot.findOneAndUpdate(
    { _id: slotId, experienceId, $expr: { $lte: ['$bookedCount', { $subtract: ['$capacity', qty] }] } },
    { $inc: { bookedCount: qty } },
    { new: true }
  )
  if (!slot) return res.status(409).json({ error: 'Slot sold out' })

  const ref = nanoid()
  const experience = await Experience.findById(experienceId)
  const price = (experience?.priceFrom || 0) * qty

  const booking = await Booking.create({
    experienceId, slotId, qty, customer, reference: ref, pricePaid: price, promoCode
  })
  res.json({ data: { id: booking._id, reference: ref } })
})

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`API on :${port}`))
