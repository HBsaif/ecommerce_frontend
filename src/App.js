import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import AdminRoute from './components/AdminRoute';
import Login from './components/login';
import AdminDashboard from './pages/AdminDashnoard';
import ChangePassword from './pages/ChangePasswordPage';
import HomePage from './pages/HomePage';
import RegistrationPage from './pages/RegistrationPage';
import TestPage from './pages/TestPage';
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/admin-dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </Router>
  );
}

export default App;
