const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');

const { commonConfig } = require('./webpack.common');
const { paths, files } = require('../settings');
const { serverLoaders } = require('./loaders');

module.exports = merge(commonConfig('server'), {
  target: 'node',
  entry: {
    server: paths.server.src,
  },
  output: {
    filename: files.server.outputFile,
    library: 'app',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: serverLoaders,
  },
  optimization: {
    minimize: false,
  },
  externals: [
    nodeExternals({
      // We still want imported css from external files to be bundled
      // otherwise 3rd party packagesbwhich require us to include
      // their own css would not work properly:
      whitelist: /\.css$/,
    }),
  ],
  node: {
    __dirname: false,
    __filename: false,
  },
});
