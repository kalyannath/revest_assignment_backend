// db.js
require('dotenv').config(); // Load environment variables from .env file
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected...');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
};

module.exports = { sequelize, connectDB };
