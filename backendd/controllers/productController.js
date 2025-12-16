const Product = require('../models/Product');
const { cloudinary } = require('../utils/cloudinary');

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const { category, minPrice, maxPrice, search, sort, page = 1, limit = 12 } = req.query;

        // Build query
        let query = {};

        if (category) {
            query.category = category;
        }

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        // Build sort
        let sortOption = {};
        if (sort === 'price_asc') sortOption.price = 1;
        else if (sort === 'price_desc') sortOption.price = -1;
        else if (sort === 'newest') sortOption.createdAt = -1;
        else sortOption.createdAt = -1;

        // Pagination
        const skip = (page - 1) * limit;

        const products = await Product.find(query)
            .sort(sortOption)
            .limit(Number(limit))
            .skip(skip);

        const total = await Product.countDocuments(query);

        res.json({
            success: true,
            products,
            pagination: {
                total,
                page: Number(page),
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Get products error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Get single product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.json({
            success: true,
            product
        });
    } catch (error) {
        console.error('Get product error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Create new product (Admin only)
exports.createProduct = async (req, res) => {
    try {
        const { title, description, price, category, stock, sizes } = req.body;

        // Validation
        if (!title || !price) {
            return res.status(400).json({
                success: false,
                message: 'Title and price are required'
            });
        }

        let imageUrl = '';
        let images = [];

        // Handle single image upload
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'ecommerce/products'
            });
            imageUrl = result.secure_url;
        }

        // Handle multiple images upload
        if (req.files && req.files.length > 0) {
            const uploadPromises = req.files.map(file =>
                cloudinary.uploader.upload(file.path, {
                    folder: 'ecommerce/products'
                })
            );
            const results = await Promise.all(uploadPromises);
            images = results.map(result => result.secure_url);
            if (!imageUrl && images.length > 0) imageUrl = images[0];
        }

        const product = await Product.create({
            title,
            description,
            price: Number(price),
            image: imageUrl,
            images,
            category,
            stock: Number(stock) || 0,
            sizes: sizes ? JSON.parse(sizes) : []
        });

        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            product
        });
    } catch (error) {
        console.error('Create product error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Update product (Admin only)
exports.updateProduct = async (req, res) => {
    try {
        const { title, description, price, category, stock, sizes } = req.body;

        let product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Handle image upload if new image provided
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'ecommerce/products'
            });
            product.image = result.secure_url;
        }

        // Handle multiple images
        if (req.files && req.files.length > 0) {
            const uploadPromises = req.files.map(file =>
                cloudinary.uploader.upload(file.path, {
                    folder: 'ecommerce/products'
                })
            );
            const results = await Promise.all(uploadPromises);
            product.images = results.map(result => result.secure_url);
        }

        // Update fields
        if (title) product.title = title;
        if (description) product.description = description;
        if (price) product.price = Number(price);
        if (category) product.category = category;
        if (stock !== undefined) product.stock = Number(stock);
        if (sizes) product.sizes = JSON.parse(sizes);

        await product.save();

        res.json({
            success: true,
            message: 'Product updated successfully',
            product
        });
    } catch (error) {
        console.error('Update product error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Delete product (Admin only)
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Delete images from cloudinary if needed
        // Extract public_id from URL and delete

        await Product.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        console.error('Delete product error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Get product categories
exports.getCategories = async (req, res) => {
    try {
        const categories = await Product.distinct('category');

        res.json({
            success: true,
            categories
        });
    } catch (error) {
        console.error('Get categories error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Search products
exports.searchProducts = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q) {
            return res.status(400).json({
                success: false,
                message: 'Search query is required'
            });
        }

        const products = await Product.find({
            $or: [
                { title: { $regex: q, $options: 'i' } },
                { description: { $regex: q, $options: 'i' } },
                { category: { $regex: q, $options: 'i' } }
            ]
        }).limit(20);

        res.json({
            success: true,
            products
        });
    } catch (error) {
        console.error('Search products error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};
