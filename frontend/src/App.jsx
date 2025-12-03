import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import NewQuestion from './pages/NewQuestion'
import EditQuestion from './pages/EditQuestion'
import Dashboard from './pages/Dashboard'
import Auth from './pages/Auth'

function App () {
  return (
    <div className='w-full min-h-screen'>
      <div className='fixed bg-radial-[at_90%_90%] from-base-100 to-base-300 to-100 w-screen h-screen z-[-9999]'></div>
      <Navbar />
      <div className='w-full h-full'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/new' element={<NewQuestion />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/edit' element={<EditQuestion />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
