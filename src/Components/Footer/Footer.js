import React from 'react';
import './Footer.css'; // Importing the CSS file
import { GrInstagram } from "react-icons/gr";
import { Linkedin } from 'lucide-react';
import { FaYoutube } from "react-icons/fa6";



const FooterLink = ({ href, text }) => {
  return (
    <li>
      <a href={href} className="footer-link">
        {text}
      </a>
    </li>
  );
};

const Footer = () => {
  return (
    <div className="footer-container">
      <hr className="horizontal-line" />
      <div className="footer-grid">
        <div>
          <h3 className="footer-heading">Assistance</h3>
          <ul className="footer-list">
            <FooterLink href="#" text="Contact Us" />
            <FooterLink href="#" text="Shipping & Return Policy" />
          </ul>
        </div>
        <div>
          <h3 className="footer-heading">Company</h3>
          <ul className="footer-list">
            <FooterLink href="#" text="About Us" />
            <FooterLink href="#" text="Stores" />
            <FooterLink href="#" text="Join Us" />
          </ul>
        </div>
        <div>
          <h3 className="footer-heading">Payment Methods</h3>
          <p className="footer-paragraph">We accept payments via:</p>
          <div className="payment-icons">
            <img src="https://almostgods.com/wp-content/uploads/2021/12/mastercard-1.svg" alt="Credit Card" />
            <img src="https://almostgods.com/wp-content/uploads/2021/12/upi2.svg" alt="Visa" />
            <img src="https://almostgods.com/wp-content/uploads/2021/12/visa.svg" alt="MasterCard" />
            <img src="	https://almostgods.com/wp-content/uploads/2021/12/paypal.svg" alt="MasterCard" />
          </div>
        
        </div>
        <div>
          <h3 className="footer-heading">Stay Connected</h3>
          <div className="social-icons">
            <a href="#" className="footer-link">
              <img   /> <GrInstagram />


            </a>
            <a className="footer-link">
              <img /> <Linkedin />
            </a>
            <a href="#" className="footer-link">
              <img   /> <FaYoutube />

            </a>
          </div>
        </div>
      </div>
      <span className="footer-copy">All rights reserved © 2024 ANOIR</span>
    </div>
  );
};

export default Footer;
