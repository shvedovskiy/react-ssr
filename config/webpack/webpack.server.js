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
    filename: paths.server.outputFileName
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        loader: 'css-loader/locals'
      },
      {
        test: /\.(ttf|eot|otf|svg|png)$/,
        loader: 'file-loader?emitFile=false'
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'url-loader?emitFile=false'
      }
    ]
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
    })
  ],
  node: {
    __dirname: false,
    __filename: false,
  },
});
