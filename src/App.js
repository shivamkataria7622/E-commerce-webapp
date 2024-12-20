import React from "react";
import Home from "./Components/HomePage/Home";
import Login from "./Components/UsersCredentials/Login";
import Footer from "./Components/Footer/Footer";
import Nonempty from "./Components/Cart/Nonempty";
import Empty from "./Components/Cart/Empty";
import Nav from "./Components/Navbar/Nav";

function App() {
  return (
    <div>
      <Nav/>
      {/* <Home/> */}
      {/* <Login/> */}
      {/* <Emptycart/> */}
      {/* <Productpage/> */}
      <Empty/>
      {/* <Nonempty/> */}
      <Footer/>
    </div>
  );
}

export default App;
