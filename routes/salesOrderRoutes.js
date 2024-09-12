// routes/salesOrderRoutes.js
const express = require('express');
const salesOrderController = require('../controllers/salesOrderController');
const router = express.Router();

router.post('/', salesOrderController.createSalesOrder);
router.get('/', salesOrderController.getSalesOrders);
router.put('/:id', salesOrderController.updateSalesOrder);
router.delete('/:id', salesOrderController.deleteSalesOrder);

module.exports = router;
