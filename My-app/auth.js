const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Rodando');
});

module.exports = router;
 
const express = require('express');
const userSchema = require('../utils/userSchema');
const { encryptPassword } = require('../utils/password');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

router.post('/signup', async (req, res) => {
  try {
    // Validar dados do usuário
    const parsedData = userSchema.parse(req.body);

    // Verificar se o email já está registrado
    const existingUser = await User.findOne({ where: { email: parsedData.email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email já registrado!' });
    }

    // Encriptar senha
    const hashedPassword = await encryptPassword(parsedData.senha);

    // Criar o usuário
    const user = await User.create({
      email: parsedData.email,
      nome: parsedData.nome,
      senha: hashedPassword,
    });

    // Gerar token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      message: 'Usuário criado com sucesso!',
      user: { id: user.id, email: user.email, nome: user.nome },
      token,
    });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar usuário', error: error.errors || error.message });
  }
});

module.exports = router;
