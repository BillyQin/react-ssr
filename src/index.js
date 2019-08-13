import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import App from './app';

function Index () {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}

ReactDOM.hydrate(<Index />, document.getElementById('root'));
