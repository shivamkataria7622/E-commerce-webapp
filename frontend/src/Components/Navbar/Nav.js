// src/Nav.js
import React, { useState, useRef } from "react";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import './Nav.css';

function Nav() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);
  // 

  const apparelItems = ["Topwear", "Bottomwear", "Accessories"];
  const newInItems = ["Latest Collection", "Seasonal Trends", "Limited Edition", "Bestsellers"];

  const isLoggedIn = !!localStorage.getItem('token');

  function loginHandler() {
    if (isLoggedIn) {
      navigate('/profile');
    } else {
      navigate('/Login&Signup');
    }
    setIsMenuOpen(false);
  }

  function cartIconClickHandler() {
    navigate('/yourCart');
    setIsMenuOpen(false);
  }

  function logoClickHandler() {
    navigate('/');
    setIsMenuOpen(false);
  }

  const handleMouseEnter = (menu) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 100);
  };

  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo" onClick={logoClickHandler}>
          ANOIR
        </div>
        {/* Hamburger Menu Button */}
        <button
          className="hamburger-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu + Desktop Menu */}

        <div className={`navbar-content ${isMenuOpen ? 'open' : ''}`}>

          <div className="navbar-links">
            {/* Apparel Dropdown */}
            <div className="dropdown">
              <div
                className="dropdown-trigger"
                onMouseEnter={() => handleMouseEnter('apparel')}
                onMouseLeave={handleMouseLeave}
                onClick={() => toggleDropdown('apparel')}
              >
                <span className="navbar-link" style={{ cursor: 'pointer' }}>
                  Apparel
                </span>
              </div>
              {activeDropdown === 'apparel' && (
                <div
                  ref={dropdownRef}
                  onMouseEnter={() => handleMouseEnter('apparel')}
                  onMouseLeave={handleMouseLeave}
                  className="dropdown-menu"
                >
                  {apparelItems.map((item, index) => (
                    <span key={index} className="dropdown-item" style={{ cursor: 'pointer' }}>
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* New In Dropdown */}
            <div className="dropdown">
              <div
                className="dropdown-trigger"
                onMouseEnter={() => handleMouseEnter('newIn')}
                onMouseLeave={handleMouseLeave}
                onClick={() => toggleDropdown('newIn')}
              >
                <span className="navbar-link" style={{ cursor: 'pointer' }}>
                  New In
                </span>
              </div>
              {activeDropdown === 'newIn' && (
                <div
                  ref={dropdownRef}
                  onMouseEnter={() => handleMouseEnter('newIn')}
                  onMouseLeave={handleMouseLeave}
                  className="dropdown-menu"
                >
                  {newInItems.map((item, index) => (
                    <span key={index} className="dropdown-item" style={{ cursor: 'pointer' }}>
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Actions: Search, Cart, User */}
          <div className="navbar-actions">

            <div className="navbar-search">
              <form onSubmit={(e) => {
                e.preventDefault();
                const query = e.target.search.value;
                navigate(`/?search=${query}`);
              }} className="search-form">
                <input
                  type="text"
                  name="search"
                  placeholder="Search"
                  className="search-input"
                />
                <button type="submit" className="icon-button">
                  <Search size={20} />
                </button>
              </form>
            </div>

            <div className="navbar-icons">
              <button className="icon-button relative" onClick={cartIconClickHandler}>
                <div className="icon-with-text">
                  <ShoppingCart size={20} />
                  {/* <span className="icon-text">Cart</span> */}
                  <span className="icon-badge">0</span>
                </div>
              </button>
              <button className="icon-button" onClick={loginHandler}>
                <div className="icon-with-text">
                  <User size={20} />
                  {/* <span className="icon-text">{isLoggedIn ? "Logout" : "Account"}</span> */}
                </div>
              </button>
            </div>

          </div>


        </div>
      </div>
    </nav>
  );
}

export default Nav;
