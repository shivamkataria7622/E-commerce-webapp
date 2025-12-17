import React from 'react';
import './Banner.css';

function Banner() {
  return (
    <div className="banner-container">
      {/* Wrapper to control animation */}
      <div className="banner-wrapper animate-scroll">
        {/* First Image */}
        <div className="banner-slide">
          <img
            src="https://cdn.shopify.com/s/files/1/0514/9494/4962/files/racing-club.jpg?v=1733907811"
            alt="Racing club"
            className="banner-image"
          />
        </div>
        {/* Second Image */}
        <div className="banner-slide">
          <img
            src="https://cdn.shopify.com/s/files/1/0514/9494/4962/files/center-winter-fw24.jpg?v=1732264049"
            alt="Racing club"
            className="banner-image"
          />
        </div>
      </div>
    </div>
  );
}

export default Banner;
