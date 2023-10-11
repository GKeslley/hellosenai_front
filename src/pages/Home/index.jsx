import React from 'react'
import Invites from '../../components/Home/Invites'
import Projects from '../../components/Home/Projects'

const Home = () => {
  return (
    <section className='flex flex-col gap-20'>
      <Projects />
      <Invites />
    </section>
  )
}

export default Home