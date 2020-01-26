// import { config, DotenvConfigOptions } from 'dotenv-flow';

// interface CustomDotenvConfigOptions extends DotenvConfigOptions {
//   silent?: boolean;
// }
// const dotenvOptions: CustomDotenvConfigOptions = {
//   silent: true,
// };
// config(dotenvOptions);

require('dotenv-flow').config({
  silent: true,
});

const raw = Object.keys(process.env).reduce(
  (env, key) => {
    env[key] = process.env[key];
    return env;
  },
  {
    NODE_ENV: process.env.NODE_ENV || 'production',
  },
);

const stringified = {
  'process.env': Object.keys(raw).reduce((env, key) => {
    env[key] = JSON.stringify(raw[key]);
    return env;
  }, {}),
};

module.exports = { raw, stringified };
