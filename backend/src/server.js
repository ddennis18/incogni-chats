import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import authRoute from './routes/auth-routes.js'
import cookieParser from 'cookie-parser'

dotenv.config()

const PORT = process.env.PORT

const app = express()

//connect to mongodb
connectDB()

//json middle ware
app.use(express.json())
app.use(cookieParser())

//set the users route
app.use('/api/auth', authRoute)

app.use((req, res, next)=>{
  res.status(404).send({message:'route doesnt exists'})
})

app.listen(PORT, ()=>{
  console.log('running on port 500')
})