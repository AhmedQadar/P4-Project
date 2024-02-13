import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import SignUpForm from './SignUp';
import SignInForm from './SignIn';

function Authentication({ onLoginStatusChange }) {
    const [showSignUp, setShowSignUp] = useState(false);
  
    const handleShowSignUp = () => {
      setShowSignUp(true);
    };
  
    const handleShowSignIn = () => {
      setShowSignUp(false);
    };
  
    return (
        <div className="full-page-container" style={{ background: 'linear-gradient(135deg, #ff99cc, #66ccff)', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', marginTop: 0, paddingTop: '50px', paddingBottom: '50px' }}>
            <div className="mt-5 d-flex justify-content-center">
            <Card style={{ width: '1000px', background: 'linear-gradient( rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 100%)', borderRadius: '20px' }}>
                <Card.Body>
                <h2 className="text-center text-dark mb-4" style={{ marginBottom: '20px', fontWeight: 'bold', textTransform: 'uppercase' }}>Authentication</h2>
                <Button variant="light" className="w-10 rounded-pill" style={{ marginRight: '10px' }} onClick={handleShowSignUp}>
                    Sign Up
                </Button>
                <Button variant="light" className="w-10 rounded-pill" onClick={handleShowSignIn}>
                    Sign In
                </Button>
                </Card.Body>
            </Card>
            </div>
            {showSignUp   ? <SignUpForm /> : <SignInForm  onLoginStatusChange={onLoginStatusChange}  />}
        </div>
    );
  }
  
  export default Authentication;