"use client";

import { useState } from "react";
import { generateRandomDate } from "~/utils/doomsdayUtils";
import { learnSteps } from "~/utils/learnSteps";

export function LearnMode() {
  const [learnSubMode, setLearnSubMode] = useState<"step" | "practice">("step");
  const [learnDate, setLearnDate] = useState<Date>(generateRandomDate("modern"));
  const [learnStep, setLearnStep] = useState(0);
  const [learnUserAnswer, setLearnUserAnswer] = useState("");
  const [selectedPracticeStep, setSelectedPracticeStep] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showExample, setShowExample] = useState(false);
  const [learnFeedback, setLearnFeedback] = useState("");

  const handleStepSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const correct = learnSteps[learnStep]?.getCorrect(learnDate)?.toLowerCase() || "";
    if (learnUserAnswer.trim().toLowerCase() === correct) {
      setLearnFeedback("Correct!");
      setTimeout(() => {
        setLearnFeedback("");
        setLearnStep((prev) => prev + 1);
        setLearnUserAnswer("");
        setShowHint(false);
        setShowExample(false);
      }, 1000);
    } else {
      alert(`Incorrect. The correct answer is ${correct}.`);
    }
  };

  const handlePracticeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const correct = learnSteps[selectedPracticeStep]?.getCorrect(learnDate)?.toLowerCase() || "";
    if (learnUserAnswer.trim().toLowerCase() === correct) {
      setLearnFeedback("Correct!");
      setTimeout(() => {
        setLearnFeedback("");
        setLearnUserAnswer("");
        setShowHint(false);
        setShowExample(false);
        setLearnDate(generateRandomDate("modern"));
      }, 1000);
    } else {
      alert(`Incorrect. The correct answer is ${correct}.`);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="flex gap-4">
        <button
          onClick={() => setLearnSubMode("step")}
          className={`rounded px-4 py-2 ${
            learnSubMode === "step"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-gray-700"
          }`}
        >
          Step-by-Step
        </button>
        <button
          onClick={() => setLearnSubMode("practice")}
          className={`rounded px-4 py-2 ${
            learnSubMode === "practice"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-gray-700"
          }`}
        >
          Practice Stage
        </button>
      </div>
      {learnSubMode === "step" && (
        <>
          <div className="w-full rounded bg-gray-100 p-4 text-center dark:bg-gray-700 dark:text-white">
            <h2 className="text-xl font-bold">
              Learn Mode: {learnDate.toLocaleDateString()}
            </h2>
          </div>
          {learnFeedback && (
            <div className="w-full rounded bg-green-100 p-4 text-center dark:bg-green-700 dark:text-white">
              {learnFeedback}
            </div>
          )}
          {learnStep < learnSteps.length ? (
            <form onSubmit={handleStepSubmit} className="flex w-full flex-col gap-4">
              <label className="flex flex-col">
                {learnSteps[learnStep]?.question(learnDate)}
                <input
                  type="text"
                  value={learnUserAnswer}
                  onChange={(e) => setLearnUserAnswer(e.target.value)}
                  className="mt-1 rounded border px-2 py-1"
                  required
                />
              </label>
              <div className="flex gap-4">
                <button type="submit" className="rounded bg-blue-500 px-4 py-2 text-white">
                  Submit Answer
                </button>
                <button
                  type="button"
                  onClick={() => setShowHint((prev) => !prev)}
                  className="rounded bg-gray-300 px-4 py-2 text-black dark:bg-gray-600 dark:text-white"
                >
                  {showHint ? "Hide Strategy" : "Show Strategy"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowExample((prev) => !prev)}
                  className="rounded bg-gray-300 px-4 py-2 text-black dark:bg-gray-600 dark:text-white"
                >
                  {showExample ? "Hide Example" : "Show Example"}
                </button>
              </div>
              {showHint && (
                <div className="rounded bg-gray-200 p-4 text-center text-black dark:bg-gray-800 dark:text-white">
                  {learnSteps[learnStep]?.hint(learnDate)}
                </div>
              )}
              {showExample && learnSteps[learnStep]?.example && (
                <pre className="rounded bg-gray-200 p-4 text-left text-sm font-mono text-black dark:bg-gray-800 dark:text-white whitespace-pre-wrap">
                  {learnSteps[learnStep]?.example(learnDate)}
                </pre>
              )}
            </form>
          ) : (
            <div className="w-full rounded bg-green-100 p-4 text-center dark:bg-green-700 dark:text-white">
              Congratulations! You have completed the learn mode.
            </div>
          )}
        </>
      )}
      {learnSubMode === "practice" && (
        <div className="w-full flex flex-col items-center gap-4">
          <div className="flex w-full justify-between">
            <label className="flex items-center gap-2">
              Select Stage:
              <select
                value={selectedPracticeStep}
                onChange={(e) => setSelectedPracticeStep(Number(e.target.value))}
                className="rounded border px-2 py-1"
              >
                {learnSteps.map((step, index) => (
                  <option key={index} value={index}>
                    {index === 0
                      ? "Leap Year"
                      : index === 1
                      ? "Century Anchor"
                      : index === 2
                      ? "Yearly Doomsday"
                      : index === 3
                      ? "Month's Doomsday"
                      : "Final Day"}
                  </option>
                ))}
              </select>
            </label>
            <button
              onClick={() => {
                setLearnDate(generateRandomDate("modern"));
                setLearnUserAnswer("");
                setShowHint(false);
                setShowExample(false);
              }}
              className="rounded bg-green-500 px-4 py-2 text-white"
            >
              New Date
            </button>
          </div>
          {learnFeedback && (
            <div className="w-full rounded bg-green-100 p-4 text-center dark:bg-green-700 dark:text-white">
              {learnFeedback}
            </div>
          )}
          <div className="w-full rounded bg-gray-100 p-4 text-center dark:bg-gray-700 dark:text-white">
            <h2 className="text-xl font-bold">
              Practice: {learnSteps[selectedPracticeStep]?.question(learnDate)}
            </h2>
          </div>
          <form onSubmit={handlePracticeSubmit} className="flex w-full flex-col gap-4">
            <label className="flex flex-col">
              Your Answer:
              <input
                type="text"
                value={learnUserAnswer}
                onChange={(e) => setLearnUserAnswer(e.target.value)}
                className="mt-1 rounded border px-2 py-1"
                required
              />
            </label>
            <div className="flex gap-4">
              <button type="submit" className="rounded bg-blue-500 px-4 py-2 text-white">
                Submit Answer
              </button>
              <button
                type="button"
                onClick={() => setShowHint((prev) => !prev)}
                className="rounded bg-gray-300 px-4 py-2 text-black dark:bg-gray-600 dark:text-white"
              >
                {showHint ? "Hide Strategy" : "Show Strategy"}
              </button>
              <button
                type="button"
                onClick={() => setShowExample((prev) => !prev)}
                className="rounded bg-gray-300 px-4 py-2 text-black dark:bg-gray-600 dark:text-white"
              >
                {showExample ? "Hide Example" : "Show Example"}
              </button>
            </div>
            {showHint && learnSteps[selectedPracticeStep]?.hint && (
              <div className="rounded bg-gray-200 p-4 text-center text-black dark:bg-gray-800 dark:text-white">
                {learnSteps[selectedPracticeStep]?.hint(learnDate)}
              </div>
            )}
            {showExample && learnSteps[selectedPracticeStep]?.example && (
              <pre className="rounded bg-gray-200 p-4 text-left text-sm font-mono text-black dark:bg-gray-800 dark:text-white whitespace-pre-wrap">
                {learnSteps[selectedPracticeStep]?.example(learnDate)}
              </pre>
            )}
          </form>
        </div>
      )}
    </div>
  );
}
