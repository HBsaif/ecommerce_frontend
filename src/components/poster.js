import React from "react";
import { useNavigate } from "react-router-dom";

function Poster() {
    const navigate = useNavigate(); // Use the useNavigate hook to handle navigation

    const handleExploreMore = () => {
        navigate('/explore-products'); // Navigate to the explore products page
    };

    return (
        <section id="banner" className="section-m1">
            <h4>Repair Service</h4>
            <h2>
                Up to <span>70% off </span> - All Tshirts and Accessories
            </h2>
            <button className="btn normal" onClick={handleExploreMore}>Explore more</button>
        </section>
    );
}

export default Poster;
