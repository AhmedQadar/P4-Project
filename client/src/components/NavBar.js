import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import planeIcon from '../assets/plane.svg';

function NavBar({ isLoggedIn }) {
  const navigate = useNavigate(); // Initialize useNavigate hook

  

  const handleLogout = async () => {
    try {
      // Perform logout logic here
      // Clear session storage or perform any other necessary actions
      sessionStorage.removeItem('user'); // Redirect to signin page
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" className="sticky-top">
        <Container>
          <Navbar.Brand style={{ fontWeight: 'bold', marginRight: '200px' }}>
            <img
              src={planeIcon}
              width="50"
              height="50"
              className="d-inline-block align-top"
              alt="Plane Icon"
            />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/admin" className="mx-4">
              Admin
            </Nav.Link>
            <Nav.Link as={Link} to="/" className="mx-4">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="userdetails" className="mx-4">
              Details
            </Nav.Link>
            <Nav.Link as={Link} to="/destinations" className="mx-4">
              Destinations
            </Nav.Link>
            <Nav.Link as={Link} to="/aboutus" className="mx-4">
              About Us
            </Nav.Link>
            <Dropdown>
              <Dropdown.Toggle as={Nav.Link} id="contact-us-dropdown" className="mx-3">
                Contact Us
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#instagram">Instagram</Dropdown.Item>
                <Dropdown.Item href="#email">Email</Dropdown.Item>
                <Dropdown.Item href="#twitter">Twitter</Dropdown.Item>
                <Dropdown.Item href="#facebook">Facebook</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
          <Nav>
            {isLoggedIn ? (
              <>
                <Button variant="light" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="primary" as={Link} to="/signin" className="me-2">
                  Sign In
                </Button>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
