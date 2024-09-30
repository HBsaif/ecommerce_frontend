import React, { useEffect, useState } from "react";
import toast from "react-hot-toast"; // Import toast and Toaster
import axiosInstance, { axiosInstanceWithoutAuth } from "../util/axiosInstance";

const BGProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // State for categories
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    stockQuantity: "",
    categoryId: null,
    imageUrl: "",
    status: "ACTIVE",
  });

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await axiosInstanceWithoutAuth.get("/api/products?page=1&size=3");
      if (response.data.status === "SUCCESS") {
        setProducts(response.data.data.content); // Use the content array
      } else {
        toast.error(response.data.message); // Show error toast
      }
    } catch (error) {
      toast.error("Error fetching products."); // Show error toast
      console.error(error);
    }
  };

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const response = await axiosInstanceWithoutAuth.get("/api/categories");
      if (response.data.status === "SUCCESS") {
        setCategories(response.data.data); // Set categories
      } else {
        toast.error(response.data.message); // Show error toast
      }
    } catch (error) {
      toast.error("Error fetching categories."); // Show error toast
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories(); // Fetch categories when component mounts
  }, []);

  // Handle product submission (add or update)
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = selectedProduct
      ? `/api/products/update/${selectedProduct.id}`
      : `/api/products/add-product`;

    toast.promise(
      axiosInstance.post(apiUrl, newProduct)
        .then((response) => {
          setSelectedProduct(null);
          setNewProduct({ name: "", description: "", price: "", stockQuantity: "", categoryId: null, imageUrl: "", status: "ACTIVE" });
          fetchProducts(); // Refresh products
        }),
      {
        loading: selectedProduct ? "Updating product..." : "Adding product...",
        success: "Product saved successfully!",
        error: "Error saving product.",
      }
    );
  };

  // Handle delete product
  const handleDeleteProduct = async (id) => {
    toast.promise(
      axiosInstance.post(`/api/products/delete/${id}`)
        .then((response) => {
          fetchProducts(); // Refresh products
        }),
      {
        loading: "Deleting product...",
        success: "Product deleted successfully!",
        error: "Error deleting product.",
      }
    );
  };

  // Handle edit product
  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setNewProduct({
      name: product.name,
      description: product.description,
      price: product.price,
      stockQuantity: product.stockQuantity,
      categoryId: product.categoryId, // Assuming you have categoryId in the product
      imageUrl: product.imageUrl,
      status: product.status,
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
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Stock Quantity"
            value={newProduct.stockQuantity}
            onChange={(e) => setNewProduct({ ...newProduct, stockQuantity: e.target.value })}
            required
          />
          <select
            value={newProduct.categoryId || ""}
            onChange={(e) => setNewProduct({ ...newProduct, categoryId: e.target.value })}
            required
          >
            <option value="" disabled>Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Image URL"
            value={newProduct.imageUrl}
            onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
          />
          <button type="submit">{selectedProduct ? "Update Product" : "Add Product"}</button>
        </form>
      </div>

      <ul className="category-list">
        {products.map((product) => (
          <li key={product.id} className="product-item">
            <div className="category-details">
              <span>{product.name} - {product.description} - ${product.price}</span>
            </div>
            <div className="category-actions">
              <button onClick={() => handleEditProduct(product)} className="edit-btn">Edit</button>
              <button onClick={() => handleDeleteProduct(product.id)} className="delete-btn">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BGProducts;
