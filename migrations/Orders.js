'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Orders', {
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
          Orders.belongsTo(models.Customers, {contraint: true, foreignKey: 'customerID', targetKey: 'customerID'});
        }
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Orders');
  }
};
