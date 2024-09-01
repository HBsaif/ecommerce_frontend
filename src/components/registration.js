import React, { useState } from "react";
import axiosInstance from "../util/axiosInstance";
import { initiateRegisterApiUrl, confirmRegisterApiUrl } from "../util/apiUrlList.js";
import Loading from "./global/loading.js";
import { useNavigate } from 'react-router-dom';

function Register() {
    const [formData, setFormData] = useState({
        email: '',
        requestId: '',
        otp: '',
        fullName: '',
        password: ''
    });
    const [showLoading, setShowLoading] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [stage, setStage] = useState(1); // 1: Initiate Signup, 2: Confirm Signup
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const onClickInitiateSignup = (e) => {
        e.preventDefault();
        setShowLoading(true);
        setShowError(false);
        axiosInstance.post(initiateRegisterApiUrl, {
            email: formData.email
        }).then((response) => {
            setShowLoading(false);
            if (response.data.status === 'SUCCESS') {
                setFormData(prevState => ({
                    ...prevState,
                    requestId: response.data.data.requestId
                }));
                setStage(2); // Move to the next stage
            } else {
                setShowError(true);
                setErrorMessage(response.data.message || "DEFAULT ERROR MESSAGE");
            }
        }).catch((err) => {
            setShowLoading(false);
            setShowError(true);
            if (err.response && err.response.data) {
                setErrorMessage(err.response.data.message || "DEFAULT ERROR MESSAGE");
            } else {
                setErrorMessage(err.message || "DEFAULT ERROR MESSAGE");
            }
        });
    };

    const onClickConfirmSignup = (e) => {
        e.preventDefault();
        setShowLoading(true);
        setShowError(false);
        axiosInstance.post(confirmRegisterApiUrl, {
            requestId: formData.requestId,
            otp: formData.otp,
            fullName: formData.fullName,
            password: formData.password
        }).then((response) => {
            setShowLoading(false);
            if (response.data.status === 'SUCCESS') {
                navigate('/'); // Redirect to home after successful registration
            } else {
                setShowError(true);
                setErrorMessage(response.data.message || "DEFAULT ERROR MESSAGE");
            }
        }).catch((err) => {
            setShowLoading(false);
            setShowError(true);
            if (err.response && err.response.data) {
                setErrorMessage(err.response.data.message || "DEFAULT ERROR MESSAGE");
            } else {
                setErrorMessage(err.message || "DEFAULT ERROR MESSAGE");
            }
        });
    };

    return (
        <div className="register-wrapper">
            {
                showLoading &&
                <Loading />
            }
            <div className="wrapper">
                <form onSubmit={stage === 1 ? onClickInitiateSignup : onClickConfirmSignup}>
                    <h1>{stage === 1 ? "Register" : "Confirm Signup"}</h1>
                    {
                        showError &&
                        <p className="err">{errorMessage}</p>
                    }
                    {stage === 1 && (
                        <>
                            <div className="input-box">
                                <input type="text" placeholder="Email" name="email" value={formData.email} required onChange={handleChange} />
                                <i className='bx bxs-user'></i>
                            </div>
                            <button className="btn" type="submit">Send OTP</button>
                        </>
                    )}
                    {stage === 2 && (
                        <>
                            <div className="input-box">
                                <input type="text" placeholder="OTP" name="otp" value={formData.otp} required onChange={handleChange} />
                                <i className='bx bxs-lock-alt'></i>
                            </div>
                            <div className="input-box">
                                <input type="text" placeholder="Full Name" name="fullName" value={formData.fullName} required onChange={handleChange} />
                                <i className='bx bxs-user'></i>
                            </div>
                            <div className="input-box">
                                <input type="password" placeholder="Password" name="password" value={formData.password} required onChange={handleChange} />
                                <i className='bx bxs-lock-alt'></i>
                            </div>
                            <button className="btn" type="submit">Register</button>
                        </>
                    )}
                    <div className="register-link">
                        <p>Already have an account? <br /> <a href="/login">Login</a></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register;
