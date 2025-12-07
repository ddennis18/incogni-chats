import axios from 'axios'
import { CopyIcon, SaveIcon, LockKeyholeIcon, Trash2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const EditQuestion = () => {
  const { id } = useParams()
  const [question, setQuestion] = useState({})
  useEffect(() => {
    const fetchQuestion = async () => {
      const res = await axios.get(`/api/question/${id}`)
      setQuestion(res.data)
    }
    fetchQuestion()
  }, [])

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
        >
        </textarea>
        <div className='w-full flex flex-row justify-end gap-2'>
          <Trash2 className='btn stroke-base-300 hover:stroke-secondary size-12 [border-radius:16px]' />
          <LockKeyholeIcon className='btn stroke-base-300 hover:stroke-secondary size-12 [border-radius:16px]' />
          <CopyIcon className='btn stroke-base-300 hover:stroke-secondary size-12 [border-radius:16px]' />
          <SaveIcon className='btn stroke-base-300 hover:stroke-secondary size-12 [border-radius:16px]' />
        </div>
      </form>
    </div>
  )
}

export default EditQuestion
