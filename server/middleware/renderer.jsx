import React from 'react';
import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';

import { App } from 'components/app/app';
import { HTML } from '../components/html';
import { APPLICATION_TITLE } from '../../config/env';

const helmetContext = {
  helmet: {
    title: APPLICATION_TITLE
  }
};

function getJavaScript(manifest) {
  return Object.keys(manifest)
    .filter(key => key.match(/\.js$/))
    .map(key => manifest[key] || '');
}

export const renderer = manifest => (req, res) => {
  const content = renderToString(
    <HelmetProvider context={helmetContext}>
      <App />
    </HelmetProvider>
  );

  return res.send('<!DOCTYPE html>' + renderToString(
    <HTML
      scripts={getJavaScript(manifest)}
      helmetContext={helmetContext}
    >
      {content}
    </HTML>
  ));
};
