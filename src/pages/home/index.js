import React, { useEffect } from 'react';
import InfoLists from '@/component/infoLists';
import { connect } from 'react-redux';

function Home (props) {
  const labels = [
    {name: 'zhihu', link: ''},
    {name: 'segmentfault', link: ''}
  ]

  const getLists = (name) => {
    props.dispatch({type:'FETCH_HOT_LISTS', payload: {name}})
  }

  useEffect(() => {
    getLists('zhihu')
  }, [])

  return (
    <React.Fragment>
      <h1>最新热榜</h1>
      <div>
      {
        labels.map(label => (
          <span key={label.name} to={label.link} onClick={() => getLists(label.name) }>{label.name}</span>
        ))
      }
      </div>
      <InfoLists lists={props.lists}/>
    </React.Fragment>
  )
}

Home.loadData = store => {
  return store.dispatch({type:'FETCH_HOT_LISTS', payload: {name: 'zhihu'}})
}

function mapStateToProps({hot}) {
  return {
    lists: hot.lists || []
  }
}

export default connect(mapStateToProps)(Home)