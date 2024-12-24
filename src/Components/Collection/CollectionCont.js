import React, { useState,useEffect } from "react";
import "./CollectionCont.css";
import Card1 from "./Card/Card1.js";
import Loading from "../UI/Loading.js";
import ErrorCard from "../UI/Error.js";
// let Collections = [
//   { id: Math.random().toString(), title: "Jeans", price: 700 },
//   { id: Math.random().toString(), title: "Tshirt", price: 500 },
//   { id: Math.random().toString(), title: "Pajama", price: 300 },
//   { id: Math.random().toString(), title: "Cargo", price: 1000 },
// ];
let Products=[];

let imageurl =
  "https://bluorng.com/cdn/shop/files/DSC04337copy.jpg?v=1729680499&width=720";
function CollectionContainer() {
  
  const [prevAmount, setAmount] = useState(0);
  let [prevCollections,setCollections]=useState([]);
  let [prevIsLoading,setIsLoading]=useState(false);
  let [prevCollectionsInCart, setCollectionsInCart] = useState([{}]);
  let [prevError,setError]=useState(null);
  
  useEffect(()=>{
    fetchProducts();
  },[])

  async function fetchProducts(){ 
    setIsLoading(true);
    setError(null);
    try{
       let resposne=await fetch('https://fakestoreapi.com/products');
      // let resposne=await fetch('http://172.16.112.40:8000/store/products/');
      if(!resposne.ok){
        throw new Error('Something went wrong'+resposne.status);
      }
      Products=await resposne.json();
      setCollections(Products);
      //console.log(Products);
    }catch(error){
      setError(error.message);
      
  }
  setIsLoading(false);
}
  function addtoCartHandler(event) {
    setAmount(prevAmount + event.price);
    console.log(prevAmount);
    let tempArr=[...prevCollectionsInCart,{
      id:event.id,
      price:event.price,
      imgsrc:event.imgsrc
    }]
    setCollectionsInCart(tempArr);
    console.log(prevCollectionsInCart);
  }
 
  
  return (
    <div className="collection-container">
      {prevIsLoading && <Loading />}
      {!prevIsLoading&&prevCollections.length>0&&prevCollections.map((tempObj) => (
        <Card1
          // id={tempObj.slug}
          id={tempObj.id}
          title={tempObj.title}
          price={tempObj.price}
          imgsrc={tempObj.image}
          changeCart={addtoCartHandler}
        />
      ))}
      {!prevIsLoading&&prevError&&<p><ErrorCard message={prevError}></ErrorCard></p>}
    </div>
  );
}

export default CollectionContainer;
