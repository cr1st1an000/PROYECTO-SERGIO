const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');

// ─── IMPORTACIÓN DE RUTAS ─────────────────────────────────────────
const authRoutes = require('./routes/authRoutes');
const reportRoutes = require('./routes/reportRoutes');
const taskRoutes = require('./routes/taskRoutes'); // Agregado para las tareas 🧹

const app = express();

// ─── 1. CAPAS DE SEGURIDAD GLOBALES ───────────────────────────────
app.use(helmet());
app.use(express.json());
app.use(mongoSanitize()); 

// ─── 2. ANTI FUERZA BRUTA (RATE LIMIT) ────────────────────────────
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, 
  message: { msg: 'Demasiadas solicitudes desde esta IP, por favor intenta en 15 minutos.' }
});
app.use('/api/', apiLimiter);

app.use(cors());

// ─── 3. CONTROLADORES DE RUTAS ────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/tasks', taskRoutes); // Conectado a /api/tasks 🚀

app.get('/', (req, res) => {
  res.send('API de Control de Limpieza corriendo con seguridad avanzada activa 🛡️🚀');
});

module.exports = app;