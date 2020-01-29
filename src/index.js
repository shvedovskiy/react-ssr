import React from 'react';
import { hydrate } from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { App } from './components/app/app';
import { configureStore } from './store/configure-store';
// import * as serviceWorker from './service-worker';

const preloadedState = JSON.parse(window.__PRELOADED_STATE__);
delete window.__PRELOADED_STATE__;
const store = configureStore(preloadedState);

hydrate(
  <Provider store={store}>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </Provider>,
  document.getElementById('root'),
);

// serviceWorker.register();
