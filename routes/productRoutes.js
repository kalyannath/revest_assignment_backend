// routes/productRoutes.js
const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

router.post('/internal', productController.createProductInternal);
router.post('/external', productController.createProductExternal);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
