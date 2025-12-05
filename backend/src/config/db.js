import mongoose from 'mongoose'

export default async function connectDB () {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("connected to mongodb successfully!")
  } catch (error) {
    console.log("Error connecting to mongoDB", error)
    process.exit(1)
  }
}
