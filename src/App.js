import React, { Suspense, lazy } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import AdminRoute from './components/AdminRoute';

// Lazy loading the pages
const AdminDashboard = lazy(() => import('./pages/AdminDashnoard'));
const ChangePassword = lazy(() => import('./pages/ChangePasswordPage'));
const ExploreProducts = lazy(() => import('./pages/ExploreProducts'));
const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const RegistrationPage = lazy(() => import('./pages/RegistrationPage'));
const TestPage = lazy(() => import('./pages/TestPage'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/admin-dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/explore-products" element={<ExploreProducts />} />
          <Route path="/product-details/:productId" element={<ProductDetails />} /> {/* <-- Updated Route */}
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
