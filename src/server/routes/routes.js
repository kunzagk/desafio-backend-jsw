const express = require('express');
const pool = require('../database/db');
const { generarToken } = require('../../utils/jwt');
const { verificarCredenciales, validarToken } = require('../middlewares/middleware');

const router = express.Router();

// Registro de nuevos usuarios
router.post('/usuarios', verificarCredenciales, async (req, res) => {
  try {
    const { email, password, rol, lenguage } = req.body;
    const query = 'INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [email, password, rol, lenguage];
    const newUser = await pool.query(query, values);
    const token = generarToken(email);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);

    if (user.rows.length === 0 || user.rows[0].password !== password) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = generarToken(email);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Obtener datos de usuario autenticado
router.get('/usuarios', validarToken, async (req, res) => {
  try {
    const user = await pool.query('SELECT * FROM usuarios WHERE email = $1', [req.email]);
    res.status(200).json(user.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

module.exports = router;
