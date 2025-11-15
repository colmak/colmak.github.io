/**
 * Data structures for perfect squared squares
 * Each square is represented by its position (x, y) and size
 */

export interface Square {
  x: number;
  y: number;
  size: number;
  label?: string;
}

export interface SquaredSquareData {
  name: string;
  order: number; // Number of squares
  size: number; // Total size of the squared square
  type: 'simple' | 'compound';
  description: string;
  squares: Square[];
  discoveryYear?: number;
  discoveredBy?: string;
}

/**
 * Duijvestijn's Square - The smallest simple perfect squared square (Order 21)
 * Discovered by A.J.W. Duijvestijn in 1978
 * Bouwkamp code: 21 112 112 50 35 27 8 19 15 17 11 6 24 29 25 9 2 7 18 16 42 4 37 33
 */
export const duijvestijnSquare: SquaredSquareData = {
  name: "Duijvestijn's Square",
  order: 21,
  size: 112,
  type: 'simple',
  description: "The smallest known simple perfect squared square, discovered by A.J.W. Duijvestijn in 1978 using computer search.",
  discoveryYear: 1978,
  discoveredBy: "A.J.W. Duijvestijn",
  squares: [
    { x: 0, y: 0, size: 50 },
    { x: 50, y: 0, size: 35 },
    { x: 85, y: 0, size: 27 },
    { x: 85, y: 27, size: 8 },
    { x: 93, y: 27, size: 19 },
    { x: 50, y: 35, size: 15 },
    { x: 65, y: 35, size: 17 },
    { x: 82, y: 35, size: 11 },
    { x: 82, y: 46, size: 6 },
    { x: 88, y: 46, size: 24 },
    { x: 0, y: 50, size: 29 },
    { x: 29, y: 50, size: 25 },
    { x: 54, y: 50, size: 9 },
    { x: 63, y: 50, size: 2 },
    { x: 63, y: 52, size: 7 },
    { x: 70, y: 52, size: 18 },
    { x: 54, y: 59, size: 16 },
    { x: 70, y: 70, size: 42 },
    { x: 29, y: 75, size: 4 },
    { x: 33, y: 75, size: 37 },
    { x: 0, y: 79, size: 33 },
  ],
};

/**
 * Simple perfect squared square of order 22, size 110
 * Bouwkamp code: (60,50)(23,27)(24,22,14)(7,16)(8,6)(12,15)(13)(2,28)(26)(4,21,3)(18)(17)
 */
export const simpleOrder22: SquaredSquareData = {
  name: "Simple Perfect Square (Order 22)",
  order: 22,
  size: 110,
  type: 'simple',
  description: "A simple perfect squared square with 22 elements.",
  squares: [
    { x: 0, y: 0, size: 60 },
    { x: 60, y: 0, size: 50 },
    { x: 60, y: 50, size: 23 },
    { x: 83, y: 50, size: 27 },
    { x: 0, y: 60, size: 24 },
    { x: 24, y: 60, size: 22 },
    { x: 46, y: 60, size: 14 },
    { x: 60, y: 73, size: 7 },
    { x: 67, y: 73, size: 16 },
    { x: 46, y: 74, size: 8 },
    { x: 54, y: 74, size: 6 },
    { x: 83, y: 77, size: 12 },
    { x: 95, y: 77, size: 15 },
    { x: 54, y: 80, size: 13 },
    { x: 24, y: 82, size: 2 },
    { x: 26, y: 82, size: 28 },
    { x: 0, y: 84, size: 26 },
    { x: 67, y: 89, size: 4 },
    { x: 71, y: 89, size: 21 },
    { x: 92, y: 89, size: 3 },
    { x: 92, y: 92, size: 18 },
    { x: 54, y: 93, size: 17 },
  ],
};

/**
 * The smallest compound perfect squared square (Order 24, Size 175)
 * This is the only compound perfect squared square of order 24
 * Bouwkamp code: (55,39,81)(16,9,14)(4,5)(3,1)(20)(56,18)(38)(30,51)(64,31,29)(8,43)(2,35)(33)
 */
export const compoundOrder24: SquaredSquareData = {
  name: "Compound Perfect Square (Order 24)",
  order: 24,
  size: 175,
  type: 'compound',
  description: "The smallest compound perfect squared square, the only one of order 24.",
  squares: [
    { x: 0, y: 0, size: 55 },
    { x: 55, y: 0, size: 39 },
    { x: 94, y: 0, size: 81 },
    { x: 55, y: 39, size: 16 },
    { x: 71, y: 39, size: 9 },
    { x: 80, y: 39, size: 14 },
    { x: 71, y: 48, size: 4 },
    { x: 75, y: 48, size: 5 },
    { x: 71, y: 52, size: 3 },
    { x: 74, y: 52, size: 1 },
    { x: 74, y: 53, size: 20 },
    { x: 0, y: 55, size: 56 },
    { x: 56, y: 55, size: 18 },
    { x: 56, y: 73, size: 38 },
    { x: 94, y: 81, size: 30 },
    { x: 124, y: 81, size: 51 },
    { x: 0, y: 111, size: 64 },
    { x: 64, y: 111, size: 31 },
    { x: 95, y: 111, size: 29 },
    { x: 124, y: 132, size: 8 },
    { x: 132, y: 132, size: 43 },
    { x: 95, y: 140, size: 2 },
    { x: 97, y: 140, size: 35 },
    { x: 64, y: 142, size: 33 },
  ],
};

/**
 * All available squared squares for the visualizer
 */
export const allSquaredSquares: SquaredSquareData[] = [
  duijvestijnSquare,
  simpleOrder22,
  compoundOrder24,
];

/**
 * Get a random color for a square based on its size
 */
export function getColorForSize(size: number, maxSize: number): string {
  const hue = (size / maxSize) * 280; // Range from 0 to 280 (red to blue)
  return `hsl(${hue}, 70%, 65%)`;
}

/**
 * Get a contrasting text color for a given background
 */
export function getContrastColor(size: number, maxSize: number): string {
  return size / maxSize > 0.5 ? '#ffffff' : '#000000';
}
