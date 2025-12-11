import mongoose from 'mongoose'

const repsonseSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    isSeen: { type: Boolean, default: true, required: true },
    reciever: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user'
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'question'
    }
  },
  { timestamps: true }
)

const Response = mongoose.model('response', repsonseSchema)

export default Response
