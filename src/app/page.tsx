'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? 'bg-black' : 'bg-white'} text-${isDarkMode ? 'white' : 'black'}`}>
      {/* Header */}
      <header className={`p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
        <div className="container flex justify-between items-center">
          {/* Home Link */}
          <Link href="/">
            <a className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>Home</a>
          </Link>
          {/* Demo Links */}
          <div className="flex gap-4">
            <Link href="https://example.com/demo1">
              <a className={`hover:text-${isDarkMode ? 'blue-300' : 'blue-500'}`}>Demo 1</a>
            </Link>
            <Link href="https://example.com/demo2">
              <a className={`hover:text-${isDarkMode ? 'blue-300' : 'blue-500'}`}>Demo 2</a>
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
