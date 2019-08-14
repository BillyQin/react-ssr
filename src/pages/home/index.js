import React from 'react';
import Header from '@/component/header';
import { Link } from 'react-router-dom';

function Home () {
  return (
    <div>
      <Header />
      This is Home page
      <Link to='/about'>知乎热榜</Link>
    </div>
  )
}

export default Home