// src/components/Products.js

import { faInfoCircle, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function FilterProducts({ products = [], size = 8 }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        setTotalPages(Math.ceil(products.length / size));
    }, [products, size]);

    const paginatedProducts = products.slice((currentPage - 1) * size, currentPage * size);

    return (
        <section id="product1" className="section-p1">
            <h2>Featured Products</h2>
            <p>Summer Collection New Modern Design</p>

            <div className="pro-container">
                {paginatedProducts.length > 0 ? (
                    paginatedProducts.map((product) => (
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
                    ))
                ) : (
                    <p>No products found.</p> // This will show if paginatedProducts is empty
                )}
            </div>
        </section>
    );
}

export default FilterProducts;
