import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import ResponseCard from '../components/ResponseCard'
import { Link } from 'react-router-dom'
import { Circle, Trash2Icon, EditIcon, CopyIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import toaster from 'react-hot-toast'

const DetailsPage = () => {
  const { id: qid } = useParams()
  const [question, setQuestion] = useState({})
  const { auth } = useAuth()
  const [responses, setResponses] = useState([])
  const { isAnswerable, text } = question
  const navigate = useNavigate()

  const fetchResponses = async () => {
    const res = await axios.get(`/api/response/all/${qid}`, {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`
      }
    })

    setResponses(res.data.responses)
  }

  useEffect(() => {
    const fetchQuestion = async () => {
      const res = await axios.get(`/api/question/${qid}`)
      setQuestion(res.data)
    }
    fetchQuestion().catch(e => console.log(e))
    fetchResponses().catch(e => console.log(e))
  }, [])

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/question/${qid}`, {
        headers: { Authorization: `Bearer ${auth.accessToken}` }
      })
      toaster.success('deleted successfully')
      navigate('/dashboard')
    } catch (error) {
      console.log(error)
      toaster.error('failed to delete')
    }
  }

  return (
    <div className='px-4 mt-10'>
      <div className='relative bg-base-100 border-t-4 border-accent rounded-xl p-4 min-h-[150px] flex flex-col items-center justify-between'>
        {isAnswerable && (
          <Circle className='absolute top-[1%] right-[1%] p-0 stroke-accent fill-accent opacity-80 size-4 [border-radius:8px]' />
        )}
        <p>{text}</p>
        <div className='w-full flex justify-between items-end'>
          <span>Responses: {responses?.length ?? 0}</span>
          <span className='space-x-1'>
            <button onClick={handleDelete}>
              <Trash2Icon className='btn p-1 stroke-base-300 hover:stroke-secondary size-8 [border-radius:8px]' />
            </button>
            <Link to={`/edit/${qid}`}>
              <EditIcon className='btn p-1 stroke-base-300 hover:stroke-secondary size-8 [border-radius:8px]' />
            </Link>
            <CopyIcon className='btn p-1 stroke-base-300 hover:stroke-secondary size-8 [border-radius:8px]' />
          </span>
        </div>
      </div>
      <h3 className='text-xl font-semibold text-accent px-4 mt-4 mb-1'>
        Responses:
      </h3>
      <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {responses.map(r => {
          return <ResponseCard {...r} />
        })}
      </section>
    </div>
  )
}

export default DetailsPage
