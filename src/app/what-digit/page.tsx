'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const DigitCanvas = ({ onPredict }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const isDrawing = useRef(false);
  const [canvasReady, setCanvasReady] = useState(false);

  // Initialize canvas when component mounts
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas dimensions to match display size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    
    // Get and configure context
    const context = canvas.getContext('2d', { willReadFrequently: true });
    context.lineCap = 'round';
    context.lineJoin = 'round';
    // Using a pen size approximately 1/28th of the canvas width to match MNIST scale
    const penSize = rect.width / 28;
    context.lineWidth = penSize;
    context.strokeStyle = 'white';
    
    // Fill background
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    contextRef.current = context;
    setCanvasReady(true);
  }, []);

  // Clear the canvas
  const clearCanvas = useCallback(() => {
    if (!contextRef.current) return;
    contextRef.current.fillStyle = 'black';
    contextRef.current.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  }, []);

  // Start drawing on mouse/touch down
  const handleStart = useCallback((e) => {
    e.preventDefault();
    
    const { offsetX, offsetY } = getCoordinates(e, canvasRef.current);
    
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    
    // Instead of drawing a large circle, just draw a small point matching the pen size
    // Use the same size as the stroke for consistency
    contextRef.current.lineTo(offsetX + 0.1, offsetY + 0.1); // Tiny movement to create a dot
    contextRef.current.stroke();
    
    isDrawing.current = true;
  }, []);

  // Continue drawing on mouse/touch move
  const handleMove = useCallback((e) => {
    if (!isDrawing.current) return;
    e.preventDefault();
    
    const { offsetX, offsetY } = getCoordinates(e, canvasRef.current);
    
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  }, []);

  // Stop drawing on mouse/touch up or leave
  const handleEnd = useCallback(() => {
    if (!isDrawing.current) return;
    contextRef.current.closePath();
    isDrawing.current = false;
  }, []);

  // Get the canvas and run the prediction
  const runPrediction = useCallback(() => {
    if (!canvasRef.current) return;
    onPredict(canvasRef.current);
  }, [onPredict]);

  return (
    <div className="digit-canvas-container">
      <canvas
        ref={canvasRef}
        style={{
          width: '280px',
          height: '280px',
          touchAction: 'none',
          background: 'black',
          borderRadius: '8px',
          border: '2px solid #444',
          cursor: 'crosshair',
        }}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
        onTouchCancel={handleEnd}
      />
      <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
        <button
          onClick={clearCanvas}
          style={{
            flex: 1,
            padding: '10px 16px',
            background: '#ff4757',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Clear
        </button>
        <button
          onClick={runPrediction}
          style={{
            flex: 1,
            padding: '10px 16px',
            background: '#2ed573',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Recognize
        </button>
      </div>
    </div>
  );
};

// Helper function to get coordinates regardless of event type
function getCoordinates(event, element) {
  const rect = element.getBoundingClientRect();
  
  // Handle touch events
  if (event.touches && event.touches[0]) {
    return {
      offsetX: event.touches[0].clientX - rect.left,
      offsetY: event.touches[0].clientY - rect.top
    };
  }
  
  // Handle mouse events
  return {
    offsetX: event.clientX - rect.left,
    offsetY: event.clientY - rect.top
  };
}

// Modified preprocessing function to better match MNIST format
function preprocessCanvas(sourceCanvas, tf) {
  return new Promise((resolve) => {
    // Create a temporary canvas at exact MNIST dimensions
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = 28;
    tempCanvas.height = 28;
    const tempCtx = tempCanvas.getContext('2d');
    
    // Fill with black background (MNIST expects white digits on black background)
    tempCtx.fillStyle = 'black';
    tempCtx.fillRect(0, 0, 28, 28);
    
    // First, detect the bounding box of the drawing
    const sourceCtx = sourceCanvas.getContext('2d');
    const imageData = sourceCtx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);
    const { data, width, height } = imageData;
    
    let minX = width;
    let minY = height;
    let maxX = 0;
    let maxY = 0;
    let foundPixel = false;
    
    // Find the bounding box of the digit
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const alpha = data[(y * width + x) * 4 + 3]; // Alpha channel
        const r = data[(y * width + x) * 4]; // Red channel
        if (alpha > 0 && r > 0) { // Check if pixel is not black and visible
          foundPixel = true;
          minX = Math.min(minX, x);
          minY = Math.min(minY, y);
          maxX = Math.max(maxX, x);
          maxY = Math.max(maxY, y);
        }
      }
    }
    
    // If no pixel is found, return a tensor of zeros
    if (!foundPixel) {
      // Return a tensor with all zeros (black)
      const emptyTensor = tf.zeros([28, 28, 1]);
      resolve(emptyTensor);
      return;
    }
    
    // Calculate the bounding box dimensions with padding
    const padding = 4;
    const boxWidth = maxX - minX + 2 * padding;
    const boxHeight = maxY - minY + 2 * padding;
    
    // Calculate scale to maintain aspect ratio
    const scale = Math.min(20 / boxWidth, 20 / boxHeight);
    
    // Calculate centering offsets to place the digit in the center of 28x28 canvas
    const offsetX = (28 - boxWidth * scale) / 2;
    const offsetY = (28 - boxHeight * scale) / 2;
    
    // Draw the digit, centered and scaled
    tempCtx.save();
    tempCtx.translate(offsetX, offsetY);
    tempCtx.scale(scale, scale);
    tempCtx.drawImage(
      sourceCanvas,
      minX - padding, minY - padding, boxWidth, boxHeight,
      0, 0, boxWidth, boxHeight
    );
    tempCtx.restore();
    
    // Convert to tensor and normalize
    const tensor = tf.browser.fromPixels(tempCanvas, 1);
    
    // Normalize to 0-1 range (MNIST expects white digits on black background, value 0-1)
    const normalized = tensor.div(tf.scalar(255));
    
    resolve(normalized);
  });
}

export default function DigitRecognizer() {
  const [modelState, setModelState] = useState({
    tf: null,
    model: null,
    status: 'loading', // 'loading', 'ready', 'error'
    error: null
  });
  
  const [prediction, setPrediction] = useState({
    digit: null,
    confidence: null,
    processing: false
  });
  
  const [history, setHistory] = useState([]);

  // Load TensorFlow.js and the model
  useEffect(() => {
    let isMounted = true;
    
    async function initialize() {
      try {
        // Load TensorFlow
        const tf = await import('@tensorflow/tfjs');
        
        if (!isMounted) return;
        
        // Load model
        try {
          // Enable debug mode to see model information
          tf.enableDebugMode();
          
          const model = await tf.loadLayersModel('/mnist/model.json');
          
          if (!isMounted) return;
          
          // Check model information
          console.log('Model loaded successfully:', model);
          console.log('Model summary:', model.summary());
          console.log('Input shape:', model.inputs[0].shape);
          console.log('Output shape:', model.outputs[0].shape);
          
          setModelState({
            tf,
            model,
            status: 'ready',
            error: null
          });
        } catch (modelError) {
          console.error('Failed to load model:', modelError);
          if (isMounted) {
            setModelState(prev => ({
              ...prev,
              tf,
              status: 'error',
              error: 'Failed to load the digit recognition model. Please check your network connection.'
            }));
          }
        }
      } catch (tfError) {
        console.error('Failed to load TensorFlow:', tfError);
        if (isMounted) {
          setModelState(prev => ({
            ...prev,
            status: 'error',
            error: 'Failed to load TensorFlow.js. Please check your network connection or try a different browser.'
          }));
        }
      }
    }
    
    initialize();
    
    return () => {
      isMounted = false;
    };
  }, []);

  // Handle prediction
  const handlePredict = useCallback(async (canvas) => {
    const { tf, model, status } = modelState;
    
    if (status !== 'ready' || !tf || !model) {
      return;
    }
    
    setPrediction(prev => ({ ...prev, processing: true }));
    
    try {
      // Use the enhanced preprocessing function
      const processedInput = await preprocessCanvas(canvas, tf);
      
      // Log the shape to verify
      console.log('Processed input shape:', processedInput.shape);
      
      // Reshape to match model input shape [1, 784]
      const flattened = processedInput.reshape([1, 28 * 28]);
      
      // Make prediction
      const output = model.predict(flattened);
      
      // Get prediction data
      const probabilities = await output.data();
      
      // Log raw probabilities for debugging
      console.log('Raw probabilities:', Array.from(probabilities));
      
      // Calculate softmax to get proper probabilities
      const softmax = tf.softmax(output);
      const softmaxData = await softmax.data();
      
      // Find digit with highest probability
      const predictedDigit = Array.from(softmaxData).indexOf(Math.max(...softmaxData));
      
      // Calculate confidence (probability as percentage)
      const confidence = Math.round(softmaxData[predictedDigit] * 100);
      
      // Add to history
      setHistory(prev => [
        { digit: predictedDigit, confidence, timestamp: new Date() },
        ...prev.slice(0, 4) // Keep only last 5 predictions
      ]);
      
      // Update prediction state
      setPrediction({
        digit: predictedDigit,
        confidence,
        processing: false
      });
      
      // Clean up tensors
      tf.dispose([processedInput, flattened, output, softmax]);
    } catch (error) {
      console.error('Prediction error:', error);
      setPrediction({
        digit: null,
        confidence: null,
        processing: false
      });
    }
  }, [modelState]);

  // Show loading state
  if (modelState.status === 'loading') {
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
  }

  // Show error state
  if (modelState.status === 'error') {
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
          <p>{modelState.error || 'Failed to initialize the application.'}</p>
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
  }

  // Main application UI
  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '0 auto', 
      padding: '20px'
    }}>
      <header style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h1 style={{ 
          fontSize: '32px', 
          background: 'linear-gradient(45deg, #3498db, #8e44ad)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text', 
          color: 'transparent',
          marginBottom: '8px'
        }}>
          MNIST Digit Recognizer
        </h1>
        <p style={{ color: '#666' }}>
          Draw a digit (0-9) in the box below and click Recognize
        </p>
      </header>

      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        gap: '24px'
      }}>
        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <DigitCanvas onPredict={handlePredict} />
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '24px'
        }}>
          {/* Prediction Results */}
          <div style={{ 
            flex: 2,
            textAlign: 'center',
            padding: '24px',
            background: '#f8f9fa',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
          }}>
            {prediction.processing ? (
              <p>Analyzing...</p>
            ) : prediction.digit !== null ? (
              <>
                <div style={{ 
                  fontSize: '72px', 
                  fontWeight: 'bold',
                  color: '#2d3436'
                }}>
                  {prediction.digit}
                </div>
                <div style={{ 
                  fontSize: '14px',
                  color: prediction.confidence > 70 ? '#27ae60' : 
                         prediction.confidence > 40 ? '#f39c12' : '#e74c3c'
                }}>
                  Confidence: {prediction.confidence}%
                </div>
              </>
            ) : (
              <p>Draw a digit and click Recognize</p>
            )}
          </div>

          {/* History */}
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
        </div>
      </div>

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
    </div>
  );
}