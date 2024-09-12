import axios from "axios";
import React, { useEffect, useState } from "react";
import '../components/css/test.css';

function TestPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/v1/api/products")
      .then(response => {
        if (response.data.status === "SUCCESS") {
          setProducts(response.data.data);
        }
      })
      .catch(error => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);

  return (
    <div id="product-container">
      {products.map((product) => (
        <div key={product.id} className="card">
          <div className="cardimage">
            <img
              src={product.imageUrl}
              alt={product.name}
            />
          </div>
          <div className="cardcontent">
            <div className="cardheader">
              <p className="productcode">Product Code: {product.id}</p>
              <p className="productrating">
                {/* Assuming rating exists */}
                4.5
                <img
                  src="https://img.icons8.com/?size=100&id=19417&format=png&color=000000"
                  alt="rating"
                />
              </p>
            </div>
            <p className="productname">{product.name}</p>
            <div className="productprice">
              <span className="discountedprice">${product.price}</span>
            </div>
          </div>
          <div className="cardbuttons">
            <button className="atc-btn" onClick={() => handleAddtoCart(product.name, product.id)}>
              <img src="https://img.icons8.com/?size=100&id=9720&format=png&color=000000" alt="cart" />
              Add to cart
            </button>
            <button className="wl-btn" onClick={() => handleAddtoWishlist(product.name, product.id)}>
              <img src="https://img.icons8.com/?size=100&id=19411&format=png&color=000000" alt="wishlist" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TestPage;

// Dummy handlers for buttons
const handleAddtoCart = (name, id) => {
  console.log(`Adding ${name} with id ${id} to cart`);
};

const handleAddtoWishlist = (name, id) => {
  console.log(`Adding ${name} with id ${id} to wishlist`);
};
