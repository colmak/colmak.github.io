'use client';

import React from 'react';

const LoadingState: React.FC = () => {
  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '0 auto', 
      padding: '20px',
      textAlign: 'center'
    }}>
      <h1>MNIST Digit Recognizer</h1>
      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        background: '#f5f5f5',
        borderRadius: '8px'
      }}>
        <div style={{ 
          width: '40px', 
          height: '40px', 
          border: '4px solid #ddd',
          borderTopColor: '#3498db',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <p style={{ marginTop: '16px' }}>Loading TensorFlow.js and model...</p>
        <style jsx>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default LoadingState;