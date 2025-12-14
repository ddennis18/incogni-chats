import { SendIcon } from 'lucide-react'
import toaster from 'react-hot-toast'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import LoadingScreen from '../components/LoadingScreen'

const ResponsePage = () => {
  const [isSending, setIsSending] = useState(false)
  const [question, setQuestion] = useState({})
  const [response, setResponse] = useState('')
  const { id: qid } = useParams()
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    setIsSending(true)
    try {
      const res = await axios.post(`/api/response/${qid}`, { text: response })
      toaster.success(res.data.message)
    } catch (error) {
      console.log(error)
      toaster.error(error.response.data.message)
    } finally {
      setIsSending(false)
    }
  }

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await axios.get(`/api/question/${qid}`)
        setQuestion(res.data)
      } catch (error) {
        console.log(error)
        toaster.error('failed to load question')
        navigate('/*')
      }
    }
    fetchQuestion()
  })

  if (isSending) {
    return <LoadingScreen message={'Sending Your Response'} />
  }

  return (
    <div className='mt-8 mx-auto w-[80%] p-4 flex flex-col items-center justify-center bg-base-100 border-t-4 border-accent rounded-xl'>
      <div className='  border-b-2 border-accent w-full mb-8'>
        <h3 className='label text-xl'>{question.text}</h3>
      </div>
      <form className='flex flex-col gap-2 max-w-[500px] w-full'>
        <label htmlFor='' className='label'>
          Your Response:
        </label>
        <textarea
          name=''
          id=''
          rows={7}
          placeholder='Enter Your Response...'
          className='w-full rounded-lg p-2 text-secondary bg-base-200 border-accent border-4'
          onChange={e => setResponse(e.target.value)}
        ></textarea>
        <div className='w-full flex flex-row justify-end gap-2'>
          <button onClick={handleSubmit}>
            <SendIcon className='btn stroke-base-300 hover:stroke-secondary size-12 [border-radius:16px]' />
          </button>
        </div>
      </form>
    </div>
  )
}

export default ResponsePage
