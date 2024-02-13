import React, { useState, useEffect } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import Clock from './Clock'; 

const FlightsCards = () => {
  const [destinationsWithFlights, setDestinationsWithFlights] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [userInSession, setUserInSession] = useState(false);
  const [userBookedFlights, setUserBookedFlights] = useState([]);
  const [bookedTemporarily, setBookedTemporarily] = useState(null); // Updated to null
  const userDataFromStorage = JSON.parse(sessionStorage.getItem('user'));

  useEffect(() => {
    fetch('/destinations-with-flights')
      .then(response => response.json())
      .then(data => {
        setDestinationsWithFlights(data);
      })
      .catch(error => {
        console.error('Error fetching destinations with flights:', error);
      });
  
    setUserInSession(userDataFromStorage !== null);
  
    
    const bookedFlights = JSON.parse(localStorage.getItem('bookedFlights_' + userDataFromStorage?.id)) || [];
    setUserBookedFlights(bookedFlights);
  
    
    if (userDataFromStorage === null) {
      setUserBookedFlights([]);
      localStorage.removeItem('bookedFlights');
    }
  }, []);

  const handleBookNow = (flightData) => {
    if (!userDataFromStorage) {
      console.error('User data not found in sessionStorage');
      return;
    }
  
    const flight_number = flightData.flight_number;
    const flight_id = flightData.id;
    const passenger_id = userDataFromStorage.id;
  
    const requestData = {
      flight_number: flight_number, 
      passenger_id: passenger_id,
      flight_id: flight_id 
    };
  
    fetch('/update-association', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })
    .then(response => {
      
      markFlightAsBooked(flight_id);
      setBookedTemporarily(flight_id);
      setTimeout(() => {
        setBookedTemporarily(null);
      }, 3000);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const markFlightAsBooked = (flight_id) => {
    const bookedFlights = [...userBookedFlights, flight_id];
    setUserBookedFlights(bookedFlights);
    localStorage.setItem('bookedFlights_' + userDataFromStorage.id, JSON.stringify(bookedFlights));
  };

  const isFlightBooked = (flight_id) => {
    return userBookedFlights.some(flight => flight.flight_id === flight_id && flight.passenger_id === userDataFromStorage?.id);
  };


  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = destinationsWithFlights.slice(indexOfFirstItem, indexOfLastItem);

  
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const cardStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    marginTop: '100px',
    marginBottom: '20px',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '900px',
    margin: ' auto',
    background: 'linear-gradient(to bottom right, #ffffff, #f2f2f2)',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  };

  const infoStyle = {
    display: 'flex',
    justifyContent: 'space-between',
  };

  const labelStyle = {
    fontWeight: 'bold',
    marginRight: '5px',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '20px', marginBottom: '20px', background: 'linear-gradient(to bottom, #ffcc80, #bbdefb)' }}>

      <Clock />

      {currentItems.map((destinationWithFlight, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <div style={{ ...cardStyle, background: 'linear-gradient(to bottom right, #ffe0b2, #b3e5fc)' }}>
            <div style={headerStyle}>
              <div style={{ fontSize: '1.2em', fontWeight: 'bold' }}>{destinationWithFlight.flight_number}</div>
              <div style={{ fontSize: '1.2em' }}>{destinationWithFlight.airways}</div>
            </div>
            <div style={infoStyle}>
              <div>
                <div style={labelStyle}>Departure:</div>
                <div>{destinationWithFlight.departure_date}</div>
                <div>{destinationWithFlight.departure}</div>
              </div>
              <div>
                <div style={labelStyle}>Arrival:</div>
                <div>{destinationWithFlight.time}</div>
                <div>{destinationWithFlight.arrival}</div>
              </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '10px', color: '#888' }}>{destinationWithFlight.duration}</div>
            <button
              onClick={() => handleBookNow(destinationWithFlight)}
              style={{
                marginTop: '10px',
                backgroundColor: bookedTemporarily === destinationWithFlight.id ? 'gray' : (isFlightBooked(destinationWithFlight.id) ? 'gray' : 'green'),
                cursor: bookedTemporarily === destinationWithFlight.id ? 'not-allowed' : 'pointer',
                opacity: bookedTemporarily === destinationWithFlight.id ? 0.5 : 1,
                transition: 'background-color 0.3s ease'
              }}
              className="btn btn-light"
              disabled={bookedTemporarily === destinationWithFlight.id}
            >
              {bookedTemporarily === destinationWithFlight.id ? 'Booked' : (isFlightBooked(destinationWithFlight.id) ? 'Booked' : 'Book Now')}
            </button>
          </div>
        </div>
      ))}

      
      <Pagination style={{ justifyContent: 'center', marginTop: '20px', marginBottom: '20px' }}>
        {[...Array(Math.min(10, Math.ceil(destinationsWithFlights.length / itemsPerPage))).keys()].map(number => (
          <Pagination.Item
            key={number + 1}
            active={number + 1 === currentPage}
            onClick={() => paginate(number + 1)}
          >
            {number + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
};

export default FlightsCards;