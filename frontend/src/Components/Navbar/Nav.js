// src/Nav.js
import React, { useState, useRef, useEffect } from "react";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import './Nav.css';
import { API_BASE_URL } from "../../config";

function Nav() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);
  const isLoggedIn = !!localStorage.getItem('token');

  // Cart Counter Logic
  // State for cart count
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setCartCount(0);
      return;
    }
    try {
      // Assuming GET /cart returns the full cart, we count items
      // Or if there is a specific /cart/count endpoint, use that. 
      // Using /cart based on CartCont.js logic:
      const response = await fetch(`${API_BASE_URL}/cart`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success && data.cart && data.cart.items) {
        setCartCount(data.cart.items.length);
      } else {
        setCartCount(0);
      }
    } catch (err) {
      console.error("Failed to fetch cart count", err);
    }
  };

  useEffect(() => {
    updateCartCount(); // Fetch on mount

    const handleCartUpdate = () => {
      updateCartCount();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, [isLoggedIn]); // Re-run if login state 'conceptually' changes, though isLoggedIn computed var doesn't trigger effect by itself usually. 
  // Better to just depend on empty array as event listener handles updates, and maybe trigger on location change if we want. 

  const apparelItems = ["Topwear", "Bottomwear", "Accessories"];
  const newInItems = ["Latest Collection", "Seasonal Trends", "Limited Edition", "Bestsellers"];

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
                  {cartCount > 0 && <span className="icon-badge">{cartCount}</span>}
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
