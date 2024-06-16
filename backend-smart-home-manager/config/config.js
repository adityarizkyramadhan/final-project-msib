module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false,
    define: {
      timestamps: true,
    },
  },
  test: {
    use_env_variable: 'DATA_BASE_TEST',
    dialect: 'mysql',
    logging: console.log,
  },
}
