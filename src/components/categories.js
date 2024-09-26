import React, { useEffect, useState } from 'react';
import apiUrlList from '../util/apiUrlList'; // Import apiUrlList
import { axiosInstanceWithoutAuth } from '../util/axiosInstance'; // Import axiosInstance

function Categories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true); // Track loading state

    useEffect(() => {
        // Fetch categories using axiosInstance
        axiosInstanceWithoutAuth
            .get(apiUrlList.getCategories)
            .then((response) => {
                if (response.data.status === 'SUCCESS') {
                    setCategories(response.data.data); // Set categories in state
                } else {
                    console.error('Failed to fetch categories:', response.data.message);
                }
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            })
            .finally(() => {
                setLoading(false); // Stop loading once the request is complete
            });
    }, []);

    return (
        <section id="feature" className="section-p1">
            {loading ? (
                <p>Loading categories...</p>
            ) : categories.length > 0 ? (
                categories.map((category) => (
                    <div className="fe-box" key={category.id}>
                        <img
                            src={category.imageUrl || "https://picsum.photos/seed/picsum/150"} // Fallback image if imageUrl is null
                            alt={category.name}
                        />
                        <h6>{category.name}</h6>
                        <p>{category.description}</p>
                    </div>
                ))
            ) : (
                <p>No categories found.</p>
            )}
        </section>
    );
}

export default Categories;
