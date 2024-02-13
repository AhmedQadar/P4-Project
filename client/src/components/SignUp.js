import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import googleIcon from '../assets/google.svg';
import emailIcon from '../assets/gmail.svg';

const googleIconStyle = {
  width: '24px',
  height: '24px',
};

const iconStyle = {
  width: '24px',
  height: '24px',
};

const SignUpForm = () => {
  const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    age: yup.number().required('Age is required').positive('Age must be positive').integer('Age must be an integer'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
    passport_number: yup.string().required('Passport number is required'),
    isAdmin: yup.boolean().required('Admin status is required')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      age: '',
      email: '',
      password: '',
      passport_number: '',
      isAdmin: false
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => { 
      try {
        const response = await fetch('/passengers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        });
        if (!response.ok) {
          throw new Error('Failed to send data');
        }
        console.log('Data sent successfully');
        resetForm();
        
      } catch (error) {
        console.error('Error sending data:', error);
        
      }
    }
  });

  return (
    <div className="full-page-container" style={{ background: 'linear-gradient(135deg, #ff99cc, #66ccff)', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)', marginTop: 0, paddingTop: '50px', paddingBottom: '50px' }}>
      <Container className="mt-5">
        <Row className="justify-content-center" >
          <Col md={6}>
            <Card >
              <Card.Body style={{ background: 'linear-gradient( rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 100%)', borderRadius: '20px' }}>
                <h2 className="text-center text-dark  mb-4" style={{ marginBottom: '20px', fontWeight: 'bold', textTransform: 'uppercase' }}>Sign Up</h2>
                <Form onSubmit={formik.handleSubmit}>
                  <Row className="mb-3">
                    <Col sm={12}>
                      <Form.Label style={{ marginRight: '600px', fontWeight: 'bold'}}>Name</Form.Label>
                      <Form.Control type="text" name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Enter name" />
                      {formik.touched.name && formik.errors.name ? <div className="error">{formik.errors.name}</div> : null}
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col sm={12}>
                      <Form.Label style={{ marginRight: '600px', fontWeight: 'bold'}}>Age</Form.Label>
                      <Form.Control type="number" name="age" value={formik.values.age} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Enter age" />
                      {formik.touched.age && formik.errors.age ? <div className="error">{formik.errors.age}</div> : null}
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col sm={12}>
                      <Form.Label style={{ marginRight: '600px', fontWeight: 'bold'}}>Email</Form.Label>
                      <Form.Control type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Enter email" />
                      {formik.touched.email && formik.errors.email ? <div className="error">{formik.errors.email}</div> : null}
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col sm={12}>
                      <Form.Label style={{ marginRight: '600px', fontWeight: 'bold'}}>Password</Form.Label>
                      <Form.Control type="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Password" />
                      {formik.touched.password && formik.errors.password ? <div className="error">{formik.errors.password}</div> : null}
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col sm={12}>
                      <Form.Label style={{ marginRight: '600px', fontWeight: 'bold'}}>Passport</Form.Label>
                      <Form.Control type="password" name="passport_number" value={formik.values.passport_number} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Enter Passport number" />
                      {formik.touched.passport_number && formik.errors.passport_number ? <div className="error">{formik.errors.passport_number}</div> : null}
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col sm={12}>
                      <Form.Label style={{ marginRight: '600px', fontWeight: 'bold'}}>Admin Status</Form.Label>
                      <Form.Select name="isAdmin" value={formik.values.isAdmin} onChange={formik.handleChange}>
                        <option value={true}>True</option>
                        <option value={false}>False</option>
                      </Form.Select>
                      {formik.touched.isAdmin && formik.errors.isAdmin ? <div className="error">{formik.errors.isAdmin}</div> : null}
                    </Col>
                  </Row>
                  <Button variant="primary" type="submit" className="w-100 rounded-pill align-items-center">Sign Up</Button>
                </Form>
                <div className="text-center mb-4 position-relative" style={{ marginTop: '70px' }}>
                  <hr className="w-100 my-0" style={{ borderColor: '#000' }} />
                  <span className="position-absolute top-50 translate-middle px-3" style={{ backgroundColor: 'rgba(255, 255, 255, 1)', borderRadius: '4rem' }}>or</span>
                  <hr className="w-100 my-0" style={{ borderColor: '#000' }} />
                </div>
                <Button variant="light" className="w-100 rounded-pill d-flex align-items-center justify-content-center">
                  <img src={googleIcon} alt="Google Icon" style={{ ...googleIconStyle, marginRight: '20px' }} />
                  <span>Sign Up with Google</span>
                </Button>
                <hr className="my-4" />
                <Button variant="light" className="w-100 rounded-pill d-flex align-items-center justify-content-center">
                  <img src={emailIcon} alt="Email Icon" style={{ ...iconStyle, marginRight: '20px' }} />
                  <span>Continue with Email</span>
                </Button>
                <div className="text-sm d-flex justify-content-between mt-3">
                  <p>If you already have an account...</p>
                  <Button variant="outline-primary">Log In</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignUpForm;