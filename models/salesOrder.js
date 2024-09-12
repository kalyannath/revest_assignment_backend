// models/salesOrder.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');
const Product = require('./product');

const SalesOrder = sequelize.define('SalesOrder', {
  customerName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  mobileNumber: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.STRING, allowNull: false },
  orderDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
    timestamps: true,
});

// Association: One SalesOrder has many Products
SalesOrder.hasMany(Product, { as: 'products' });
Product.belongsTo(SalesOrder);

module.exports = SalesOrder;
