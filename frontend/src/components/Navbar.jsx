import { PlusIcon, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const {auth, loading} = useAuth()

  return (
    <div className='sticky inset-0 w-full bg-base-300/20 px-8 py-2 flex flex-row justify-between items-center shadow-lg'>
      <h2 className='logo'>INCOGNI</h2>
      <nav className=''>
        <ul className='hidden md:flex flex-row gap-4'>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/dashboard' >Dashboard</Link></li>
          <li><Link to='/auth/?mode=login' >Login</Link></li>
          <li><Link to='/auth/?mode=register' >Register</Link></li>
        </ul>
        <span className='md:hidden' onClick={() => setIsOpen(prev => !prev)}>
          {!isOpen && <Menu />}
          {isOpen && <X />}
        </span>
      </nav>
      {isOpen && (
        <ul className='bg-base-300 fixed flex flex-col gap-8 w-full p-4 top-12 left-0'>
          <li>Home</li>
          <li>Dashboard</li>
          <li className='w-max'>
            New <PlusIcon />{' '}
          </li>
        </ul>
      )}
    </div>
  )
}

export default Navbar
