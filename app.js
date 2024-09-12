// index.js
require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const { connectDB } = require('./db');
const salesOrderRoutes = require('./routes/salesOrderRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(express.json());

app.use('/api/sales-orders', salesOrderRoutes);
app.use('/api/products', productRoutes);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
