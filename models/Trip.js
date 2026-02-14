const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // ✅ correct path

const Trip = sequelize.define('Trip', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  destination: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  description: { type: DataTypes.TEXT },
  image: { type: DataTypes.STRING },
    category: {               // ⭐ REQUIRED
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true,
  tableName: 'trips'
});

module.exports = Trip;
