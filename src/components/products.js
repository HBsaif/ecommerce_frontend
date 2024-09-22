import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Products({ handleAddtoCart, handleAddtoWishlist }) {
  // State to hold product data and pagination details
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch products from the API with pagination
  const fetchProducts = async (page) => {
    try {
      const response = await axios.get(`http://localhost:8080/v1/api/products`, {
        params: { page: page - 1, size: 8 } // Adjust 'size' for items per page
      });

      // Assuming the response contains products and pagination info
      setProducts(response.data.content);  // 'content' is where products are in the API response
      setTotalPages(response.data.totalPages);  // Update the total pages
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Fetch products when the component mounts or when the page changes
  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  // Function to handle page change
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
              <div className="star">
                {/* Placeholder for star ratings */}
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <h4>${product.price}</h4>
            </div>
            <a href="#" onClick={() => handleAddtoCart(product)}>
              <i className="fal fa-shopping-cart cart"></i>
            </a>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="pagination d-flex justify-content-center">
        <button
          className="btn btn-secondary mx-2"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="align-self-center">Page {currentPage} of {totalPages}</span>
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
