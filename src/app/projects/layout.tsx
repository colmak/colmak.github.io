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
