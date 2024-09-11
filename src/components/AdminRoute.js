
import { jwtDecode } from 'jwt-decode';
import { Navigate } from 'react-router-dom';


const AdminRoute = ({ children }) => {
    const accessToken = localStorage.getItem('accessToken'); // Assuming accessToken is stored in localStorage
    console.log(accessToken)
    let userRole = '';

    if (accessToken) {
        const decodedaccessToken = jwtDecode(accessToken);
        userRole = decodedaccessToken.roles && decodedaccessToken.roles.includes('ADMIN') ? 'ADMIN' : 
                   decodedaccessToken.roles.includes('MODERATOR') ? 'MODERATOR' : '';
    }
    

    // If not logged in or role isn't ADMIN/MODERATOR, redirect to login page
    if (!accessToken || (userRole !== 'ADMIN' && userRole !== 'MODERATOR')) {
        return <Navigate to="/login" />;
    }

    // If the user is authorized, render the children (admin dashboard components)
    return children;
};

export default AdminRoute;
