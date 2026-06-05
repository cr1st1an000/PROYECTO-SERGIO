const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware para verificar que el usuario esté logueado mediante un Token válido
const protect = async (req, res, next) => {
  let token;

  // Comprobar si el token viaja en las cabeceras HTTP como 'Bearer TOKEN_AQUÍ'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Separar la palabra 'Bearer' del token real
      token = req.headers.authorization.split(' ')[1];

      // Decodificar y verificar el token con nuestra palabra secreta
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Buscar al usuario de la sesión en la base de datos (excluyendo la contraseña por seguridad)
      req.user = await User.findById(decoded.id).select('-password');

      return next(); // Dar luz verde a la siguiente función/ruta
    } catch (error) {
      console.error('Error en la verificación del token:', error);
      return res.status(401).json({ msg: 'No autorizado, token corrupto o expirado.' });
    }
  }

  if (!token) {
    return res.status(401).json({ msg: 'Acceso denegado, no se proporcionó ningún token de seguridad.' });
  }
};

// Middleware para restringir accesos exclusivos únicamente a profesores
const isTeacher = (req, res, next) => {
  if (req.user && req.user.role === 'PROFESOR') {
    next();
  } else {
    return res.status(403).json({ msg: 'Acceso denegado. Se requieren privilegios de Profesor.' });
  }
};

module.exports = {
  protect,
  isTeacher
};