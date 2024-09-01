import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>Admin Dashboard</h2>
            <ul>
                <li>
                    <Link to="/admin/products">Manage Products</Link>
                </li>
                <li>
                    <Link to="/admin/categories">Manage Categories</Link>
                </li>
                <li>
                    <Link to="/admin/add-product">Add Product</Link>
                </li>
                <li>
                    <Link to="/admin/add-category">Add Category</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
