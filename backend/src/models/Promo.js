
import mongoose, { Schema } from 'mongoose'

const PromoSchema = new Schema({
  code: { type: String, unique: true },
  type: { type: String, enum: ['percent', 'flat'], required: true },
  value: { type: Number, required: true },
  isActive: { type: Boolean, default: true }
})

export default mongoose.model('Promo', PromoSchema)
