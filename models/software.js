'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Software extends Model {
    static associate(models) {
      Software.hasMany(models.Reserva, {
        foreignKey: 'softwareId',
        as: 'reservas',
      });
    }
  }
  Software.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Software',
  });
  return Software;
};