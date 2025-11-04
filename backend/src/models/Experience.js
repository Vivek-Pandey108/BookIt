
import mongoose, { Schema } from 'mongoose'

const ExperienceSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  city: String,
  state: String,
  priceFrom: { type: Number, required: true }
}, { timestamps: true })

export default mongoose.model('Experience', ExperienceSchema)
