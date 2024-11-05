const bcrypt = require('bcrypt');

const encryptPassword = async (senha) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(senha, salt);
  return hashedPassword;
};

const comparePassword = async (senha, hashedPassword) => {
  const isMatch = await bcrypt.compare(senha, hashedPassword);
  return isMatch;
};

module.exports = { encryptPassword, comparePassword };
