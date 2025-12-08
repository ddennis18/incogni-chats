import express from 'express'
import { verifyToken } from '../middleware/auth-middleware.js'
import {
  createNewQuestion,
  editQuestion,
  getAllQuestions,
  getQuestion
} from '../controllers/question-controllers.js'

// /api/auth
const router = express.Router()

router.post('/new', verifyToken, createNewQuestion)
router.post('/edit/:id', verifyToken, editQuestion)
router.get('/all', verifyToken, getAllQuestions)
router.get('/:id', getQuestion)

export default router
