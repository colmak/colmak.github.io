import React from "react";

interface WordleInstructionsProps {
  onClose: () => void;
}

const WordleInstructions: React.FC<WordleInstructionsProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="max-h-[90vh] w-[90vw] max-w-md overflow-auto rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800 dark:text-white">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">How To Play</h2>
          <button onClick={onClose} className="text-2xl font-bold">
            ×
          </button>
        </div>

        <div className="mb-4">
          <p className="mb-2">Guess the Wordle in 6 tries.</p>
          <ul className="list-disc pl-5">
            <li className="mb-1">Each guess must be a valid 5-letter word.</li>
            <li className="mb-1">
              The color of the tiles will change to show how close your guess
              was to the word.
            </li>
          </ul>
        </div>

        <div className="mb-4">
          <h3 className="mb-2 text-lg font-bold">Examples</h3>

          <div className="mb-4">
            <div className="mb-2 flex gap-1">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-green-500 font-bold text-white">
                W
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded border-2 border-gray-300 bg-white font-bold text-black dark:border-gray-600 dark:bg-gray-800">
                O
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded border-2 border-gray-300 bg-white font-bold text-black dark:border-gray-600 dark:bg-gray-800">
                R
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded border-2 border-gray-300 bg-white font-bold text-black dark:border-gray-600 dark:bg-gray-800">
                D
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded border-2 border-gray-300 bg-white font-bold text-black dark:border-gray-600 dark:bg-gray-800">
                Y
              </div>
            </div>
            <p>
              <strong>W</strong> is in the word and in the correct spot.
            </p>
          </div>

          <div className="mb-4">
            <div className="mb-2 flex gap-1">
              <div className="flex h-10 w-10 items-center justify-center rounded border-2 border-gray-300 bg-white font-bold text-black dark:border-gray-600 dark:bg-gray-800">
                L
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded bg-yellow-500 font-bold text-white">
                I
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded border-2 border-gray-300 bg-white font-bold text-black dark:border-gray-600 dark:bg-gray-800">
                G
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded border-2 border-gray-300 bg-white font-bold text-black dark:border-gray-600 dark:bg-gray-800">
                H
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded border-2 border-gray-300 bg-white font-bold text-black dark:border-gray-600 dark:bg-gray-800">
                T
              </div>
            </div>
            <p>
              <strong>I</strong> is in the word but in the wrong spot.
            </p>
          </div>

          <div className="mb-4">
            <div className="mb-2 flex gap-1">
              <div className="flex h-10 w-10 items-center justify-center rounded border-2 border-gray-300 bg-white font-bold text-black dark:border-gray-600 dark:bg-gray-800">
                R
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded border-2 border-gray-300 bg-white font-bold text-black dark:border-gray-600 dark:bg-gray-800">
                O
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded border-2 border-gray-300 bg-white font-bold text-black dark:border-gray-600 dark:bg-gray-800">
                G
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-500 font-bold text-white">
                U
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded border-2 border-gray-300 bg-white font-bold text-black dark:border-gray-600 dark:bg-gray-800">
                E
              </div>
            </div>
            <p>
              <strong>U</strong> is not in the word in any spot.
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          Got it!
        </button>
      </div>
    </div>
  );
};

export default WordleInstructions;
