import React from 'react';
import ReactDOM from 'react-dom';
import debug from 'debug';

import Root from './app';

debug.enable(process.env.DEBUG);

const log = debug('lego:client-entry');
log('Client environment', process.env);

try {
  ReactDOM.render(<Root />, document.getElementById('app'));
} catch (err) {
  log('Render error', err);
}

if (module.hot) {
  module.hot.accept();
}
