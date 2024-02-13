import React, { useState, useEffect } from 'react';

const FlightForm = () => {
    const [formData, setFormData] = useState({
        flight_number: '',
        airways: '',
        departure_date: '',
        price: '',
        time: '',
        pilot_id: ''
    });

    const [pilots, setPilots] = useState([]);
    const [flights, setFlights] = useState([]);
    const [selectedFlightId, setSelectedFlightId] = useState('');

    useEffect(() => {
       
        fetch('/pilots')
            .then(response => response.json())
            .then(data => setPilots(data))
            .catch(error => console.error('Error fetching pilots:', error));

        
        fetch('/flights')
            .then(response => response.json())
            .then(data => setFlights(data))
            .catch(error => console.error('Error fetching flights:', error));
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/flights', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Flight created successfully:', data);

            
            setFormData({
                flight_number: '',
                airways: '',
                departure_date: '',
                price: '',
                time: '',
                pilot_id: ''
            });
        } catch (error) {
            console.error('Error creating flight:', error.message);
        }
    };

    const handleDeleteFlight = async () => {
        try {
            const response = await fetch(`/flights/${selectedFlightId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Flight deleted successfully:', data);

            
            setFlights(flights.filter(flight => flight.id !== selectedFlightId));
        } catch (error) {
            console.error('Error deleting flight:', error.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="flight_number" style={{ display: 'block', marginBottom: '5px' }}>Flight Number:</label>
                    <input 
                        type="text" 
                        id="flight_number" 
                        name="flight_number" 
                        value={formData.flight_number} 
                        onChange={handleChange} 
                        required 
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="airways" style={{ display: 'block', marginBottom: '5px' }}>Airways:</label>
                    <input 
                        type="text" 
                        id="airways" 
                        name="airways" 
                        value={formData.airways} 
                        onChange={handleChange} 
                        required 
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="departure_date" style={{ display: 'block', marginBottom: '5px' }}>Departure Date:</label>
                    <input 
                        type="text" 
                        id="departure_date" 
                        name="departure_date" 
                        value={formData.departure_date} 
                        onChange={handleChange} 
                        required 
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="price" style={{ display: 'block', marginBottom: '5px' }}>Price:</label>
                    <input 
                        type="text" 
                        id="price" 
                        name="price" 
                        value={formData.price} 
                        onChange={handleChange} 
                        required 
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="time" style={{ display: 'block', marginBottom: '5px' }}>Time:</label>
                    <input 
                        type="text" 
                        id="time" 
                        name="time" 
                        value={formData.time} 
                        onChange={handleChange} 
                        required 
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="pilot_id" style={{ display: 'block', marginBottom: '5px' }}>Pilot:</label>
                    <select 
                        id="pilot_id" 
                        name="pilot_id" 
                        value={formData.pilot_id} 
                        onChange={handleChange} 
                        required 
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                    >
                        <option value="">Select Pilot</option>
                        {pilots.map(pilot => (
                            <option key={pilot.id} value={pilot.id}>{pilot.name}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" style={{ width: '100%', padding: '10px', border: 'none', borderRadius: '5px', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }}>Submit</button>
            </form>

            <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
                <h2>Delete Flight</h2>
                <select
                    value={selectedFlightId}
                    onChange={(e) => setSelectedFlightId(e.target.value)}
                    style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', width: '100%' }}
                >
                    <option value="">Select Flight to Delete</option>
                    {flights.map(flight => (
                        <option key={flight.id} value={flight.id}>{flight.flight_number}</option>
                    ))}
                </select>
                <button onClick={handleDeleteFlight} style={{ padding: '10px', border: 'none', borderRadius: '5px', backgroundColor: '#dc3545', color: '#fff', cursor: 'pointer', width: '100%' }}>Delete Flight</button>
            </div>
        </div>
    );
};

export default FlightForm;