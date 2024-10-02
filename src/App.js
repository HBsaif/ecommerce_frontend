import React, { Suspense, lazy } from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import AdminRoute from './components/AdminRoute';
import CartPage from './pages/CartPage';

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
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000, // 2 seconds
        }}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/admin-dashboard/*" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/explore-products" element={<ExploreProducts />} />
          <Route path="/product-details/:productId" element={<ProductDetails />} /> {/* <-- Updated Route */}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;


// import React from 'react';
// import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import './App.css';
// import AdminRoute from './components/AdminRoute';

// // Importing the pages directly without lazy loading
// import BGCategories from './components/bgcategories';
// import AdminDashboard from './pages/AdminDashnoard';
// import ChangePassword from './pages/ChangePasswordPage';
// import ExploreProducts from './pages/ExploreProducts';
// import HomePage from './pages/HomePage';
// import LoginPage from './pages/LoginPage';
// import ProductDetails from './pages/ProductDetails';
// import RegistrationPage from './pages/RegistrationPage';
// import TestPage from './pages/TestPage';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegistrationPage />} />
//         <Route path="/admin-dashboard/*" element={<AdminRoute />}>
//           <Route index element={<AdminDashboard />} /> {/* Admin Home */}
//           <Route path="categories" element={<BGCategories />} /> {/* Categories page */}
//         </Route>
//         <Route path="/change-password" element={<ChangePassword />} />
//         <Route path="/explore-products" element={<ExploreProducts />} />
//         <Route path="/product-details/:productId" element={<ProductDetails />} />
//         <Route path="/test" element={<TestPage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
