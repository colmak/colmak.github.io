"use client";

import { useState } from "react";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import UnderlinedText from "~/components/UnderlinedText";
import Head from "next/head";
import { QuizMode } from "~/components/DoomsdayQuiz/QuizMode";
import { LearnMode } from "~/components/DoomsdayQuiz/LearnMode";

export default function DoomsdayQuizPage() {
  const [mode, setMode] = useState<"quiz" | "learn">("quiz");
  const [rangeOption, setRangeOption] = useState("modern");

  return (
    <>
      <Head>
        <title>Doomsday Algorithm Quiz</title>
        <meta name="description" content="Test your Doomsday Algorithm skills." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="flex min-h-screen flex-col bg-white text-gray-500 dark:bg-black dark:text-gray-200">
        <Header />
        <main className="container mx-auto flex flex-col items-center gap-8 px-4 py-12 max-w-screen-sm">
          <div className="flex gap-4">
            <button
              onClick={() => setMode("quiz")}
              className={`rounded px-4 py-2 ${
                mode === "quiz" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              Quiz Mode
            </button>
            <button
              onClick={() => setMode("learn")}
              className={`rounded px-4 py-2 ${
                mode === "learn" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              Learn Mode
            </button>
          </div>
          {mode === "quiz" ? (
            <QuizMode 
              rangeOption={rangeOption} 
              setRangeOption={setRangeOption}
            />
          ) : (
            <LearnMode />
          )}
          <UnderlinedText href="https://en.wikipedia.org/wiki/Doomsday_rule">
            Learn more about the Doomsday Algorithm
          </UnderlinedText>
        </main>
      </div>
    </>
  );
}
