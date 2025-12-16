import React from 'react';

function Banner() {
  return (
    <div className="h-full w-full overflow-hidden">
      {/* Wrapper to control animation */}
      <div className="flex w-[200%] animate-scroll hover:pause">
        {/* First Image */}
        <div className="w-1/2 flex-shrink-0">
          <img 
            src="https://cdn.shopify.com/s/files/1/0514/9494/4962/files/racing-club.jpg?v=1733907811" 
            alt="Racing club"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Second Image */}
        <div className="w-1/2 flex-shrink-0">
          <img 
            src="https://cdn.shopify.com/s/files/1/0514/9494/4962/files/center-winter-fw24.jpg?v=1732264049" 
            alt="Racing club"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 18s linear infinite;
        }

        .hover\:pause:hover {
          animation-play-state: paused;
        }

        /* Media Queries for Responsive Design */
        @media (max-width: 768px) { /* Tablets */
          .h-[800px] {
            height: 500px; /* Adjust height for tablets */
          }
          .animate-scroll {
            animation-duration: 12s; /* Faster animation for tablets */
          }
        }

        @media (max-width: 480px) { /* Mobile Phones */
          .h-[800px] {
            height: 300px; /* Adjust height for mobile phones */
          }
          .animate-scroll {
            animation-duration: 8s; /* Faster animation for mobile phones */
          }
        }
      `}</style>
    </div>
  );
}

export default Banner;