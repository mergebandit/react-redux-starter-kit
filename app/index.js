import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import Root from './components/Root';

import configureStore from './store';

const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={Root} />
      </Router>
    </Provider>
  );
}
