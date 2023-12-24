'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? 'bg-black' : 'bg-white'} text-black`}>
      {/* Header */}
      <header className="p-4 bg-gray-200">
        <div className="container flex justify-between items-center">
          {/* Home Link */}
          <Link href="/">
            <a className="text-xl font-semibold">Home</a>
          </Link>
          {/* Demo Links */}
          <div className="flex gap-4">
            <Link href="https://example.com/demo1">
              <a className="hover:text-blue-500">Demo 1</a>
            </Link>
            <Link href="https://example.com/demo2">
              <a className="hover:text-blue-500">Demo 2</a>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Create <span className={`text-${isDarkMode ? 'gray' : 'purple-500'}`}>T3</span> App
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <Link
            className={`flex max-w-xs flex-col gap-4 rounded-xl ${
              isDarkMode ? 'bg-white/10' : 'bg-black/10'
            } p-4 text-white hover:${isDarkMode ? 'bg-white/20' : 'bg-black/20'}`}
            href="https://create.t3.gg/en/usage/first-steps"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">First Steps →</h3>
            <div className="text-lg">
              Just the basics - Everything you need to know to set up your
              database and authentication.
            </div>
          </Link>
          <Link
            className={`flex max-w-xs flex-col gap-4 rounded-xl ${
              isDarkMode ? 'bg-white/10' : 'bg-black/10'
            } p-4 text-white hover:${isDarkMode ? 'bg-white/20' : 'bg-black/20'}`}
            href="https://create.t3.gg/en/introduction"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">Documentation →</h3>
            <div className="text-lg">
              Learn more about Create T3 App, the libraries it uses, and how to deploy it.
            </div>
          </Link>
        </div>
        <button
          className={`p-2 mt-4 rounded ${
            isDarkMode ? 'bg-white text-black' : 'bg-black text-white'
          }`}
          onClick={toggleTheme}
        >
          {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
      </main>
    </div>
  );
}
