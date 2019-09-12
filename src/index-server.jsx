import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from '@/app';

const AppServer = (ctx) => {
  const { url } = ctx;

  const html = ReactDOMServer.renderToString(
    <StaticRouter location={url} context={ctx}>
      <App />
    </StaticRouter>
  );
  return html;
};

export default AppServer;
