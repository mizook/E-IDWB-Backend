const { Reserva } = require('../models');
const { Op } = require('sequelize');
const { body, validationResult } = require('express-validator');

const router = require('express').Router();

// Ruta para obtener reservas filtradas por año
router.get('/reservas', async (req, res) => {
  try {
    const { ano } = req.query;

    // Convierte el año de la solicitud a un rango de fechas
    const fechaInicio = new Date(ano, 0, 1); // El mes se establece en 0 para enero
    const fechaFin = new Date(ano, 11, 31); // El mes se establece en 11 para diciembre

    // Consulta las reservas dentro del rango de fechas
    const reservasFiltradas = await Reserva.findAll({
      where: {
        fechaReserva: {
          [Op.between]: [fechaInicio, fechaFin],
        },
      },
    });

    res.json(reservasFiltradas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las reservas filtradas.' });
  }
});


// Ruta para crear una nueva reserva
router.post('/reservas',
[
  body('usuarioId')
  .notEmpty()
  .withMessage('El id del usuario no puede ser vacío.')
  .isInt()
  .withMessage('El usuarioId debe ser un número entero'),
  body('softwareId')
  .notEmpty()
  .withMessage('El id del usuario no puede ser vacío.')
  .isInt()
  .withMessage('El softwareId debe ser un número entero'),
  body('fechaReserva')
  .notEmpty()
  .withMessage('El id del usuario no puede ser vacío.')
  .isDate()
  .withMessage('La fecha de reserva debe ser una fecha válida'),
  body('fechaVencimiento')
  .notEmpty()
  .withMessage('El id del usuario no puede ser vacío.')
  .isDate()
  .withMessage('La fecha de vencimiento debe ser una fecha válida'),
],
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const nuevaReserva = await Reserva.create({
      usuarioId: req.body.usuarioId,
      softwareId: req.body.softwareId,
      fechaReserva: req.body.fechaReserva,
      fechaVencimiento: req.body.fechaVencimiento,
    });

    res.status(201).json(nuevaReserva);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la reserva.' });
  }
});

// Ruta para editar una reserva existente
router.put('/reservas/:id',
[
  body('fechaReserva')
  .notEmpty()
  .withMessage('La fecha no puede ser vacía.')
  .isDate()
  .withMessage('La fecha de reserva debe ser una fecha válida'),
  body('fechaVencimiento')
  .notEmpty()
  .withMessage('La fecha no puede ser vacía.')
  .isDate()
  .withMessage('La fecha de vencimiento debe ser una fecha válida'),
],
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const reservaId = req.params.id;
    const reservaActualizada = await Reserva.findByPk(reservaId);

    if (!reservaActualizada) {
      return res.status(404).json({ error: 'Reserva no encontrada.' });
    }

    reservaActualizada.fechaReserva = req.body.fechaReserva;
    reservaActualizada.fechaVencimiento = req.body.fechaVencimiento;
    await reservaActualizada.save();

    res.json(reservaActualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la reserva.' });
  }
});

// Ruta para eliminar una reserva existente
router.delete('/reservas/:id', async (req, res) => {
  try {
    const reservaId = req.params.id;
    const reservaParaEliminar = await Reserva.findByPk(reservaId);

    if (!reservaParaEliminar) {
      return res.status(404).json({ error: 'Reserva no encontrada.' });
    }

    await reservaParaEliminar.destroy();
    res.json({ message: 'Reserva eliminada exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error eliminando la reserva.' });
  }
});

module.exports = router;