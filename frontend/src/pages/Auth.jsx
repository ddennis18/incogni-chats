import { useState } from 'react'
import image from '../assets/black-hole.jpg'

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false)
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 h-[91vh] w-full'>
      <div className='w-full h-full flex items-center justify-center'>
        <form action='' className='text-sm flex flex-col w-[70%]'>
          <h2 className='text-secondary text-center mb-4 text-2xl font-bold'>
            {' '}
            {isRegister
              ? 'Register'
              : "Login"}
          </h2>
          {/*User Name*/}
          {isRegister && (
            <>
              <label htmlFor='username' className='label'>
                User Name:
              </label>
              <input type='text' className='inp' placeholder='eg: John Doe' />
            </>
          )}

          {/* Email */}
          <label htmlFor='email' className='label mt-2 '>
            Email:
          </label>
          <input
            type='email'
            className='inp'
            placeholder='eg: johndoe@gmail.com'
          />

          {/* Password */}
          <label htmlFor='password' className='label mt-2 '>
            Password:
          </label>
          <input
            type='password'
            className='inp'
            placeholder='Input a Strong Password'
          />

          {/* Confirm Password */}
          {isRegister && (
            <>
              <label htmlFor='confirmPassword' className='label mt-2 '>
                Confirm Password:
              </label>
              <input type='password' className='inp' />
            </>
          )}

          {/*Submit*/}
          <button className='btn mt-2' type='submit'>
            {isRegister ? 'Register' : 'Login'}
          </button>

          <p
            className='label underline hover:text-primary mt-4 cursor-pointer'
            onClick={() => setIsRegister(prev => !prev)}
          >
            {isRegister
              ? 'Already have an Account? Login Instead.'
              : "Don't Have an Account? Register."}
          </p>
        </form>
      </div>
      <div className='hidden md:block w-full h-full'>
        <img
          src={image}
          alt=''
          className='w-full h-full object-center object-cover mask-l-from-20%'
        />
      </div>
    </div>
  )
}

export default Auth
