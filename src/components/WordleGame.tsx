"use client";

import React, { useEffect, useState } from "react";
import type { FC } from "react";
import WordleBoard from "./WordleBoard";
import WordleKeyboard from "./WordleKeyboard";
import { useWordleContext } from "../contexts/WordleContext";

const WordleGame: FC = () => {
  const {
    wordleRows,
    isRowSubmitted,
    letterColors,
    currentRow,
    lastPressedKey,
    handleKeyPress,
    generateShareableResult,
    gameMode,
    timeRemaining,
    streak,
    bestStreak,
    solvedCount,
    classicStreak,
    classicBestStreak,
    solveTime,
    bestSolveTime,
    isGameActive,
    isGameCompleted,
    formatTime,
    targetWord,
  } = useWordleContext();

  const [shareTooltip, setShareTooltip] = useState<string | null>(null);

  // Show tooltip when sharing results
  const handleShare = () => {
    const result = generateShareableResult();
    if (result) {
      setShareTooltip("Results copied to clipboard!");
      setTimeout(() => setShareTooltip(null), 2000);
    }
  };

  // Determine if a game is complete (all rows submitted or correct word found)
  const isGameComplete =
    gameMode === "classic" &&
    (isGameCompleted ||
      (currentRow > 0 &&
        (wordleRows.some(
          (row, index) => isRowSubmitted[index] && row.join("") === targetWord,
        ) ||
          currentRow >= 6 ||
          isRowSubmitted.filter(Boolean).length >= 6)));

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

  useEffect(() => {
    // Add a special indicator if it's classic mode
    document.title =
      gameMode === "classic"
        ? `Wordle - ${new Date().toLocaleDateString()} - RVD`
        : `Wordle - Roland Van Duine`;

    return () => {
      document.title = "Wordle - Roland Van Duine";
    };
  }, [gameMode]);

  return (
    <div
      className="container mx-auto flex max-w-screen-sm flex-col items-start justify-start gap-0.5"
      tabIndex={0}
    >
      {/* Game stats display for all modes */}
      <div className="mb-4 w-full rounded bg-gray-100 p-3 dark:bg-gray-800">
        <div className="flex flex-wrap items-center justify-between gap-2">
          {gameMode === "classic" && (
            <>
              <div className="text-sm font-medium">
                {/* Add today's date for classic mode */}
                <span className="text-gray-800 dark:text-gray-300">
                  {new Date().toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="text-sm font-medium">
                Time:{" "}
                <span
                  className={
                    isGameActive && !isGameCompleted
                      ? "text-red-500"
                      : "text-gray-600 dark:text-gray-400"
                  }
                >
                  {formatTime(solveTime)}
                </span>
              </div>
              <div className="text-sm font-medium">
                Streak: <span className="text-blue-500">{classicStreak}</span>
              </div>
              <div className="text-sm font-medium">
                Best:{" "}
                <span className="text-green-500">{classicBestStreak}</span>
              </div>
            </>
          )}

          {gameMode === "speed" && (
            <>
              <div className="text-sm font-medium">
                Time:{" "}
                <span className="text-red-500">
                  {formatTime(timeRemaining)}
                </span>
              </div>
              <div className="text-sm font-medium">
                Solved: <span className="text-green-500">{solvedCount}</span>
              </div>
            </>
          )}

          {gameMode === "endless" && (
            <>
              <div className="text-sm font-medium">
                Current Streak: <span className="text-blue-500">{streak}</span>
              </div>
              <div className="text-sm font-medium">
                Best Streak:{" "}
                <span className="text-purple-500">{bestStreak}</span>
              </div>
            </>
          )}

          {/* Share button integrated into stats bar - only enabled when game is complete for classic mode */}
          <div className="relative ml-auto">
            <button
              className={`flex items-center rounded px-2 py-1 text-xs sm:text-sm ${
                gameMode !== "classic" || isGameComplete
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "cursor-not-allowed bg-gray-300 text-gray-500"
              }`}
              onClick={handleShare}
              disabled={gameMode === "classic" && !isGameComplete}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-1 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
              Share
            </button>
            {shareTooltip && (
              <div className="absolute right-0 top-8 z-10 w-48 rounded-md bg-white p-2 text-xs text-black shadow-lg dark:bg-gray-800 dark:text-white">
                {shareTooltip}
              </div>
            )}
          </div>
        </div>
      </div>

      <WordleBoard
        wordleRows={wordleRows}
        isRowSubmitted={isRowSubmitted}
        letterColors={letterColors}
        currentRow={currentRow}
        lastPressedKey={lastPressedKey ?? 0}
      />

      <WordleKeyboard />

      <div className="p-2"></div>
    </div>
  );
};

export default WordleGame;
