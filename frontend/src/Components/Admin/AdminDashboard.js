import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../../config';
import './Admin.css';
import Loading from '../UI/Loading';
import Nav from '../Navbar/Nav';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/products`);
            const data = await response.json();
            if (data.success) {
                setProducts(data.products);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                // NOTE: In a real app, you need to send an auth token here
                const token = localStorage.getItem('token');
                const response = await fetch(`${API_BASE_URL}/products/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    setProducts(products.filter(p => p._id !== id));
                }
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    if (loading) return <Loading />;

    return (
        <div>
            <Nav />
            <div className="admin-container">
                <div className="admin-header">
                    <h1 className="admin-title">Product Management</h1>
                    <Link to="/admin/add-product" className="add-btn">
                        + Add New Product
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="product-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Stock</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id}>
                                    <td>
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="product-thumb"
                                        />
                                    </td>
                                    <td>{product.title}</td>
                                    <td>Rs. {product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.stock}</td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="action-btn delete-btn"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
