import React from 'react';
import './Card.css'; // Assuming you save the CSS file as Card1.css

function Card1() {
  return (
    <div className="card">
      <img  
        src="https://almostgods.com/wp-content/uploads/2024/12/Artboard-3-2.webp" 
        alt="Product" 
        className="card-image"
      />
      
      <div className="card-content">
        <h2 className="product-title">Recon Hoodie</h2>
        <p className="product-price">Rs 13999</p>
      </div>
    </div>
  );
}

export default Card1;