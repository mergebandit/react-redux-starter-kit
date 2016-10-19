import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';

import rootReducer from '../reducers';

export default function configureStore() {
  const store = createStore(rootReducer,
    compose(
      applyMiddleware(thunk, promise),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  return store;
}
