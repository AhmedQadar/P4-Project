import React, { useState, useEffect } from 'react';
import { FaPlaneDeparture, FaPlaneArrival } from 'react-icons/fa';

function Destinations() {
  const containerStyle = {
    background: 'linear-gradient(to bottom, #f5f5f5, #e0e0e0)',
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
  };

  const cardStyle = {
    width: '30%',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    marginBottom: '20px',
    backgroundColor: '#fff',
    margin: '0 10px',
    textAlign: 'left',
    transition: 'transform 0.3s ease',
  };

  const buttonStyle = {
    background: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
  };

  const iconStyle = {
    marginRight: '8px',
    verticalAlign: 'middle',
  };

  const badgeStyle = {
    backgroundColor: '#2196F3',
    color: '#fff',
    padding: '4px 8px',
    borderRadius: '4px',
    marginLeft: '8px',
  };

  const [destinationsWithFlights, setDestinationsWithFlights] = useState([]);

  useEffect(() => {
    fetch('/destinations-with-flights')
      .then(response => response.json())
      .then(data => {
       
        const limitedData = data.slice(0, 5);
        setDestinationsWithFlights(limitedData);
      })
      .catch(error => {
        console.error('Error fetching destinations with flights:', error);
      });
  }, []);

  return (
    <div style={containerStyle}>
      {destinationsWithFlights.map(destination => {
        return (
          <div key={destination.id} className="destination-card" style={cardStyle}>
           
            <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
              <FaPlaneDeparture style={{ ...iconStyle, color: '#FF5722' }} />
              <p style={{ margin: 0 }}><strong>Departure:</strong> {destination.departure}</p>
            </div>
            <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
              <FaPlaneArrival style={{ ...iconStyle, color: '#2196F3' }} />
              <p style={{ margin: 0 }}><strong>Arrival:</strong> {destination.arrival}</p>
            </div>
            <p style={{ marginBottom: '10px' }}><strong>Flight Number:</strong> {destination.flight_number}</p>
            <p style={{ marginBottom: '10px' }}><strong>Airways:</strong> {destination.airways}</p>
            <p style={{ marginBottom: '10px' }}><strong>Departure Date:</strong> {destination.departure_date}</p>
            <p style={{ marginBottom: '10px' }}><strong>Time:</strong> {destination.time}</p>
            
          </div>
        );
      })}
      <style jsx>{`
        .destination-card:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}

export default Destinations;