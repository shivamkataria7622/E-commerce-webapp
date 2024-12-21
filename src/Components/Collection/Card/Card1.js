import React from 'react';
import { useNavigate } from "react-router-dom";
import './Card.css'; // Assuming you save the CSS file as Card1.css

function Card1(props) {
  const navigate = useNavigate();
  let renderColor='green';
  if(props.price>500){
    renderColor='red';
  }
  function handleClick() {
    //console.log(props.price);
    //props.changeCart({price:props.price,id:props.id,imgsrc:props.imgsrc});

    navigate(`product/${props.id}`);

  }
  return (
    <div className="card" onClick={handleClick} value={props.price}>
      <img  
        src={props.imgsrc} 
        alt="Product" 
        className="card-image"
       onClick={handleClick}/>
      
      <div className="card-content">
        <h2 className="product-title" style={{color:renderColor }}>{props.title}</h2>
        <p className="product-price">Rs {props.price}</p>
        <p>{props.id}</p>
      </div>
    </div>
  );
}

export default Card1;