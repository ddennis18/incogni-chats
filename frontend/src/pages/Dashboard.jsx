import { useAuth } from '../context/AuthContext.jsx'
import LoadingScreen from '../components/LoadingScreen.jsx'
import { useEffect, useState } from 'react'
import axios from 'axios'
import QuestionCard from '../components/QuestionCard.jsx'
import toaster from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const { auth } = useAuth() || {}
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await axios.get('/api/question/all', {
        headers: { Authorization: `Bearer ${auth.accessToken}` }
      })

      setQuestions(res.data.questions)
      setError(false)
      setLoading(false)
    }
    fetchQuestions().catch(e => {
      console.log(e)
      setError(true)
      toaster.error('Failed to load your questions')
    })
  }, [])

  if (!auth) {
    return <div></div>
  }
  const user = auth.user

  const deleteQuestion = async id => {
    try {
      const res = await axios.delete(`/api/question/${id}`, {
        headers: { Authorization: `Bearer ${auth.accessToken}` }
      })
      toaster.success(res.data.message)
      setQuestions(questions.filter(q => q._id != id))
    } catch (error) {
      console.log(error)
      toaster.error('failed to delete')
    }
  }

  return (
    <div className='text-center'>
      <h2 className='text-secondary text-2xl font-semibold'>
        Hey! {user?.username}
      </h2>
      {loading && <LoadingScreen message={'retrive questions'} />}
      {error && !loading && (
        <h2 className='mt-20 text-4xl text-red-600 font-bold'>
          An error has occured!
        </h2>
      )}
      {questions.length == 0 && !error && !loading && (
        <h2 className='mt-20 text-4xl text-accent font-bold'>No Notes Yet!</h2>
      )}
      {questions.length != 0 && (
        <section className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4'>
          {questions.map(q => {
            return (
              <QuestionCard
                key={q._id}
                question={{ ...q }}
                handleDelete={e => {
                  e.preventDefault()
                  deleteQuestion(q._id)
                }}
                handleClick={() => {
                  navigate(`/details/${q._id}`)
                }}
              />
            )
          })}
        </section>
      )}
    </div>
  )
}

export default Dashboard
