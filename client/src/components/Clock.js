import React, { useState, useEffect } from 'react';

const clockStyle = {
  textAlign: 'center',
  margin: '20px auto',
  maxWidth: '1000px', 
  padding: '30px', 
  borderRadius: '10px',
  background: 'linear-gradient(to bottom, #ffcc80, #bbdefb)',
  color: 'white',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
};

const headingStyle = {
  fontSize: '28px',
  marginBottom: '30px', 
  fontFamily: 'Arial, sans-serif',
  textTransform: 'uppercase',
};

const timeStyle = {
  fontSize: '56px',
  fontFamily: 'Arial, sans-serif',
  fontWeight: 'bold',
  letterSpacing: '2px',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
  margin: 0,
};

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={clockStyle}>
      <h2 style={headingStyle}>Current Time</h2>
      <p style={timeStyle}>{time.toLocaleTimeString([], { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
      <p style={{ fontSize: '18px', margin: 0 }}>Local Timezone</p>
    </div> 
  );
}

export default Clock;