'use client';

import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={{ 
      marginTop: '32px',
      textAlign: 'center',
      fontSize: '12px',
      color: '#b2bec3'
    }}>
      <p>This application uses TensorFlow.js and a pre-trained MNIST model.</p>
      <p style={{ marginTop: '4px' }}>
        The MNIST dataset contains 28x28 pixel grayscale images of handwritten digits.
      </p>
    </footer>
  );
};

export default Footer;