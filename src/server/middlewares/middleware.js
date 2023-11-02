const { verificarToken } = require('../../utils/jwt');

const verificarCredenciales = (req, res, next) => {
  const { email, password, rol, lenguage } = req.body;

  if (!email || !password || !rol || !lenguage) {
    return res.status(400).json({ message: 'Faltan credenciales' });
  }

  next();
};

const validarToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    const decoded = verificarToken(token.split(' ')[1]);
    req.email = decoded.email;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido' });
  }
};

const reportarConsultas = (req, res, next) => {
  console.log(`Consulta recibida: ${req.method} ${req.path}`);
  next();
};

module.exports = { verificarCredenciales, validarToken, reportarConsultas };
