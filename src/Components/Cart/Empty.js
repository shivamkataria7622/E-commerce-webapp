import React from 'react'
import './Empty.css'

function Empty() {
  return (
    <div className='Empty'>
        <h1>Your Cart is empty</h1>

        <p>Looks like you haven't added anything to your cart yet.</p>

        <div className='button'>
            <button>Order Now</button>
        </div>
    </div>
  )
}

export default Empty