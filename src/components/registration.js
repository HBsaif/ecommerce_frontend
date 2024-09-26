import React, { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import apiUrlList from "../util/apiUrlList.js";
import { axiosInstanceWithoutAuth } from "../util/axiosInstance";
import Loading from "./global/loading.js";

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
        axiosInstanceWithoutAuth.post(apiUrlList.initiateRegisterApiUrl, {
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
        axiosInstanceWithoutAuth.post(apiUrlList.confirmRegisterApiUrl, {
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
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            {showLoading && <Loading />}
            <Row className="w-100">
                <Col md={6} lg={4} className="mx-auto">
                    <div className="border p-4 rounded shadow-sm bg-light">
                        <h1 className="text-center mb-4">{stage === 1 ? "Register" : "Confirm Signup"}</h1>
                        {showError && <Alert variant="danger">{errorMessage}</Alert>}
                        <Form onSubmit={stage === 1 ? onClickInitiateSignup : onClickConfirmSignup}>
                            {stage === 1 && (
                                <>
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
                                    <Button variant="primary" type="submit" className="w-100">
                                        Send OTP
                                    </Button>
                                </>
                            )}
                            {stage === 2 && (
                                <>
                                    <Form.Group controlId="formOtp" className="mb-3">
                                        <Form.Label>OTP</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter OTP"
                                            name="otp"
                                            value={formData.otp}
                                            required
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formFullName" className="mb-3">
                                        <Form.Label>Full Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter your full name"
                                            name="fullName"
                                            value={formData.fullName}
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
                                        Register
                                    </Button>
                                </>
                            )}
                            <div className="text-center mt-3">
                                <p>Already have an account? <a href="/login">Login</a></p>
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Register;
