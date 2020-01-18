const {
  NODE_ENV = 'production',
  PORT = 3000,
  APPLICATION_TITLE = 'React SSR'
} = process.env;

module.exports = {
  NODE_ENV,
  PORT,
  APPLICATION_TITLE
};
