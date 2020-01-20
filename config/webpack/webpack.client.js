const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ManifestPlugin = require('webpack-manifest-plugin');

const { commonConfig } = require('./webpack.common');
const { isDev, paths } = require('../settings');

module.exports = merge(commonConfig('client'), {
  entry: {
    main: paths.client.src
  },
  output: {
    path: path.join(paths.client.output, paths.publicPath),
  },
  plugins: [
    new ManifestPlugin({ fileName: 'manifest.json' }),
    ...(isDev ? [
      new webpack.HotModuleReplacementPlugin()
    ] : [])
  ]
});
