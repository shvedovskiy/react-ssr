import 'isomorphic-fetch';

import { readFileSync } from 'fs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { HelmetData } from 'react-helmet';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { StaticRouterContext } from 'react-router';
import { Request, Response } from 'express';

import { App } from 'src/features/app/app';
import { HTML } from '../templates/html';
import { getInlinedJavaScript, getJavaScript } from './utils';
import { loadData } from '../../src/common/api/load-data';

export function createRenderer(
  entrypoints: string[] = [],
  readFile: typeof readFileSync = readFileSync,
) {
  const inlineScripts = getInlinedJavaScript(entrypoints, readFile);
  const scripts = getJavaScript(entrypoints);

  return async (req: Request, res: Response) => {
    const context: StaticRouterContext = {};
    const helmetContext: { helmet?: HelmetData } = {};

    const location = {
      pathname: req.path,
      query: req.query,
    };
    await loadData(res.locals.store.dispatch, location);

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

    if (context?.statusCode === 404) {
      return res.status(404);
    }

    res.send(
      '<!DOCTYPE html>' +
        renderToString(
          <HTML
            title={process.env.APPLICATION_TITLE || 'React SSR'}
            inlineScripts={inlineScripts}
            scripts={scripts}
            helmet={helmetContext?.helmet}
            state={res.locals.store.getState()}
          >
            {content}
          </HTML>,
        ),
    );
  };
}
