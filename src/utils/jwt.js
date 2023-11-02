require('dotenv').config();
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;

const generarToken = (email) => {
  const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' });
  return token;
};

const verificarToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    throw new Error('Token inválido');
  }
};

module.exports = { generarToken, verificarToken };
