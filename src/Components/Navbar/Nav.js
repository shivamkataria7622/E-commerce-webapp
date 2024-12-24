// src/Nav.js
import React, { useState, useRef } from "react";
import { Search, ShoppingCart, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import './Nav.css';


function Nav() {
  const navigate = useNavigate();
  function loginHandler() {
    navigate('/Login&Signup');
  }
  function cartIconClickHandler() {
    console.log("Cart Icon Clicked");
    navigate('/yourCart');
  }
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  const apparelItems = [
    "Topwear",
    "Bottomwear",
    "Accessories",
  ];

  const newInItems = [
    "Latest Collection",
    "Seasonal Trends",
    "Limited Edition",
    "Bestsellers"
  ];

  const handleMouseEnter = (menu) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 100); // Small delay to allow mouse to move to dropdown
  };
  function logoClickHandler() {
    navigate('/');
  }
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo" onClick={logoClickHandler}>
          ANOIR
        </div>

        {/* Middle Navigation with Dropdowns */}
        <div className="navbar-links">
          {/* Apparel Dropdown */}
          <div className="dropdown">
            <div
              onMouseEnter={() => handleMouseEnter('apparel')}
              onMouseLeave={handleMouseLeave}
            >
              <a href="#" className="navbar-link">
                Apparel
              </a>
            </div>
            {activeDropdown === 'apparel' && (
              <div
                ref={dropdownRef}
                onMouseEnter={() => handleMouseEnter('apparel')}
                onMouseLeave={handleMouseLeave}
                className="dropdown-menu"
              >
                {apparelItems.map((item, index) => (
                  <a
                    key={index}
                    href="#"
                    className="dropdown-item"
                  >
                    {item}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* New In Dropdown */}
          <div className="dropdown">
            <div
              onMouseEnter={() => handleMouseEnter('newIn')}
              onMouseLeave={handleMouseLeave}
            >
              <a href="#" className="navbar-link">
                New In
              </a>
            </div>
            {activeDropdown === 'newIn' && (
              <div
                ref={dropdownRef}
                onMouseEnter={() => handleMouseEnter('newIn')}
                onMouseLeave={handleMouseLeave}
                className="dropdown-menu"
              >
                {newInItems.map((item, index) => (
                  <a
                    key={index}
                    href="#"
                    className="dropdown-item"
                  >
                    {item}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Side Icons */}
        <div className="navbar-icons">
          <button className="icon-button">
            <Search size={20} />
          </button>
          <button className="icon-button relative" onClick={cartIconClickHandler}>
            <ShoppingCart size={20} />
            <span className="icon-badge">
              0
            </span>
          </button>
          <button className="icon-button" onClick={loginHandler}>
            <User size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Nav;