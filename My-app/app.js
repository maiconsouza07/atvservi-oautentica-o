const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');

// Configurar variáveis de ambiente
dotenv.config();

// Inicializar o app
const app = express();

// Middleware para interpretar JSON
app.use(express.json());

// Usar as rotas
app.use('/', authRoutes);

// Conectar ao banco de dados e iniciar o servidor
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  })
  .catch((error) => {
    console.error('Erro ao conectar com o banco de dados:', error);
  });

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
