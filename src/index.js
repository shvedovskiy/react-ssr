import React from 'react';
import { hydrate } from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';

import { App } from './components/app/app';

hydrate(
  <HelmetProvider>
    <App />
  </HelmetProvider>,
  document.getElementById('root')
);
