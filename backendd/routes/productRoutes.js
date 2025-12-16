const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticate } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/adminMiddleware');
const { upload } = require('../middleware/uploadMiddleware');

// Public routes
router.get('/', productController.getAllProducts);
router.get('/search', productController.searchProducts);
router.get('/categories', productController.getCategories);
router.get('/:id', productController.getProductById);

// Admin routes
router.post(
    '/',
    authenticate,
    isAdmin,
    upload.array('images', 5),
    productController.createProduct
);

router.put(
    '/:id',
    authenticate,
    isAdmin,
    upload.array('images', 5),
    productController.updateProduct
);

router.delete(
    '/:id',
    authenticate,
    isAdmin,
    productController.deleteProduct
);

module.exports = router;
