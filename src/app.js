import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '@/pages/home';
import About from '@/pages/about';
import NotFound from '@/pages/notFound';

const App = () => (
  <Switch>
    <Route exact path="/about" component={About} />
    <Route exact path="/" component={Home} />
    <Route component={NotFound}/>
  </Switch>
)

export default App