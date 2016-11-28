'use strict';
module.exports = function(sequelize, DataTypes) {
  var Player = sequelize.define('Player', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'GUEST'
    },
    latitude: { type: DataTypes.DECIMAL },
    longitude: { type: DataTypes.DECIMAL },
    direction: { type: DataTypes.DECIMAL },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Player;
};
