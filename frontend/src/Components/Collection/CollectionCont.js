import React, { useState, useEffect } from "react";
import "./CollectionCont.css";
import Card1 from "./Card/Card1.js";
import Loading from "../UI/Loading.js";
import ErrorCard from "../UI/Error.js";
import Banner from "./Banner.js";
// import axios from "axios";
import { API_BASE_URL } from "../../config";

import { useLocation } from "react-router-dom";

let hardcodedProducts = [
  { id: Math.random().toString(), title: "Jeans", price: 700, image: "https://bluorng.com/cdn/shop/files/BACK.jpg?v=1735826679&width=823" },
  // Add more hardcoded products here...
];

function CollectionContainer() {
  const [prevAmount, setAmount] = useState(0);
  const [prevCollections, setCollections] = useState([]);
  const [filteredCollections, setFilteredCollections] = useState([]);
  const [prevError, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();

  async function fetchCollection() {
    try {
      setError(null);
      setCollections([]);
      setAmount(0);
      setIsLoading(true);
      let response = await fetch(`${API_BASE_URL}/products`);
      let data = await response.json();
      setCollections(data.products || []);
      setFilteredCollections(data.products || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchCollection();
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('search');

    if (query && prevCollections.length > 0) {
      const lowerQuery = query.toLowerCase();
      const filtered = prevCollections.filter(product =>
        product.title.toLowerCase().includes(lowerQuery) ||
        (product.category && product.category.toLowerCase().includes(lowerQuery))
      );
      setFilteredCollections(filtered);
    } else {
      setFilteredCollections(prevCollections);
    }
  }, [location.search, prevCollections]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="collection-container">
      {filteredCollections.length > 0 ? (
        filteredCollections.map((tempObj) => (
          <Card1
            key={tempObj._id}
            id={tempObj._id}
            title={tempObj.title}
            price={tempObj.price}
            imgsrc={tempObj.image}
          />
        ))
      ) : (
        <div className="w-full text-center p-10">
          <p className="text-xl">No products found.</p>
        </div>
      )}

      {/* Banner after 4 products */}
      <div className="w-full">
        <Banner />
      </div>

      {prevError && <ErrorCard message={prevError} />} {/* Show error card if error occurs */}
    </div>
  );
}

export default CollectionContainer;
