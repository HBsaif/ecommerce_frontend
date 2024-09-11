import React from "react";
import { Link } from "react-router-dom";
function Home() {
    return (
        <div className="home-page-wrapper">
            <h1 style={{ color: "#FFFFFF" }}>HomePage</h1>
            <h1 style={{ color: "#FFFFFF" }}>HomePage</h1>
            <Link to="/login">
                Login
            </Link>
        </div>
    )
}

export default Home;