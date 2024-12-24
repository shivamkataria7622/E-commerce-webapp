import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Components/HomePage/Home";
import Login from "./Components/UsersCredentials/Login";
import Productcart from "./Components/Cart/Non-Empty/CartCard";
import Footer from "./Components/Footer/Footer";
import Cart from "./Components/Cart/CartCont"
import Productpage from "./Components/Productpage/Productpage";
import Signup from "./Components/UsersCredentials/Signup";
import Loading from "./Components/UI/Loading";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/products/:productId" element={<Productpage />} />
        <Route path="/Login&Signup" element={<Login />} />
        <Route path="/yourCart" element={<Cart/>} />
      </Routes>
    </Router>
  );
}

export default App;
