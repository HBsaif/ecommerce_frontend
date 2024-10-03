import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../components/css/test.css";
import axiosInstance, { axiosInstanceWithoutAuth } from "../util/axiosInstance"; // Use your custom axios instance

function Details() {
  const { productId } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // State for quantity
  const [error, setError] = useState(null); // State for error handling
  const [userId, setUserId] = useState(null); // State to hold user ID

  const addToCart = async (userId, productId, quantity) => {
    try {
      console.log("User ID: ", userId)
      const response = await axiosInstance.post("/api/cart/add-item", {
        userId, // Include userId in the request
        productId,
        quantity,
      });
      return response.data; // Return the response data
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error; // Rethrow the error to be handled in the component
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstanceWithoutAuth.get(
          `/api/products/${productId}`
        );
        if (response.data.status === "SUCCESS") {
          setProduct(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [productId]);


  useEffect(() => {
  const fetchUserId = async () => {
    const email = localStorage.getItem("email"); // Replace with the actual user's email, or retrieve from state/local storage
    try {
      const response = await axiosInstance.get(
        `/users/id?email=${email}`
      );
      if (response.data.status === "SUCCESS") {
        setUserId(response.data.data); // Set user ID from response
      }
    } catch (error) {
      console.error("Error fetching user ID:", error);
    }
  };

  fetchUserId();
}, [userId]);

  const handleAddToCart = async () => {
    // Retrieve userId from local storage
    if (!userId) {
      alert("User not logged in. Please log in to add items to the cart.");
      return;
    }
    try {
      const response = await addToCart(userId, productId, quantity); // Pass userId to addToCart
      if (response.status === "SUCCESS") {
        alert("Product added to cart!");
      }
    } catch (error) {
      setError("Failed to add product to cart. Please try again.");
    }
  };

  if (!product) {
    return <div>Loading...</div>; // Optionally handle loading state
  }

  return (
    <section className="py-5 prod-details-wrap">
      <div className="container">
        <div className="row gx-5">
          <aside className="col-lg-6">
            <div className="border rounded-4 mb-3 d-flex justify-content-center">
              <a
                data-fslightbox="mygalley"
                className="rounded-4"
                target="_blank"
                data-type="image"
                // href={product.imageUrl} // Corrected to use the image URL
                href="https://picsum.photos/id/18/500/500"
                rel="noreferrer"
              >
                <img
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100vh",
                    margin: "auto",
                  }}
                  className="rounded-4 fit"
                  // src={product.imageUrl} // Use the product image URL
                  src="https://picsum.photos/id/18/500/500"
                  alt={product.name}
                />
              </a>
            </div>
          </aside>
          <main className="col-lg-6">
            <div className="ps-lg-3">
              <h4 className="title text-dark">{product.name}</h4>
              <div className="d-flex flex-row my-3">
                <div className="text-warning mb-1 me-2">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fas fa-star-half-alt"></i>
                  <span className="ms-1">4.5</span>
                </div>
                <span className="text-muted">
                  <i className="fas fa-shopping-basket fa-sm mx-1"></i>154
                  orders
                </span>
                <span className="text-success ms-2">In stock</span>
              </div>
              <div className="mb-3">
                <span className="h5">${product.price}</span>
                <span className="text-muted">/per item</span>
              </div>
              <p>{product.description}</p>
              {error && <div className="text-danger">{error}</div>}{" "}
              {/* Error message display */}
              <hr />
              <div className="row mb-4">
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="form-control w-25 me-2"
                />
                <button
                  type="button"
                  className="btn btn-warning shadow-0 action-btn"
                  onClick={handleAddToCart}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}

export default Details;
