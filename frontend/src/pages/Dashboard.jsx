import { useAuth } from '../context/AuthContext.jsx'
import LoadingScreen from '../components/LoadingScreen.jsx'
import { useEffect, useState } from 'react'
import axios from 'axios'
import QuestionCard from '../components/QuestionCard.jsx'
import toaster from 'react-hot-toast'

const Dashboard = () => {
  const { auth } = useAuth()
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  let user = {}
  if (auth) {
    user = auth.user
  }

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

  return (
    <div className='text-center'>
      <h2 className='text-secondary text-2xl font-semibold'>
        Hey! {user?.username}
      </h2>
      {loading && (
        <LoadingScreen message={'retrive questions'}/>
      )}
      {error && !loading && (
        <h2 className='mt-20 text-4xl text-red-600 font-bold'>
          An error has occured!
        </h2>
      )}
      {questions.length == 0 && !error && !loading && (
        <h2 className='mt-20 text-4xl text-accent font-bold'>No Notes Yet!</h2>
      )}
      {questions.length != 0 && (
        <section className='grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 p-4'>
          {questions.map(q => {
            return <QuestionCard key={q._id} {...q} />
          })}
        </section>
      )}
    </div>
  )
}

export default Dashboard
