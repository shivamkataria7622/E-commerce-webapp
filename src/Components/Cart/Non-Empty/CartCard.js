import React from 'react';
import './Productcart.css'; // Importing the CSS file
import { RiDeleteBin6Line } from "react-icons/ri";
import Nonemptyfooter from './Nonemptyfooter';


const ProductCard = () => {
  return (
    <div className="card2">
      <div className="card2-header">
        <img
          src="https://placehold.co/100x100"
          alt="Riding Denim Pants"
          className="product-image"
        />
        <div className="product-details">
          <h2 className="product-title">01 Riding Denim Pants</h2>
          <p className="product-price">INR: 12,500.00</p>
          <p className="product-size">Size: 28</p>
        </div>
        <div className="quantity-controls">
          <button className="button decrement">−</button>
          <input type="number" value="1" className="quantity-input" />
          <button className="button increment">+</button>
          
        </div>
        <button className="button delete">
          <RiDeleteBin6Line />

          </button>
      </div>
     <Nonemptyfooter/>
    </div>
  );
};

export default ProductCard;
