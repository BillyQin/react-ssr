import React, { useEffect, useState } from 'react';

function About () {

  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('/api/products')
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      setProducts(myJson)
    });
  }, [])

  return (
    <div>
      <h1>This is About page</h1>
      {products.map((item,key) => (
        <p key={item.id}>
          <a href={item.target.link} >{key+1}. {item.target.titleArea.text}</a>
        </p>
      ))}
    </div>
  )
}

export default About