import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import googleIcon from '../assets/google.svg'; // Import the SVG file
import emailIcon from '../assets/gmail.svg';
import { useNavigate } from 'react-router-dom';

const googleIconStyle = {
  width: '24px',
  height: '24px',
};

const iconStyle = {
  width: '24px',
  height: '24px',
};

function SignInForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = { email, password };
            const userData = await handleLogin(formData); // Await the handleLogin function

            // Redirect to dashboard if login is successful
            if (userData) {
                // Store the user data in sessionStorage
                sessionStorage.setItem('user', JSON.stringify(userData));

                // Redirect to home page
                navigate('/');

                // Clear form fields
                setEmail('');
                setPassword('');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleLogin = async (formData) => {
        try {
            // Make a request to your backend to authenticate the user
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.status === 200) {
                // If login is successful
                const userData = await response.json();

                console.log('Login successful');
                return userData; // Return user data
            } else {
                // If login failed
                console.error('Login failed:', response.statusText);
                // Handle the error (e.g., display an error message to the user)
                return null;
            }
        } catch (error) {
            console.error('Login error:', error);
            return null;
        }
    };

    return (
        <div className="full-page-container" style={{ background: 'linear-gradient(135deg, #ff99cc, #66ccff)', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', marginTop: 0, paddingTop: '50px', paddingBottom: '50px' }}>
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col md={6}>
                        <Card>
                            <Card.Body style={{ background: 'linear-gradient( rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 100%)', borderRadius: '20px' }}>
                                <h2 className="text-center text-dark mb-4" style={{ marginBottom: '20px', fontWeight: 'bold', textTransform: 'uppercase' }}>Login</h2>
                                <Form onSubmit={handleSubmit}>
                                    <Row className="mb-3">
                                        <Col sm={12}>
                                            <Form.Label style={{ marginRight: '600px', fontWeight: 'bold' }}>Email</Form.Label>
                                            <Form.Control type="email" placeholder="Enter email" style={{ backgroundColor: '#f2f2f2' }} value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </Col>
                                    </Row>

                                    <Row className="mb-3">
                                        <Col sm={12}>
                                            <Form.Label style={{ marginRight: '600px', fontWeight: 'bold' }}>Password</Form.Label>
                                            <Form.Control type="password" placeholder="Password" style={{ backgroundColor: '#f2f2f2' }} value={password} onChange={(e) => setPassword(e.target.value)} />
                                        </Col>
                                    </Row>

                                    <Button variant="primary" type="submit" className="w-100 rounded-pill align-items-center">
                                        Log In
                                    </Button>
                                </Form>

                                <div className="text-center mb-4 position-relative" style={{ marginTop: '70px' }}>
                                    <hr className="w-100 my-0" style={{ borderColor: '#000' }} />
                                    <span className="position-absolute top-50 translate-middle px-3" style={{ backgroundColor: 'rgba(255, 255, 255, 1)', borderRadius: '4rem' }}>or</span>
                                    <hr className="w-100 my-0" style={{ borderColor: '#000' }} />
                                </div>

                                <Button variant="light" className="w-100 rounded-pill d-flex align-items-center justify-content-center">
                                    <img src={googleIcon} alt="Google Icon" style={{ ...googleIconStyle, marginRight: '20px' }} />
                                    <span>Login with Google</span>
                                </Button>

                                <hr className="my-4" />

                                <Button variant="light" className="w-100 rounded-pill d-flex align-items-center justify-content-center">
                                    <img src={emailIcon} alt="Email Icon" style={{ ...iconStyle, marginRight: '20px' }} />
                                    <span>Continue with Email</span>
                                </Button>

                                <div className="text-sm d-flex justify-content-between mt-3">
                                    <p>If you dont have an account...</p>
                                    <Button variant="outline-primary">SignUp</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default SignInForm;