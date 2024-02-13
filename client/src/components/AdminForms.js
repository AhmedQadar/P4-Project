import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import PilotForm from './PilotForm';
import FlightForm from './FlightForm';
import DestinationForm from './DestinationForm';

const FormSwitcher = () => {
    const [formType, setFormType] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handlePilotClick = () => {
        setFormType('pilot');
    };

    const handleFlightClick = () => {
        setFormType('flight');
    };

    const handleDestinationClick = () => {
        setFormType('destination');
    };

    const handleAdminLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/adminlogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                setIsAdmin(data.isAdmin);
            } else {
                const errorMessage = await response.text();
                if (errorMessage === 'User is not an admin') {
                    setErrorMessage('Admins only');
                } else {
                    setErrorMessage('Login failed. Please try again.');
                }
            }
        } catch (error) {
            console.error('Error logging in:', error);
            // Handle error
            setErrorMessage('Error logging in. Please try again later.');
        }
    };

    return (
        <Container fluid style={{ height: '100vh', background: 'linear-gradient(135deg, #ffb74d, #81d4fa)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Row className="justify-content-center align-items-center h-100">
                <Col>
                    {!isAdmin && (
                        <Card className="align-items-center">
                            <Card.Body style={{ background: 'white', borderRadius: '20px' }}>
                                <h2 className="mb-4">Admin Login</h2>
                                <Form onSubmit={handleAdminLogin}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email:</Form.Label>
                                        <Form.Control
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            style={{ borderRadius: '10px', width: '250px', background: '#f2f2f2' }}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password:</Form.Label>
                                        <Form.Control
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            style={{ borderRadius: '10px', width: '250px', background: '#f2f2f2' }}
                                        />
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Login
                                    </Button>
                                    {errorMessage && (
                                        <Alert variant="danger" className="mt-3">
                                            {errorMessage}
                                        </Alert>
                                    )}
                                </Form>
                            </Card.Body>
                        </Card>
                    )}
                    {isAdmin && (
                        <Card>
                            <Card.Body>
                                <div className="mb-3">
                                    <Button onClick={handlePilotClick} variant="success" className="mr-2">
                                        Add Pilot
                                    </Button>
                                    <Button onClick={handleFlightClick} variant="info" className="mr-2">
                                        Add Flight
                                    </Button>
                                    <Button onClick={handleDestinationClick} variant="warning">
                                        Add Destination
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    )}
                    {formType === 'pilot' && <PilotForm />}
                    {formType === 'flight' && <FlightForm />}
                    {formType === 'destination' && <DestinationForm />}
                </Col>
            </Row>
        </Container>
    );
};

export default FormSwitcher;