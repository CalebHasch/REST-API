'use strict'
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
  class User extends Model {}
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A first name is required'
        },
        notEmpty: {
          msg: 'Please Provide a first name'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A last name is required'
        },
        notEmpty: {
          msg: 'Please Provide a last name'
        }
      }
    },
    emailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'The email you have entered already exists'
      },
      validate: {
        notNull: {
          msg: 'An email is required'
        },
        isEmail: {
          msg: 'Please Provide a valid email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A password is required'
        },
        notEmpty: {
          msg: 'Please Provide a password'
        }
      }
    }
    // confirmedPassword: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   set(val) {
    //     if ( val === this.password ) {
    //       const hashedPassword = bcrypt.hashSync(val, 10);
    //       this.setDataValue('confirmedPassword', hashedPassword);
    //     }
    //   }
    // }
  }, { sequelize });

  User.associate = (models) => {
    User.hasMany(models.Course, { 
      foreignKey: {
        feildName: 'UserId', 
        allowNull: false,
      },
    });
  };

  return User
};