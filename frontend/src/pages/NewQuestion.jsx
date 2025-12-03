import { CopyIcon, SaveIcon } from 'lucide-react'

const NewQuestion = () => {
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
        ></textarea>
        <div className='w-full flex flex-row justify-end gap-2'>
          <SaveIcon className="btn stroke-base-300 hover:stroke-secondary size-12 [border-radius:16px]" />
          <CopyIcon className="btn stroke-base-300 hover:stroke-secondary size-12 [border-radius:16px]" />
        </div>
      </form>
    </div>
  )
}

export default NewQuestion
