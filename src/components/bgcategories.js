import React, { useEffect, useState } from "react";
import toast from "react-hot-toast"; // Import toast and Toaster
import axiosInstance, { axiosInstanceWithoutAuth } from "../util/axiosInstance";

const BGCategories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });

  // Fetch all categories
  const fetchCategories = async () => {
    try {
        const response = await axiosInstanceWithoutAuth.get("/api/categories");
        if (response.data.status === "SUCCESS") {
          setCategories(response.data.data);
        } else {
          toast.error(response.data.message); // Show error toast
        }
      } catch (error) {
        toast.error("Error fetching categories."); // Show error toast
        console.error(error);
      }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle category submission (add or update)
  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    const apiUrl = selectedCategory
      ? `/api/categories/update/${selectedCategory.id}`
      : `/api/categories/add-category`;

    toast.promise(
      axiosInstance.post(apiUrl, newCategory)
        .then((response) => {
          setSelectedCategory(null);
          setNewCategory({ name: "", description: "" });
          fetchCategories(); // Refresh categories
        }),
      {
        loading: selectedCategory ? "Updating category..." : "Adding category...",
        success: "Category saved successfully!",
        error: "Error saving category.",
      }
    );
  };

  // Handle delete category
  const handleDeleteCategory = async (id) => {
    toast.promise(
      axiosInstance.post(`/api/categories/delete/${id}`)
        .then((response) => {
          fetchCategories(); // Refresh categories
        }),
      {
        loading: "Deleting category...",
        success: "Category deleted successfully!",
        error: "Error deleting category.",
      }
    );
  };

  // Handle edit category
  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setNewCategory({ name: category.name, description: category.description });
  };

  return (
    <div className="bg-categories">
      <h2>Categories</h2>

      <div className="category-form">
        <form onSubmit={handleCategorySubmit}>
          <input
            type="text"
            placeholder="Category Name"
            value={newCategory.name}
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={newCategory.description}
            onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
            required
          />
          <button type="submit">{selectedCategory ? "Update Category" : "Add Category"}</button>
        </form>
      </div>

      <ul className="category-list">
        {categories.map((category) => (
          <li key={category.id} className="category-item">
            <div className="category-details">
              <span>{category.name} - {category.description}</span>
            </div>
            <div className="category-actions">
              <button onClick={() => handleEditCategory(category)} className="edit-btn">Edit</button>
              <button onClick={() => handleDeleteCategory(category.id)} className="delete-btn">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BGCategories;
