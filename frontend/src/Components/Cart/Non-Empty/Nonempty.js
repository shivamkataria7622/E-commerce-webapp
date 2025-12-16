import React from "react";
import "./Nonempty.css";
import ProductCardinCart from "./CartCard.js";
import toast from 'react-hot-toast';

function Nonempty(props) {
  // Calculate subtotal
  const subtotal = props.Products.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = 0; // Free shipping for now
  const total = subtotal + shipping;

  return (
    <div className="cart-page-container">
      <div className="cart-header">
        <h1>Your Cart</h1>
        <a href="/" className="continue-shopping">Continue Shopping</a>
      </div>

      <div className="cart-content">
        <div className="cart-items-section">
          <div className="cart-table-header">
            <span>Product</span>
            <span>Quantity</span>
            <span>Total</span>
          </div>
          {props.Products.map((product) => (
            <ProductCardinCart
              key={product.key}
              title={product.title}
              price={`Rs. ${product.price}`}
              image={product.image}
              quantity={product.quantity}
              size={product.size}
              id={product.itemId}
              updateQuantity={props.updateQuantity}
              removeFromCart={props.removeFromCart}
            />
          ))}
        </div>

        <div className="cart-summary-section">
          <h2 className="summary-title">Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>Rs. {subtotal}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : `Rs. ${shipping}`}</span>
          </div>
          <hr className="summary-divider" />
          <div className="summary-row total">
            <span>Total</span>
            <span>Rs. {total}</span>
          </div>
          <button className="checkout-btn" onClick={() => toast.success("Redirecting to payment gateway...")}>
            Cards Checkout
          </button>
          <p className="secure-text">Secure Checkout</p>
        </div>
      </div>
    </div>
  );
}

export default Nonempty;
