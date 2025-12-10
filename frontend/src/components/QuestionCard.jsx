import { EditIcon, CopyIcon, Trash2Icon } from 'lucide-react'
import { Link } from 'react-router-dom'

const QuestionCard = ({ question:{text, replies, _id}, handleDelete }) => {
  return (
    <div className='bg-base-100 border-t-4 border-accent rounded-xl p-4 min-h-[150px] flex flex-col items-center justify-between'>
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
