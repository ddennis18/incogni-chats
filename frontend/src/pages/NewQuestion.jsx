import { CopyIcon, SaveIcon } from 'lucide-react'
import toaster from 'react-hot-toast'
import axios from 'axios'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router'

const NewQuestion = () => {
  const { auth } = useAuth()
  const [question, setQuestion] = useState({ isAnswerable: true, text: '' })
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.post(`/api/question/new/`, question, {
        headers: { Authorization: `Bearer ${auth.accessToken}` }
      })

      toaster.success(res.data.message)
      navigate('/dashboard')
    } catch (error) {
      console.log(error)
      toaster.error('failed to create')
    }
  }

  return (
    <div className='w-full h-[70vh] flex flex-col items-center justify-center'>
      <form className='flex flex-col gap-2 max-w-[500px] w-full'>
        <label htmlFor='' className='label'>
          Question:
        </label>
        <textarea
          name=''
          id=''
          rows={7}
          placeholder='Enter Your Question...'
          className='w-full rounded-lg p-2 text-secondary bg-base-200 border-accent border-4'
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
            defaultChecked={true}
            onChange={e =>
              setQuestion({
                ...question,
                isAnswerable: e.target.value === 'on'
              })
            }
          />
        </div>
        <div className='w-full flex flex-row justify-end gap-2'>
          <button onClick={handleSubmit}>
            <SaveIcon className='btn stroke-base-300 hover:stroke-secondary size-12 [border-radius:16px]' />
          </button>
          <CopyIcon className='btn stroke-base-300 hover:stroke-secondary size-12 [border-radius:16px]' />
        </div>
      </form>
    </div>
  )
}

export default NewQuestion
