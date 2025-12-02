const Home = () => {
  return (
    <div className='mx-auto text-center space-y-8'>
      <div className='flex flex-col gap-8 items-center justify-center h-[70vh]'>
        <h1 className='text-secondary text-4xl font-bold'>
          INCOGNI <br /> Send Anonymous Messages in a Secure, Fast and Platform!
        </h1>
        <p>
          You on incogni, to your friends and get their responses real-time,
          fast and secure.
        </p>
        <div className='space-x-4'>
          <button className='btn'>About</button>
          <button className='btn btn-outline'>Get Started</button>
        </div>
      </div>
      <section className='bg-accent grid grid-cols-3 gap-4'>
        <p className='card text-base-300'>
          <span className='heading'>Fast</span>
        </p>
        <p className='card text-base-300'>
          <span className='heading'>Secure!</span>
        </p>
        <p className='card text-base-300'>
          <span className='heading'>Fun!</span>
        </p>
      </section>
    </div>
  )
}

export default Home
