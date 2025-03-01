"use client";

import { useState, useEffect } from "react";
import { getDayOfWeek, generateRandomDate } from "~/utils/doomsdayUtils";

interface QuizModeProps {
  rangeOption: string;
  setRangeOption: (value: string) => void;
}

export function QuizMode({ rangeOption, setRangeOption }: QuizModeProps) {
  const [quizDate, setQuizDate] = useState<Date>(generateRandomDate(rangeOption));
  const [userQuizAnswer, setUserQuizAnswer] = useState("");
  const [quizFeedback, setQuizFeedback] = useState("");

  useEffect(() => {
    const newDate = generateRandomDate(rangeOption);
    setQuizDate(newDate);
    setUserQuizAnswer("");
    setQuizFeedback("");
  }, [rangeOption]);

  const handleQuizSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const year = quizDate.getFullYear();
    const month = quizDate.getMonth() + 1;
    const day = quizDate.getDate();
    const correctAnswer = getDayOfWeek(year, month, day);
    if (userQuizAnswer.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      setQuizFeedback("Correct!");
    } else {
      setQuizFeedback(`Incorrect. The correct answer is ${correctAnswer}.`);
    }
  };

  const handleNewDate = () => {
    const newDate = generateRandomDate(rangeOption);
    setQuizDate(newDate);
    setUserQuizAnswer("");
    setQuizFeedback("");
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value; // Format: YYYY-MM-DD
    const newDate = new Date(dateValue);
    setQuizDate(newDate);
    setUserQuizAnswer("");
    setQuizFeedback("");
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="flex w-full justify-between">
        <div>
          <label className="mr-2">Date Range:</label>
          <select
            value={rangeOption}
            onChange={(e) => setRangeOption(e.target.value)}
            className="rounded border px-2 py-1"
          >
            <option value="modern">Modern (1900-2099)</option>
            <option value="extended">Extended (1800-2199)</option>
          </select>
        </div>
        <button onClick={handleNewDate} className="rounded bg-green-500 px-4 py-2 text-white">
          New Date
        </button>
      </div>
      {/* Custom date input */}
      <div className="flex w-full justify-center">
        <label className="flex flex-col">
          Choose a Date:
          <input
            type="date"
            value={quizDate.toISOString().split("T")[0]}
            onChange={handleDateChange}
            className="rounded border px-2 py-1 mt-1"
          />
        </label>
      </div>
      <div className="w-full rounded bg-gray-100 p-4 text-center dark:bg-gray-700 dark:text-white">
        <h2 className="text-xl font-bold">
          What day of the week is {quizDate.toLocaleDateString()}?
        </h2>
      </div>
      <form onSubmit={handleQuizSubmit} className="flex w-full flex-col gap-4">
        <label className="flex flex-col">
          Your Answer:
          <input
            type="text"
            value={userQuizAnswer}
            onChange={(e) => setUserQuizAnswer(e.target.value)}
            className="mt-1 rounded border px-2 py-1"
            placeholder="e.g., Monday"
            required
          />
        </label>
        <button type="submit" className="rounded bg-blue-500 px-4 py-2 text-white">
          Submit Answer
        </button>
      </form>
      {quizFeedback && (
        <div className="w-full rounded bg-gray-100 p-4 text-center dark:bg-gray-700 dark:text-white">
          {quizFeedback}
        </div>
      )}
    </div>
  );
}
