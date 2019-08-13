import React from 'react';
import { StaticRouter } from 'react-router-dom';
import App from '@/pages/home';

const AppServer = (url='/', ctx) => (
  <StaticRouter context={ctx} location={url}>
    <App />
  </StaticRouter>
)

export default AppServer
