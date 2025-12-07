import { useAuth } from '../context/AuthContext.jsx'
import LoadingScreen from '../components/LoadingScreen.jsx'
import { useEffect, useState } from 'react'
import axios from 'axios'
import QuestionCard from '../components/QuestionCard.jsx'

const Dashboard = () => {
  const { auth, loading } = useAuth()
  const [questions, setQuestions] = useState([])
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
    }
    fetchQuestions()
  }, [])

  return (
    <div className='text-center'>
      <h2 className='text-secondary text-2xl font-semibold'>
        Hey! {user?.username}
      </h2>
      <section className='grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 p-4' >
        {questions.map(q => {
          return <QuestionCard key={q._id} {...q} />
        })}
      </section>
    </div>
  )
}

export default Dashboard
