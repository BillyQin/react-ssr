import React from 'react';
import InfoLists from '@/component/infoLists/index.tsx';
import { connect } from 'react-redux';
// import { fetchHotLists } from '@/sagas/hot';

interface HomeProps {
  lists: [],
  dispatch: any
}

function Home (props: HomeProps) {
  const labels = [
    {name: 'zhihu', link: ''},
    {name: 'segmentfault', link: ''}
  ]

  const getLists = (name: string) => {
    props.dispatch({type:'FETCH_HOT_LISTS', payload: {name}})
  }

  // useEffect(() => {
  //   getLists('zhihu')
  // }, [])

  return (
    <React.Fragment>
      <h1>最新热榜</h1>
      <div>
      {
        labels.map(label => (
          <span key={label.name} onClick={() => getLists(label.name) }>{label.name}</span>
        ))
      }
      </div>
      <InfoLists lists={props.lists}/>
    </React.Fragment>
  )
}

Home.loadData = async (store: any) => {
  console.log('loadData')
  // let fetch = co(fetchHotLists({payload: {name: 'zhihu'}})).then(r => {
  //   console.log('v', r)
  // })
}

function mapStateToProps() {
  // return {
  //   lists: hot.lists || []
  // }
}

export default connect(mapStateToProps)(Home)