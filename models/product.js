// models/product.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Product = sequelize.define('Product', {
  productName: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  internal: { type: DataTypes.BOOLEAN, defaultValue: false },
}, {
  timestamps: true,
});

module.exports = Product;
