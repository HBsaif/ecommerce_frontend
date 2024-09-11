// src/util/authToken.js
import axiosInstance from "../util/axiosInstance";

export const refreshAccessToken = () => {
    const refreshToken = localStorage.getItem('refreshToken');
    
    // if (!refreshToken) {
    //     // navigate('/login');  // Redirect to login if refresh token is missing
    //     return;
    // }
    
    axiosInstance.post('/refresh-token', { refreshToken })
        .then((response) => {
            if (response.data && response.data.status === 'SUCCESS') {
                const { accessToken } = response.data.data;
                localStorage.setItem('accessToken', accessToken);
                // Continue with the API call if needed
            } else {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                // navigate('/login');  // Redirect to login if refresh fails
            }
        }).catch(() => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            // navigate('/login');  // Redirect to login if there's an error
        });
};
