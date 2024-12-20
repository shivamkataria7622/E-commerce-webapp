import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Components/HomePage/Home";
import Login from "./Components/UsersCredentials/Login";
import Footer from "./Components/Footer/Footer";
import Nonempty from "./Components/Cart/Nonempty";
import Nonemptyfooter from "./Components/Cart/Nonemptyfooter";
import Empty from "./Components/Cart/Empty";
import Nav from "./Components/Navbar/Nav";
import Productpage from "./Components/Productpage/Productpage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:productId" element={<Productpage/>}/>
        <Route path="Login/Signup" element={<Login/>}/>
        <Route path="YourCart" element={<Empty/>}/>

      </Routes>
       
    </Router>
    // <div>
    
    //   <Home/>
    //   {/* <Login/> */}
    //   {/* <Emptycart/> */}
    //   {/* <Productpage/> */}
    //   {/* <Empty/> */}
    //   {/* <Nonempty/> */}

    //   <Footer/>
    // </div>
  );
}

export default App;
