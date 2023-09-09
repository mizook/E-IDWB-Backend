const express = require('express');
const UserRoutes = require('./routes/UserRoutes')
const SoftwareRoutes = require('./routes/SoftwareRoutes')
const BookingRoutes = require('./routes/BookingRoutes')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// RUTAS
app.use(UserRoutes);
app.use(SoftwareRoutes);
app.use(BookingRoutes);

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});