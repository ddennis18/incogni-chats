import { useAuth } from "../context/AuthContext.jsx"

const Dashboard = () => {
  const {auth: {user}, loading} = useAuth()

  return (
    <div className='text-center'>
      <h2 className='text-secondary text-2xl font-semibold'>
        Hey! {user?.username}
      </h2>
      <section></section>
    </div>
  )
}

export default Dashboard
