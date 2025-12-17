import React from 'react';
import Navbar from '../Navbar/Nav';
import Footer from '../Footer/Footer';
import './FooterPages.css';

const AboutUs = () => {
    return (
        <>
            <Navbar />
            <div className="footer-page-container">
                <h1 className="footer-page-title">About ANOIR</h1>
                <div className="footer-page-content">
                    <p>
                        Welcome to ANOIR. We are a contemporary fashion brand dedicated to creating
                        thoughtfully designed pieces that bridge the gap between timeless elegance and modern street style.
                    </p>
                    <p>
                        Founded in 2025, our mission is to provide high-quality, sustainable fashion
                        that empowers individuals to express their unique identity. We believe in
                        quality over quantity, focusing on premium fabrics and meticulous craftsmanship.
                    </p>
                    <p>
                        Our collections are inspired by art, architecture, and the dynamic energy of
                        city life. Each piece is designed to be versatile, durable, and effortlessly stylish.
                    </p>
                    <h3>Our Values</h3>
                    <ul>
                        <li>Quality Craftsmanship</li>
                        <li>Sustainable Practices</li>
                        <li>Inclusivity & Diversity</li>
                        <li>Transparent Pricing</li>
                    </ul>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AboutUs;
