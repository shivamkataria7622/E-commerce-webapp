import React, { useState } from "react";
import EmptyCart from "./Empty/Empty";
import Nonempty from "./Non-Empty/Nonempty";
import Navbar from "../Navbar/Nav";
import Footer from "../Footer/Footer";
import ErrorCard from "../UI/Error";
import {useNavigate} from "react-router-dom";
function CartCont() {
    let navigate=useNavigate();
    let todisplay=<EmptyCart/>;
    
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
