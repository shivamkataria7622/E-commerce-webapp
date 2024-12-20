import React from 'react';
import './Productpage.css'; // Import the new CSS file

const buttonClasses = 'product-button';
const imageClasses = 'image-thumbnail';
const textClasses = 'text-sm font-medium';

const ProductDetail = () => {
  return (
    <div className="product-container product-container-md">
      <div className="image-container">
        <img
          src="https://warpingtheories.com/cdn/shop/files/WarpingTheorie_20240359.jpg?v=1727330397&width=493"
          alt="Couched Floral Shirt"
          className="image-main"
        />
        <div className="image-thumbnails">
          <img
            src="https://openui.fly.dev/openui/200x200.svg?text=Image1"
            alt="Image 1"
            className={imageClasses}
          />
          <img
            src="https://openui.fly.dev/openui/200x200.svg?text=Image2"
            alt="Image 2"
            className={imageClasses}
          />
          <img
            src="https://openui.fly.dev/openui/200x200.svg?text=Image3"
            alt="Image 3"
            className={imageClasses}
          />
           <img
            src="https://openui.fly.dev/openui/200x200.svg?text=Image3"
            alt="Image 3"
            className={imageClasses}
          />
        </div>
      </div>

      <div className="product-info">
        <h1 className="product-title">COUCHED FLORAL SHIRT</h1>
        <p className="product-price">Rs. 6,990.00</p>
        <p className="product-tax">Tax included. Shipping calculated at checkout.</p>

        
        <div className="product-size">
          <label className={textClasses}>SIZE</label>
          <div className="flex space-x-2">
            <button className={buttonClasses}>S</button>
            <button className={buttonClasses}>M</button>
            <button className={buttonClasses}>L</button>
            <button className={buttonClasses}>XL</button>
            <button className={buttonClasses}>XXL</button>
          </div>
        </div>
        <div className="product-material">
          <label className={textClasses}>MATERIAL</label>
          <button className={buttonClasses}>POLYESTER COTTON</button>
        </div>
        <div className="product-quantity">
          <label className={textClasses}>Quantity</label>
          <div className="count">
            <button className="">-</button>
            <span className="text-lg">1</span>
            <button className="">+</button>
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <button className="product-button-primary">Add to cart</button>
          <button className="product-button-accent">Buy it now</button>
        </div>

        <div className="mt-4">
          <p className="text-sm text-muted-foreground">Secure Checkout With</p>
          <div className="payment-icons">
            <img
              src="https://openui.fly.dev/openui/24x24.svg?text=Mastercard"
              alt="Mastercard"
              className="h-6"
            />
            <img src="https://openui.fly.dev/openui/24x24.svg?text=RuPay" alt="RuPay" className="h-6" />
          </div>
        </div>

        <p className="product-description">
          Cotton-polyester blended shirt crafted with cut&sew panels and tonal thread tacks. The
          couched flower patchwork is featured in...
          lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut  
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          
        </p>
      </div>
    </div>
  );
};

export default ProductDetail;
