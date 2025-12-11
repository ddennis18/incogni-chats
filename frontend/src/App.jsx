import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import NewQuestion from './pages/NewQuestion'
import EditQuestion from './pages/EditQuestion'
import Dashboard from './pages/Dashboard'
import Auth from './pages/Auth'
import { AuthProvider } from './context/AuthContext'
import UserRoute from './components/UserRoute'
import DetailsPage from './pages/DetailsPage'

function App () {
  return (
    <AuthProvider>
      <div className='w-full min-h-screen'>
        {/*the backgroud*/}
        <div className='fixed bg-radial-[at_90%_90%] from-base-100 to-base-300 to-100 w-screen h-screen z-[-9999]'></div>
        <Navbar />
        <div className='w-full h-full'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route
              path='/new'
              element={
                <UserRoute>
                  <NewQuestion />
                </UserRoute>
              }
            />
            <Route
              path='/dashboard'
              element={
                <UserRoute>
                  <Dashboard />
                </UserRoute>
              }
            />
            <Route path='/auth' element={<Auth />} />
            <Route
              path='/edit/:id'
              element={
                <UserRoute>
                  <EditQuestion />
                </UserRoute>
              }
            />
            <Route
              path='/details/:id'
              element={
                <UserRoute>
                  <DetailsPage />
                </UserRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </AuthProvider>
  )
}

export default App
