import React,{useState,useEffect} from 'react';
import { useParams } from "react-router-dom";
import ErrorCard from '../UI/Error';
import Navbar from '../Navbar/Nav';
import Loading from '../UI/Loading';
import './Productpage.css'; // Import the new CSS file
import Footer from '../Footer/Footer';
const buttonClasses = 'product-button';
const imageClasses = 'image-thumbnail';
const textClasses = 'text-sm font-medium';

function ProductDetail(){
  let cartid;
  const { productId } = useParams();
  let [prevProduct,setProduct]=useState([]);
  let [prevIsLoading,setIsLoading]=useState(false);
  let [prevError,setError]=useState(null);
  const [cartid1, setCartId] = useState(null);
  // async function call1() {
  //   const response = await fetch('http://172.16.112.40:8000/store/carts/', { method: 'POST' });
  //   const data = await response.json();
  //   setCartId(data.id);
  //}
  

  async function call(){
    setError(null);
    setIsLoading(true);
    try {
      // let response = await fetch(`http://172.16.112.40:8000/store/products/${productId}`);
      let response=await fetch(`https://fakestoreapi.com/products/${productId}`);
      if (!response.ok) {
        throw new Error("Lund lagaye"+response.status);
      }
      let data = await response.json();
      setProduct(data);
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
    console.log(prevProduct);
    setIsLoading(false);
  }
  
  async function addtoCartHandler(){
    try {
      console.log(prevProduct);
      let tosend={product_id:prevProduct.id,quantity:1,size:3};
      console.log(JSON.stringify(tosend));
      let response=await fetch(`http://172.16.112.40:8000/store/carts/${cartid1}/items/`,{
        method:'POST',
        body:JSON.stringify(tosend),
        headers: {
          'Content-Type': 'application/json'
        }
       })
       console.log(response);
    } catch (error) {
      
    }
  }
  useEffect(()=>{
    call();
  },[productId]);
  // useEffect(()=>{
  //   call1();
  // },[productId])
  // console.log(productId);



  return (
    
    <React.Fragment>
      <Navbar/>
      {prevIsLoading && <Loading/>}
      {!prevIsLoading && !prevError && Object.keys(prevProduct).length > 0 && (
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
            <button onClick={addtoCartHandler}className="product-button-primary">Add to cart</button>
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
      )}
    {!prevIsLoading&&prevError&&<p><ErrorCard message='Your product will apear here'></ErrorCard></p>}
    
    <Footer/>
    </React.Fragment>
  );
};

export default ProductDetail;
