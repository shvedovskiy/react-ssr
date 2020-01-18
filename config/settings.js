const path = require('path');
const fs = require('fs');

const { NODE_ENV } = require('./env');

const isDev = NODE_ENV === 'development';

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const publicPath = '/static/';

module.exports = {
  isDev,
  paths: {
    client: {
      src: resolveApp('src'),
      output: resolveApp(path.join('build', publicPath))
    },
    server: {
      src: resolveApp('server'),
      output: resolveApp('www')
    },
    appDirectory,
    publicPath
  }
}