import { PlusIcon, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import toaster from 'react-hot-toast'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { auth, loading, setAuth } = useAuth()
  const navigate = useNavigate()

  const logout = async e => {
    e.preventDefault()
    try {
      await axios.post('/api/auth/logout')
      toaster.success('Logged out Successfully')
      navigate('/')
      setAuth(null)
    } catch (error) {
      console.log(error)
      toaster.error('failed to logout')
    }
  }

  return (
    <>
      <div className='sticky inset-0 w-full bg-base-300/80 px-8 py-2 flex flex-row justify-between items-center shadow-lg'>
        <h2 className='logo'>INCOGNI</h2>
        <nav className=''>
          <ul className='hidden md:flex flex-row items-center gap-4'>
            <li>
              <Link to='/'>Home</Link>
            </li>
            {auth && (
              <li>
                <Link to='/dashboard'>Dashboard</Link>
              </li>
            )}
            {!loading && !auth && (
              <>
                <li className='btn p-1'>
                  <Link to='/auth/?mode=login'>Login</Link>
                </li>
                <li className='btn btn-outline p-1'>
                  <Link to='/auth/?mode=register'>Register</Link>
                </li>
              </>
            )}
            {!loading && auth && (
              <li className='btn p-1'>
                <button onClick={logout}>Logout</button>
              </li>
            )}
          </ul>
          <span className='md:hidden' onClick={() => setIsOpen(prev => !prev)}>
            {!isOpen && <Menu />}
            {isOpen && <X />}
          </span>
        </nav>
      </div>
      {isOpen && (
        <ul className='bg-base-300 fixed flex flex-col items-end gap-2 w-full p-4 top-12 left-0 z-9999'>
          <li className='border-secondary border-b w-full text-right'>
            <Link to='/'>Home</Link>
          </li>
          {auth && (
            <li className='border-secondary border-b w-full text-right'>
              <Link to='/dashboard'>Dashboard</Link>
            </li>
          )}
          {!loading && !auth && (
            <div className='flex flex-row gap-2 '>
              <li className='btn p-1 w-fit'>
                <Link to='/auth/?mode=login'>Login</Link>
              </li>
              <li className='btn btn-outline p-1 w-fit'>
                <Link to='/auth/?mode=register'>Register</Link>
              </li>
            </div>
          )}
          {!loading && auth && (
            <li className='btn p-1'>
              <button onClick={logout}>Logout</button>
            </li>
          )}
        </ul>
      )}
    </>
  )
}

export default Navbar
