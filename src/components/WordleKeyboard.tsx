"use client";

import React from "react";
import { useWordleContext } from "~/contexts/WordleContext";

const WordleKeyboard: React.FC = () => {
  const { letterStatus, handleKeyPress } = useWordleContext();

  const keyboardRows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["↵", "Z", "X", "C", "V", "B", "N", "M", "⌦"],
  ];

  return (
    <div className="mx-auto mt-4 grid grid-cols-1 grid-rows-3 gap-1">
      {keyboardRows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="slide-enter-content flex justify-center gap-1"
        >
          {row.map((letter, index) => (
            <div
              key={index}
              id={String(rowIndex * row.length + index)}
              className={`grid-item flex h-12 w-12 cursor-pointer items-center justify-center rounded p-3 font-bold ${
                letterStatus[letter] === "correct"
                  ? "bg-green-500 text-white"
                  : letterStatus[letter] === "present"
                  ? "bg-yellow-500 text-white"
                  : letterStatus[letter] === "incorrect"
                  ? "bg-gray-500 text-white"
                  : "bg-gray-300 text-black dark:bg-gray-500 dark:text-white"
              }`}
              onClick={() => handleKeyPress(letter)}
            >
              {letter}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default WordleKeyboard;
