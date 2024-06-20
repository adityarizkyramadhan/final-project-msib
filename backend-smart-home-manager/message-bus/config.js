module.exports = {
  development: {
    service_name: 'smart-home',
    host: process.env.RABBIT_HOST_DEV,
    port: process.env.RABBIT_PORT_DEV,
    user: process.env.RABBIT_USER_DEV,
    password: process.env.RABBIT_PASSWORD_DEV,
  },
  production: {
    service_name: 'smart-home',
    host: process.env.RABBIT_HOST,
    port: process.env.RABBIT_PORT,
    user: process.env.RABBIT_USER,
    password: process.env.RABBIT_PASSWORD,
  },
};
