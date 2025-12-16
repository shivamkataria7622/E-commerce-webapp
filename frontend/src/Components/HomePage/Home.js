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
              src="https://cdn.shopify.com/videos/c/o/v/e7a211fec49e4737be811dcf07fe968a.mp4" 
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
        <CollectionCont />
      </div>
      <Footer />
    </div>
  );
}

export default Home;