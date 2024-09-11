import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../util/axiosInstance'; // Assuming axiosInstance is already set up

const ChangePassword = () => {
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        if (formData.newPassword !== formData.confirmNewPassword) {
            setErrorMessage("New passwords do not match");
            return;
        }

        axiosInstance.post('/v1/auth/change-password', {
            oldPassword: formData.oldPassword,
            newPassword: formData.newPassword,
            confirmNewPassword: formData.confirmNewPassword
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response) => {
            if (response.data.status === 'SUCCESS') {
                setSuccessMessage("Password changed successfully");
                navigate('/login'); // Redirect to login or home page after password change
            } else {
                setErrorMessage(response.data.message || "An error occurred");
            }
        })
        .catch((error) => {
            setErrorMessage(error.response?.data?.message || "An error occurred");
        });
    };

    return (
        <div className="change-password-wrapper">
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                    <h1>Change Password</h1>
                    {
                        errorMessage &&
                        <p className="err">{errorMessage}</p>
                    }
                    {
                        successMessage &&
                        <p className="success">{successMessage}</p>
                    }
                    <div className="input-box">
                        <input type="password" placeholder="Old Password" name="oldPassword" value={formData.oldPassword} required onChange={handleChange} />
                        <i className='bx bxs-lock-alt'></i>
                    </div>

                    <div className="input-box">
                        <input type="password" placeholder="New Password" name="newPassword" value={formData.newPassword} required onChange={handleChange} />
                        <i className='bx bxs-lock-alt'></i>
                    </div>

                    <div className="input-box">
                        <input type="password" placeholder="Confirm New Password" name="confirmNewPassword" value={formData.confirmNewPassword} required onChange={handleChange} />
                        <i className='bx bxs-lock-alt'></i>
                    </div>

                    <button className="btn" type="submit">Change Password</button>
                </form>
            </div>
        </div>
    );
}

export default ChangePassword;
