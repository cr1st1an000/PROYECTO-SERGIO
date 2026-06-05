const Task = require('../models/Task');
const User = require('../models/User');

// 1. Crear una nueva tarea de limpieza
const createTask = async (req, res) => {
  const { descripcion, estudianteAsignado, fechaEntrega } = req.body;
  const grupoProfesor = req.user.grupoAsignado; // Obtenido del token del profesor

  try {
    // Validar que vengan los campos requeridos
    if (!descripcion || !estudianteAsignado || !fechaEntrega) {
      return res.status(400).json({ msg: 'Faltan campos obligatorios para crear la tarea.' });
    }

    // Verificar que el estudiante asignado realmente exista y sea del mismo grupo que el profesor
    const alumno = await User.findById(estudianteAsignado);
    if (!alumno || alumno.role !== 'ESTUDIANTE') {
      return res.status(404).json({ msg: 'El estudiante asignado no existe.' });
    }

    if (alumno.grupo !== grupoProfesor) {
      return res.status(400).json({ msg: 'No puedes asignar tareas a alumnos de otros grupos.' });
    }

    // Crear la tarea heredando el grupo y el equipo del alumno de forma automática
    const newTask = new Task({
      descripcion,
      grupo: grupoProfesor,
      estudianteAsignado,
      equipoLimpieza: alumno.equipoLimpieza || 'NINGUNO',
      fechaEntrega
    });

    await newTask.save();

    res.status(201).json({
      success: true,
      msg: 'Tarea de limpieza asignada correctamente.',
      task: newTask
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error interno al crear la tarea.' });
  }
};

// 2. Obtener todas las tareas del grupo del profesor logueado
const getGroupTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ grupo: req.user.grupoAsignado })
      .populate('estudianteAsignado', 'nombre numeroLista equipoLimpieza') // Trae los datos del alumno en lugar de solo su ID
      .sort({ fechaEntrega: 1 }); // Ordena por fecha más cercana

    res.json({
      success: true,
      tasks
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener las tareas del grupo.' });
  }
};

module.exports = {
  createTask,
  getGroupTasks
};