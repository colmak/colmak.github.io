import type { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const RunningLogClient = dynamic(() => import("./running-log-client"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
    </div>
  ),
});

export const metadata: Metadata = {
  title: "Running Log | Roland Van Duine",
  description: "Track my running progress and stats from Strava.",
  openGraph: {
    title: "Roland Van Duine's Running Log",
    description: "Track my running progress and stats from Strava",
    type: "website",
    images: [
      {
        url: "/images/running-log-og.jpg",
        width: 1200,
        height: 630,
        alt: "Roland Van Duine's Running Log",
      },
    ],
  },
};

export default function RunningLogPage() {
  return (
    <Suspense fallback={null}>
      <RunningLogClient />
    </Suspense>
  );
}
