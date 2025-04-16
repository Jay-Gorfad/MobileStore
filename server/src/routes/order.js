const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller.js');

// Add an order
router.post('/orders', orderController.addOrder);

// Get multiple orders (with optional deleted status filter)
router.get('/orders', orderController.getOrders);

// Mark an order as deleted
router.patch('/orders/:orderId/delete', orderController.markOrderAsDeleted);

// Get only non-deleted orders
router.get('/orders/active', orderController.getActiveOrders);

// Get a single order by ID
router.get('/orders/:orderId', orderController.getOrderById);
router.get("/has-purchased/:userId/:productId", orderController.hasUserPurchasedProduct);


module.exports = router;
