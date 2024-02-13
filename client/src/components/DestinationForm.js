import React, { useState, useEffect } from 'react';

const DestinationForm = () => {
    const [formData, setFormData] = useState({
        departure: '',
        arrival: '',
        flight_id: ''
    });

    const [selectedDestinationId, setSelectedDestinationId] = useState('');
    const [flights, setFlights] = useState([]);
    const [destinations, setDestinations] = useState([]);

    useEffect(() => {
        // Fetch flights data
        fetch('/flights')
            .then(response => response.json())
            .then(data => setFlights(data))
            .catch(error => console.error('Error fetching flights:', error));

        // Fetch destinations data
        fetch('/destinations')
            .then(response => response.json())
            .then(data => setDestinations(data))
            .catch(error => console.error('Error fetching destinations:', error));
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
            const response = await fetch('/destinations', {
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
            console.log('Destination created successfully:', data);

            
            setFormData({
                departure: '',
                arrival: '',
                flight_id: ''
            });
        } catch (error) {
            console.error('Error creating destination:', error.message);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`/destinations/${selectedDestinationId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Destination deleted successfully:', data);
        } catch (error) {
            console.error('Error deleting destination:', error.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="departure" style={{ display: 'block', marginBottom: '5px' }}>Departure:</label>
                    <input 
                        type="text" 
                        id="departure" 
                        name="departure" 
                        value={formData.departure} 
                        onChange={handleChange} 
                        required 
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="arrival" style={{ display: 'block', marginBottom: '5px' }}>Arrival:</label>
                    <input 
                        type="text" 
                        id="arrival" 
                        name="arrival" 
                        value={formData.arrival} 
                        onChange={handleChange} 
                        required 
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="flight_id" style={{ display: 'block', marginBottom: '5px' }}>Flight:</label>
                    <select 
                        id="flight_id" 
                        name="flight_id" 
                        value={formData.flight_id} 
                        onChange={handleChange} 
                        required 
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                    >
                        <option value="">Select Flight</option>
                        {flights.map(flight => (
                            <option key={flight.id} value={flight.id}>{flight.flight_number}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" style={{ width: '100%', padding: '10px', border: 'none', borderRadius: '5px', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }}>Submit</button>
            </form>
            <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
                <h2>Delete Destination</h2>
                <select
                    value={selectedDestinationId}
                    onChange={(e) => setSelectedDestinationId(e.target.value)}
                    style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', width: '100%' }}
                >
                    <option value="">Select Destination to Delete</option>
                    {destinations.map(destination => (
                        <option key={destination.id} value={destination.id}>{destination.departure} to {destination.arrival}</option>
                    ))}
                </select>
                <button onClick={handleDelete} style={{ padding: '10px', border: 'none', borderRadius: '5px', backgroundColor: 'red', color: '#fff', cursor: 'pointer' }}>Delete</button>
            </div>
        </div>
    );
};

export default DestinationForm;