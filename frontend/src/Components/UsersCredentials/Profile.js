import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config';
import Nav from '../Navbar/Nav';
import Footer from '../Footer/Footer';
import './Profile.css';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/Login&Signup');
                return;
            }

            try {
                const response = await fetch(`${API_BASE_URL}/auth/profile`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();

                if (data.success) {
                    setUser(data.user);
                } else {
                    // Token might be invalid or expired
                    localStorage.removeItem('token');
                    navigate('/Login&Signup');
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
        window.location.reload();
    };

    if (loading) {
        return (
            <div>
                <Nav />
                <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading profile...</div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div>
            <Nav />
            <div className="profile-container">
                <div className="profile-header">
                    <div className="profile-avatar">
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                    <h2>My Profile</h2>
                </div>

                <div className="profile-details">
                    <div className="detail-row">
                        <span className="detail-label">Full Name</span>
                        <span className="detail-value">{user.name}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Email Address</span>
                        <span className="detail-value">{user.email}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Role</span>
                        <span className="detail-value">
                            {user.role}
                            {user.role === 'admin' && <span className="admin-badge">ADMIN</span>}
                        </span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">User ID</span>
                        <span className="detail-value" style={{ fontSize: '0.8rem', color: '#999' }}>{user._id}</span>
                    </div>
                </div>

                <div className="profile-actions">
                    <button onClick={handleLogout} className="logout-btn">
                        Logout
                    </button>
                    {user.role === 'admin' && (
                        <button
                            onClick={() => navigate('/admin')}
                            className="logout-btn"
                            style={{ backgroundColor: '#28a745' }}
                        >
                            Admin Dashboard
                        </button>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;
