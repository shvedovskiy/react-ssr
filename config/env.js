// import { config, DotenvConfigOptions } from 'dotenv-flow';

// interface CustomDotenvConfigOptions extends DotenvConfigOptions {
//   silent?: boolean;
// }
// const dotenvOptions: CustomDotenvConfigOptions = {
//   silent: true,
// };
// config(dotenvOptions);

// require('dotenv-flow').config({
//   silent: true
// });

const {
  NODE_ENV = 'production',
  HTTPS,
  HOST = 'localhost',
  PORT,
  APPLICATION_TITLE = 'React SSR',
} = process.env;

module.exports = {
  NODE_ENV,
  HTTPS: Boolean(HTTPS),
  HOST,
  PORT: !Number.isNaN(Number.parseInt(PORT)) ? Number.parseInt(PORT) : 3000,
  APPLICATION_TITLE,
};
