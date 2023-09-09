const { Usuario } = require('../models');
const { body, validationResult } = require('express-validator');

const router = require('express').Router()


router.get('/usuarios', async (req, res) => {
    try {
      const usuarios = await Usuario.findAll();
      res.json(usuarios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los usuarios.' });
    }
  });


router.post('/usuarios',
[
    body('nombre')
    .isString()
    .withMessage('El nombre debe ser una cadena de texto')
    .isLength({ min: 1, max: 255 })
    .withMessage('El nombre debe tener entre 1 y 255 caracteres'),
],
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newUser = await Usuario.create({
        nombre: req.body.nombre,
        });

        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el usuario.' });
    }
    });
  

router.put('/usuarios/:id',
[
    body('nombre')
    .isString()
    .withMessage('El nombre debe ser una cadena de texto')
    .isLength({ min: 1, max: 255 })
    .withMessage('El nombre debe tener entre 1 y 255 caracteres'),
],
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    try {
      const userId = req.params.id;
      const updatedUser = await Usuario.findByPk(userId);
  
      if (!updatedUser) {
        return res.status(404).json({ error: 'Usuario no encontrado.' });
      }
  
      updatedUser.name = req.body.name;
      await updatedUser.save();
  
      res.json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar el usuario.' });
    }
  });
  

router.delete('/usuarios/:id', async (req, res) => {
try {
    const userId = req.params.id;
    const userToDelete = await Usuario.findByPk(userId);

    if (!userToDelete) {
    return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    await userToDelete.destroy();
    res.json({ message: 'User eliminado exitosamente.' });
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error eliminando el usuario.' });
}
});
  

module.exports = router;