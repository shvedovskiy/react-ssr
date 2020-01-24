import React from 'react';
import { hydrate } from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { App } from 'components/app/app';
import { store } from 'store/configure-store';

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
