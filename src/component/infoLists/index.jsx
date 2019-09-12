import React from 'react';

function InfoLists(props) {
  const { lists = [] } = props;
  return (
    <div>
      {lists.map((item, key) => (
        <p key={key}>
          <a target="_blank" href={item.link}>
            {key + 1}
.
            {' '}
            {item.title}
          </a>
        </p>
      ))}
    </div>
  );
}

export default InfoLists;
