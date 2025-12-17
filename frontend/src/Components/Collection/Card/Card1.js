import React from 'react';
import { useNavigate } from "react-router-dom";
import './Card.css'; // Assuming you save the CSS file as Card1.css

function Card1(props) {
  const navigate = useNavigate();

  function handleClick() {
    //console.log(props.price);
    //props.changeCart({price:props.price,id:props.id,imgsrc:props.imgsrc});

    navigate(`products/${props.id}`);

  }
  return (
    <div className="card1" onClick={handleClick} value={props.price}>
      <img
        src={props.imgsrc}
        alt="Product"
        className="card-image"
        onClick={handleClick} />

      <div className="card-content">
        <h2 className="product-tit" >{props.title}</h2>
        <p className="product-pri">Rs {props.price}</p>
      </div>
    </div>
  );
}

export default Card1;