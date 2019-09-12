import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import InfoLists from '@/component/infoLists';
import { fetchHotLists } from '@/sagas/hot';
import './index.less';

function Home(props) {
  const labels = [
    { name: 'zhihu', link: '' },
    { name: 'segmentfault', link: '' }
  ];
  // const video = require('@/assets/water.mp4');
  // const waterImg = require('@/assets/water.jpg');

  const getLists = (name) => {
    props.dispatch({ type: 'FETCH_HOT_LISTS', payload: { name } });
  };

  useEffect(() => {
    console.log('component did mount');
  }, []);

  return (
    <div className="home">
      {/* <div className="homepage-hero-module">
        <div className="video-container">
          <div className="filter"></div>
          <video autoPlay loop muted playsInline src={video} className="fillWidth"></video>
        </div>
      </div> */}
      <Link to="/about">About</Link>
      <div className="label-lists">
        {
          labels.map((label) => (
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
    </div>
  );
}

Home.preload = (params) => [
  [fetchHotLists, params]
];

function mapStateToProps({ hot }) {
  return {
    lists: hot.lists || []
  };
}

export default connect(mapStateToProps)(Home);
