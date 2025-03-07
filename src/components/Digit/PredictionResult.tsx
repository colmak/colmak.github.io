'use client';

import React from 'react';

interface PredictionResultProps {
  prediction: {
    digit: number | null;
    confidence: number | null;
    processing: boolean;
  };
}

const PredictionResult: React.FC<PredictionResultProps> = ({ prediction }) => {
  const { digit, confidence, processing } = prediction;

  return (
    <div style={{ 
      flex: 2,
      textAlign: 'center',
      padding: '24px',
      background: '#f8f9fa',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
    }}>
      {processing ? (
        <p>Analyzing...</p>
      ) : digit !== null && confidence !== null ? (
        <>
          <div style={{ 
            fontSize: '72px', 
            fontWeight: 'bold',
            color: '#2d3436'
          }}>
            {digit}
          </div>
          <div style={{ 
            fontSize: '14px',
            color: confidence > 70 ? '#27ae60' : 
                  confidence > 40 ? '#f39c12' : '#e74c3c'
          }}>
            Confidence: {confidence}%
          </div>
        </>
      ) : (
        <p>Draw a digit and click Recognize</p>
      )}
    </div>
  );
};

export default PredictionResult;