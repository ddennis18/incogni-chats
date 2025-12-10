import { EditIcon, CopyIcon, Trash2Icon, Circle } from 'lucide-react'
import { Link } from 'react-router-dom'

const QuestionCard = ({ question, handleDelete }) => {
  const { text, replies, _id, isAnswerable } = question
  return (
    <div className='relative bg-base-100 border-t-4 border-accent rounded-xl p-4 min-h-[150px] flex flex-col items-center justify-between'>
      {isAnswerable && (
        <Circle className='absolute top-[1%] right-[1%] p-0 stroke-accent fill-accent opacity-80 size-4 [border-radius:8px]' />
      )}
      <p>{text}</p>
      <div className='w-full flex justify-between items-end'>
        <span>Replies: {replies?.length ?? 0}</span>
        <span className='space-x-1'>
          <button onClick={handleDelete}>
            <Trash2Icon className='btn p-1 stroke-base-300 hover:stroke-secondary size-8 [border-radius:8px]' />
          </button>
          <Link to={`/edit/${_id}`}>
            <EditIcon className='btn p-1 stroke-base-300 hover:stroke-secondary size-8 [border-radius:8px]' />
          </Link>
          <CopyIcon className='btn p-1 stroke-base-300 hover:stroke-secondary size-8 [border-radius:8px]' />
        </span>
      </div>
    </div>
  )
}

export default QuestionCard
