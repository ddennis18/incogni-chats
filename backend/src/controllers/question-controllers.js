import { isObjectIdOrHexString } from 'mongoose'
import Question from '../models/Question.js'

export async function createNewQuestion (req, res) {
  try {
    const uid = req.user.id
    const { text } = req.body || {}

    if (!text) {
      return res.status(400).send({ ok: false, message: 'invalid data' })
    }

    const newQuestion = Question({ text, author: uid })
    await newQuestion.save()

    res.status(201).send({
      ok: true,
      message: 'question created correctly',
      question: { id: newQuestion._id, text: newQuestion.text }
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      ok: false,
      message: 'Server Error'
    })
  }
}

export async function editQuestion (req, res) {
  try {
    const uid = req.user.id
    const { text } = req.body || {}
    const id = req.params.id

    if (!isObjectIdOrHexString(id)) {
      return res.status(400).send({ ok: false, message: 'bad request' })
    }

    if (!text) {
      return res.status(400).send({ ok: false, message: 'invalid data' })
    }

    const updatedQuestion = await Question.findOneAndUpdate(
      { _id: id, author: uid },
      { text: text },
      { new: true }
    )
    if (!updatedQuestion)
      return res.status(403).send({ ok: false, message: 'unauthorised, user is not the author' })

    res.status(200).send({
      ok: true,
      message: 'question updated correctly',
      question: { id: updatedQuestion._id, text: updatedQuestion.text }
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      ok: false,
      message: 'Server Error'
    })
  }
}

export async function getAllQuestions (req, res) {
  try {
    const uid = req.user.id
    const questions = await Question.find({ author: uid })

    res.status(200).send({ ok: true, questions })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      ok: false,
      message: 'Server Error'
    })
  }
}

export async function getQuestion (req, res) {
  try {
    const id = req.params.id
    if (!isObjectIdOrHexString(id)) {
      return res.status(400).send({ ok: false, message: 'bad request' })
    }

    const question = await Question.findById(id)
    if (!question) {
      return res
        .status(400)
        .send({ ok: false, message: "question doesn't exist" })
    }

    return res.status(200).send(question)
  } catch (error) {
    console.log(error)
    res.status(500).send({
      ok: false,
      message: 'Server Error'
    })
  }
}
