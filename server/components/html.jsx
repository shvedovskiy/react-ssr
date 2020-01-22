import React from 'react';
import jsesc from 'jsesc';

export const HTML = ({
  children,
  title,
  css = [],
  inlineScripts = [],
  scripts = [],
  state = {},
  helmetContext: { helmet },
}) => (
  <html lang="ru-RU">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{title}</title>
      {helmet.base.toComponent()}
      {helmet.title.toComponent()}
      {helmet.meta.toComponent()}
      {helmet.link.toComponent()}
      {helmet.script.toComponent()}
      <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
      <link rel="apple-touch-icon" sizes="60x60" href="/icons/apple-touch-icon-60x60.png" />
      <link rel="apple-touch-icon" sizes="76x76" href="/icons/apple-touch-icon-76x76.png" />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="/icons/apple-touch-icon-120x120.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/icons/apple-touch-icon-152-152.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/icons/apple-touch-icon-180-180.png"
      />
      <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#ff0000" />
      <link rel="shortcut icon" href="/icons/favicon.ico" />
      <meta name="apple-mobile-web-app-title" content={title} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="application-name" content={title} />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="/mstile.png" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      <meta name="msapplication-tooltip" content={title} />
      <meta name="msapplication-tap-highlight" content="no" />
      <meta name="theme-color" content="#ffffff" />
      {css.filter(Boolean).map(href => (
        <link key={href} rel="stylesheet" href={href} />
      ))}
      {inlineScripts.filter(Boolean).map((content, index) => (
        <script key={index} dangerouslySetInnerHTML={{ __html: content }} />
      ))}
      <script
        dangerouslySetInnerHTML={{
          __html: `window.__PRELOADED_STATE__ = ${jsesc(JSON.stringify(state), {
            json: true,
            isScriptContext: true,
            wrap: true,
          })}`,
        }}
      />
    </head>
    <body>
      <div id="root" dangerouslySetInnerHTML={{ __html: children }} />
      {scripts.filter(Boolean).map(src => (
        <script key={src} src={src} />
      ))}
    </body>
  </html>
);
