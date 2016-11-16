'use strict';
module.exports = function(sequelize, DataTypes) {
  var ProductLines = sequelize.define('ProductLines', {
    productLine: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    description: {
      type: DataTypes.TEXT,
      defaultValue: null
    },
    image: {
      type: DataTypes.BLOB,
      defaultValue: null
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return ProductLines;
};
