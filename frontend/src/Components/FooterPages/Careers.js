import React from 'react';
import Navbar from '../Navbar/Nav';
import Footer from '../Footer/Footer';
import './FooterPages.css';

const Careers = () => {
    return (
        <>
            <Navbar />
            <div className="footer-page-container">
                <h1 className="footer-page-title">Careers at ANOIR</h1>
                <div className="footer-page-content">
                    <p>
                        We are always looking for talented, passionate individuals to join our growing team.
                        At ANOIR, we foster a creative and inclusive environment where innovation thrives.
                    </p>

                    <h3 style={{ marginTop: '3rem' }}>Open Positions</h3>

                    <div style={{ padding: '1.5rem', border: '1px solid #eee', marginBottom: '1rem', marginTop: '1rem' }}>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>Fashion Merchandiser</h4>
                        <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>Mumbai • Full-time</p>
                        <p>Responsible for analyzing market trends and managing inventory levels.</p>
                    </div>

                    <div style={{ padding: '1.5rem', border: '1px solid #eee', marginBottom: '1rem' }}>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>Social Media Manager</h4>
                        <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>Remote • Full-time</p>
                        <p>Manage our social media presence and engage with our community.</p>
                    </div>

                    <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                        <p>
                            Don't see a role that fits? Send your resume and portfolio to
                            <strong> careers@anoir.com</strong> and we'll keep you in mind for future opportunities.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Careers;
