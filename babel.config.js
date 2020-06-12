const path = require('path');

const env = process.env.BABEL_ENV || process.env.NODE_ENV;
const isEnvDevelopment = env === 'development';
const isEnvProduction = env === 'production';
const isEnvTest = env === 'test';

module.exports = {
  sourceType: 'unambiguous',
  presets: [
    isEnvTest && [
      // ES features necessary for user's Node version
      require('@babel/preset-env').default,
      {
        targets: {
          node: 'current',
        },
        modules: false,
        exclude: ['transform-typeof-symbol'],
      },
    ],
    (isEnvProduction || isEnvDevelopment) && [
      require('@babel/preset-env').default,
      {
        useBuiltIns: 'usage',
        corejs: '3.6',
        loose: true,
        shippedProposals: true,
        modules: false,
        exclude: ['transform-typeof-symbol'],
      },
    ],
    [
      require('@babel/preset-react').default,
      {
        // Adds component stack to warning messages
        // Adds __self attribute to JSX which React will use for some warnings
        development: isEnvDevelopment || isEnvTest,
        // Will use the native built-in instead of trying to polyfill
        // behavior for any plugins that require one.
        useBuiltIns: true,
      },
    ],
    require('@babel/preset-typescript').default,
  ].filter(Boolean),

  plugins: [
    require('babel-plugin-macros'),
    //   [
    //     require('@babel/plugin-transform-destructuring').default,
    //     {
    //       // Use loose mode for performance:
    //       // https://github.com/facebook/create-react-app/issues/5602
    //       loose: false,
    //       selectiveLoose: [
    //         'useState',
    //         'useEffect',
    //         'useContext',
    //         'useReducer',
    //         'useCallback',
    //         'useMemo',
    //         'useRef',
    //         'useImperativeHandle',
    //         'useLayoutEffect',
    //         'useDebugValue',
    //       ],
    //     },
    //   ],
    [require('@babel/plugin-proposal-decorators').default, false],
    [
      require('@babel/plugin-proposal-class-properties').default,
      {
        loose: true,
      },
    ],
    require('@babel/plugin-proposal-numeric-separator').default,
    [
      require('@babel/plugin-proposal-object-rest-spread').default,
      {
        useBuiltIns: true,
      },
    ],
    [
      require('@babel/plugin-transform-runtime').default,
      {
        corejs: false,
        helpers: true,
        version: require('@babel/runtime/package.json').version,
        regenerator: true,
        // https://babeljs.io/docs/en/babel-plugin-transform-runtime#useesmodules
        // We should turn this on once the lowest version of Node LTS
        // supports ES Modules.
        useESModules: isEnvDevelopment || isEnvProduction,
        // Undocumented option that lets us encapsulate our runtime, ensuring
        // the correct version is used
        // https://github.com/babel/babel/blob/090c364a90fe73d36a30707fc612ce037bdbbb24/packages/babel-plugin-transform-runtime/src/index.js#L35-L42
        absoluteRuntime: path.dirname(require.resolve('@babel/runtime/package.json')),
      },
    ],
    isEnvProduction && [
      // Remove PropTypes from production build
      require('babel-plugin-transform-react-remove-prop-types').default,
      {
        removeImport: true,
      },
    ],
    require('@babel/plugin-syntax-dynamic-import').default,
    require('@babel/plugin-proposal-optional-chaining').default,
    require('@babel/plugin-proposal-nullish-coalescing-operator').default,
    isEnvTest &&
      // Transform dynamic import to require
      require('babel-plugin-dynamic-import-node'),
  ].filter(Boolean),

  overrides: [
    {
      test: /\.tsx?$/,
      plugins: [[require('@babel/plugin-proposal-decorators').default, { legacy: true }]],
    },
  ].filter(Boolean),

  env: {
    client: {
      plugins: ['react-hot-loader/babel'],
    },
    server: {
      presets: [
        [
          require('@babel/preset-env').default,
          {
            useBuiltIns: 'usage',
            modules: false,
            corejs: '3.6',
            shippedProposals: true,
            targets: {
              node: 12,
            },
          },
        ],
      ],
    },
  },
};
