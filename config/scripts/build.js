const fs = require('fs-extra');
const webpack = require('webpack');
const rimraf = require('rimraf');
const chalk = require('chalk');

const clientConfig = require('../webpack/webpack.client');
const serverConfig = require('../webpack/webpack.server');
const { paths } = require('../settings');
const { compilerPromise } = require('./utils');

function copyPublicFolder() {
  fs.copySync(paths.publicSrc, paths.client.output, {
    dereference: true,
  });
}

async function build() {
  rimraf.sync(paths.client.output);
  rimraf.sync(paths.server.output);

  const clientCompiler = webpack(clientConfig);
  const serverCompiler = webpack(serverConfig);

  const clientPromise = compilerPromise('client', clientCompiler);
  const serverPromise = compilerPromise('server', serverCompiler);

  clientCompiler.watch({}, (error, stats) => {
    if (!error && !stats.hasErrors()) {
      console.log(stats.toString(clientConfig.stats));
    } else {
      console.error(chalk.red(stats.compilation.errors));
    }
  });
  serverCompiler.watch({}, (error, stats) => {
    if (!error && !stats.hasErrors()) {
      console.log(stats.toString(serverConfig.stats));
    } else {
      console.error(chalk.red(stats.compilation.errors));
    }
  });

  try {
    await clientPromise;
    await serverPromise;
  } catch (err) {
    throw new Error('Webpack is failed: ', err);
  }
  copyPublicFolder();
  console.info(chalk.blue('Done!'));
  process.exit(0);
}

build();
