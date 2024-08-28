// src/utils/axiosInstance.js
import axios from 'axios';

// Create an Axios instance with default settings
const axiosInstance = axios.create({
  baseURL: 'https://ecommerce-production-73b5.up.railway.app/v1', // Replace with your API base URL
  timeout: 100000, // Optional: Set a timeout (in milliseconds)
  headers: {
    'Content-Type': 'application/json',
    // Add other default headers if needed
  },
});

// Optional: Add an interceptor to handle requests or responses
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add authorization headers here if needed
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    console.error('API call error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
