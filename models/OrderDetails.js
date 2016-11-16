'use strict';
module.exports = function(sequelize, DataTypes) {
  var OrderDetails = sequelize.define('OrderDetails', {
    orderID: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      unique: 'compositeKey'
    },
    productID: {
      type: DataTypes.INTEGER(5),
      allowNull: false,
      unique: 'compositeKey'
    },
    quantityOrdered: {
      type: DataTypes.INTEGER(2),
      allowNull: false
    },
    lineItem: {
      type: DataTypes.INTEGER(2),
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        OrderDetails.belongsTo(models.Products, {contraint: true, foreignKey: 'productID', targetKey: 'productID'});
        OrderDetails.belongsTo(models.Orders, {contraint: true, foreignKey: 'orderID', targetKey: 'orderID'});
      }
    }
  });
  return OrderDetails;
};
