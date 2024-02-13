import React, { useState, useEffect } from 'react';

const PilotForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: ''
    });

    const [selectedPilotId, setSelectedPilotId] = useState('');
    const [pilots, setPilots] = useState([]);

    useEffect(() => {
        // Fetch pilots data
        fetch('/pilots')
            .then(response => response.json())
            .then(data => setPilots(data))
            .catch(error => console.error('Error fetching pilots:', error));
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
            const response = await fetch('/pilots', {
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
            console.log('Pilot created successfully:', data);

            // Clear form fields
            setFormData({
                name: '',
                age: ''
            });
        } catch (error) {
            console.error('Error creating pilot:', error.message);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`/pilots/${selectedPilotId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Pilot deleted successfully:', data);
        } catch (error) {
            console.error('Error deleting pilot:', error.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>Name:</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="age" style={{ display: 'block', marginBottom: '5px' }}>Age:</label>
                    <input 
                        type="number" 
                        id="age" 
                        name="age" 
                        value={formData.age} 
                        onChange={handleChange} 
                        required 
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                    />
                </div>
                <button type="submit" style={{ width: '100%', padding: '10px', border: 'none', borderRadius: '5px', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }}>Submit</button>
            </form>
            <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
                <h2>Delete Pilot</h2>
                <select
                    value={selectedPilotId}
                    onChange={(e) => setSelectedPilotId(e.target.value)}
                    style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', width: '100%' }}
                >
                    <option value="">Select Pilot to Delete</option>
                    {pilots.map(pilot => (
                        <option key={pilot.id} value={pilot.id}>{pilot.name}</option>
                    ))}
                </select>
                <button onClick={handleDelete} style={{ padding: '10px', border: 'none', borderRadius: '5px', backgroundColor: 'red', color: '#fff', cursor: 'pointer' }}>Delete</button>
            </div>
        </div>
    );
};

export default PilotForm;