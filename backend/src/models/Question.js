import mongoose from 'mongoose'

const questionSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    isAnswerable: { type: Boolean, default: true, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user'
    }
  },
  { timestamps: true }
)

const Question = mongoose.model('question', questionSchema)

export default Question
