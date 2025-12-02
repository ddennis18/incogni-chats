import express from 'express'
import {
  loginUser,
  logoutUser,
  refreshToken,
  registerUser
} from '../controllers/auth-controllers.js'
import { verifyToken } from '../middleware/auth-middleware.js'

// /api/auth
const authRoute = express.Router()

authRoute.post('/register', registerUser)
authRoute.post('/login', loginUser)
authRoute.get('/refresh', verifyToken, refreshToken)
authRoute.post('/logout', logoutUser)

export default authRoute
