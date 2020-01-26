// eslint-disable-next-line strict
'use strict';

const fs = require('fs');
const path = require('path');
const resolve = require('resolve');
const chalk = require('chalk');

const { paths } = require('./settings');

// Get additional module paths based on the baseUrl of a compilerOptions object.
function getAdditionalModulePaths(options = {}) {
  const baseUrl = options.baseUrl;

  // We need to explicitly check for null and undefined (and not a falsy value) because
  // TypeScript treats an empty string as `.`.
  if (baseUrl == null) {
    // If there's no baseUrl set we respect NODE_PATH
    const nodePath = process.env.NODE_PATH || '';
    return nodePath.split(path.delimiter).filter(Boolean);
  }

  const baseUrlResolved = path.resolve(paths.appDirectory, baseUrl);

  // We don't need to do anything if `baseUrl` is set to `node_modules`. This is
  // the default behavior.
  if (path.relative(paths.nodeModules, baseUrlResolved) === '') {
    return null;
  }

  // Allow the user set the `baseUrl` to `appSrc`.
  if (path.relative(paths.client.src, baseUrlResolved) === '') {
    return [paths.client.src];
  }

  // If the path is equal to the root directory we ignore it here.
  // We don't want to allow importing from the root directly as source files are
  // not transpiled outside of `src`. We do allow importing them with the
  // absolute path (e.g. `src/Components/Button.js`) but we set that up with
  // an alias.
  if (path.relative(paths.appDirectory, baseUrlResolved) === '') {
    return [paths.appDirectory];
  }

  // Otherwise, throw an error.
  throw new Error(
    chalk.red.bold("Your project's `baseUrl` can only be set to `src` or `node_modules`."),
  );
}

// Get webpack aliases based on the baseUrl of a compilerOptions object.
function getWebpackAliases(options = {}) {
  const baseUrl = options.baseUrl;

  if (!baseUrl) {
    return {};
  }

  const baseUrlResolved = path.resolve(paths.appDirectory, baseUrl);

  if (path.relative(paths.appDirectory, baseUrlResolved) === '') {
    return {
      src: paths.client.src,
      server: paths.server.src,
    };
  }
}

// Get jest aliases based on the baseUrl of a compilerOptions object.
function getJestAliases(options = {}) {
  const baseUrl = options.baseUrl;

  if (!baseUrl) {
    return {};
  }

  const baseUrlResolved = path.resolve(paths.appDirectory, baseUrl);

  if (path.relative(paths.appDirectory, baseUrlResolved) === '') {
    return {
      '^src/(.*)$': '<rootDir>/src/$1',
    };
  }
}

function getModules() {
  const hasTsConfig = fs.existsSync(paths.tsConfigPath);
  let config;

  if (hasTsConfig) {
    const ts = require(resolve.sync('typescript', {
      basedir: paths.nodeModules,
    }));
    config = ts.readConfigFile(paths.tsConfigPath, ts.sys.readFile).config;
  }

  config = config || {};
  const options = config.compilerOptions || {};

  const additionalModulePaths = getAdditionalModulePaths(options);

  return {
    additionalModulePaths,
    webpackAliases: getWebpackAliases(options),
    jestAliases: getJestAliases(options),
    hasTsConfig,
  };
}

module.exports = getModules();
