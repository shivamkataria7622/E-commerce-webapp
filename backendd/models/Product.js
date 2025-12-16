const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Product title is required'],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: 0
    },
    image: {
        type: String,
        default: ''
    },
    images: [{
        type: String
    }],
    category: {
        type: String,
        trim: true,
        default: 'uncategorized'
    },
    stock: {
        type: Number,
        default: 0,
        min: 0
    },
    sizes: [{
        type: String
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
