"use client";

import { useState } from "react";
import Head from "next/head";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import MoonVisualization from "~/components/MoonVisualization";

export default function MoonPhasesPage() {
  const [phase, setPhase] = useState(0);

  return (
    <>
      <Head>
        <title>Moon Phases Visualization - Roland Van Duine</title>
        <meta name="description" content="Interactive 3D visualization of moon phases using WebGL shaders" />
      </Head>
      <div className="flex min-h-screen flex-col bg-white text-gray-500 dark:bg-black dark:text-gray-200">
        <Header />
        <main className="container mx-auto flex max-w-screen-md flex-col items-center justify-start gap-4 px-4 py-12 sm:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-black dark:text-white">
            Moon Phases Visualization
          </h1>
          <p className="text-center mb-6 text-gray-600 dark:text-gray-300">
            An interactive 3D visualization of moon phases using WebGL shaders
          </p>

          <div className="w-full aspect-square max-w-md mb-8">
            <MoonVisualization phase={phase} />
          </div>

          <div className="w-full max-w-md mb-8">
            <label htmlFor="phase-slider" className="block mb-2 text-sm font-medium">
              Moon Phase: {(phase * 100).toFixed(0)}%
            </label>
            <input
              id="phase-slider"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={phase}
              onChange={(e) => setPhase(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
            <div className="flex justify-between text-xs mt-1">
              <span>New Moon</span>
              <span>Full Moon</span>
            </div>
          </div>

          <div className="prose dark:prose-invert">
            <h2>About This Project</h2>
            <p>
              This project visualizes the phases of the moon using WebGL shaders with Three.js.
              The lighting model simulates how sunlight reflects off the lunar surface at
              different angles throughout the moon's cycle.
            </p>
            <h2>How It Works</h2>
            <p>
              The visualization uses custom GLSL shaders to calculate the lighting on a sphere
              based on the current phase. As you move the slider, the angle of the incident
              light changes, creating the various moon phases we observe from Earth.
            </p>
            <h2>Technologies Used</h2>
            <ul>
              <li>Next.js</li>
              <li>Three.js for 3D rendering</li>
              <li>GLSL Shaders</li>
              <li>React for UI components</li>
            </ul>
          </div>

          <Footer />
        </main>
      </div>
    </>
  );
}
