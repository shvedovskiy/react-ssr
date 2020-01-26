const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const { stringified } = require('../env');
const settings = require('../settings');
const modules = require('../modules');

const { isDev, paths } = settings;

module.exports.commonConfig = function(platform) {
  const isServer = platform === 'server';

  return {
    name: platform,
    context: paths.appDirectory,
    mode: isDev ? 'development' : 'production',
    bail: !isDev,
    devtool: isDev ? 'cheap-module-inline-source-map' : 'source-map',
    output: {
      path: paths[platform].output,
      pathinfo: isDev,
      publicPath: paths.publicPath,
      globalObject: 'this',
    },
    module: {
      strictExportPresence: true,
      rules: [{ parser: { requireEnsure: false } }],
    },
    resolve: {
      modules: ['node_modules', paths.nodeModules].concat(modules.additionalModulePaths || []),
      extensions: settings.moduleFileExtensions,
      alias: {
        ...(modules.webpackAliases || {}),
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        IS_SERVER: JSON.stringify(isServer),
        'typeof window': JSON.stringify(isServer ? 'undefined' : 'object'),
        ...stringified,
      }),
      ...(isDev
        ? [
            // Watcher doesn't work well if you mistype casing in a path so we use
            // a plugin that prints an error when you attempt to do this.
            // See https://github.com/facebook/create-react-app/issues/240
            new CaseSensitivePathsPlugin(),
          ]
        : []),
    ],
    performance: {
      hints: isDev ? false : 'warning',
    },
    stats: {
      assetsSort: '!size',
      builtAt: false,
      cached: false,
      cachedAssets: false,
      colors: true,
      hash: false,
      modules: false,
      reasons: false,
      version: false,
    },
  };
};
