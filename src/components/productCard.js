import React from "react";
import '../components/css/productCard.css';

// Component for individual product card
function ProductCard({ product, handleAddtoCart, handleAddtoWishlist }) {
  return (
    <div className="card">
      <div className="cardimage">
        <img
        //   src={product.imageUrl}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq_DKLhDobZrd4Ou7wqBOJv41-Ga-iG_1Keg&s"
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
  );
}

export default ProductCard;
