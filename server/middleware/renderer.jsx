import React from 'react';
import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';

import { App } from 'components/app/app';
import { HTML } from '../components/html';
import { APPLICATION_TITLE } from '../../config/env';
import { getInlinedJavaScript, getJavaScript } from './utils';

const helmetContext = {
  helmet: {
    title: APPLICATION_TITLE
  }
};

export default function renderer(entrypoints = []) {
  // const inlineScripts = getInlinedJavaScript(manifest);
  const scripts = getJavaScript(entrypoints);

  return (req, res) => {
    const content = renderToString(
      <HelmetProvider context={helmetContext}>
        <App />
      </HelmetProvider>
    );

    return res.send('<!DOCTYPE html>' + renderToString(
      <HTML
        scripts={scripts}
        helmetContext={helmetContext}
      >
        {content}
      </HTML>
    ));
  };
}
