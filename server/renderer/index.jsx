import fs from 'fs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';

import { App } from 'src/components/app/app';
import { env } from 'config/settings';
import { HTML } from '../templates/html';
import { getInlinedJavaScript, getJavaScript } from './utils';

export function createRenderer(entrypoints = [], fileSystem = fs) {
  const inlineScripts = getInlinedJavaScript(entrypoints, fileSystem);
  const scripts = getJavaScript(entrypoints);

  return (req, res) => {
    const context = {};
    const helmetContext = {};

    const content = renderToString(
      <Provider store={res.locals.store}>
        <HelmetProvider context={helmetContext}>
          <StaticRouter location={req.url} context={context}>
            <App />
          </StaticRouter>
        </HelmetProvider>
      </Provider>,
    );

    if (context.url) {
      return res.redirect(304, context.url);
    }

    if (context.status === 404) {
      return res.status(404);
    }

    res.send(
      '<!DOCTYPE html>' +
        renderToString(
          <HTML
            title={env.APPLICATION_TITLE || 'React SSR'}
            inlineScripts={inlineScripts}
            scripts={scripts}
            helmetContext={helmetContext}
            state={res.locals.store.getState()}
          >
            {content}
          </HTML>,
        ),
    );
  };
}
