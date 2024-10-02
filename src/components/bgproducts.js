import {
  faChevronDown,
  faChevronUp,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance, { axiosInstanceWithoutAuth } from "../util/axiosInstance";

const BGProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    stockQuantity: "",
    categoryId: "",
    imageUrl: "",
    status: "ACTIVE",
  });

  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const itemsPerPage = 10; // Products per page
  const [expandedProductId, setExpandedProductId] = useState(null); // Track which product is expanded

  // Fetch paginated products
  const fetchProducts = async (page) => {
    try {
      const response = await axiosInstanceWithoutAuth.get(
        `/api/products?page=${page - 1}&size=${itemsPerPage}`
      );
      if (response.data.status === "SUCCESS") {
        setProducts(response.data.data.content);
        setTotalPages(response.data.data.totalPages); // Set total pages
      } else {
        toast.error("Error fetching products.");
      }
    } catch (error) {
      toast.error("Error fetching products.");
      console.error(error);
    }
  };

  // Fetch all categories for dropdown
  const fetchCategories = async () => {
    try {
      const response = await axiosInstanceWithoutAuth.get("/api/categories");
      if (response.data.status === "SUCCESS") {
        setCategories(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error fetching categories.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage); // Fetch products on page load
    fetchCategories();
  }, [currentPage]); // Refetch products when the page changes

  // Handle product submission (add or update)
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = selectedProduct
      ? `/api/products/update/${selectedProduct.id}`
      : `/api/products/add-product`;

    const requestBody = {
      name: newProduct.name,
      description: newProduct.description,
      price: newProduct.price,
      stockQuantity: newProduct.stockQuantity,
      category: {
        id: newProduct.categoryId,
      },
      imageUrl: newProduct.imageUrl,
      status: newProduct.status,
    };

    toast
      .promise(axiosInstance.post(apiUrl, requestBody), {
        loading: selectedProduct ? "Updating product..." : "Adding product...",
        success: selectedProduct
          ? "Product updated successfully!"
          : "Product added successfully!",
        error: "Error saving product.",
      })
      .then(() => {
        setSelectedProduct(null);
        setNewProduct({
          name: "",
          description: "",
          price: "",
          stockQuantity: "",
          categoryId: "",
          imageUrl: "",
          status: "ACTIVE",
        });
        fetchProducts(currentPage); // Refresh products after submission
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Handle delete product
  const handleDeleteProduct = async (id) => {
    toast
      .promise(axiosInstance.post(`/api/products/delete/${id}`), {
        loading: "Deleting product...",
        success: "Product deleted successfully!",
        error: "Error deleting product.",
      })
      .then(() => {
        fetchProducts(currentPage); // Refresh products after deletion
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Handle edit product
  const handleEditProduct = (product) => {
    setSelectedProduct(product);

    // Check if the product has a category and set the categoryId appropriately
    setNewProduct({
      name: product.name,
      description: product.description,
      price: product.price,
      stockQuantity: product.stockQuantity,
      categoryId: product.category ? product.category.id : "", // Use product.category.id if exists
      imageUrl: product.imageUrl,
      status: product.status,
    });
  };

  // Handle pagination
  const handlePageChange = (page) => {
    if (page >= 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Helper function to get category name by ID
  const getCategoryNameById = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "N/A";
  };

  // Toggle expandable details
  const toggleExpand = (productId) => {
    setExpandedProductId(expandedProductId === productId ? null : productId);
  };

  const toggleProductStatus = async (product) => {
    const updatedStatus = product.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";

    // Create request body by keeping all other data unchanged but modifying the status
    const updatedProduct = {
      ...product, // Keep other data unchanged
      status: updatedStatus,
      category: {
        id: product.categoryId, // Include the category as an object
      },
    };

    toast
      .promise(
        axiosInstance.post(
          `/api/products/update/${product.id}`,
          updatedProduct
        ),
        {
          loading: "Updating product status...",
          success: `Product status updated to ${updatedStatus} successfully!`,
          error: "Error updating product status.",
        }
      )
      .then(() => {
        fetchProducts(currentPage); // Refresh the product list
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="bg-categories">
      <h2>Products</h2>

      <div className="category-form">
        <form onSubmit={handleProductSubmit}>
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            required
          />
          <input
            type="number"
            placeholder="Stock Quantity"
            value={newProduct.stockQuantity}
            onChange={(e) =>
              setNewProduct({ ...newProduct, stockQuantity: e.target.value })
            }
            required
          />

          {/* Category Dropdown */}
          <select
            value={newProduct.categoryId}
            onChange={(e) =>
              setNewProduct({ ...newProduct, categoryId: e.target.value })
            }
            required
          >
            <option value="" disabled>
              Select Category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Image URL"
            value={newProduct.imageUrl}
            onChange={(e) =>
              setNewProduct({ ...newProduct, imageUrl: e.target.value })
            }
          />

          <button type="submit">
            {selectedProduct ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>

      <table className="product-table category-actions">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products && products.length > 0 ? (
            products.map((product) => (
              <React.Fragment key={product.id}>
                <tr>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>${product.price}</td>
                  <td>{product.stockQuantity}</td>
                  <td>{getCategoryNameById(product.categoryId)}</td>
                  <td>
                    <div className="inline-buttons">
                      {/* Toggle Button for Status */}
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={product.status === "ACTIVE"}
                          onChange={() => toggleProductStatus(product)}
                        />
                        <span className="slider round"></span>
                      </label>

                      <button
                        onClick={() => handleEditProduct(product)}
                        className="edit-btn"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="delete-btn"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                      <button
                        onClick={() => toggleExpand(product.id)}
                        className="expand-btn"
                      >
                        <FontAwesomeIcon
                          icon={
                            expandedProductId === product.id
                              ? faChevronUp
                              : faChevronDown
                          }
                        />
                      </button>
                    </div>
                  </td>
                </tr>
                {expandedProductId === product.id && (
                  <tr>
                    <td colSpan={8}>
                      <div>
                        <p>
                          <strong>Image:</strong>
                          <img
                            // src={product.imageUrl}
                            src="https://picsum.photos/id/11/200/200"
                            alt="Product"
                            style={{ width: "100px", height: "100px" }}
                          />
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan={8}>No products available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
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
    </div>
  );
};

export default BGProducts;
