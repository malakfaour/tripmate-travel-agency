const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // same as Trip.js

const Category = sequelize.define('Category', {
  id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },

  name: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },

  description: { 
    type: DataTypes.TEXT, 
    allowNull: false 
  },

  image: { 
    type: DataTypes.STRING, 
    allowNull: false 
  }
}, {
  tableName: 'categories',
  timestamps: true
});

module.exports = Category;
