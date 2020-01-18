const path = require('path');
const merge = require('webpack-merge');
const ManifestPlugin = require('webpack-manifest-plugin');

const { commonConfig } = require('./webpack.common');
const { isDev, paths } = require('../settings');

module.exports = merge(commonConfig('client'), {
  entry: {
    main: [
      // isDev && 'webpack-hot-middleware/client?reload=true',
      paths.client.src
    ].filter(Boolean)
  },
  output: {
    path: path.join(paths.client.output, paths.publicPath),
  },
  plugins: [
    new ManifestPlugin({ fileName: 'manifest.json' }),
    ...(isDev ? [
      // new webpack.HotModuleReplacementPlugin()
    ] : [])
  ]
});
