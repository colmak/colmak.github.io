"use client";

import React, { useEffect } from "react";
import WordleBoard from "./WordleBoard";
import WordleKeyboard from "./WordleKeyboard";
import { useWordleContext } from "~/contexts/WordleContext";

const WordleGame: React.FC = () => {
  const {
    wordleRows,
    isRowSubmitted,
    letterColors,
    currentRow,
    lastPressedKey,
    handleKeyPress,
    generateShareableResult,
  } = useWordleContext();

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();
      handleKeyPress(key);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyPress]);

  return (
    <div
      className="container mx-auto flex max-w-screen-sm flex-col items-start justify-start gap-0.5"
      tabIndex={0}
    >
      <WordleBoard
        wordleRows={wordleRows}
        isRowSubmitted={isRowSubmitted}
        letterColors={letterColors}
        currentRow={currentRow}
        lastPressedKey={lastPressedKey ?? 0}
      />

      <WordleKeyboard />

      <div className="p-2"></div>
      <button
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
        onClick={generateShareableResult}
      >
        Share
      </button>
    </div>
  );
};

export default WordleGame;
