import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import routes from './routes';
import creatClientStore from './store/client';

if (typeof window === 'undefined') {
  global.window = {};
}

const myStore = creatClientStore();

const App = () => (
  <Provider store={myStore}>
    <Switch>
      {routes.map((item) => (
        <Route key={item.key} path={item.path} exact={item.exact} component={item.component} />
      ))}
    </Switch>
  </Provider>
);

export default App;
