import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { FaPlane, FaCheckCircle, FaLeaf, FaUser } from 'react-icons/fa';
import { Card } from 'react-bootstrap';


function AboutUsCarousel() {
  const carouselContentStyle = {
    textAlign: 'center',
    padding: '20px',
    borderRadius: '10px', 
    background: 'rgba(255, 255, 255, 0.3)', 
    color: '#000',
    margin: '100px'
  };

  const headingStyle = {
    fontFamily: 'Arial, sans-serif',
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textTransform: 'uppercase', 
    letterSpacing: '1px', 
  };

  const paragraphStyle = {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '16px',
    lineHeight: '1.6',
    marginBottom: '10px', 
  };

  const boldText = {
    fontWeight: 'bold', 
  };

  const iconStyle = {
    color: '#000', 
    fontSize: '60px',
    marginBottom: '10px',
  };

  return (
    <Card style={{ background: 'linear-gradient(45deg, #FF9D6C, #BB4E75)', padding: '20px', margin: '20px', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
     
      <Carousel>
        <Carousel.Item>
          <div style={carouselContentStyle}>
            <FaPlane style={iconStyle} />
            <h2 style={headingStyle}>Our Mission</h2>
            <p style={paragraphStyle}>
              Our mission is to provide <span style={boldText}>accessible</span> and <span style={boldText}>efficient</span> air travel solutions using small aircraft that are environmentally friendly. We aim to make air travel hassle-free and convenient for our customers while minimizing our <span style={boldText}>carbon footprint</span>.
            </p>
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div style={carouselContentStyle}>
            <FaCheckCircle style={iconStyle} />
            <h2 style={headingStyle}>Our Objectives</h2>
            <p style={paragraphStyle}>
              - To offer reliable and on-time flights to our customers. <br />
              - To maintain a fleet of modern and fuel-efficient aircraft. <br />
              - To prioritize customer satisfaction and safety above all else.
            </p>
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div style={carouselContentStyle}>
            <FaLeaf style={iconStyle} />
            <h2 style={headingStyle}>Climate-Friendly Operations</h2>
            <p style={paragraphStyle}>
              We are committed to sustainability and reducing our environmental impact. Our aircraft are designed to be fuel-efficient and emit lower levels of greenhouse gases compared to traditional aircraft. Additionally, we offset our carbon emissions through various initiatives such as tree planting and investment in renewable energy projects.
            </p>
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div style={carouselContentStyle}>
            <FaUser style={iconStyle} />
            <h2 style={headingStyle}>Customer Policy</h2>
            <p style={paragraphStyle}>
              - <span style={boldText}>Booking</span>: Customers can easily book flights through our website or mobile app. We offer flexible booking options and strive to provide competitive prices. <br />
              - <span style={boldText}>Cancellation and Refunds</span>: We understand that plans can change. Customers can cancel or modify their bookings within a specified timeframe, subject to our cancellation policy. Refunds are issued according to the terms and conditions outlined during the booking process. <br />
              - <span style={boldText}>Baggage Policy</span>: We have a transparent baggage policy that outlines the allowed baggage allowance and any additional charges for excess baggage. We prioritize the safety and comfort of our passengers and ensure that their luggage is handled with care. <br />
              - <span style={boldText}>Customer Service</span>: Our dedicated customer service team is available to assist customers with any inquiries or concerns before, during, and after their flights. We strive to provide exceptional service and resolve any issues promptly.
            </p>
          </div>
        </Carousel.Item>
      </Carousel>
    </Card>
  );
}

export default AboutUsCarousel;
