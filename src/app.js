import React from 'react';
import Header from './header';

function App() {
  const say = () => {
    console.log('hello~')
  }
  return (
    <div>
      <Header />
      <div onClick={say}>Hello, SSR</div>
    </div>
  )
}

export default App