import React,{useState,useEffect} from 'react';
import Navbar from '../Navbar/Nav';
import { useParams } from "react-router-dom";
import './Productpage.css'; // Import the new CSS file
import Footer from '../Footer/Footer';
const buttonClasses = 'product-button';
const imageClasses = 'image-thumbnail';
const textClasses = 'text-sm font-medium';

function ProductDetail(){
  const { productId } = useParams();
  let [prevProduct,setProduct]=useState([]);
  
  async function call(){
    let response = await fetch(`https://fakestoreapi.com/products/${productId}`);
   let data = await response.json();
    setProduct(data);
  }
  
  
  useEffect(()=>{
    call();
  },[productId]);
  console.log(productId);



  return (
    <div>
      <Navbar/>
    <div className="product-container product-container-md">
      <div className="image-container">
        <img
          src={prevProduct.image}
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
        <h1 className="product-title">{prevProduct.title}</h1>
        <p className="product-price">Rs.{prevProduct.price}</p>
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
          {prevProduct.description}
        </p>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default ProductDetail;
