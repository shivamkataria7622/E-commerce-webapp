import React from 'react';
import './Productcart.css'; // Importing the CSS file
import { RiDeleteBin6Line } from "react-icons/ri";
// import Nonemptyfooter from './Nonemptyfooter';


const ProductCard = (props) => {
  console.log(props.title);
  return (
    <div className="card2">
      <div className="card2-header">
        <img
          src={props.image}

          className="product-image"
        />
        <div className="product-details">
          <h2 className="product-title">{props.title}</h2>
          <p className="product-price">{props.price}</p>
          <p className="product-size">Size: 28</p>
        </div>
        <div className="quantity-controls">
          <button
            className="button decrement"
            onClick={() => props.updateQuantity(props.id, props.quantity - 1)}
          >
            −
          </button>
          <span className="quantity-input">{props.quantity}</span>
          <button
            className="button increment"
            onClick={() => props.updateQuantity(props.id, props.quantity + 1)}
          >
            +
          </button>

        </div>
        <button
          className="button delete"
          onClick={() => props.removeFromCart(props.id)}
        >
          <RiDeleteBin6Line />
        </button>
      </div>
      {/* <Nonemptyfooter/> */}
    </div>
  );
};

export default ProductCard;
