import image from '../assets/black-hole.jpg'
import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <div className='mx-auto text-center space-y-8'>
        <img src={image} alt="" className='fixed -z-9999 mask-b-from-20% mask-t-from-20% object-cover w-screen h-screen'/>
      <div className='flex flex-col gap-8 items-center justify-center h-[70vh]'>
        <h1 className='text-secondary text-4xl font-bold'>
          INCOGNI <br /> Send Anonymous Messages in a Secure and Fast Platform!
        </h1>
        <p>
          Your send questions on incogni, to your friends and get their responses real-time,
          fast and secure with Total Control.
        </p>
        <div className='space-x-4'>
          <Link to='/' className='btn'>About</Link>
          <Link to='/auth' className='btn btn-outline'>Get Started</Link>
        </div>
      </div>
      <section className='bg-accent grid grid-cols-3 gap-4'>
        <p className='card text-base-300'>
          <span className='text-xl text-base-300 font-semibold'>Fast!</span>
        </p>
        <p className='card text-base-300'>
          <span className='text-xl text-base-300 font-semibold'>Secure!</span>
        </p>
        <p className='card text-base-300'>
          <span className='text-xl text-base-300 font-semibold'>Fun!</span>
        </p>
      </section>
    </div>
  )
}

export default Home
