const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');

const { commonConfig } = require('./webpack.common');
const { paths } = require('../settings');

module.exports = merge(commonConfig('server'), {
  target: 'node',
  entry: {
    server: paths.server.src
  },
  output: {
    libraryTarget: 'commonjs2'
  },
  externals: [
    nodeExternals({
      // We still want imported css from external files to be bundled
      // otherwise 3rd party packagesbwhich require us to include
      // their own css would not work properly:
      whitelist: /\.css$/,
    })
  ],
  node: {
    __dirname: false,
    __filename: false,
  },
});
