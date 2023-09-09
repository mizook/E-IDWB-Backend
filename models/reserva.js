'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reserva extends Model {
    static associate(models) {
      Reserva.belongsTo(models.Usuario, {
        foreignKey: 'usuarioId',
        as: 'usuario',
      });
      Reserva.belongsTo(models.Software, {
        foreignKey: 'softwareId',
        as: 'software',
      });
    }
  }
  Reserva.init({
    usuarioId: DataTypes.INTEGER,
    softwareId: DataTypes.INTEGER,
    fechaReserva: DataTypes.DATE,
    fechaVencimiento: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Reserva',
  });
  return Reserva;
};