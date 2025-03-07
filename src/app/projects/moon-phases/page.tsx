"use client";

import Head from "next/head";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import MoonVisualization from "~/components/MoonVisualization";

export default function MoonPhasesPage() {
  return (
    <>
      <Head>
        <title>Moon Phases Visualization - Roland Van Duine</title>
        <meta
          name="description"
          content="Interactive 3D visualization of the current moon phase using WebGL shaders"
        />
      </Head>
      <div className="flex min-h-screen flex-col bg-white text-gray-500 dark:bg-black dark:text-gray-200">
        <Header />
        <main className="container mx-auto flex max-w-screen-md flex-col items-center justify-start gap-4 px-4 py-12 sm:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl">
            Moon Phases Visualization
          </h1>
          <p className="mb-6 text-center text-gray-600 dark:text-gray-300">
            Real-time 3D visualization of the current moon phase using WebGL
            shaders
          </p>

          <div className="mb-8 aspect-square w-full max-w-md">
            <MoonVisualization />
          </div>

          <div className="prose dark:prose-invert">
            <h2>About This Project</h2>
            <p>
              This project displays the current moon phase based on today's date
              using WebGL shaders with Three.js. The visualization automatically
              calculates the current lunar phase and renders a realistic 3D
              model of the moon.
            </p>
            <h2>How It Works</h2>
            <p>
              The moon goes through a cycle of phases over approximately 29.5
              days. This visualization calculates the current phase by comparing
              today's date with a known new moon date and applying custom GLSL
              shaders to render the appropriate illumination pattern.
            </p>
            <h2>Technologies Used</h2>
            <ul>
              <li>Next.js</li>
              <li>Three.js for 3D rendering</li>
              <li>GLSL Shaders for realistic lighting</li>
            </ul>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
