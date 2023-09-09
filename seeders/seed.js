'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Usuarios', [
      { nombre: 'Juan', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Benjamin', createdAt: new Date(), updatedAt: new Date() },
      // Agrega más usuarios según sea necesario
    ]);

    await queryInterface.bulkInsert('Programas', [
      { nombre: 'Software A', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Software B', createdAt: new Date(), updatedAt: new Date() },
      // Agrega más software según sea necesario
    ]);

    await queryInterface.bulkInsert('Reservas', [
      {
        usuarioId: 1,
        programaId: 1,
        fechaReserva: new Date('2023-01-15'),
        fechaVencimiento: new Date('2023-02-15'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        usuarioId: 2,
        programaId: 2,
        fechaReserva: new Date('2022-08-15'),
        fechaVencimiento: new Date('2023-01-15'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        usuarioId: 2,
        programaId: 1,
        fechaReserva: new Date('2022-07-01'),
        fechaVencimiento: new Date('2022-08-01'),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Reservas', null, {});
    await queryInterface.bulkDelete('Usuarios', null, {});
    await queryInterface.bulkDelete('Programas', null, {});
  },
};
