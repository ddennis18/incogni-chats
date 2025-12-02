import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'

function App () {
  return (
    <div className='w-full h-[200vh]'>
      <div className='fixed bg-radial-[at_90%_90%] from-base-100 to-base-300 to-100 w-screen h-screen z-[-9999]'></div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
