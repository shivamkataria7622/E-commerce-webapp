import React from 'react';
import Navbar from '../Navbar/Nav';
import Footer from '../Footer/Footer';
import './FooterPages.css';

const Stores = () => {
    return (
        <>
            <Navbar />
            <div className="footer-page-container">
                <h1 className="footer-page-title">Our Stores</h1>
                <div className="footer-page-content">
                    <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        Visit us at our flagship locations to experience the collection in person.
                    </p>

                    <div style={{ marginTop: '3rem' }}>
                        <h3>New Delhi</h3>
                        <p>
                            123 Fashion Avenue, Connaught Place<br />
                            New Delhi, 110001<br />
                            Mon-Sun: 11am - 9pm
                        </p>

                        <h3>Mumbai</h3>
                        <p>
                            456 Style Street, Bandra West<br />
                            Mumbai, 400050<br />
                            Mon-Sun: 11am - 9pm
                        </p>

                        <h3>Bangalore</h3>
                        <p>
                            789 Trendy Tower, Indiranagar<br />
                            Bangalore, 560038<br />
                            Mon-Sun: 10am - 8pm
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Stores;
