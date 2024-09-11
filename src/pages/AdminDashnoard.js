import React from 'react';
import Sidebar from '../components/Sidebar';
import '../components/css/AdminDashboard.css';

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <Sidebar />
            <div className="dashboard-content">
                <h1>Welcome to the Admin Dashboard</h1>
                {/* Add your dashboard content here */}
            </div>
        </div>
    );
};

export default AdminDashboard;
