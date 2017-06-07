import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => (
    <div>
      <h1> HELLO HOME </h1>
      <Link to='/scan/10'>SCAN 10 LINK - only one with machines</Link>
    </div>
)

export default Home