const path = require('path');
const fs = require('fs');

const { NODE_ENV } = require('./env');

const isDev = NODE_ENV === 'development';

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  isDev,
  paths: {
    client: {
      src: resolveApp('src'),
      output: resolveApp('build')
    },
    server: {
      src: resolveApp('server'),
      output: resolveApp('www')
    },
    appDirectory,
    publicPath: '/',
    manifestPath: resolveApp(path.join('build', 'asset-manifest.json')),
  }
}