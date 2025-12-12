import { SendIcon } from 'lucide-react'
import toaster from 'react-hot-toast'
import axios from 'axios'
import { useState } from 'react'
import { useParams } from 'react-router'
import LoadingScreen from '../components/LoadingScreen'

const ResponsePage = () => {
  const [isSending, setIsSending] = useState('')
  const [response, setResponse] = useState('')
  const { id: qid } = useParams()

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

  if (isSending) {
    return <LoadingScreen message={'Sending Your Response'} />
  }

  return (
    <div className='w-full h-[70vh] flex flex-col items-center justify-center'>
      <form className='flex flex-col gap-2 max-w-[500px] w-full'>
        <label htmlFor='' className='label'>
          Response:
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
