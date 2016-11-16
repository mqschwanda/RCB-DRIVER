'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('OrderDetails', {
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
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, {
      classMethods: {
        associate: function(models) {
          OrderDetails.belongsTo(models.Products, {contraint: true, foreignKey: 'productID', targetKey: 'productID'});
          OrderDetails.belongsTo(models.Orders, {contraint: true, foreignKey: 'orderID', targetKey: 'orderID'});
        }
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('OrderDetails');
  }
};
