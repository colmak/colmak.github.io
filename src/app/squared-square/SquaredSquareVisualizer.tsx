"use client";

import { useState, useRef, useEffect } from 'react';
import { SquaredSquareData, getColorForSize, getContrastColor } from './squaredSquareData';

interface SquaredSquareVisualizerProps {
  data: SquaredSquareData;
  showLabels: boolean;
  showGrid: boolean;
}

export default function SquaredSquareVisualizer({ data, showLabels, showGrid }: SquaredSquareVisualizerProps) {
  const [scale, setScale] = useState(1);
  const [hoveredSquare, setHoveredSquare] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate the scale to fit the container
  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const padding = 40; // padding for labels and margins
      const newScale = (containerWidth - padding) / data.size;
      setScale(Math.min(newScale, 4)); // Cap at 4x scale for very small squares
    }
  }, [data.size]);

  const maxSize = Math.max(...data.squares.map(s => s.size));

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center">
      <div
        className="relative border-4 border-gray-800 dark:border-gray-200 shadow-2xl"
        style={{
          width: `${data.size * scale}px`,
          height: `${data.size * scale}px`,
        }}
      >
        {/* Grid lines */}
        {showGrid && (
          <svg
            className="absolute inset-0 pointer-events-none"
            style={{
              width: `${data.size * scale}px`,
              height: `${data.size * scale}px`,
            }}
          >
            {/* Vertical lines */}
            {Array.from({ length: data.size + 1 }, (_, i) => (
              <line
                key={`v-${i}`}
                x1={i * scale}
                y1={0}
                x2={i * scale}
                y2={data.size * scale}
                stroke="rgba(0,0,0,0.1)"
                strokeWidth="0.5"
              />
            ))}
            {/* Horizontal lines */}
            {Array.from({ length: data.size + 1 }, (_, i) => (
              <line
                key={`h-${i}`}
                x1={0}
                y1={i * scale}
                x2={data.size * scale}
                y2={i * scale}
                stroke="rgba(0,0,0,0.1)"
                strokeWidth="0.5"
              />
            ))}
          </svg>
        )}

        {/* Render squares */}
        {data.squares.map((square, index) => {
          const color = getColorForSize(square.size, maxSize);
          const textColor = getContrastColor(square.size, maxSize);
          const isHovered = hoveredSquare === index;

          return (
            <div
              key={index}
              className="absolute transition-all duration-200 cursor-pointer border border-gray-700 dark:border-gray-300"
              style={{
                left: `${square.x * scale}px`,
                top: `${square.y * scale}px`,
                width: `${square.size * scale}px`,
                height: `${square.size * scale}px`,
                backgroundColor: color,
                opacity: isHovered ? 0.8 : 1,
                transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                zIndex: isHovered ? 10 : 1,
              }}
              onMouseEnter={() => setHoveredSquare(index)}
              onMouseLeave={() => setHoveredSquare(null)}
            >
              {showLabels && (
                <div
                  className="flex h-full w-full items-center justify-center text-center font-bold"
                  style={{
                    color: textColor,
                    fontSize: `${Math.max(square.size * scale / 4, 10)}px`,
                  }}
                >
                  {square.size}
                </div>
              )}
              {isHovered && (
                <div
                  className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black dark:bg-white text-white dark:text-black px-2 py-1 rounded text-xs whitespace-nowrap z-20"
                >
                  Size: {square.size} | Position: ({square.x}, {square.y})
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      {hoveredSquare !== null && (
        <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm">
          <p><strong>Square #{hoveredSquare + 1}</strong></p>
          <p>Size: {data.squares[hoveredSquare]!.size}</p>
          <p>Position: ({data.squares[hoveredSquare]!.x}, {data.squares[hoveredSquare]!.y})</p>
        </div>
      )}
    </div>
  );
}
