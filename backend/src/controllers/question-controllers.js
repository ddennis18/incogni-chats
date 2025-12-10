import { isObjectIdOrHexString } from 'mongoose'
import Question from '../models/Question.js'

export async function createNewQuestion (req, res) {
  try {
    const uid = req.user.id
    console.log("CREATE QUESTION", {uid})
    const { text, isAnswerable } = req.body || {}

    if (!isAnswerable) isAnswerable = true

    if (!text) {
      return res.status(400).send({ ok: false, message: 'invalid data' })
    }

    const newQuestion = Question({ text, isAnswerable, author: uid })
    await newQuestion.save()

    res.status(201).send({
      ok: true,
      message: 'question created correctly',
      question: newQuestion
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
    //the id of the question to be edited
    const id = req.params.id
    console.log("EDIT QUESTION", {uid,id})

    const { text, isAnswerable } = req.body || {}

    //if the parsed id is a valid hex
    if (!isObjectIdOrHexString(id)) {
      return res.status(400).send({ ok: false, message: 'bad request' })
    }

    if (!isAnswerable) isAnswerable = true

    if (!text) {
      return res.status(400).send({ ok: false, message: 'invalid data' })
    }

    const updatedQuestion = await Question.findOneAndUpdate(
      { _id: id, author: uid },
      { text, isAnswerable },
      { new: true }
    )
    if (!updatedQuestion)
      return res
        .status(403)
        .send({ ok: false, message: 'unauthorised, user is not the author' })

    res.status(200).send({
      ok: true,
      message: 'question updated correctly',
      question: updatedQuestion
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
    console.log("GET ALL QUESTION", {uid:id})
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
    console.log("GET QUESTION", {id})
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

export async function deleteQuestion (req, res) {
  try {
    const id = req.params.id
    const uid = req.user.id

    console.log("DELETE QUESTION", {id, uid})
    
    if (!isObjectIdOrHexString(id)) {
      return res.status(400).send({ ok: false, message: 'bad request' })
    }
    
    const question = await Question.findOneAndDelete({ _id: id, author: uid })
    
    if (!question) {
      console.log("unaithorised")
      return res.status(403).send({ ok: false, message: 'unauthorised' })
    }

    return res.status(200).send({ ok: true, message: 'deleted successfully', question })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      ok: false,
      message: 'Server Error'
    })
  }
}
