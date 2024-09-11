import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { loginApiUrl } from "../util/apiUrlList.js";
import axiosInstance from "../util/axiosInstance";
import Loading from "./global/loading.js";
function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showLoading, setShowLoading] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const onClickLogin = (e) => {
        e.preventDefault();
        setShowLoading(true);
        setShowError(false);
        axiosInstance.post(loginApiUrl, {
            email: formData.email,
            password: formData.password
        }).then((response) => {
            setShowLoading(false);
            if (response.data) {
                if (response.data.status === 'SUCCESS') {
                    const { accessToken, refreshToken, firstLogin } = response.data.data;
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('refreshToken', refreshToken);
                    
                    if (firstLogin) {
                        navigate('/change-password'); // Redirect to Change Password if it's the first login
                    } else {
                        navigate('/admin-dashboard'); // Redirect to home or dashboard
                    }
                } else {
                    setShowError(true);
                    setErrorMessage(response.data.message || "Login failed");
                }
            }
        }).catch((err) => {
            setShowLoading(false);
            setShowError(true);
            if (err.response) {
                if (err.response.data) {
                    setErrorMessage(err.response.data.message);
                } else {
                    setErrorMessage("DEFAULT ERROR MESSEGE");
                }
            } else {
                setErrorMessage(err.message);
            }

        })
    }
    return (
        <div className="login-wrapper">
            {
                showLoading &&
                <Loading />
            }
            <div className="wrapper">
                <form onSubmit={onClickLogin}>
                    <h1>Login</h1>
                    {
                        showError &&
                        <p className="err">{errorMessage}</p>
                    }
                    <div className="input-box">
                        <input type="text" placeholder="Username" name="email" value={formData.email} required onChange={handleChange} />
                        <i className='bx bxs-user'></i>
                    </div>

                    <div className="input-box">
                        <input type="password" placeholder="Password" name="password" value={formData.password} required onChange={handleChange} />
                        <i className='bx bxs-lock-alt'></i>
                    </div>

                    {/* <div className="remember-forgot">
                        <label>
                            <input type="checkbox" /> Remember me
                        </label>
                        <a href="#">Forgot Password?</a>
                    </div> */}

                    <button className="btn" type="submit">Login</button>

                    <div className="register-link">
                        <p>Don't have an account? <br /> <a href="/register">Register</a></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;