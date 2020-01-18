import React from 'react';
import jsesc from 'jsesc';

export const HTML = ({
  children,
  css = [],
  scripts = [],
  state = {},
  helmetContext: { helmet }
}) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {helmet.base.toComponent()}
      {helmet.title.toComponent()}
      {helmet.meta.toComponent()}
      {helmet.link.toComponent()}
      {helmet.script.toComponent()}
      {css.filter(Boolean).map((href) =>
        <link key={href} rel="stylesheet" href={href} />
      )}
      <script dangerouslySetInnerHTML={{
        __html: `window.__PRELOADED_STATE__ = ${jsesc(JSON.stringify(state), { json: true, isScriptContext: true, wrap: true })}`,
      }}
      />
    </head>
    <body>
      <div id="root" dangerouslySetInnerHTML={{ __html: children }} />
      {scripts.filter(Boolean).map((src) =>
        <script key={src} src={src} />
      )}
    </body>
  </html>
);
