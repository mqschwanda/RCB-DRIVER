'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Players', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'GUEST'
      },
      latitude: { type: DataTypes.DECIMAL },
      longitude: { type: DataTypes.DECIMAL },
      direction: { type: DataTypes.DECIMAL },
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
    return queryInterface.dropTable('Players');
  }
};
