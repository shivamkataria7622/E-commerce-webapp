import React, { useState, useEffect } from "react";
import EmptyCart from "./Empty/Empty";
import Nonempty from "./Non-Empty/Nonempty";
import Navbar from "../Navbar/Nav";
import Footer from "../Footer/Footer";
import ErrorCard from "../UI/Error";
// import Loading from "../UI/Loading"; // Removed
import Skeleton from "../UI/Skeleton/Skeleton";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config";
import toast from 'react-hot-toast';

function CartCont() {
  let navigate = useNavigate();
  let [prevCart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    //here we will fetch the cart details with cart id
    fetchCartItems();
  }, [])



  async function fetchCartItems() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // navigate('/Login&Signup'); // Optional: redirect if not logged in
        return;
      }

      let response = await fetch(`${API_BASE_URL}/cart`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Something went wrong ' + response.status);
      }

      let data = await response.json();

      if (data.success && data.cart) {
        // Transform backend structure to flat structure for components
        const items = data.cart.items.map(item => ({
          key: item._id,
          id: item.productId._id, // Product ID
          itemId: item._id,       // Cart Item ID
          title: item.productId.title,
          price: item.price,
          image: item.productId.image,
          quantity: item.quantity,
          size: item.size,
          category: item.productId.category
        }));
        setCart(items);
      }

    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // Set loading to false after fetching (success or error)
    }
  }
  async function updateCartItem(itemId, newQuantity) {
    if (newQuantity < 1) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/cart/item/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ quantity: newQuantity })
      });
      const data = await response.json();
      if (data.success) {
        fetchCartItems(); // Reload cart
        window.dispatchEvent(new Event('cartUpdated'));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function removeFromCart(itemId) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/cart/item/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        fetchCartItems(); // Reload cart
        window.dispatchEvent(new Event('cartUpdated'));
        toast.success("Item removed from cart");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  let Todisplay;

  if (isLoading) {
    Todisplay = (
      <div className="cart-container" style={{ padding: '2rem' }}>
        {[...Array(3)].map((_, i) => (
          <div key={i} style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
            <Skeleton height="120px" width="120px" borderRadius="8px" />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Skeleton height="24px" width="40%" borderRadius="4px" />
              <Skeleton height="20px" width="20%" borderRadius="4px" />
              <div style={{ marginTop: 'auto', display: 'flex', gap: '1rem' }}>
                <Skeleton height="35px" width="100px" borderRadius="4px" />
                <Skeleton height="35px" width="80px" borderRadius="4px" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  } else if (prevCart.length === 0) {
    Todisplay = <EmptyCart />
  } else {
    Todisplay = <Nonempty
      Products={prevCart}
      updateQuantity={updateCartItem}
      removeFromCart={removeFromCart}
    />;
  }

  return (
    <div>
      <Navbar />
      {Todisplay}


      <Footer />
    </div>
  )
}
export default CartCont;
