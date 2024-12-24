import React, { useState,useEffect } from "react";
import EmptyCart from "./Empty/Empty";
import Nonempty from "./Non-Empty/Nonempty";
import Navbar from "../Navbar/Nav";
import Footer from "../Footer/Footer";
import ErrorCard from "../UI/Error";
import {useNavigate} from "react-router-dom";
function CartCont() {
    let navigate=useNavigate();
    let [prevCart,setCart]=useState([]);
    useEffect(()=>{
      //here we will fetch the cart details with cart id
      fetchCartItems();
    },[])
    
   
    
    async function fetchCartItems(){
      
      let data;
      try {
        // for kartik db we have to set cart id in local storage or get request to get cart items
        let response=await fetch('https://react-test-server-97af1-default-rtdb.firebaseio.com/Products.json');
        if(!response.ok){
          throw new Error('Something went wrong'+response.status);
        }
        
        data=await response.json();
        
      } catch (error) {
        
      }
      let temp1 = [];
for (const key in data) {
  if (data.hasOwnProperty(key)) { // Ensure it's a direct property
    const item = data[key];
    
    
    temp1.push({
      key: key, // Include the key if needed
      ...item  // Spread operator to include all properties of the item
    });
  }
}

console.log(temp1); 

      setCart(temp1);
    }
    let Todisplay;

    if(prevCart.length==0){
      Todisplay=<EmptyCart/>  
    }
      else{
        Todisplay=<Nonempty Products={prevCart}/ >;
    }
    
  return(
    <div>
        <Navbar/>
        {/* {NoProductinCart==0&&<EmptyCart/>}
        {NoProductinCart>0&&<Nonempty image={prevCart.image} price={prevCart.price} title={prevCart.title}/> } */}
        {Todisplay} 
        
       
        <Footer/>
    </div>
  )
}
export default CartCont;
