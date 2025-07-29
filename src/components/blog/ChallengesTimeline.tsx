"use client";

import { useState } from "react";

interface Challenge {
  title: string;
  description: string;
  solution: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
}

const challenges: Challenge[] = [
  {
    title: "Parsing thousands of books while maintaining good context",
    description:
      "Processing large text corpora while preserving meaningful context around time references",
    solution:
      "Used NLTK for text processing and LLMs to identify contextually rich quotes, ensuring each extracted quote maintains narrative coherence",
    difficulty: "Hard",
    category: "Data Processing",
  },
  {
    title: "Filtering by timestamp inconsistencies",
    description:
      "Books mention time in various formats - '4:17', 'quarter past four', 'seventeen minutes past four'",
    solution:
      "Created a comprehensive time parsing system that normalizes different time formats into a standard HH:MM format for matching",
    difficulty: "Medium",
    category: "Text Processing",
  },
  {
    title: "eInk performance optimization",
    description:
      "Balancing refresh speed with power consumption while avoiding ghosting artifacts",
    solution:
      "Implemented smart refresh scheduling with full/partial updates and temperature-aware refresh rates",
    difficulty: "Medium",
    category: "Hardware",
  },
  {
    title: "Remote debugging on headless Raspberry Pi",
    description:
      "Troubleshooting display issues and system problems without physical access",
    solution:
      "Set up nGrok tunneling for secure SSH access, comprehensive logging, and automated health checks",
    difficulty: "Easy",
    category: "DevOps",
  },
];

export default function ChallengesTimeline() {
  const [selectedChallenge, setSelectedChallenge] = useState<number | null>(
    null,
  );
  const [filter, setFilter] = useState<string>("All");

  const categories = [
    "All",
    ...Array.from(new Set(challenges.map((c) => c.category))),
  ];
  const filteredChallenges =
    filter === "All"
      ? challenges
      : challenges.filter((c) => c.category === filter);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500";
      case "Medium":
        return "bg-yellow-500";
      case "Hard":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="my-8 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">
        Challenges & Solutions
      </h3>

      <div className="space-y-4">
        {filteredChallenges.map((challenge, index) => (
          <div key={index} className="relative">
            {index < filteredChallenges.length - 1 && (
              <div className="absolute left-6 top-12 h-full w-0.5 bg-gray-300 dark:bg-gray-600" />
            )}

            <div className="flex items-start space-x-4">
              <div
                className={`mt-2 h-3 w-3 rounded-full ${getDifficultyColor(challenge.difficulty)}`}
              />
              <div className="flex-1">
                <button
                  onClick={() =>
                    setSelectedChallenge(
                      selectedChallenge === index ? null : index,
                    )
                  }
                  className="w-full text-left"
                >
                  <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 dark:text-white">
                        {challenge.title}
                      </h4>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                        {challenge.description}
                      </p>
                    </div>
                    <div className="ml-4 flex items-center space-x-2">
                      <span
                        className={`rounded-full px-2 py-1 text-xs text-white ${getDifficultyColor(challenge.difficulty)}`}
                      >
                        {challenge.difficulty}
                      </span>
                      <span className="text-xl text-gray-400">
                        {selectedChallenge === index ? "−" : "+"}
                      </span>
                    </div>
                  </div>
                </button>

                {selectedChallenge === index && (
                  <div className="mt-4 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                    <h5 className="font-medium text-blue-800 dark:text-blue-200">
                      Solution:
                    </h5>
                    <p className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                      {challenge.solution}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
        <div className="text-center">
          <div className="text-xl font-bold text-green-600">
            {challenges.filter((c) => c.difficulty === "Easy").length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Easy</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-yellow-600">
            {challenges.filter((c) => c.difficulty === "Medium").length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Medium</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-red-600">
            {challenges.filter((c) => c.difficulty === "Hard").length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Hard</div>
        </div>
      </div>
    </div>
  );
}
