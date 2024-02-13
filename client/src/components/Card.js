import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import AccordionQuestions from './Accordion';

const FlightAppCard = () => {
  const cardStyles = {
    border: '0',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '1rem',
    background: 'linear-gradient(135deg, #FFA07A, #FF69B4)',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
  };

  const headingStyle = {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '1rem',
  };

  const textStyle = {
    fontSize: '1.25rem',
    marginBottom: '1rem',
  };

  const buttonStyle = {
    backgroundColor: 'white',
    color: '#4F46E5',
    fontSize: '1.25rem',
    padding: '0.75rem 2rem',
    borderRadius: '0.5rem',
  };

  return (
    <>
      <Card style={cardStyles}>
        <h2 style={headingStyle}>Explore the Skies with Our Flight App</h2>
        <p style={textStyle}>
          Discover and book flights to your dream destinations effortlessly. Our flight app provides a seamless experience, helping you explore new places and plan your travels stress-free.
        </p>
        <p style={textStyle}>
          Whether you seek the thrill of a vibrant city or the serenity of a beach escape, our app has it all. Enjoy exclusive deals, user-friendly booking, and top-notch customer support.
        </p>
        <p style={textStyle}>
          Download our app now and elevate your travel experience!
        </p>
        <Button style={buttonStyle}>
          Download Now
        </Button>
        <br></br>
        < AccordionQuestions />
      </Card>
    </>
  );
};

export default FlightAppCard;