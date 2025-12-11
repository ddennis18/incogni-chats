import { createContext, useContext, useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

const AuthContext = createContext()

//the provider for the auth
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get('/api/auth/refresh', {
          withCredentials: true
        })
        setAuth({ accessToken: res.data.accessToken, user: res.data.user })
        console.log({ accessToken: res.data.accessToken, user: res.data.user })
      } catch (error) {
        console.log(error)
        setAuth(null)
      } finally {
        setLoading(false)
      }
    }
    checkAuth()
  }, [])

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading }}>
      {children}
    </AuthContext.Provider>
  )
}


//the context to access the auth data
export const useAuth = () => useContext(AuthContext)
