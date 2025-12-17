import React from 'react';
import Navbar from '../Navbar/Nav';
import Footer from '../Footer/Footer';
import './FooterPages.css';

const ContactUs = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Thank you for contacting us. We will get back to you shortly.");
    };

    return (
        <>
            <Navbar />
            <div className="footer-page-container">
                <h1 className="footer-page-title">Contact Us</h1>
                <div className="footer-page-content">
                    <p style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        Have questions or need assistance? We're here to help.
                        Fill out the form below or email us directly at support@anoir.com
                    </p>

                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" required placeholder="Your Name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" required placeholder="Your Email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea id="message" rows="5" required placeholder="How can we help?"></textarea>
                        </div>
                        <button type="submit" className="submit-btn">Send Message</button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ContactUs;
