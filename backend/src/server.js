import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import authRoute from './routes/auth-routes.js'
import questionRoute from './routes/question-routes.js'
import responseRoute from './routes/response-route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from 'path'
import { handleError } from './middleware/error-middleware.js'

dotenv.config()

const __dirname = path.resolve()

const PORT = process.env.PORT

const app = express()

//connect to mongodb
connectDB()
//json middle ware
app.use(cors({ origin: true, credentials: true }))
app.use(cookieParser())
app.use(express.json())

//set the users route
app.use('/api/auth', authRoute)
app.use('/api/question', questionRoute)
app.use('/api/response', responseRoute)

if (process.env.NODE_ENV === 'production') {
  // Serve static files
  app.use(express.static(path.join(__dirname, '../frontend/dist')))
  app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
  })
}

//global error handler
app.use(handleError)

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`)
})
