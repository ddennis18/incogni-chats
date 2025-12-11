import { X } from 'lucide-react'
import { useState } from 'react'
import { formatDate } from '../lib/utils'

const ResponseCard = ({ text, createdAt }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className='bg-base-100 border-t-4 border-accent rounded-xl p-4 flex flex-col items-center justify-between'
      onClick={() => {
        setIsExpanded(true)
      }}
    >
      <p>{text}</p>
      {isExpanded && (
        <div className='w-full h-full fixed backdrop-blur blur-50 inset-0 flex items-center justify-center'>
          <div className='relative bg-base-100 border-t-4 border-accent rounded-xl p-4  flex flex-col items-left justify-between min-h-[300px] w-[80%]'>
            <button
              onClick={e => {
                e.stopPropagation()
                setIsExpanded(false)
              }}
              className='absolute top-[5px] right-[5px]'
            >
              <X className='btn p-1 stroke-base-300 hover:stroke-secondary size-8 [border-radius:8px]' />
            </button>
            <div>
              <label htmlFor='' className='label'>
                Response:
              </label>
              <p>{text}</p>
            </div>
            <div className='opacity-50 self-end flex flex-col'>
              <label htmlFor='' className='label self-end'>
                Sent:
              </label>
              <p>{formatDate(createdAt)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ResponseCard
