### Dependencias

npm install -g sequelize-cli
npm init -y
npm install express express-validator sequelize sequelize-cli sqlite3
npx sequelize-cli init

## Configuración
configurar package.json el script dev "node app.js"

  "scripts": {
    "dev": "node app.js"
  },
  
configurar base de datos dialect sqlite y db name en config/config.json

  "development": {
    "dialect": "sqlite",
    "storage": "db/db_dev.sqlite"
  },

## Codificación
App.js
  const express = require('express');
  const { Libro } = require('./models');
  const { body, validationResult } = require('express-validator');

  const app = express();
  const port = process.env.PORT || 3000;

  app.use(express.json());

  // Ruta para obtener todas los libros
  app.get('/libros', async (req, res) => {
    try {
      const libros = await Libro.findAll();
      res.json(libros);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los libros.' });
    }
  });

  // Ruta para agregar un nuevo libro
  app.post('/libros',
    [
      body('titulo')
        .isString()
        .withMessage('El título debe ser una cadena de texto')
        .isLength({ min: 1, max: 255 })
        .withMessage('El título debe tener entre 1 y 255 caracteres'),
      body('autor')
        .isString()
        .withMessage('El autor debe ser una cadena de texto')
        .isLength({ min: 1, max: 255 })
        .withMessage('El autor debe tener entre 1 y 255 caracteres'),
    ],
    async (req, res) => {
      // Verifica si hay errores de validación
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      };

      const { titulo, autor } = req.body;
      try {
        const libro = await Libro.create({ titulo, autor });
        res.json(libro);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al agregar el libro.' });
      }
    }
  );

  app.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
  });


## Modelos Base de datos SQLite
sequelize model:generate --name Libro --attributes titulo:string,autor:string
sequelize model:generate --name Reserva --attributes fechaReserva:date

## Configurar modelos
Modificar modelo y migraciones (agregar relaciones)

## Migración
sequelize db:migrate
npx sequelize-cli db:migrate:undo:all