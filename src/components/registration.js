import React, { useState } from "react";
import axiosInstance from "../util/axiosInstance";
import { registerApiUrl } from "../util/apiUrlList.js";
import Loading from "./global/loading.js";
import { useNavigate } from 'react-router-dom';
function Registration() {
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
    const onClickRegister = (e) => {
        e.preventDefault();
        setShowLoading(true);
        setShowError(false);
        axiosInstance.post(registerApiUrl, {
            email: formData.email,
            password: formData.password
        }).then((response) => {
            setShowLoading(false);
            if(response.data){
                if(response.data.status==='SUCCESS'){
                    navigate('/');
                }else{
                    setShowError(true);
                    setErrorMessage("DEFAULT ERROR MESSEGE");
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
        <div className="registration-wrapper">
            <div className="wrapper">
                <form onSubmit={onClickRegister}>
                    <h1>Registration</h1>
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

                    <button className="btn" type="submit">Registration</button>

                    <div className="register-link">
                        <p>Already have an account? <br /> <a href="/Login">Login</a></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Registration;