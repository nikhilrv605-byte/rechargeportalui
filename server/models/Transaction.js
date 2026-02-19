const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Order = require('./Order');

const Transaction = sequelize.define('Transaction', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    recharge_id: {
        type: DataTypes.STRING, // Response from Recharge API
    },
    status: {
        type: DataTypes.STRING, // 'success', 'processing', 'failed'
    },
    operator_ref: {
        type: DataTypes.STRING, // Reference from operator
    },
    api_response: {
        type: DataTypes.JSON,
    },
});

Transaction.belongsTo(Order);
Order.hasMany(Transaction);

module.exports = Transaction;
