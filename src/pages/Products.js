import axios from "axios";
import React, { useEffect, useState } from "react";
import '../components/css/productCard.css';
import ProductCard from "../components/productCard";

function Products() {
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
  
    const handleAddtoCart = (name, id) => {
      console.log(`Adding ${name} with id ${id} to cart`);
    };
  
    const handleAddtoWishlist = (name, id) => {
      console.log(`Adding ${name} with id ${id} to wishlist`);
    };
  
    return (
      <div id="product-container">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            handleAddtoCart={handleAddtoCart}
            handleAddtoWishlist={handleAddtoWishlist}
          />
        ))}
      </div>
    );
  }
  
  export default Products;