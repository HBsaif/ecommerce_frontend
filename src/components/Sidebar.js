import React from 'react';
import axiosInstance from '../util/axiosInstance';
import './css/Sidebar.css'; // Assuming you are putting the CSS in a separate file
const Sidebar = () => {

    const allProducts = ()=>{
        console.log("ALL PRODUCTS.");

        axiosInstance.get('/api/products').then((response) => {
            console.log(response.data);
        }).catch((err) => {
            console.log(err.message);

        })
    }

    const logout = ()=>{
        localStorage.clear();
    }
    return (
        <div className="sidebar">
            <div className="sidebar-logo">
                <h2>Admin Panel</h2>
            </div>
            <ul className="sidebar-menu">
                <li><a href="/admin-dashboard">Dashboard</a></li>
                <li><a href="/admin-products">Products</a></li>
                <li><a href="/admin-categories">Categories</a></li>
                <li><a href="/admin-orders">Orders</a></li>
                <li><a href="/admin-users">Users</a></li>
                <li><a href="/admin-settings">Settings</a></li>
                
            </ul>
            <button onClick={allProducts}>All Products</button>
            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default Sidebar;
