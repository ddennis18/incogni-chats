import axios from 'axios'
import { CopyIcon, SaveIcon, LockKeyholeIcon, Trash2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import toaster from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import LoadingScreen from '../components/LoadingScreen'

const EditQuestion = () => {
  const { id } = useParams()
  const [question, setQuestion] = useState({})
  const [loading, setLoading] = useState(true)
  const { auth } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchQuestion = async () => {
      const res = await axios.get(`/api/question/${id}`)
      setQuestion(res.data)
      setLoading(false)
    }

    fetchQuestion().catch(error => {
      console.log(error)
      toaster.error(error.response.data.message)
      navigate('/')
    })
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.post(`/api/question/edit/${id}`, question, {
        headers: { Authorization: `Bearer ${auth.accessToken}` }
      })

      toaster.success(res.data.message)
    } catch (error) {
      console.log(error)
      toaster.error('failed to update')
    }
  }

  const handleDelete = async e =>{
    e.preventDefault()
    try {
      const res = await axios.delete(`/api/question/${id}`, {
        headers: { Authorization: `Bearer ${auth.accessToken}` }
      })

      toaster.success(res.data.message)
      navigate('/dashboard')
    } catch (error) {
      console.log(error)
      toaster.error('failed to delete')
    }
  }

  if (loading) {
    return <LoadingScreen message={'Retrieving Question Data'} />
  }

  return (
    <div className='w-full h-[70vh] flex flex-col items-center justify-center p-4'>
      <form className='flex flex-col gap-2 max-w-[500px] w-full'>
        <label htmlFor='' className='label'>
          Edit:
        </label>
        <textarea
          name=''
          id=''
          rows={7}
          placeholder='Enter Your Question...'
          className='w-full rounded-lg p-2 text-secondary bg-base-200 border-accent border-4'
          defaultValue={question.text}
          onChange={e => setQuestion({ ...question, text: e.target.value })}
        ></textarea>
        <div className='flex items-center gap-2'>
          <label htmlFor='' className='label text-lg'>
            Can Accept Responses{' '}
          </label>
          <input
            type='checkbox'
            name=''
            id=''
            className='accent-accent size-4'
            defaultChecked={question.isAnswerable}
            onChange={e =>
              setQuestion({
                ...question,
                isAnswerable: e.target.checked
              })
            }
          />
        </div>
        <div className='w-full flex flex-row justify-end gap-2'>
          <button onClick={handleDelete}>
            <Trash2 className='btn stroke-base-300 hover:stroke-secondary size-12 [border-radius:16px]' />
          </button>
          <CopyIcon className='btn stroke-base-300 hover:stroke-secondary size-12 [border-radius:16px]' />
          <button onClick={handleSubmit}>
            <SaveIcon className='btn stroke-base-300 hover:stroke-secondary size-12 [border-radius:16px]' />
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditQuestion
