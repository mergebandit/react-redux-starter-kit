import React from 'react';
import { Route } from 'react-router';
import App from './App';
import NotFound from './NotFound';


const routes = (
  <Route path="/" component={App}>
    <Route path="*" component={NotFound} />
  </Route>
);

export default routes;
