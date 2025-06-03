import React from 'react';

interface WordleBoardProps {
  wordleRows: string[][];
  isRowSubmitted: boolean[];
  letterColors: string[][];
  currentRow: number;
  lastPressedKey: number;
}

const WordleBoard: React.FC<WordleBoardProps> = ({
  wordleRows,
  isRowSubmitted,
  letterColors,
  currentRow,
  lastPressedKey,
}) => {
  return (
    <div className="mx-auto grid grid-cols-1 grid-rows-6 gap-1">
          {wordleRows.map((row, rowIndex) => (
            <div key={rowIndex} className="slide-enter-content flex gap-1">
              {row.map((letter, index) => (
                <div
                  key={index}
                  id={String(rowIndex * row.length + index)}
                  className={`grid-item flex h-16 w-16 items-center justify-center p-3 text-3xl sm:h-14 sm:w-14 ${
                    letter !== " " ? "font-bold" : ""
                  } ${
                    isRowSubmitted[rowIndex]
                      ? letterColors[rowIndex]?.[index] === "green"
                        ? "bg-green-500 text-white"
                        : letterColors[rowIndex]?.[index] === "yellow"
                        ? "bg-yellow-500 text-white"
                        : "border-0 bg-gray-500 text-white"
                      : "border-2 border-gray-300 bg-white text-black dark:border-gray-600 dark:bg-black dark:text-white"
                  } ${
                    rowIndex === currentRow && index === lastPressedKey
                      ? "scaleUp"
                      : ""
                  }`}
                >
                  {letter}
                </div>
              ))}
            </div>
          ))}
        </div>
  );
};

export default React.memo(WordleBoard);
