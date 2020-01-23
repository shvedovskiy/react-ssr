import fs from 'fs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';

import { App } from 'components/app/app';
import { HTML } from '../components/html';
import { APPLICATION_TITLE } from '../../config/env';
import { getInlinedJavaScript, getJavaScript } from './utils';

const helmetContext = {};

export default function renderer(entrypoints = [], fileSystem = fs) {
  const inlineScripts = getInlinedJavaScript(entrypoints, fileSystem);
  const scripts = getJavaScript(entrypoints);

  return (req, res) => {
    const content = renderToString(
      <HelmetProvider context={helmetContext}>
        <App />
      </HelmetProvider>,
    );

    return res.send(
      '<!DOCTYPE html>' +
        renderToString(
          <HTML
            title={APPLICATION_TITLE}
            inlineScripts={inlineScripts}
            scripts={scripts}
            helmetContext={helmetContext}
          >
            {content}
          </HTML>,
        ),
    );
  };
}
