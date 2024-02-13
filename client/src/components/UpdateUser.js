import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

function SearchAndUpdateUserForm({ onUpdate }) {
  const [searchName, setSearchName] = useState('');
  const [userData, setUserData] = useState(null);
  const [userFlights, setUserFlights] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      console.log('Searching for user with name:', searchName);
      const response = await fetch(`/passengers/search?name=${searchName}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      console.log('Fetched user data:', data);
      if (data.message) {
        setError(data.message);
        setUserData(null);
        setUserFlights([]);
      } else {
        setUserData(data);
        setError(null);
        loadUserFlights(data.id);
      }
    } catch (error) {
      console.error('Error searching for user:', error);
      setError('User not found');
      setUserData(null);
      setUserFlights([]);
    }
  };

  const loadUserFlights = async (userId) => {
    try {
      const response = await fetch(`/passengers/${userId}/flights`);
      if (!response.ok) {
        throw new Error('Failed to fetch user flights');
      }
      const data = await response.json();
      console.log('Fetched user flights:', data);
      setUserFlights(data);
    } catch (error) {
      console.error('Error fetching user flights:', error);
      setUserFlights([]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/passengers/${userData.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      if (!response.ok) {
        throw new Error('Failed to update user data');
      }
      console.log('User data updated successfully');
      onUpdate(userData);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleFlightClick = (flight) => {
    console.log('Flight clicked:', flight);
  };

  return (
    <div className="full-page-container" style={{ background: 'linear-gradient(135deg, #ffb74d, #81d4fa)', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', marginTop: 0, paddingTop: '50px', paddingBottom: '50px', minHeight: '100vh' }}>
      <Container fluid className="mt-5">
        <div className="h-100">
          <Row className="justify-content-center">
            <Col md={6}>
              <Card>
                <Card.Body>
                  <h2 className="text-center mb-4" style={{ color: '#333' }}>Search User</h2>
                  <div className="mb-3">
                    <Form.Label style={{ color: '#333' }}>Enter Name</Form.Label>
                    <Form.Control type="text" value={searchName} onChange={(e) => setSearchName(e.target.value)} style={{ backgroundColor: '#f2f2f2' }} />
                  </div>
                  <div className="mb-3">
                    <Button variant="primary" onClick={handleSearch} className="w-100">Search</Button>
                  </div>
                  {error && <p className="text-danger">{error}</p>}
                </Card.Body>
              </Card>
            </Col>
          </Row>
          {userData && (
            <Row className="justify-content-center mt-4">
              <Col md={6}>
                <Card>
                  <Card.Body>
                    <h2 className="text-center mb-4" style={{ color: '#333' }}>Update User</h2>
                    <Form>
                      <Form.Group controlId="formName">
                        <Form.Label style={{ color: '#333' }}>Name</Form.Label>
                        <Form.Control type="text" name="name" value={userData.name} onChange={handleInputChange} />
                      </Form.Group>
                      <Form.Group controlId="formAge">
                        <Form.Label style={{ color: '#333' }}>Age</Form.Label>
                        <Form.Control type="number" name="age" value={userData.age} onChange={handleInputChange} />
                      </Form.Group>
                      <Form.Group controlId="formEmail">
                        <Form.Label style={{ color: '#333' }}>Email</Form.Label>
                        <Form.Control type="email" name="email" value={userData.email} onChange={handleInputChange} />
                      </Form.Group>
                      <Form.Group controlId="formPassword">
                        <Form.Label style={{ color: '#333' }}>Password</Form.Label>
                        <Form.Control type="password" name="password" value={userData.password} onChange={handleInputChange} />
                      </Form.Group>
                      <Form.Group controlId="formPassportNumber">
                        <Form.Label style={{ color: '#333' }}>Passport Number</Form.Label>
                        <Form.Control type="text" name="passport_number" value={userData.passport_number} onChange={handleInputChange} />
                      </Form.Group>
                      <Button variant="primary" onClick={handleUpdate} className="w-100 mt-3">Update</Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
          {userFlights.length > 0 && (
            <Row className="justify-content-center mt-4">
              <Col md={6}>
                <Card>
                  <Card.Body>
                    <h2 className="text-center mb-4" style={{ color: '#333' }}>User Flights</h2>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                      {userFlights.map((flight, index) => (
                        <li key={index} onClick={() => handleFlightClick(flight)} style={{ marginBottom: '10px', padding: '10px', background: '#f9f9f9', borderRadius: '5px', cursor: 'pointer' }}>
                          {flight.flight_number}
                        </li>
                      ))}
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
        </div>
      </Container>
    </div>
  );
}

export default SearchAndUpdateUserForm;