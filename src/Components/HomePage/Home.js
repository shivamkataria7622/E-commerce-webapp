import React from 'react';
import Nav from "../Navbar/Nav";
import CollectionCont from '../Collection/CollectionCont.js';
import './Home.css';

function Home() {
  return (
    <div className='MaindivCont'>
    <div className="MainDiv">
      {/* Video Background */}
      <div className="VideoContainer">
        <video 
          className="VideoBackground" 
          src="https://cdn.shopify.com/videos/c/o/v/0a505ac42d1245a4bc60b79b15d8c86b.mp4" 
          autoPlay 
          loop 
          muted
        ></video>
      </div>

      {/* Navbar */}
      <div className="NavbarCont">
        <Nav />
      </div>

     
      {/* <div className="Content">
        <h1>Home Page</h1>
      </div> */}
      
    </div>
    <CollectionCont/>
    </div>
  );
}

export default Home;
