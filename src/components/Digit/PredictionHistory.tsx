'use client';

import React from 'react';

interface PredictionItem {
  digit: number;
  confidence: number;
  timestamp: Date;
}

interface PredictionHistoryProps {
  history: PredictionItem[];
}

const PredictionHistory: React.FC<PredictionHistoryProps> = ({ history }) => {
  return (
    <div style={{ 
      flex: 3,
      padding: '16px',
      background: '#f8f9fa',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
    }}>
      <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#636e72' }}>Recent Predictions</h3>
      {history.length > 0 ? (
        <ul style={{ 
          listStyle: 'none',
          padding: 0,
          margin: 0,
          fontSize: '14px'
        }}>
          {history.map((item, index) => (
            <li key={index} style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              padding: '6px 0',
              borderBottom: index < history.length - 1 ? '1px solid #dfe6e9' : 'none'
            }}>
              <span>Digit: <strong>{item.digit}</strong></span>
              <span style={{
                color: item.confidence > 70 ? '#27ae60' : 
                      item.confidence > 40 ? '#f39c12' : '#e74c3c'
              }}>
                Confidence: {item.confidence}%
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ color: '#b2bec3', textAlign: 'center', fontSize: '14px' }}>
          No predictions yet
        </p>
      )}
    </div>
  );
};

export default PredictionHistory;