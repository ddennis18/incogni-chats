import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import NewSession from './pages/NewSession'

function App () {
  return (
    <div className='w-full'>
      <div className='fixed bg-radial-[at_90%_90%] from-base-100 to-base-300 to-100 w-screen h-screen z-[-9999]'></div>
      <Navbar />
      <div className='px-4'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/new' element={<NewSession />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
