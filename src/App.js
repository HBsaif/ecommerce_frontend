import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import TestPage from './pages/TestPage';
import HomePage from './pages/HomePage';
import RegistrationPage from './pages/RegistrationPage';
import AdminRoute from './components/AdminRoute';
import AdminDashboard from './pages/AdminDashnoard';
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/admin-dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </Router>
  );
}

export default App;
