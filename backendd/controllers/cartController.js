const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Get user's cart
exports.getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ userId: req.user.userId })
            .populate('items.productId', 'title price image stock');

        if (!cart) {
            // Create empty cart if doesn't exist
            cart = await Cart.create({
                userId: req.user.userId,
                items: [],
                totalPrice: 0
            });
        }

        res.json({
            success: true,
            cart
        });
    } catch (error) {
        console.error('Get cart error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Add item to cart
exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity = 1, size } = req.body;

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: 'Product ID is required'
            });
        }

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Check stock
        if (product.stock < quantity) {
            return res.status(400).json({
                success: false,
                message: 'Insufficient stock'
            });
        }

        // Find or create cart
        let cart = await Cart.findOne({ userId: req.user.userId });

        if (!cart) {
            cart = await Cart.create({
                userId: req.user.userId,
                items: [],
                totalPrice: 0
            });
        }

        // Check if item already exists in cart
        const existingItemIndex = cart.items.findIndex(
            item => item.productId.toString() === productId && item.size === size
        );

        if (existingItemIndex > -1) {
            // Update quantity
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            // Add new item
            cart.items.push({
                productId,
                quantity,
                size,
                price: product.price
            });
        }

        // Calculate total price
        cart.totalPrice = cart.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);

        await cart.save();
        await cart.populate('items.productId', 'title price image stock');

        res.json({
            success: true,
            message: 'Item added to cart',
            cart
        });
    } catch (error) {
        console.error('Add to cart error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Update cart item
exports.updateCartItem = async (req, res) => {
    try {
        const { itemId } = req.params;
        const { quantity } = req.body;

        if (!quantity || quantity < 1) {
            return res.status(400).json({
                success: false,
                message: 'Valid quantity is required'
            });
        }

        const cart = await Cart.findOne({ userId: req.user.userId });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

        const itemIndex = cart.items.findIndex(item => item._id.toString() === itemId);

        if (itemIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Item not found in cart'
            });
        }

        // Check product stock
        const product = await Product.findById(cart.items[itemIndex].productId);
        if (product.stock < quantity) {
            return res.status(400).json({
                success: false,
                message: 'Insufficient stock'
            });
        }

        // Update quantity
        cart.items[itemIndex].quantity = quantity;

        // Recalculate total price
        cart.totalPrice = cart.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);

        await cart.save();
        await cart.populate('items.productId', 'title price image stock');

        res.json({
            success: true,
            message: 'Cart updated',
            cart
        });
    } catch (error) {
        console.error('Update cart error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
    try {
        const { itemId } = req.params;

        const cart = await Cart.findOne({ userId: req.user.userId });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

        // Remove item
        cart.items = cart.items.filter(item => item._id.toString() !== itemId);

        // Recalculate total price
        cart.totalPrice = cart.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);

        await cart.save();
        await cart.populate('items.productId', 'title price image stock');

        res.json({
            success: true,
            message: 'Item removed from cart',
            cart
        });
    } catch (error) {
        console.error('Remove from cart error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Clear entire cart
exports.clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.userId });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();

        res.json({
            success: true,
            message: 'Cart cleared',
            cart
        });
    } catch (error) {
        console.error('Clear cart error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Get cart item count
exports.getCartCount = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.userId });

        const count = cart ? cart.items.reduce((total, item) => total + item.quantity, 0) : 0;

        res.json({
            success: true,
            count
        });
    } catch (error) {
        console.error('Get cart count error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};
