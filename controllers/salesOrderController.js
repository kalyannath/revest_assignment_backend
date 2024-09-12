// controllers/salesOrderController.js
const SalesOrder = require('../models/salesOrder');
const Product = require('../models/product');
const axios = require('axios');

// Create Sales Order
exports.createSalesOrder = async (req, res) => {
  try {
    const { customerName, email, mobileNumber, status, products } = req.body;
    const salesOrder = await SalesOrder.create({ customerName, email, mobileNumber, status });
    if (products) {
      const createdProducts = await Product.bulkCreate(products.map(prod => ({ ...prod, SalesOrderId: salesOrder.id })));
      await sendToThirdParty(salesOrder, createdProducts);
      return res.status(201).json({ salesOrder, products: createdProducts });
    }
    await sendToThirdParty(salesOrder);
    return res.status(201).json(salesOrder);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create sales order' });
  }
};

// Get All Sales Orders
exports.getSalesOrders = async (req, res) => {
  const { name, email, mobileNumber, status, orderDate } = req.query;
  const whereClause = {};
  if (name) whereClause.customerName = name;
  if (email) whereClause.email = email;
  if (mobileNumber) whereClause.mobileNumber = mobileNumber;
  if (status) whereClause.status = status;
  if (orderDate) whereClause.orderDate = orderDate;

  try {
    const salesOrders = await SalesOrder.findAll({ where: whereClause, include: [{ model: Product, as: 'products' }] });
    res.json(salesOrders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sales orders' });
  }
};

// Update Sales Order
exports.updateSalesOrder = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const salesOrder = await SalesOrder.findByPk(id);
    if (!salesOrder) return res.status(404).json({ error: 'Sales order not found' });
    await salesOrder.update(updatedData);
    res.json(salesOrder);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update sales order' });
  }
};

// Delete Sales Order
exports.deleteSalesOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const salesOrder = await SalesOrder.findByPk(id);
    if (!salesOrder) return res.status(404).json({ error: 'Sales order not found' });
    await salesOrder.destroy();
    res.json({ message: 'Sales order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete sales order' });
  }
};

// Push Sales Order to Third-Party API
const sendToThirdParty = async (salesOrder, products = []) => {
  const payload = {
    ...salesOrder.toJSON(),
    products: products.map(product => product.toJSON())
  };

  try {
    await axios.post('https://third-party-api.com/salesOrder', payload, {
      headers: { Authorization: `Bearer ${process.env.JWT_TOKEN}` },
    });
    console.log('Sales order sent to third-party API.');
  } catch (error) {
    console.error('Failed to send sales order to third-party API:', error.message);
  }
};
