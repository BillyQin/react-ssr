import React from 'react';

function InfoLists(props) {
  const { lists=[] } = props
  return (
    <div >
      {lists.map((list,key) => (
        <p key={key}>{key+1}. {list.target.titleArea.text}</p>
      ))}
    </div>
  )
}

export default InfoLists