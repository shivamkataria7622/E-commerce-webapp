import React from 'react'
import './Nonemptyfooter.css'

function Nonemptyfooter() {
  return (
    <div>
       <div className="card-footer">
        <div className="subtotal">
          <span className="subtotal-label">Subtotal</span>
          <span className="subtotal-value">INR: 12,500.00</span>
        </div>
        <p className="tax-info">
          Tax included. <a href="#shipping" className="link">Shipping</a> calculated at checkout.
        </p>
        <button className="checkout-button">Check out</button>
      </div>
    </div>
  )
}

export default Nonemptyfooter
