'use strict';
module.exports = function(sequelize, DataTypes) {
  var Orders = sequelize.define('Orders', {
    orderID: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    customerID: { // FOREIGN KEY
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    orderDate: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW
    },
    isComplete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    comment: {
      type: DataTypes.TEXT,
      defaultValue: null
    }
  }, {
    classMethods: {
      associate: function(models) {
        Orders.belongsTo(models.Customers, {contraint: true, foreignKey: 'customerID', targetKey: 'customerID'});
      }
    }
  });
  return Orders;
};
