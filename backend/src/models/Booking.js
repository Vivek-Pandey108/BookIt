
import mongoose, { Schema } from 'mongoose'

const BookingSchema = new Schema({
  experienceId: { type: Schema.Types.ObjectId, ref: 'Experience', required: true },
  slotId: { type: Schema.Types.ObjectId, ref: 'Slot', required: true },
  qty: { type: Number, required: true },
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true }
  },
  reference: { type: String, required: true, unique: true },
  pricePaid: Number,
  promoCode: String
}, { timestamps: true })

export default mongoose.model('Booking', BookingSchema)
