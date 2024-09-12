// sync.js
require('dotenv').config(); // Load environment variables from .env file
const { sequelize } = require('./db');
const SalesOrder = require('./models/salesOrder');
const Product = require('./models/product');

const syncDB = async () => {
  try {
    await sequelize.sync({ force: true }); // Use { force: true } only for initial setup; remove for production
    console.log('Database synced');
  } catch (err) {
    console.error('Error syncing database:', err);
  }
};

syncDB();
