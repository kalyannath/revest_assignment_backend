// controllers/productController.js
const Product = require('../models/product');

// Create Product (Internal)
exports.createProductInternal = async (req, res) => {
  try {
    const product = await Product.create({ ...req.body, internal: true });
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating internal product:', error);
    res.status(500).json({ error: 'Failed to create internal product' });
  }
};

// Create Product (External)
exports.createProductExternal = async (req, res) => {
  try {
    const product = await Product.create({ ...req.body, internal: false });
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating external product:', error);
    res.status(500).json({ error: 'Failed to create external product' });
  }
};

// Get All Products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// Get Product by ID
exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    await product.update(updatedData);
    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    await product.destroy();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
};
