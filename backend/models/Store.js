const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Store = sequelize.define('Store', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [0, 400]
    }
  },
  rating: {
    type: DataTypes.FLOAT, // Average rating
    defaultValue: 0
  }
  // ownerId will be added via association
});

module.exports = Store;

