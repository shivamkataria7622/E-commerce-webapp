import React from 'react';
import Nav from "../Navbar/Nav";
import CollectionCont from '../Collection/CollectionCont.js';
import './Home.css';
import Footer from '../Footer/Footer';

function Home() {
  return (
    <div>
    <div className='MaindivCont'>
    <div className="MainDiv">
      {/* Video Background */}
      <div className="VideoContainer">
        <video 
          className="VideoBackground" 
          src="https://cdn.shopify.com/videos/c/o/v/35277fd59fb54ff08c9256506133350c.mp4#t=0.1" 
          autoPlay 
          loop 
          muted
        ></video>
      </div>

      {/* Navbar */}
      <div className="NavbarCont">
        <Nav />
      </div>
    </div>
    <CollectionCont/>
    </div>
    <Footer/>
    </div>
  );
}

export default Home;
