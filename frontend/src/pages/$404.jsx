import { Link } from "react-router-dom"

const $404 = () => {
  return (
    <div className='w-full h-full min-h-[500px] flex flex-col items-center justify-center'>
      <h2 className='text-4xl text-accent font-bold'>404</h2>
      <h3 className='text-2xl text-primary font-semibold'>Page Not Found</h3>
      <p className='text-xl text-accent underline font-semibold'><Link to='/'>Click Here To Go the Home Page Instead.</Link></p>
    </div>
  )
}

export default $404
