
import mongoose, { Schema } from 'mongoose'

const SlotSchema = new Schema({
  experienceId: { type: Schema.Types.ObjectId, ref: 'Experience', required: true, index: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  time: { type: String, required: true }, // e.g., "09:00 am"
  capacity: { type: Number, required: true },
  bookedCount: { type: Number, default: 0 }
}, { timestamps: true })

SlotSchema.index({ experienceId: 1, date: 1, time: 1 }, { unique: true })

export default mongoose.model('Slot', SlotSchema)
