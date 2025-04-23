"use client";

import React, { useState } from "react";

export default function AnimatedCounter() {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
    animateButton();
  };

  const handleDecrement = () => {
    setCount((prev) => Math.max(0, prev - 1));
    animateButton();
  };

  const handleReset = () => {
    setCount(0);
    animateButton();
  };

  const animateButton = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div className="my-8 flex flex-col items-center rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Interactive Counter
      </h3>

      <div
        className={`mb-6 text-6xl font-bold transition-all duration-300 ${
          isAnimating
            ? "scale-125 text-blue-500"
            : "text-gray-900 dark:text-white"
        }`}
      >
        {count}
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleDecrement}
          disabled={count === 0}
          className="rounded bg-red-500 px-4 py-2 text-white transition-all hover:bg-red-600 disabled:opacity-50"
        >
          Decrease
        </button>

        <button
          onClick={handleReset}
          className="rounded bg-gray-500 px-4 py-2 text-white transition-all hover:bg-gray-600"
        >
          Reset
        </button>

        <button
          onClick={handleIncrement}
          className="rounded bg-green-500 px-4 py-2 text-white transition-all hover:bg-green-600"
        >
          Increase
        </button>
      </div>

      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        This is an example of a stateful React component embedded in MDX
      </p>
    </div>
  );
}
