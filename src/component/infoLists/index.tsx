import React from 'react';

interface List {
  target: {
    // titleArea: Object {
    //   text: string
    // }
  }
}

function InfoLists(props) {
  const { lists=[] } = props
  return (
    <div >
      {lists.map((list:List,key:number) => (
        <p key={key}>{key+1}. {list.target.titleArea.text}</p>
      ))}
    </div>
  )
}

export default InfoLists