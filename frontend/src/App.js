import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import Home from "./Components/HomePage/Home";
import Login from "./Components/UsersCredentials/Login";
//import Productcart from "./Components/Cart/Non-Empty/CartCard";
//import Footer from "./Components/Footer/Footer";
import Cart from "./Components/Cart/CartCont"
import Productpage from "./Components/Productpage/Productpage";
//import Signup from "./Components/UsersCredentials/Signup";
//import Loading from "./Components/UI/Loading";
//import Nav from "./Components/Navbar/Nav";



import AdminDashboard from "./Components/Admin/AdminDashboard";
import AddProduct from "./Components/Admin/AddProduct";
import Profile from "./Components/UsersCredentials/Profile";

function App() {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:productId" element={<Productpage />} />
          <Route path="/Login&Signup" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/yourCart" element={<Cart />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
