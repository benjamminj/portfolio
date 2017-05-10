import React from 'react'
import {Link} from 'react-router-dom'

const Home = () => (
  <div className='Home'>
    <h1>Default View</h1>
    <Link to='/blog'>Blog</Link>
  </div>
)

export default Home
