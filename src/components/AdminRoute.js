
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


const AdminRoute = ({ children }) => {
    console.log("Admin route enter...")
    const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
    console.log(token)
    let userRole = '';

    if (token) {
        const decodedToken = jwtDecode(token);
        console.log(decodedToken); // To check the structure of the decoded token
        userRole = decodedToken.roles && decodedToken.roles.includes('ADMIN') ? 'ADMIN' : 
                   decodedToken.roles.includes('MODERATOR') ? 'MODERATOR' : '';
    }
    

    // If not logged in or role isn't ADMIN/MODERATOR, redirect to login page
    if (!token || (userRole !== 'ADMIN' && userRole !== 'MODERATOR')) {
        console.log("No admin..")
        return <Navigate to="/test" />;
    }

    // If the user is authorized, render the children (admin dashboard components)
    return children;
};

export default AdminRoute;
