const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { authenticate } = require('../middleware/authMiddleware');

// All cart routes require authentication
router.get('/', authenticate, cartController.getCart);
router.post('/add', authenticate, cartController.addToCart);
router.put('/item/:itemId', authenticate, cartController.updateCartItem);
router.delete('/item/:itemId', authenticate, cartController.removeFromCart);
router.delete('/clear', authenticate, cartController.clearCart);
router.get('/count', authenticate, cartController.getCartCount);

module.exports = router;
