"use client";

import { useState } from "react";

interface StatCard {
  label: string;
  value: string;
  description: string;
  icon: string;
}

const projectStats: StatCard[] = [
  {
    label: "Books Processed",
    value: "2,000+",
    description: "Classic and modern novels scanned for time references",
    icon: "📚",
  },
  {
    label: "Unique Quotes",
    value: "1,440+",
    description: "One quote nearly every minute of the day",
    icon: "💬",
  },
  {
    label: "Display Updates",
    value: "1,440/day",
    description: "Automatic refresh every minute via cron",
    icon: "🔄",
  },
  {
    label: "Power Consumption",
    value: "~2W",
    description: "Ultra-low power eInk display operation",
    icon: "🔋",
  },
  {
    label: "Refresh Rate",
    value: "2-3s",
    description: "Full eInk display update time",
    icon: "📱",
  },
    {
    label: "Open Source",
    value: "100%",
    description: "Code for anyone to see",
    icon: "📱",
  },
];

const technicalDetails = [
  {
    category: "Text Processing",
    details: [
      "RegEx patterns for multiple time formats (HH:MM, 'quarter past', 'o'clock')",
      "NLTK sentence tokenization for context extraction",
      "OpenAI API for semantic filtering and quality assessment",
      "Custom normalization for consistent time representation",
    ],
  },
  {
    category: "Hardware Setup",
    details: [
      'Waveshare ~4in" eInk display (800×480 resolution)',
      "Raspberry Pi with 2GB RAM ",
      "GPIO connection via SPI interface for display control",
      "Custom 3D-printed frame for desktop mounting",
    ],
  },
  {
    category: "Software Architecture",
    details: [
      "Python backend with PIL/Pillow for image generation",
      "Liberation Serif fonts for literary aesthetic",
      "CSV-based quote database for fast lookups",
      "Systemd service for automatic startup and recovery",
    ],
  },
];

export default function ProjectStats() {
  const [activeDetail, setActiveDetail] = useState<number | null>(null);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  return (
    <div className="my-8 space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projectStats.map((stat, index) => (
          <div
            key={index}
            onMouseEnter={() => setHoveredStat(index)}
            onMouseLeave={() => setHoveredStat(null)}
            className={`transform rounded-lg border p-6 transition-all duration-200 ${
              hoveredStat === index
                ? "scale-105 border-blue-500 shadow-lg"
                : "border-gray-200 hover:shadow-md dark:border-gray-600"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="text-3xl">{stat.icon}</div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-800 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {stat.label}
                </div>
              </div>
            </div>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              {stat.description}
            </p>
          </div>
        ))}
      </div>

      {/* Technical Deep Dive */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <h4 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
          Technical Implementation Details
        </h4>

        <div className="space-y-4">
          {technicalDetails.map((section, index) => (
            <div key={index}>
              <button
                onClick={() =>
                  setActiveDetail(activeDetail === index ? null : index)
                }
                className="flex w-full items-center justify-between rounded-lg bg-gray-50 p-3 text-left transition-colors hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                <span className="font-medium text-gray-800 dark:text-white">
                  {section.category}
                </span>
                <span className="text-xl text-gray-400">
                  {activeDetail === index ? "−" : "+"}
                </span>
              </button>

              {activeDetail === index && (
                <div className="mt-3 space-y-2 pl-4">
                  {section.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-start">
                      <div className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500" />
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {detail}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Fun Facts */}
      <div className="rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-6 dark:from-blue-900/20 dark:to-purple-900/20">
        <h4 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
          💡 Did You Know?
        </h4>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-white/50 p-4 dark:bg-gray-800/50">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Most Common Time:</strong> 12:00 (noon/midnight) appears
              in over 50 different literary contexts, from dramatic reveals to
              quiet reflections.
            </p>
          </div>
          <div className="rounded-lg bg-white/50 p-4 dark:bg-gray-800/50">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Rarest Time:</strong> 3:33 AM only appears twice in the
              entire corpus, both in mystery novels during crucial plot moments.
            </p>
          </div>
          <div className="rounded-lg bg-white/50 p-4 dark:bg-gray-800/50">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Power Efficiency:</strong> The eInk display only uses
              power during refresh, allowing the clock to run for weeks on a
              power bank.
            </p>
          </div>
          <div className="rounded-lg bg-white/50 p-4 dark:bg-gray-800/50">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Remote Access:</strong> nGrok tunneling means I can debug
              the Raspberry Pi from anywhere in the world, even on vacation!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
