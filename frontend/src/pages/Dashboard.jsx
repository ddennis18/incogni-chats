import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const userName = null
  const isLoggedIn = useSelector(state => state.user.isLoggedIn)

  {/*test if loggged in */}
  useEffect(() => {
    console.log(isLoggedIn)
  }, [])

  return (
    <div className='text-center'>
      <h2 className='text-secondary text-2xl font-semibold'>
        Hey! {userName ?? 'User.'}
      </h2>
      <section></section>
    </div>
  )
}

export default Dashboard
