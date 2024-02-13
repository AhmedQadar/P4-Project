import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

function AccordionQuestions() {
  const accordionStyle = {
    marginBottom: '20px',
  };

  const cardHeaderStyle = {
    background: '#4F46E5',
    color: 'white',
    padding: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    borderRadius: '0.5rem',
  };

  const cardBodyStyle = {
    background: '#f8f9fa',
    padding: '1rem',
    borderRadius: '0.5rem',
    maxWidth: '500px',
    wordWrap: 'break-word', 
  };

  return (
    <Accordion defaultActiveKey={['0']} alwaysOpen style={accordionStyle}>
      <Accordion.Item eventKey="0">
        <Accordion.Header style={cardHeaderStyle}>What services do you offer?</Accordion.Header>
        <Accordion.Body style={cardBodyStyle}>
          We offer a range of services including flight booking, itinerary management, and customer support to ensure a seamless travel experience.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header style={cardHeaderStyle}>How do I book a flight?</Accordion.Header>
        <Accordion.Body style={cardBodyStyle}>
          Booking a flight is simple! Just visit our website, select your desired destination and travel dates, choose from available flights, and complete the booking process securely.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header style={cardHeaderStyle}>What are the payment options?</Accordion.Header>
        <Accordion.Body style={cardBodyStyle}>
          We accept various payment methods including credit/debit cards, PayPal, and bank transfers to provide flexibility and convenience for our customers.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header style={cardHeaderStyle}>Is there a loyalty program?</Accordion.Header>
        <Accordion.Body style={cardBodyStyle}>
          Yes, we offer a loyalty program where frequent travelers can earn points for each booking and redeem them for discounts, upgrades, and other benefits.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="4">
        <Accordion.Header style={cardHeaderStyle}>Can I cancel or modify my booking?</Accordion.Header>
        <Accordion.Body style={cardBodyStyle}>
          Yes, you can cancel or modify your booking depending on the fare rules and conditions of your ticket. Simply log in to your account or contact our customer support for assistance.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default AccordionQuestions;