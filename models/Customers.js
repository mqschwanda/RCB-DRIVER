'use strict';
module.exports = function(sequelize, DataTypes) {
  var Customers = sequelize.define('Customers', {
    customerID: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        isAlpha: true
      }
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        isAlpha: true
      }
    },
    phoneNumber: {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: {
        isNumeric: true
      }
    },
    emailAddress: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    postalCode: {
      type: DataTypes.STRING(5),
      allowNull: false,
      validate: {
        isNumeric: true
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations defined here
      }
    }
  });
  return Customers;
};
