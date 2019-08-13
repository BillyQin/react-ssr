import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '@/pages/home';
import About from '@/pages/about';

const App = () => (
  <Switch>
    <Route exact path="/about" component={About} />
    <Route exact path="/" component={Home} />
  </Switch>
)

export default App