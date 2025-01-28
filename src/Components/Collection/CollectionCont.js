import React, { useState } from "react";
import "./CollectionCont.css";
import Card1 from "./Card/Card1.js";
import Loading from "../UI/Loading.js";
import ErrorCard from "../UI/Error.js";
import Banner from "./Banner.js";

let hardcodedProducts = [
  { id: Math.random().toString(), title: "Jeans", price: 700, image: "https://bluorng.com/cdn/shop/files/BACK.jpg?v=1735826679&width=823" },
  { id: Math.random().toString(), title: "Jeans", price: 700, image: "https://bluorng.com/cdn/shop/files/Untitled-1front.jpg?v=1736147725&width=1946" },
  { id: Math.random().toString(), title: "Jeans", price: 700, image: "https://bluorng.com/cdn/shop/files/BACK.jpg?v=1735826679&width=823" },
  { id: Math.random().toString(), title: "Jeans", price: 700, image: "https://bluorng.com/cdn/shop/files/Untitled-1front.jpg?v=1736147725&width=1946" },
  { id: Math.random().toString(), title: "Jeans", price: 700, image: "https://bluorng.com/cdn/shop/files/BACK.jpg?v=1735826679&width=823" },
  { id: Math.random().toString(), title: "Jeans", price: 700, image: "https://bluorng.com/cdn/shop/files/Untitled-1front.jpg?v=1736147725&width=1946" },
  { id: Math.random().toString(), title: "Jeans", price: 700, image: "https://bluorng.com/cdn/shop/files/BACK.jpg?v=1735826679&width=823" },
  { id: Math.random().toString(), title: "Jeans", price: 700, image: "https://bluorng.com/cdn/shop/files/BACK.jpg?v=1735826679&width=823" },
  { id: Math.random().toString(), title: "Jeans", price: 700, image: "https://bluorng.com/cdn/shop/files/BACK.jpg?v=1735826679&width=823" },
  { id: Math.random().toString(), title: "Jeans", price: 700, image: "https://bluorng.com/cdn/shop/files/BACK.jpg?v=1735826679&width=823" },
  { id: Math.random().toString(), title: "Jeans", price: 700, image: "https://bluorng.com/cdn/shop/files/BACK.jpg?v=1735826679&width=823" },
  { id: Math.random().toString(), title: "Jeans", price: 700, image: "https://bluorng.com/cdn/shop/files/BACK.jpg?v=1735826679&width=823" },
];

function CollectionContainer() {
  const [prevAmount, setAmount] = useState(0);
  const [prevCollections, setCollections] = useState(hardcodedProducts);
  const [prevCollectionsInCart, setCollectionsInCart] = useState([]);
  const [prevError, setError] = useState(null);
  
  function addtoCartHandler(event) {
    setAmount((prevAmount) => prevAmount + event.price);
    let tempArr = [
      ...prevCollectionsInCart,
      { id: event.id, price: event.price, imgsrc: event.imgsrc },
    ];
    setCollectionsInCart(tempArr);
  }
  
  return (
    <div className="collection-container">
      {/* First 4 products */}
      {prevCollections.slice(0, 4).map((tempObj) => (
        <Card1
          key={tempObj.id}
          id={tempObj.id}
          title={tempObj.title}
          price={tempObj.price}
          imgsrc={tempObj.image}
          changeCart={addtoCartHandler}
        />
      ))}
      
      {/* Banner after 4 products */}
      <div className="w-full">
        <Banner />
      </div>
      
      {/* Remaining products */}
      {prevCollections.slice(4).map((tempObj) => (
        <Card1
          key={tempObj.id}
          id={tempObj.id}
          title={tempObj.title}
          price={tempObj.price}
          imgsrc={tempObj.image}
          changeCart={addtoCartHandler}
        />
      ))}
      
      {prevError && <p><ErrorCard message={prevError}></ErrorCard></p>}
    </div>
  );
}

export default CollectionContainer;