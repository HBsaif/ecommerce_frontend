// src/util/axiosInstance.js
import axios from 'axios';
const BASE_URL = 'http://localhost:8080/v1';
const axiosInstance = axios.create({
  // baseURL: 'https://ecommerce-production-73b5.up.railway.app/v1', // Replace with your API base URL
  baseURL: BASE_URL,
  timeout: 100000, // Optional: Set a timeout (in milliseconds)
  headers: {
    'Content-Type': 'application/json',
    // Add other default headers if needed
  },
});

// Optional: Add an interceptor to handle requests or responses
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken'); // get stored access token
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`; // set in header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercept 401 errors to refresh token
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const response = await axios.post(`${BASE_URL}/auth/refresh-token`, {refreshToken});
          // don't use axious instance that already configured for refresh token api call
          console.log("Refresh token response: ",response)
          const newAccessToken = response.data.data.accessToken;
          localStorage.setItem('accessToken', newAccessToken);  //set new access token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(originalRequest); //recall Api with new token
        } catch (error) {
          // Handle token refresh failure
          // mostly logout the user and re-authenticate by login again
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
