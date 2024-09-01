import React from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <Sidebar />
            <div className="content">
                <Outlet /> {/* This will render the nested routes, like Product Management or Add Product */}
            </div>
        </div>
    );
};

export default AdminDashboard;
