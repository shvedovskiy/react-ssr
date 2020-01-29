import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './root-reducer';
import { composeEnhancers } from './utils';

export function configureStore(preloadedState = {}) {
  const middlewareEnhancer = applyMiddleware(thunk);

  const store = createStore(rootReducer, preloadedState, composeEnhancers(middlewareEnhancer));

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./root-reducer', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
}
