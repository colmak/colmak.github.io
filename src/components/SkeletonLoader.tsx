"use client";

import React, { memo } from "react";

interface SkeletonLoaderProps {
  count?: number;
  layout?: "grid" | "list";
}

const cssAnimation = "animate-pulse";

const SkeletonLoader = memo(function SkeletonLoader({
  count = 4,
  layout = "grid",
}: SkeletonLoaderProps) {
  const isListMode = layout === "list";

  const skeletonItems = Array.from({ length: count }).map((_, index) => (
    <div key={index} className="w-full">
      <div
        className={`flex h-full ${isListMode ? "flex-row items-center" : "flex-col"} 
        gap-3 rounded-xl border border-gray-200/70 bg-gradient-to-br from-gray-50 to-white
        p-5 backdrop-blur-sm dark:border-gray-800 dark:from-gray-900/40
        dark:to-gray-800/20`}
      >
        <div
          className={`flex ${isListMode ? "mr-4 flex-1" : "w-full"} items-center justify-between`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`h-10 w-10 rounded-lg bg-gray-200/80 dark:bg-gray-700/50 ${cssAnimation}`}
            />
            <div
              className={`h-5 w-28 rounded-md bg-gray-200/80 dark:bg-gray-700/50 ${cssAnimation}`}
            />
          </div>
          {!isListMode && (
            <div
              className={`h-6 w-16 rounded-full bg-gray-200/80 dark:bg-gray-700/50 ${cssAnimation}`}
            />
          )}
        </div>
        <div
          className={`${isListMode ? "h-4 flex-1" : "mt-1 h-4"} w-full rounded-md bg-gray-200/80 dark:bg-gray-700/50 ${cssAnimation}`}
        />
        {isListMode && (
          <div
            className={`ml-auto h-6 w-16 rounded-full bg-gray-200/80 dark:bg-gray-700/50 ${cssAnimation}`}
          />
        )}
      </div>
    </div>
  ));

  return <>{skeletonItems}</>;
});

export default SkeletonLoader;
