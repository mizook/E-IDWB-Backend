const { Software } = require('../models');
const { body, validationResult } = require('express-validator');

const router = require('express').Router();

// Ruta para obtener todos los softwares
router.get('/softwares', async (req, res) => {
  try {
    const softwares = await Software.findAll();
    res.json(softwares);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los softwares.' });
  }
});

// Ruta para crear un nuevo software
router.post('/softwares', [
  body('nombre')
    .isString()
    .withMessage('El nombre debe ser una cadena de texto')
    .isLength({ min: 1, max: 255 })
    .withMessage('El nombre debe tener entre 1 y 255 caracteres'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newSoftware = await Software.create({
      nombre: req.body.nombre,
    });

    res.status(201).json(newSoftware);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el software.' });
  }
});

// Ruta para editar un software existente
router.put('/softwares/:id', [
  body('nombre')
    .isString()
    .withMessage('El nombre debe ser una cadena de texto')
    .isLength({ min: 1, max: 255 })
    .withMessage('El nombre debe tener entre 1 y 255 caracteres'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const softwareId = req.params.id;
    const updatedSoftware = await Software.findByPk(softwareId);

    if (!updatedSoftware) {
      return res.status(404).json({ error: 'Software no encontrado.' });
    }

    updatedSoftware.nombre = req.body.nombre;
    await updatedSoftware.save();

    res.json(updatedSoftware);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el software.' });
  }
});

// Ruta para eliminar un software existente
router.delete('/softwares/:id', async (req, res) => {
  try {
    const softwareId = req.params.id;
    const softwareToDelete = await Software.findByPk(softwareId);

    if (!softwareToDelete) {
      return res.status(404).json({ error: 'Software no encontrado.' });
    }

    await softwareToDelete.destroy();
    res.json({ message: 'Software eliminado exitosamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error eliminando el software.' });
  }
});

module.exports = router;