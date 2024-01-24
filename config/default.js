const { version } = require('../package.json');

module.exports = {
  version,
  http: {
    host: 'localhost',
    port: 3000,
  },

  jwt: {
    accessToken: {
      secret: 'secret',
      expiresIn: 3 * 24 * 60 * 60, // 3 days
    },
  },
};
