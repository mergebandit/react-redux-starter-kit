import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

import 'assets/css/app.css';


import configureStore from './store';
import routes from './routes';

const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <Router history={browserHistory} routes={routes} />
    </Provider>
  );
}
