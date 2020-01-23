const path = require('path');
const fs = require('fs');

const { NODE_ENV } = require('./env');

const isDev = NODE_ENV === 'development';

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (...relativePaths) => path.resolve(appDirectory, ...relativePaths);

const manifestFile = 'asset-manifest.json';

module.exports = {
  isDev,
  files: {
    client: {},
    server: {
      outputFile: isDev ? 'renderer.js' : 'index.js',
    },
    manifestFile,
  },
  paths: {
    client: {
      src: resolveApp('src'),
      output: resolveApp('server', 'public'),
    },
    server: {
      src: isDev ? resolveApp('server', 'middleware', 'renderer.jsx') : resolveApp('server'),
      output: isDev
        ? resolveApp('server', 'bin', 'middleware')
        : resolveApp('server', 'bin', 'www'),
    },
    publicSrc: resolveApp('src', 'public'),
    appDirectory,
    publicPath: '/',
    manifestPath: resolveApp('server', 'public', manifestFile),
  },
};
