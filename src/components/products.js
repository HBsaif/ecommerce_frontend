import { faInfoCircle, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiUrlList from "../util/apiUrlList"; // Import API URL from apiUrlList.js
import { axiosInstanceWithoutAuth } from "../util/axiosInstance"; // Use the customized Axios instance

function Products({ size = 8, categoryId, handleAddtoWishlist }) {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async (page) => {
    try {
      const response = await axiosInstanceWithoutAuth.get(
        apiUrlList.getProductsApiUrl, // Replace the hardcoded URL with loginApiUrl from apiUrlList.js
        {
          params: { page: page - 1, size: size, categoryId: categoryId }, // Pass categoryId as a parameter
        }
      );

      // Filter products to include only those with ACTIVE status
      const activeProducts = response.data.data.content.filter(
        (product) => product.status === "ACTIVE"
      );

      setProducts(activeProducts);
      setTotalPages(response.data.data.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage, categoryId]); // Fetch products again if categoryId changes

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <section id="product1" className="section-p1">
      <h2>Featured Products</h2>
      <p>Summer Collection New Modern Design</p>

      <div className="pro-container">
        {products.map((product) => (
          <div className="pro" key={product.id}>
            <img src="https://picsum.photos/id/1/200/200" alt={product.name} />
            <div className="des">
              <span>{product.brand}</span>
              <h5>{product.name}</h5>
              <div>
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
              </div>
              <h4>${product.price}</h4>
            </div>
            <Link to={`/product-details/${product.id}`}>
              <FontAwesomeIcon className="cart" icon={faInfoCircle} style={{ color: '#088178' }} />
            </Link>
          </div>
        ))}
      </div>

      <div className="pagination d-flex justify-content-center">
        <button
          className="btn btn-secondary mx-2"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="align-self-center">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-secondary mx-2"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </section>
  );
}

export default Products;
