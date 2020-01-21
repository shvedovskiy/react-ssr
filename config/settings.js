const path = require('path');
const fs = require('fs');

const { NODE_ENV } = require('./env');

const isDev = NODE_ENV === 'development';

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (...relativePaths) => path.resolve(appDirectory, ...relativePaths);

module.exports = {
  isDev,
  paths: {
    client: {
      src: resolveApp('src'),
      output: resolveApp('build')
    },
    server: {
      src: isDev ?
        resolveApp('server', 'middleware', 'renderer.jsx') :
        resolveApp('server'),
      output: resolveApp('www'),
      outputFileName: isDev? 'renderer.js' : 'server.js',
    },
    appDirectory,
    publicPath: '/',
    manifestPath: resolveApp(path.join('build', 'asset-manifest.json')),
  }
}