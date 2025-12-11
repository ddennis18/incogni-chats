import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import authRoute from './routes/auth-routes.js'
import questionRoute from './routes/question-routes.js'
import responseRoute from './routes/response-route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config()

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

app.use((req, res, next) => {
  res.status(404).send({ message: 'route doesnt exists' })
})

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`)
})
