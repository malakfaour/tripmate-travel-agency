const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Booking = sequelize.define('Booking', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  fullName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  destination: { type: DataTypes.STRING, allowNull: false },
  passengers: { type: DataTypes.INTEGER, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  message: { type: DataTypes.TEXT },
   category: { type: DataTypes.STRING, allowNull: true }, //
  userId: { type: DataTypes.INTEGER, allowNull: false }, // 👈 Link to User
}, {
  timestamps: true,
  tableName: 'bookings'
});

// ✅ Relationships
Booking.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Booking, { foreignKey: 'userId' });

module.exports = Booking;
