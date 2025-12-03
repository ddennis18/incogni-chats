import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import NewQuestion from './pages/NewQuestion'
import EditQuestion from './pages/EditQuestion'

function App () {
  return (
    <div className='w-full'>
      <div className='fixed bg-radial-[at_90%_90%] from-base-100 to-base-300 to-100 w-screen h-screen z-[-9999]'></div>
      <Navbar />
      <div className='px-4'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/new' element={<NewQuestion />} />
          <Route path='/dashboard' element={<EditQuestion />} />
          <Route path='/edit' element={<EditQuestion />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
