import React from "react";
import Link from "next/link";
import Header from "~/components/Header";
import Footer from "~/components/Footer";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-black">
      <Header />
      <main className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-4 text-6xl font-bold text-gray-900 dark:text-white">
          404
        </h1>
        <h2 className="mb-6 text-3xl font-semibold text-gray-800 dark:text-gray-200">
          Page Not Found
        </h2>
        <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="rounded-md bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
        >
          Go back home
        </Link>
      </main>
      <Footer />
    </div>
  );
}
