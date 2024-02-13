import React from 'react';

const ScrollEffectComponent = () => {
  const containerStyle = {
    position: "relative",
    height: "100vh",
    overflow: "hidden",
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  const textContainerStyle = {
    position: "absolute",
    top: "50%",
    left: "10%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    color: "white",
  };

  const headerStyle = {
    fontSize: "10rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
    marginLeft: "38rem",
  };

  const paragraphStyle = {
    fontSize: "2rem",
    fontFamily: "Arial, sans-serif",
    width: "80%",
    margin: "0 auto",
    marginBottom: "1rem",
    marginLeft: "40rem",
  };

  const buttonStyle = {
    padding: "0.375rem 0.75rem",
    backgroundColor: "#FFC107",
    color: "black",
    borderRadius: "5px",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <img
        src="https://static.vecteezy.com/system/resources/previews/028/576/295/large_2x/airplane-flying-in-the-sky-over-the-city-at-sunset-business-travel-concept-airplane-in-flight-at-twilight-with-blurred-cityscape-ai-generated-free-photo.jpg"
        alt="background"
        style={imageStyle}
      />
      <div style={textContainerStyle}>
        <h1 style={headerStyle}>Flighter</h1>
        <p style={paragraphStyle}>
          We offer premium travel experiences that will take you to the most breathtaking destinations around the world.
        </p>
        <button style={buttonStyle}>Explore Now</button>
      </div>
    </div>
  );
};

export default ScrollEffectComponent;