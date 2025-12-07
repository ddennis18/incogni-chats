import { LoaderCircle } from 'lucide-react'

const LoadingScreen = ({ message }) => {
  return (
    <div className='w-full h-full min-h-[500px] flex flex-col items-center justify-center'>
      <LoaderCircle className='animate animate-spin stroke-accent size-12'/>
      <h2 className='text-4xl text-accent font-bold'>Loading...</h2>
      <h1 className='text-2xl text-primary font-semibold'>{message}</h1>
    </div>
  )
}

export default LoadingScreen
