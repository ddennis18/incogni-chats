import { isObjectIdOrHexString } from 'mongoose'
import Response from '../models/Response.js'
import Question from '../models/Question.js'

export async function respondToQuestion (req, res, next) {
  try {
    const { text } = req.body || {}
    const qid = req.params.id
    const isSeen = false

    if (!isObjectIdOrHexString(qid)) {
      return res.status(400).send({ ok: false, message: 'bad request' })
    }

    if (!text || text.lenght == 0) {
      return res.status(400).send({ ok: false, message: 'Invalid Request' })
    }

    console.log(qid)
    const question = await Question.findById(qid)

    if (!question) {
      return res
        .status(400)
        .send({ ok: false, message: 'Invalid Request: Question Not Found' })
    }

    if (!question.isAnswerable) {
      return res
        .status(400)
        .send({ ok: false, message: 'Question Cannot Recieve Responses' })
    }

    const response = Response({
      text,
      isSeen,
      question: qid,
      reciever: question.author
    })

    await response.save()

    res
      .status(201)
      .send({ ok: true, message: 'Response Saved Succcessfuly', response })
  } catch (error) {
    next(error)
  }
}

export async function getResponse (req, res, next) {
  try {
    const uid = req.user.id
    const id = req.params.id

    if (!isObjectIdOrHexString(id)) {
      return res.status(400).send({ ok: false, message: 'Invalid Request' })
    }

    const response = await Response.findOne({ _id: id, reciever: uid })
      .populate('question')
      .populate('reciever')

    if (!response) {
      return res.status(400).send({ ok: false, message: 'Invalid Request' })
    }

    res
      .status(200)
      .send({ ok: true, message: 'Response Retrieved Succcessfuly', response })
  } catch (error) {
    next(error)
  }
}

export async function getAllResponsesToAQuestion (req, res, next) {
  try {
    const qid = req.params.id
    const uid = req.user.id

    if (!isObjectIdOrHexString(qid)) {
      return res.status(400).send({ ok: false, message: 'Invalid Request' })
    }

    const responses = await Response.find({ question: qid, reciever: uid })

    if (!responses) {
      return res.status(400).send({ ok: false, message: 'Invalid Request' })
    }

    res
      .status(200)
      .send({ ok: true, message: 'Response Retrieved Succcessfuly', responses })
  } catch (error) {
    next(error)
  }
}
