const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const postcssNormalize = require('postcss-normalize');

const { isDev } = require('../settings.js');

const babelLoaderClient = {
  test: /\.jsx?/i,
  exclude: /node_modules/,
  use: {
    loader: require.resolve('babel-loader'),
    options: {
      envName: 'client',
      cacheDirectory: true,
      cacheCompression: !isDev,
      compact: !isDev,
    },
  },
};

const babelLoaderServer = {
  ...babelLoaderClient,
  use: {
    loader: require.resolve('babel-loader'),
    options: {
      ...babelLoaderClient.use.options,
      envName: 'server',
    },
  },
};

function getSassLoaders(cssLoader) {
  return [
    ...(isDev ? [require.resolve('style-loader')] : [MiniCssExtractPlugin.loader]),
    cssLoader,
    {
      loader: require.resolve('postcss-loader'),
      options: {
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          require('postcss-preset-env')({
            autoprefixer: {
              flexbox: 'no-2009',
            },
            stage: 3,
          }),
          // Adds PostCSS Normalize as the reset css with default options,
          // so that it honors browserslist config in package.json
          // which in turn let's users customize the target behavior as per their needs.
          postcssNormalize(),
        ],
        sourceMap: !isDev,
      },
    },
    {
      loader: require.resolve('resolve-url-loader'),
      options: {
        sourceMap: !isDev,
      },
    },
    {
      loader: require.resolve('sass-loader'),
      options: {
        sourceMap: true,
      },
    },
  ].filter(Boolean);
}

const sassLoaderClient = {
  test: /\.module\.(scss|sass)$/,
  use: getSassLoaders({
    loader: require.resolve('css-loader'),
    options: {
      importLoaders: 2,
      sourceMap: !isDev,
      modules: {
        getLocalIdent: getCSSModuleLocalIdent,
      },
    },
  }),
};

const sassLoaderServer = {
  test: /\.module\.(scss|sass)$/,
  use: getSassLoaders({
    loader: require.resolve('css-loader'),
    options: {
      onlyLocals: true,
      importLoaders: 2,
      modules: {
        getLocalIdent: getCSSModuleLocalIdent,
      },
    },
  }),
};

const urlLoaderClient = {
  test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
  loader: require.resolve('url-loader'),
  options: {
    limit: 10000,
    name: 'static/media/[name].[hash:8].[ext]',
  },
};

const urlLoaderServer = {
  ...urlLoaderClient,
  options: {
    ...urlLoaderClient.options,
    emitFile: false,
  },
};

const fileLoaderClient = {
  loader: require.resolve('file-loader'),
  // Exclude `js` files to keep "css" loader working as it injects
  // its runtime that would otherwise be processed through "file" loader.
  // Also exclude `html` and `json` extensions so they get processed
  // by webpacks internal loaders.
  exclude: [/\.(js|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
  options: {
    name: 'static/media/[name].[hash:8].[ext]',
  },
};

const fileLoaderServer = {
  ...fileLoaderClient,
  options: {
    ...fileLoaderClient.options,
    emitFile: false,
  },
};

module.exports = {
  clientLoaders: [
    {
      oneOf: [babelLoaderClient, sassLoaderClient, urlLoaderClient, fileLoaderClient],
    },
  ],
  serverLoaders: [
    {
      oneOf: [babelLoaderServer, sassLoaderServer, urlLoaderServer, fileLoaderServer],
    },
  ],
};
