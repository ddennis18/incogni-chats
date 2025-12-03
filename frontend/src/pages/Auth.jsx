import { useState } from 'react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import api from '../config/axios.js'
import toaster from 'react-hot-toast'
import image from '../assets/black-hole.jpg'

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false)
  console.log(isRegister)

  const schema = yup.object().shape({
    username: isRegister ? yup.string().required() : yup.string(),
    email: yup.string().email().required(),
    password: yup
      .string()
      .min(8)
      .matches(/[a-z]/, 'Password requires a lowercase letter')
      .matches(/[A-Z]/, 'Password requires an uppercase letter')
      .required(),
    confirmpassword: isRegister
      ? yup
          .string()
          .oneOf([yup.ref('password'), null], 'Passwords must match')
          .required('Must Confirm Password')
      : yup.string()
  })

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) })

  const submit = async info => {
    try {
      if (isRegister) {
        const result = await api.post('/auth/register', {
          username: info.username,
          password: info.password,
          email: info.email
        })
        toaster.success(result.data.message)
      } else {
        const result = await api.post('/auth/login', {
          password: info.password,
          email: info.email
        })
        console.log(result)
      }
    } catch (error) {
      console.log(error.response.data.message)
      toaster.error(error.response.data.message)
    }
  }

  const handleError = _ => {
    const availableErrors = Object.keys(errors).filter(k => errors[k])
    if (availableErrors.length === 0) return
    toaster.error(errors[availableErrors[0]].message)
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 h-[91vh] w-full'>
      <div className='w-full h-full flex items-center justify-center'>
        <form
          action=''
          className='text-sm flex flex-col w-[70%]'
          onSubmit={handleSubmit(submit)}
        >
          <h2 className='text-secondary text-center mb-4 text-2xl font-bold'>
            {' '}
            {isRegister ? 'Register' : 'Login'}
          </h2>
          {/*User Name*/}
          {isRegister && (
            <>
              <label htmlFor='username' className='label'>
                User Name:
              </label>
              <input
                type='text'
                className='inp'
                placeholder='eg: John Doe'
                {...register('username')}
              />
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
            {...register('email')}
          />

          {/* Password */}
          <label htmlFor='password' className='label mt-2 '>
            Password:
          </label>
          <input
            type='password'
            className='inp'
            placeholder='Input a Strong Password'
            {...register('password')}
          />

          {/* Confirm Password */}
          {isRegister && (
            <>
              <label htmlFor='confirmpassword' className='label mt-2 '>
                Confirm Password:
              </label>
              <input
                type='password'
                className='inp'
                {...register('confirmpassword')}
              />
            </>
          )}

          {/*Submit*/}
          <button className='btn mt-2' type='submit' onClick={handleError}>
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
