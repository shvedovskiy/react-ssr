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
    } else if (error) {
      console.log('alo');
      console.error(chalk.red(error));
      process.exit(1);
    } else if (stats.hasErrors()) {
      console.error(chalk.red(stats.compilation.errors.map(e => `${e.file} (${e.location.line},${e.location.character}): ${e.rawMessage}`).join('\n')));
      process.exit(1);
    }
  });
  serverCompiler.watch({}, (error, stats) => {
    if (!error && !stats.hasErrors()) {
      console.log(stats.toString(serverConfig.stats));
    } else if (error) {
      console.error(chalk.red(error));
      process.exit(1);
    } else if (stats.hasErrors()) {
      console.error(chalk.red(stats.compilation.errors.map(e => `${e.file} (${e.location.line},${e.location.character}): ${e.rawMessage}`).join('\n')));
      process.exit(1);
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
