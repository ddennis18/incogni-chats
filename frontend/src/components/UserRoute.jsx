import { useAuth } from '../context/AuthContext'
import LoadingScreen from './LoadingScreen'

const UserRoute = ({children}) => {
  const { loading } = useAuth()

  if (loading) {
    return <LoadingScreen />
  }
  return <>{children}</>
}

export default UserRoute
