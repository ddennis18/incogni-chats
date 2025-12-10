import { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import LoadingScreen from './LoadingScreen'
import { useNavigate } from 'react-router'

const UserRoute = ({ children }) => {
  const { loading, auth } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !auth) navigate('/');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, auth])

  if (loading) {
    return <LoadingScreen />
  }
  return <>{children}</>
}

export default UserRoute
