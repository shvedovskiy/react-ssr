const path = require('path');
const webpack = require('webpack');
const express = require('express');
const chokidar = require('chokidar');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const chalk = require('chalk');
const rimraf = require('rimraf');

const clientConfig = require('../webpack/webpack.client');
const serverConfig = require('../webpack/webpack.server');
const { paths, files } = require('../settings');
const { PORT } = require('../env');
const { compilerPromise } = require('./utils');

async function start() {
  rimraf.sync(paths.server.output);

  clientConfig.entry.main = [
    `webpack-hot-middleware/client?path=http://localhost:${PORT}/__webpack_hmr&reload=true`,
    'react-hot-loader/patch',
    clientConfig.entry.main,
  ];

  const clientCompiler = webpack(clientConfig);
  const serverCompiler = webpack(serverConfig);

  const clientPromise = compilerPromise('client', clientCompiler);
  const serverPromise = compilerPromise('server', serverCompiler);

  const watchOptions = {
    ignored: /node_modules/,
    stats: clientConfig.stats,
  };

  const app = express();
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    return next();
  });
  app.use(
    webpackDevMiddleware(clientCompiler, {
      index: false,
      publicPath: paths.publicPath,
      stats: clientConfig.stats,
      watchOptions,
      serverSideRender: true,
    }),
  );
  app.use(webpackHotMiddleware(clientCompiler));
  app.use(express.static(paths.publicSrc));

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
    throw new Error('Webpack is failed: ' + err);
  }
  const rendererPath = path.join(paths.server.output, files.server.outputFile);
  const watcher = chokidar.watch(rendererPath);

  watcher.on('ready', () => {
    watcher.on('all', () => {
      Object.keys(require.cache).forEach(id => {
        if (id.endsWith(files.server.outputFile)) {
          delete require.cache[id];
        }
      });
    });
  });

  app.use((req, res, next) => {
    const statsEntrypoints = res.locals.webpackStats.toJson().entrypoints;
    const entrypoints = Object.keys(statsEntrypoints).reduce(
      (res, key) => res.concat(statsEntrypoints[key].assets),
      [],
    );
    return require(rendererPath).default(entrypoints, res.locals.fs)(req, res, next);
  });

  const server = app.listen(PORT, err => {
    if (err) {
      throw new Error('Server is not started');
    }
    console.info(chalk.blue(`Server running at http://localhost:${PORT}`));
  });

  ['SIGINT', 'SIGTERM'].forEach(sig => {
    process.on(sig, () => {
      server.close();
      serverWatch.close();
      process.exit();
    });
  });
}
start();
