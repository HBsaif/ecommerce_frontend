import React from 'react';
import '../components/css/AdminDashboard.css';
import Layout from '../components/layout/mainlayout';
import Sidebar from '../components/Sidebar';

const AdminDashboard = () => {
    return (
        <Layout>
        <div className="admin-dashboard">
            <Sidebar />
            <div className="dashboard-content">
                <h1>Welcome to the Admin Dashboard</h1>
                {/* Add your dashboard content here */}
            </div>
        </div>
        </Layout>
        
    );
};

export default AdminDashboard;
