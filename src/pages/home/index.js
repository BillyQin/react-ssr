import React, { useEffect } from 'react';
import InfoLists from '@/component/infoLists';
import { connect } from 'react-redux';
import { fetchHotLists } from '@/sagas/hot';

function Home(props) {
  const labels = [
    { name: 'zhihu', link: '' },
    { name: 'segmentfault', link: '' }
  ]

  const getLists = (name) => {
    props.dispatch({type:'FETCH_HOT_LISTS', payload: {name}})
  }

  useEffect(() => {
    console.log('component did mount')
  }, [])

  return (
    <React.Fragment>
      <h1>最新热榜</h1>
      <div>
        {
          labels.map(label => (
            <span
              key={label.name}
              to={label.link}
              onClick={() => getLists(label.name)}
            >
              {label.name}
            </span>
          ))
        }
      </div>
      <InfoLists lists={props.lists} />
    </React.Fragment>
  )
}

Home.preload = (params) => {
  return [
    [fetchHotLists, params]
  ];
}

function mapStateToProps({ hot }) {
  return {
    lists: hot.lists || []
  }
}

export default connect(mapStateToProps)(Home)