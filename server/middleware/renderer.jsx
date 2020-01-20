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

export function renderer(manifest) {
  const inlineScripts = getInlinedJavaScript(manifest);
  const scripts = getJavaScript(manifest);

  return (req, res) => {
    const content = renderToString(
      <HelmetProvider context={helmetContext}>
        <App />
      </HelmetProvider>
    );

    return res.send('<!DOCTYPE html>' + renderToString(
      <HTML
        inlineScripts={inlineScripts}
        scripts={scripts}
        helmetContext={helmetContext}
      >
        {content}
      </HTML>
    ));
  };
};
