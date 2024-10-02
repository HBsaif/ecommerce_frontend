import React, { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../components/css/global.css';
import apiUrlList from "../util/apiUrlList.js";
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
        localStorage.setItem("email", formData.email)
        axiosInstance.post(apiUrlList.loginApiUrl, {
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
                    setErrorMessage("DEFAULT ERROR MESSAGE");
                }
            } else {
                setErrorMessage(err.message);
            }
        });
    }

    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            {showLoading && <Loading />}
            <Row className="w-100">
                <Col md={6} lg={4} className="mx-auto">
                    <div className="border p-4 rounded shadow-sm bg-light">
                        <h1 className="text-center mb-4">Login</h1>
                        {showError && <Alert variant="danger">{errorMessage}</Alert>}
                        <Form onSubmit={onClickLogin}>
                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter your email"
                                    name="email"
                                    value={formData.email}
                                    required
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formPassword" className="mb-4">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter your password"
                                    name="password"
                                    value={formData.password}
                                    required
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="w-100">
                                Login
                            </Button>
                            <div className="text-center mt-3">
                                <p>Don't have an account? <a href="/register">Register</a></p>
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
