import { PlusIcon, Menu, X } from 'lucide-react'
import { useState } from 'react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='w-full bg-base-300 px-8 py-2 flex flex-row justify-between items-center shadow-lg'>
      <h2 className='logo'>INCOGNI</h2>
      <nav className=''>
        <ul className='hidden md:flex flex-row gap-4'>
          <li>Home</li>
          <li>Dashboard</li>
          <li className='w-max'>
            New <PlusIcon />{' '}
          </li>
        </ul>
        <span className='md:hidden' onClick={() => setIsOpen(prev => !prev)}>
          {!isOpen && <Menu />}
          {isOpen && <X/>}
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
