require('dotenv').config();

module.exports = {
  development: {
    dialect: 'sqlite',
    storage: './database.sqlite3', // Define o caminho do banco de dados SQLite
  },
  test: {
    dialect: 'sqlite',
    storage: './database.test.sqlite3',
  },
  production: {
    dialect: 'sqlite',
    storage: './database.sqlite3',
  },
};
