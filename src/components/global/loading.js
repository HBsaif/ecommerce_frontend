import React from "react";

function Loading() {
    return (
        <div className="spinner-container">
            <div className="spinner"></div>
            <div className="spinner-inner"></div>
            <div className="text">Loading...</div>
        </div>
    )
}

export default Loading;