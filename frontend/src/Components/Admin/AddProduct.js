import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config';
import './Admin.css';
import Nav from '../Navbar/Nav';
import toast from 'react-hot-toast';

const AddProduct = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        category: '',
        stock: '',
    });
    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = new FormData();
            data.append('title', formData.title);
            data.append('description', formData.description);
            data.append('price', formData.price);
            data.append('category', formData.category);
            data.append('stock', formData.stock);
            // Default sizes for now
            data.append('sizes', JSON.stringify(['S', 'M', 'L', 'XL']));

            if (image) {
                // data.append('image', image); // REMOVED: Backend expects 'images'
                data.append('images', image);
            }

            // NOTE: Add Authorization header here in production
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/products`, {
                method: 'POST',
                body: data,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
                // Do NOT set Content-Type header to multipart/form-data manually
                // fetch will set it with the boundary automatically
            });

            const result = await response.json();

            if (result.success) {
                toast.success('Product added successfully!');
                navigate('/admin');
            } else {
                toast.error(result.message || 'Failed to add product');
            }
        } catch (error) {
            console.error('Error adding product:', error);
            toast.error('Error adding product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Nav />
            <div className="admin-container">
                <div className="form-card">
                    <h2 className="admin-title" style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Add New Product</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Product Title</label>
                            <input
                                type="text"
                                name="title"
                                className="form-input"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Description</label>
                            <textarea
                                name="description"
                                className="form-textarea"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label className="form-label">Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    className="form-input"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label className="form-label">Stock</label>
                                <input
                                    type="number"
                                    name="stock"
                                    className="form-input"
                                    value={formData.stock}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Category</label>
                            <select
                                name="category"
                                className="form-select"
                                value={formData.category}
                                onChange={handleChange}
                            >
                                <option value="">Select Category</option>
                                <option value="men">Men</option>
                                <option value="women">Women</option>
                                <option value="kids">Kids</option>
                                <option value="accessories">Accessories</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Product Image</label>
                            <input
                                type="file"
                                name="image"
                                className="form-input"
                                onChange={handleImageChange}
                                accept="image/*"
                            />
                        </div>

                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? 'Adding...' : 'Add Product'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
