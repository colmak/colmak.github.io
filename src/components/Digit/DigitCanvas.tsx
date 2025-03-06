'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface DigitCanvasProps {
  onPredict: (canvas: HTMLCanvasElement) => void;
}

interface Coordinates {
  offsetX: number;
  offsetY: number;
}

// Helper function to get coordinates regardless of event type
function getCoordinates(event: React.MouseEvent | React.TouchEvent, element: HTMLCanvasElement): Coordinates {
  const rect = element.getBoundingClientRect();
  
  // Handle touch events
  if ('touches' in event && event.touches[0]) {
    return {
      offsetX: event.touches[0].clientX - rect.left,
      offsetY: event.touches[0].clientY - rect.top
    };
  }
  
  // Handle mouse events
  if ('clientX' in event) {
    return {
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top
    };
  }
  
  // Fallback (shouldn't reach here)
  return { offsetX: 0, offsetY: 0 };
}

const DigitCanvas: React.FC<DigitCanvasProps> = ({ onPredict }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const isDrawing = useRef<boolean>(false);
  const [canvasReady, setCanvasReady] = useState<boolean>(false);

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
    if (!context) return;
    
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
  const clearCanvas = useCallback((): void => {
    if (!contextRef.current || !canvasRef.current) return;
    contextRef.current.fillStyle = 'black';
    contextRef.current.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  }, []);

  // Start drawing on mouse/touch down
  const handleStart = useCallback((e: React.MouseEvent | React.TouchEvent): void => {
    e.preventDefault();
    
    if (!contextRef.current || !canvasRef.current) return;
    
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
  const handleMove = useCallback((e: React.MouseEvent | React.TouchEvent): void => {
    if (!isDrawing.current || !contextRef.current || !canvasRef.current) return;
    e.preventDefault();
    
    const { offsetX, offsetY } = getCoordinates(e, canvasRef.current);
    
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  }, []);

  // Stop drawing on mouse/touch up or leave
  const handleEnd = useCallback((): void => {
    if (!isDrawing.current || !contextRef.current) return;
    contextRef.current.closePath();
    isDrawing.current = false;
  }, []);

  // Get the canvas and run the prediction
  const runPrediction = useCallback((): void => {
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

export default DigitCanvas;