'use strict'
const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('.');

module.exports = (sequelize) => {
  class Course extends Model {}
  Course.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    },
    estimatedTime: {
      type: DataTypes.STRING
    },
    materialsNeeded: {
      type: DataTypes.STRING
    }
    // UserId: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: "user",
    //     key: "id"
    //   }
    // }
  }, { sequelize });

  Course.associate = (models) => {
    Course.belongsTo(models.User, { 
      foreignKey: {
        feildName: 'UserId', 
        allowNull: false,
      },
    });
  };

  return Course
};