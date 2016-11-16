'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('ProductLines', {
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
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('ProductLines');
  }
};
