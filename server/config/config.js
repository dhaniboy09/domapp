require('dotenv').config();

module.exports = {
  development: {
    username: "Dhani",
    password: null,
    database: "domapp-dev",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  test: {
    username: "Dhani",
    password: null,
    database: "domapp-test",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: "postgres"
  }
}
