import { Suspense } from "react";
import Script from "next/script";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script id="bfcache-optimization" strategy="beforeInteractive">{`
        // Enable back/forward cache restoration
        document.addEventListener('visibilitychange', function() {
          if (document.visibilityState === 'hidden') {
            document.body.classList.add('bfcache-optimize');
          }
        });
      `}</Script>

      <div
        className="projects-layout relative min-h-screen"
        id="projects-container"
      >
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 right-0 h-80 w-80 rounded-full bg-blue-500/5 opacity-30 dark:bg-blue-600/10"></div>
          <div className="absolute -bottom-20 left-10 h-60 w-60 rounded-full bg-green-500/5 opacity-30 dark:bg-green-600/10"></div>
          <div className="absolute -left-20 top-1/3 h-60 w-60 rounded-full bg-purple-500/5 opacity-30 dark:bg-purple-600/10"></div>
        </div>

        <Suspense
          fallback={
            <div className="flex min-h-screen items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
            </div>
          }
        >
          {children}
        </Suspense>
      </div>
    </>
  );
}
