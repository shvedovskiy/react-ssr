const {
  NODE_ENV = 'production',
  HTTPS,
  HOST = 'localhost',
  PORT,
  APPLICATION_TITLE = 'React SSR'
} = process.env;

module.exports = {
  NODE_ENV,
  HTTPS: Boolean(HTTPS),
  HOST,
  PORT: (!Number.isNaN(Number.parseInt(PORT))) ? Number.parseInt(PORT): 3000,
  APPLICATION_TITLE
};
