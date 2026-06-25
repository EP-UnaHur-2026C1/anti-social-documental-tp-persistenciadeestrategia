'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Follow extends Model {
    static associate(models) {}
  }

  Follow.init(
    {
      followerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      followingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Follow',

      // evita duplicados
      indexes: [
        {
          unique: true,
          fields: ['followerId', 'followingId'],
        },
      ],
    }
  );

  return Follow;
};