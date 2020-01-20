const path = require('path');
const webpack = require('webpack');
const nodemon = require('nodemon');
const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const chalk = require('chalk');
const rimraf = require('rimraf');

const clientConfig = require('../webpack/webpack.client');
const serverConfig = require('../webpack/webpack.server');
const { paths } = require('../settings');
const { PORT } = require('../env');
const { compilerPromise } = require('./utils');

async function start() {
  rimraf.sync(paths.client.output);
  rimraf.sync(paths.server.output);

  const app = express();
  const WEBPACK_PORT = PORT + 1;
  const devserverURL = `http://localhost:${WEBPACK_PORT}`;

  clientConfig.entry.main = [
    `webpack-hot-middleware/client?path=${devserverURL}/__webpack_hmr`,
    clientConfig.entry.main
  ];
  clientConfig.output.hotUpdateMainFilename = 'updates/[hash].hot-update.json';
  clientConfig.output.hotUpdateChunkFilename = 'updates/[id].[hash].hot-update.js';

  clientConfig.output.publicPath = path.join(devserverURL, paths.publicPath)
    .replace(/([^:+])\/+/g, '$1/');
  serverConfig.output.publicPath = path.join(devserverURL, paths.publicPath)
    .replace(/([^:+])\/+/g, '$1/');

  const clientCompiler = webpack(clientConfig);
  const serverCompiler = webpack(serverConfig);

  const clientPromise = compilerPromise('client', clientCompiler);
  const serverPromise = compilerPromise('server', serverCompiler);

  const watchOptions = {
    ignored: /node_modules/,
    stats: clientConfig.stats,
  };

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    return next();
  });
  app.use(webpackDevMiddleware(clientCompiler, {
    index: false,
    publicPath: paths.publicPath,
    stats: clientConfig.stats,
    watchOptions,
    writeToDisk(filePath) {
      return /\/static\//.test(filePath);
    }
  }));
  app.use(webpackHotMiddleware(clientCompiler));
  app.use(express.static(paths.client.output));
  app.listen(WEBPACK_PORT);

  const serverWatch = serverCompiler.watch(watchOptions, (err, stats) => {
    if (!err && !stats.hasErrors()) {
      console.info(stats.toString(serverConfig.stats));
    } else if (err) {
      console.error(err);
    } else if (stats.hasErrors()) {
      const errors = stats.toJson().errors[0].split('\n');
      console.error(errors[0]);
      console.error(errors[1]);
      console.error(errors[2]);
    }
  });

  try {
    await clientPromise;
    await serverPromise;
  } catch (err) {
    console.error(chalk.red('Webpack is failed: ', err));
  }

  const script = nodemon({
    script: path.join(paths.server.output, 'server.js'),
    watch: paths.server.output,
    delay: 200
  });

  script.on('restart', () => {
    console.info(chalk.green('\nServer side app has been restarted'));
  });

  script.on('quit', () => {
    console.info(chalk.magenta('\nProcess ended'));
    exit();
  });

  script.on('error', () => {
    console.error(chalk.red('\nAn error occured. Exiting', 'error'));
    exit(1);
  });

  ['SIGINT', 'SIGTERM'].forEach((sig) => {
    process.on(sig, exit);
  });

  function exit(exitCode = 0) {
    serverWatch.close();
    process.exit(exitCode);
  }
}
start();