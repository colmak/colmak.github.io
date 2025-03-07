'use client';

import React from 'react';

interface ErrorStateProps {
  error: string | null;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '0 auto', 
      padding: '20px',
      textAlign: 'center'
    }}>
      <h1>MNIST Digit Recognizer</h1>
      <div style={{ 
        padding: '20px',
        background: '#ffefef',
        color: '#d63031',
        borderRadius: '8px',
        border: '1px solid #fab1a0'
      }}>
        <h2>Something went wrong</h2>
        <p>{error || 'Failed to initialize the application.'}</p>
        <button 
          onClick={() => window.location.reload()} 
          style={{
            marginTop: '16px',
            padding: '8px 16px',
            background: '#d63031',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorState;