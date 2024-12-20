import React, { useState } from 'react';
import './Nonempty.css';
import { RiDeleteBin6Line } from "react-icons/ri";
import ProductCard from './Productcart.js';


function Nonempty() {
 
  return (
    <div>
      <div className='Nonempty'>
        <h1>Your Cart</h1>
        <a href="/shop"><h1>Continue Shopping</h1></a>     
      </div>
      
      <div className='final'>
       <ProductCard/>
      </div>
    </div>
  );
}

export default Nonempty;