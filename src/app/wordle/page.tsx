"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import Footer from "~/components/Footer";
import WordleHeader from "~/components/WordleHeader";
import WordleGame from "~/components/WordleGame";
import WordleInstructions from "~/components/WordleInstructions";
import { WordleProvider } from "~/contexts/WordleContext";

export default function WordlePage() {
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem("wordleVisited");
    if (!hasVisitedBefore) {
      setShowInstructions(true);
      localStorage.setItem("wordleVisited", "true");
    }
  }, []);

  return (
    <>
      <Head>
        <title>Wordle - Roland Van Duine</title>
      </Head>
      <WordleProvider>
        <div className="flex min-h-screen flex-col bg-white text-gray-500 dark:bg-black dark:text-gray-200">
          <WordleHeader onShowInstructions={() => setShowInstructions(true)} />
          <div className="container mx-auto flex items-center justify-center">
            <main className="slide-enter-content container flex max-w-screen-sm flex-col items-start justify-start gap-0.5">
              <WordleGame />
              <Footer />
            </main>
          </div>
          {showInstructions && (
            <WordleInstructions onClose={() => setShowInstructions(false)} />
          )}
        </div>
      </WordleProvider>
    </>
  );
}
