import React from 'react';
import Navbar from '../Navbar/Nav';
import Footer from '../Footer/Footer';
import './FooterPages.css';

const ShippingReturns = () => {
    return (
        <>
            <Navbar />
            <div className="footer-page-container">
                <h1 className="footer-page-title">Shipping & Returns</h1>
                <div className="footer-page-content">
                    <h3>Shipping Policy</h3>
                    <p>
                        We offer free standard shipping on all orders over Rs. 2000.
                        Orders are processed within 1-2 business days.
                    </p>
                    <p>
                        Standard shipping typically takes 3-5 business days.
                        Express shipping options are available at checkout.
                    </p>

                    <h3>Return Policy</h3>
                    <p>
                        We want you to be completely satisfied with your purchase.
                        If you are not happy with your order, we accept returns within 14 days of delivery.
                    </p>
                    <p>
                        Items must be unworn, unwashed, and in their original condition with tags attached.
                        To initiate a return, please contact our support team.
                    </p>

                    <h3>Refunds</h3>
                    <p>
                        Once we receive your return, we will inspect the item and process your refund.
                        Refunds will be issued to the original payment method within 5-7 business days.
                    </p>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ShippingReturns;
