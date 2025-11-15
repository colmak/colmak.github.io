"use client";

import { useState } from "react";
import Head from "next/head";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import SquaredSquareVisualizer from "./SquaredSquareVisualizer";
import { allSquaredSquares, SquaredSquareData } from "./squaredSquareData";

export default function SquaredSquarePage() {
  const [selectedSquare, setSelectedSquare] = useState<SquaredSquareData>(allSquaredSquares[0]!);
  const [showLabels, setShowLabels] = useState(true);
  const [showGrid, setShowGrid] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'simple' | 'compound'>('all');

  const filteredSquares = allSquaredSquares.filter(sq =>
    filterType === 'all' || sq.type === filterType
  );

  return (
    <>
      <Head>
        <title>Perfect Squared Square Visualizer - Roland Van Duine</title>
      </Head>
      <div className="flex min-h-screen flex-col bg-white text-gray-500 dark:bg-black dark:text-gray-200">
        <Header />
        <div className="container mx-auto flex items-center justify-center">
          <main className="slide-enter-content container flex max-w-screen-lg flex-col items-start justify-start gap-6 px-8 py-12">
            {/* Title and Introduction */}
            <div className="w-full">
              <h1 className="pb-3 text-center text-[2.5rem] font-bold tracking-tight text-black dark:text-white">
                Perfect Squared Square Visualizer
              </h1>
              <p className="text-center text-lg mb-4">
                Explore simple and compound perfect squared squares
              </p>
            </div>

            {/* Visualizer */}
            <div className="w-full bg-white dark:bg-gray-900 rounded-lg p-6 shadow-xl">
              <SquaredSquareVisualizer
                data={selectedSquare}
                showLabels={showLabels}
                showGrid={showGrid}
              />
            </div>

            {/* Selected Square Info */}
            <div className="w-full bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-2 text-black dark:text-white">
                {selectedSquare.name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-3">
                <div>
                  <span className="font-semibold">Type:</span>{' '}
                  <span className={`px-2 py-1 rounded ${
                    selectedSquare.type === 'simple'
                      ? 'bg-green-200 dark:bg-green-800'
                      : 'bg-orange-200 dark:bg-orange-800'
                  }`}>
                    {selectedSquare.type.charAt(0).toUpperCase() + selectedSquare.type.slice(1)}
                  </span>
                </div>
                <div>
                  <span className="font-semibold">Order:</span> {selectedSquare.order}
                </div>
                <div>
                  <span className="font-semibold">Size:</span> {selectedSquare.size}
                </div>
              </div>
              <p className="mb-2">{selectedSquare.description}</p>
              {selectedSquare.discoveryYear && (
                <p className="text-sm italic">
                  Discovered by {selectedSquare.discoveredBy} in {selectedSquare.discoveryYear}
                </p>
              )}
            </div>

            {/* Statistics */}
            <div className="w-full bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3 text-black dark:text-white">Square Statistics</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="bg-white dark:bg-gray-800 p-3 rounded">
                  <div className="text-2xl font-bold text-blue-600">{selectedSquare.squares.length}</div>
                  <div className="text-xs">Total Squares</div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded">
                  <div className="text-2xl font-bold text-green-600">
                    {Math.min(...selectedSquare.squares.map(s => s.size))}
                  </div>
                  <div className="text-xs">Smallest Square</div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded">
                  <div className="text-2xl font-bold text-purple-600">
                    {Math.max(...selectedSquare.squares.map(s => s.size))}
                  </div>
                  <div className="text-xs">Largest Square</div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded">
                  <div className="text-2xl font-bold text-orange-600">
                    {(Math.max(...selectedSquare.squares.map(s => s.size)) /
                      Math.min(...selectedSquare.squares.map(s => s.size))).toFixed(1)}x
                  </div>
                  <div className="text-xs">Size Ratio</div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="w-full flex flex-col gap-4 bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
              <div>
                <h3 className="text-lg font-bold mb-2 text-black dark:text-white">Filter by Type</h3>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => setFilterType('all')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      filterType === 'all'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilterType('simple')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      filterType === 'simple'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    Simple
                  </button>
                  <button
                    onClick={() => setFilterType('compound')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      filterType === 'compound'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    Compound
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2 text-black dark:text-white">Select Squared Square</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {filteredSquares.map((sq, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSquare(sq)}
                      className={`p-3 rounded-lg text-left transition-all ${
                        selectedSquare.name === sq.name
                          ? 'bg-blue-600 text-white shadow-lg scale-105'
                          : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
                    >
                      <div className="font-bold">{sq.name}</div>
                      <div className="text-xs opacity-80">
                        Order: {sq.order} | Size: {sq.size} | {sq.type}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-2 text-black dark:text-white">Display Options</h3>
                <div className="flex gap-4 flex-wrap">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showLabels}
                      onChange={(e) => setShowLabels(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span>Show Size Labels</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showGrid}
                      onChange={(e) => setShowGrid(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span>Show Grid</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Info Section */}
            <div className="w-full bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-3 text-black dark:text-white">What is a Perfect Squared Square?</h2>
              <div className="space-y-2 text-sm">
                <p>
                  A <strong>perfect squared square</strong> is a square that has been divided into smaller squares,
                  all of different integer sizes. No two squares have the same size.
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Simple Perfect Squared Square:</strong> Cannot be divided into two smaller squared rectangles.
                    The smallest known has order 21 (Duijvestijn, 1978).
                  </li>
                  <li>
                    <strong>Compound Perfect Squared Square:</strong> Can be divided into two or more smaller squared rectangles.
                    Generally easier to construct than simple ones.
                  </li>
                  <li>
                    <strong>Order:</strong> The number of squares in the dissection.
                  </li>
                </ul>
              </div>
            </div>

            {/* Learn More */}
            <div className="w-full bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-3 text-black dark:text-white">Learn More</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <a
                    href="https://en.wikipedia.org/wiki/Squaring_the_square"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Wikipedia: Squaring the Square
                  </a>
                </li>
                <li>
                  <a
                    href="http://www.squaring.net/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Squaring.net - Comprehensive Resource
                  </a>
                </li>
              </ul>
            </div>

            <Footer />
          </main>
        </div>
      </div>
    </>
  );
}
