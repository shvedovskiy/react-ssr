const webpack = require('webpack');
const merge = require('webpack-merge');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const { commonConfig } = require('./webpack.common');
const { isDev } = require('../settings');
const { APPLICATION_TITLE } = require('../env');

const common = commonConfig('client');
module.exports = merge(common, {
  entry: {
    main: [
      // isDev && 'webpack-hot-middleware/client?reload=true',
      common.entry
    ].filter(Boolean)
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: APPLICATION_TITLE,
      template: '!!handlebars-loader!public/index.hbs',
      filename: '../index.html',
      minify: true
    }),
    ...(isDev ? [
      // new webpack.HotModuleReplacementPlugin()
    ] : [])
  ]
});
