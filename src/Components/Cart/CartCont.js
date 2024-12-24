import React, { useState,useEffect } from "react";
import EmptyCart from "./Empty/Empty";
import Nonempty from "./Non-Empty/Nonempty";
import Navbar from "../Navbar/Nav";
import Footer from "../Footer/Footer";
import ErrorCard from "../UI/Error";
import {useNavigate} from "react-router-dom";
function CartCont() {
    let navigate=useNavigate();
    let data=[];
    let todisplay=<EmptyCart/>;
    useEffect(()=>{
      //here we will fetch the cart details with cart id
      fetchCartItems();
    },[])

    async function fetchCartItems(){
      try {
        let response=await fetch('http://');
        if(!response.ok){
          throw new Error('Something went wrong'+response.status);
        }
        data=await response.json();
        
      } catch (error) {
        
      }
    }
    let NoProductinCart=0;
    if(NoProductinCart>0){
        todisplay=<Nonempty/>;
    }
  return(
    <div>
        <Navbar/>
        {/* {NoProductinCart==0&&<EmptyCart/>}
        {NoProductinCart>0&&<Nonempty/>} */}
        {todisplay} 
       
        <Footer/>
    </div>
  )
}
export default CartCont;
