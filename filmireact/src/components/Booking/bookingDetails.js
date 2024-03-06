import React from 'react';

function bookingDetails() {
  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  };

  const headingStyle = {
    textAlign: 'center',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>You have reached Booking details</h1>
    </div>
  );
}

export default bookingDetails;
