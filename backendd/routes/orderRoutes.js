const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticate } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/adminMiddleware');

// User routes
router.post('/', authenticate, orderController.createOrder);
router.get('/my-orders', authenticate, orderController.getUserOrders);
router.get('/:id', authenticate, orderController.getOrderById);
router.put('/:id/cancel', authenticate, orderController.cancelOrder);

// Admin routes
router.get('/admin/all', authenticate, isAdmin, orderController.getAllOrders);
router.put('/admin/:id/status', authenticate, isAdmin, orderController.updateOrderStatus);
router.get('/admin/stats', authenticate, isAdmin, orderController.getOrderStats);

module.exports = router;
