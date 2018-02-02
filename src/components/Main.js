import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Events from './Events';
import Summary from './Summary';
import Form from './Form';

export default () => (
  <main>
    <Switch>
      <Route exact path='/' component={Form}/>
      <Route exact path='/events' component={Events}/>
      <Route path='/summary' component={Summary}/>
    </Switch>
  </main>
);