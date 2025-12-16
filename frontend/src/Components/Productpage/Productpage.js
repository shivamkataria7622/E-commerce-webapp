import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import ErrorCard from '../UI/Error';
import Navbar from '../Navbar/Nav';
import Loading from '../UI/Loading';
import './Productpage.css';
import Footer from '../Footer/Footer';
import { API_BASE_URL } from "../../config";
import toast from 'react-hot-toast';

function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/products/${productId}`);
        if (!response.ok) throw new Error("Product not found");
        const data = await response.json();
        setProduct(data.product);
        // Set default size if available
        if (data.product.sizes && data.product.sizes.length > 0) {
          setSelectedSize(data.product.sizes[0]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleQuantityChange = (delta) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const addToCart = async (redirect = false) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("Please login to see product details");
      navigate('/Login&Signup');
      return;
    }

    try {
      const payload = {
        productId: product._id,
        quantity: quantity,
        size: selectedSize || 'M'
      };

      const response = await fetch(`${API_BASE_URL}/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok) {
        if (redirect) {
          navigate('/yourCart'); // Fixed route to match App.js
        } else {
          toast.success("Item added to cart!");
        }
      } else {
        toast.error(result.message || "Failed to add to cart");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error adding to cart");
    }
  };

  if (loading) return <Loading />;
  if (error) return <React.Fragment><Navbar /><div style={{ margin: '100px auto', textAlign: 'center' }}><ErrorCard message={error} /></div><Footer /></React.Fragment>;
  if (!product) return null;

  return (
    <React.Fragment>
      <Navbar />
      <div className="product-container product-container-md">

        {/* Left Column: Images */}
        <div className="image-container">
          <img
            src={product.image}
            alt={product.title}
            className="image-main"
          />
          {/* Thumbnails placeholder or real if array exists */}
          <div className="image-thumbnails">
            {product.images && product.images.length > 0 ? (
              product.images.map((img, idx) => (
                <img key={idx} src={img} alt="" className="image-thumbnail" />
              ))
            ) : (
              // Fallback thumbnails if none in DB, typically you'd hide this
              <>
                <img src={product.image} className="image-thumbnail" alt="" />
                <img src={product.image} className="image-thumbnail" alt="" />
                <img src={product.image} className="image-thumbnail" alt="" />
                <img src={product.image} className="image-thumbnail" alt="" />
              </>
            )}
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="product-info">
          <h1 className="product-title">{product.title}</h1>
          <p className="product-price">Rs. {product.price}</p>
          <p className="product-tax">Tax included. Shipping calculated at checkout.</p>

          <span className="product-section-label">Size</span>
          <div className="product-size-buttons">
            {product.sizes && product.sizes.length > 0 ? (
              product.sizes.map(size => (
                <button
                  key={size}
                  className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))
            ) : (
              ['S', 'M', 'L', 'XL'].map(size => (
                <button
                  key={size}
                  className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))
            )}
          </div>

          <span className="product-section-label">Quantity</span>
          <div className="quantity-wrapper">
            <button className="qty-btn" onClick={() => handleQuantityChange(-1)}>−</button>
            <span className="qty-display">{quantity}</span>
            <button className="qty-btn" onClick={() => handleQuantityChange(1)}>+</button>
          </div>

          <div className="product-actions">
            <button onClick={() => addToCart(false)} className="product-button-primary">
              Add to Cart
            </button>
            <button onClick={() => addToCart(true)} className="product-button-accent">
              Buy it Now
            </button>
          </div>

          <div className="payment-section">
            <p className="text-sm text-muted-foreground">Secure Checkout With</p>
            <div className="payment-icons">
              {/* Placeholders, ideally SVG components or stored assets */}
              <span>VISA</span>
              <span>Mastercard</span>
              <span>UPI</span>
            </div>
          </div>

          <div className="product-description">
            <p>{product.description}</p>
          </div>
        </div>

      </div>
      <Footer />
    </React.Fragment>
  );
}

export default ProductDetail;
