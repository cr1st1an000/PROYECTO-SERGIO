const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controller/authController');
const { protect, isTeacher } = require('../middlewares/authMiddleware');

// IMPORTAR NUESTROS NUEVOS VALIDADORES
const { validateRegister, validateLogin } = require('../middlewares/authValidator');

// Acoplamos las reglas de validación en medio de la ruta y el controlador
router.post('/register', validateRegister, registerUser);
router.post('/login', validateLogin, loginUser);

// Ruta de prueba protegida
router.get('/test-profe', protect, isTeacher, (req, res) => {
  res.json({ msg: `Hola Profe ${req.user.nombre}, zona segura activa.` });
});

module.exports = router;