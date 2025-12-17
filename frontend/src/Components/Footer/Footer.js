import React from 'react';
import './Footer.css';
import { GrInstagram } from "react-icons/gr";
import { Linkedin } from 'lucide-react';
import { FaYoutube } from "react-icons/fa6";

import { Link } from 'react-router-dom';

const FooterLink = ({ to, text }) => {
  return (
    <li>
      <Link to={to} className="footer-link">
        {text}
      </Link>
    </li>
  );
};

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-grid">
        <div className="footer-column">
          <h3 className="footer-heading">Assistance</h3>
          <ul className="footer-list">
            <FooterLink to="/contact" text="Contact Us" />
            <FooterLink to="/shipping-returns" text="Shipping & Return Policy" />
            <FooterLink to="/faq" text="FAQ" />
          </ul>
        </div>

        <div className="footer-column">
          <h3 className="footer-heading">Company</h3>
          <ul className="footer-list">
            <FooterLink to="/about" text="About Us" />
            <FooterLink to="/stores" text="Stores" />
            <FooterLink to="/careers" text="Careers" />
          </ul>
        </div>

        <div className="footer-column">
          <h3 className="footer-heading">Connect</h3>
          <div className="social-icons">
            <a href="#" className="footer-link"><GrInstagram size={20} /></a>
            <a href="#" className="footer-link"><Linkedin size={20} /></a>
            <a href="#" className="footer-link"><FaYoutube size={20} /></a>
          </div>
          <p className="footer-copy-text">
            &copy; 2025 ANOIR. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
