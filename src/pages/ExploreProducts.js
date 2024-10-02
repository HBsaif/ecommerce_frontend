import { useEffect, useState } from "react";
import FilterProducts from "../components/filterProducts";
import Layout from "../components/layout/mainlayout";
import apiUrlList from '../util/apiUrlList'; // Import API URL
import { axiosInstanceWithoutAuth } from '../util/axiosInstance'; // Import axiosInstance

function ExploreProducts() {
    const [categories, setCategories] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategories, setSelectedCategories] = useState(new Set());

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axiosInstanceWithoutAuth.get(apiUrlList.getCategories);
                if (response.data.status === 'SUCCESS') {
                    setCategories(response.data.data); // Assume categories are in response.data.data
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        const fetchProducts = async () => {
            try {
                const response = await axiosInstanceWithoutAuth.get(apiUrlList.getProductsApiUrl);
                setAllProducts(response.data.data.content); // Assume the products are in response.data.content
                setFilteredProducts(response.data.data.content); // Initially set filtered products to all products
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
        fetchProducts();
    }, []);

    const handleCategoryChange = (categoryId) => {
        const updatedSelectedCategories = new Set(selectedCategories);
        if (updatedSelectedCategories.has(categoryId)) {
            updatedSelectedCategories.delete(categoryId);
        } else {
            updatedSelectedCategories.add(categoryId);
        }
        setSelectedCategories(updatedSelectedCategories);

        // Filter products based on selected categories
        if (updatedSelectedCategories.size > 0) {
            const filtered = allProducts.filter(product => updatedSelectedCategories.has(product.categoryId));
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(allProducts); // Show all products if no category is selected
        }
    };

    useEffect(() => {
        // Debugging information
        console.log("Selected Categories: ", [...selectedCategories]);
        console.log("Filtered Products: ", filteredProducts);
    }, [selectedCategories, filteredProducts]);

    if (loading) {
        return <p>Loading products...</p>;
    }

    return (
        <Layout>
            <div className="explore-container">
                <div className="filter-menu">
                    <h3>Filter</h3>
                    {categories.map((category) => (
                        <div key={category.id}>
                            <input
                                type="checkbox"
                                id={`category-${category.id}`}
                                checked={selectedCategories.has(category.id)}
                                onChange={() => handleCategoryChange(category.id)}
                            />
                            <label htmlFor={`category-${category.id}`}>{category.name}</label>
                        </div>
                    ))}
                </div>
                <FilterProducts products={filteredProducts} /> {/* Pass the filtered products to the Products component */}
            </div>
        </Layout>
    );
}

export default ExploreProducts;
