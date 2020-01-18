const webpack = require('webpack');

const { NODE_ENV } = require('../env');
const settings = require('../settings');

const { isDev, paths } = settings;

module.exports.commonConfig = function (platform) {
  const isServer = platform === 'server';

  return {
    name: platform,
    context: paths.appDirectory,
    mode: isDev ? 'development' : 'production',
    devtool: isDev ? 'cheap-module-inline-source-map' : 'source-map',
    entry: paths[platform].src,
    output: {
      path: paths[platform].output,
      filename: isDev ? '[name].js' : '[name].[contenthash].js',
      publicPath: paths.publicPath
    },
    module: {
      rules: [
        {
          test: /\.jsx?/i,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: !isDev,
              compact: !isDev
            }
          }
        }
      ]
    },
    resolve: {
      modules: [
        paths.client.src,
        paths.server.src,
        'node_modules'
      ],
      extensions: ['.js', '.jsx', '.json'],
    },
    plugins: [
      new webpack.DefinePlugin({
        IS_SERVER: JSON.stringify(isServer),
        'typeof window': JSON.stringify(isServer ? 'undefined' : 'object'),
        'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
      })
    ]
  };
}
