import fs from 'fs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';

import { App } from 'components/app/app';
import { HTML } from '../components/html';
import { APPLICATION_TITLE } from '../../config/env';
import { getInlinedJavaScript, getJavaScript } from './utils';
import { loadData } from '../api/load-data';

export function createRenderer(entrypoints = [], fileSystem = fs) {
  const inlineScripts = getInlinedJavaScript(entrypoints, fileSystem);
  const scripts = getJavaScript(entrypoints);

  return async function(req, res) {
    const context = {};
    const preloadedState = await loadData(req.url);
    const store = createStore(state => state, preloadedState);
    const helmetContext = {};

    const content = renderToString(
      <Provider store={store}>
        <HelmetProvider context={helmetContext}>
          <StaticRouter location={req.url} context={context}>
            <App />
          </StaticRouter>
        </HelmetProvider>
      </Provider>,
    );

    return (
      '<!DOCTYPE html>' +
      renderToString(
        <HTML
          title={APPLICATION_TITLE}
          inlineScripts={inlineScripts}
          scripts={scripts}
          helmetContext={helmetContext}
          state={store.getState()}
        >
          {content}
        </HTML>,
      )
    );
  };
}
