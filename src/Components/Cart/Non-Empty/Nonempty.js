import React, { useState } from "react";
import "./Nonempty.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import ProductCardinCart from "./CartCard.js";

function Nonempty(props) {
  return (
    <div>
      <div className="Nonempty">
        <h1>Your Cart</h1>
        <a href="/shop">
          <h1>Continue Shopping</h1>
        </a>
      </div>

      <div className="final">
      {props.Products.map((product) => (
        <div key={product.key}>
          <h2>{product.title}</h2>
          <p>Price: {product.price}</p>
          <p>Category: {product.category}</p>
          <img src={product.image} alt={product.title} />
          </div>
      ))}

      </div>
    </div>
  );
}

export default Nonempty;
