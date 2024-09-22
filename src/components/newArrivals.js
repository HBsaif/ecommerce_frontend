import axios from 'axios';
import React, { useEffect, useState } from 'react';

function NewArrivals() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch new arrivals using axios
        axios.get('http://localhost:8080/v1/api/products/new-arrivals?n=4')
            .then(response => {
                if (response.data.status === "SUCCESS") {
                    setProducts(response.data.data); // Store the product data in the state
                } else {
                    console.error("Failed to fetch new arrivals.");
                }
            })
            .catch(error => {
                console.error("Error fetching new arrivals:", error);
            });
    }, []);

    return (
        <section id="product1" className="section-p1">
            <h2>New Arrivals</h2>
            <p>Summer Collection New Modern Design</p>
            <div className="pro-container">
                {products.map((product) => (
                    <div className="pro" key={product.id}>
                        <img src="https://picsum.photos/id/5/200/200" alt={product.name} />
                        <div className="des">
                            <span>{product.name}</span>
                            <h5>{product.description}</h5>
                            <div className="star">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                            </div>
                            <h4>${product.price}</h4>
                        </div>
                        <a href="#">
                            <i className="fal fa-shopping-cart cart"></i>
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default NewArrivals;
