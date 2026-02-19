const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User');

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    razorpay_order_id: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    currency: {
        type: DataTypes.STRING,
        defaultValue: 'INR',
    },
    status: {
        type: DataTypes.ENUM('pending', 'paid', 'failed'),
        defaultValue: 'pending',
    },
    type: {
        type: DataTypes.STRING, // 'recharge' or 'subscription'
    },
    details: {
        type: DataTypes.JSON, // Stores plan details, mobile number, etc.
    },
});

Order.belongsTo(User);
User.hasMany(Order);

module.exports = Order;
