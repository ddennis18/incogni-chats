import express from 'express'
import { verifyToken } from '../middleware/auth-middleware.js'
import {
  respondToQuestion,
  getResponse,
  getAllResponsesToAQuestion
} from '../controllers/response-controllers.js'

// /api/response
const router = express.Router()

router.get('/:id', verifyToken, getResponse)
router.get('/all/:id', verifyToken, getAllResponsesToAQuestion)
router.post('/:id', respondToQuestion)

export default router
