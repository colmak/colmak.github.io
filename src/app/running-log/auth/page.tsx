"use client";

import { useState, useEffect } from "react";
import { FaStrava, FaRunning, FaUser } from "react-icons/fa";
import Link from "next/link";

export default function StravaAuthPage() {
  const [stravaUrl, setStravaUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const generateAuthUrl = () => {
      try {
        const clientId = process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID;
        if (!clientId) {
          setError(
            "Missing Strava client ID - make sure NEXT_PUBLIC_STRAVA_CLIENT_ID is set in your .env",
          );
          setLoading(false);
          return;
        }

        const redirectUri = `${window.location.origin}/api/strava/auth-callback`;

        const url = `https://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&approval_prompt=force&scope=read,activity:read,activity:read_all`;

        setStravaUrl(url);
        setLoading(false);
      } catch (err) {
        setError("Failed to generate authorization URL");
        setLoading(false);
      }
    };

    generateAuthUrl();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-6 text-gray-800 dark:bg-black dark:text-gray-200">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-gray-50 p-6 shadow-md dark:border-gray-800 dark:bg-gray-900">
        <h1 className="mb-6 text-2xl font-bold">Strava Authorization</h1>

        {loading ? (
          <div className="flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
          </div>
        ) : error ? (
          <div className="rounded-md bg-red-50 p-4 text-red-700 dark:bg-red-900/20 dark:text-red-400">
            <p>{error}</p>
          </div>
        ) : (
          <>
            <p className="mb-4">
              To display your running activities, you need to authorize this
              application to access your Strava data.
            </p>
            <p className="mb-6">
              Click the button below to connect your Strava account. You&apos;ll
              be redirected to Strava to approve access.
            </p>

            <div className="mb-4 rounded-md bg-blue-50 p-3 text-sm text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
              <p>
                <strong>Important:</strong> Make sure to approve{" "}
                <u>all requested permissions</u> on the Strava authorization
                page, otherwise some features may not work.
              </p>
            </div>

            <a
              href={stravaUrl}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-[#FC4C02] py-3 text-white transition-colors hover:bg-[#e34500]"
            >
              <FaStrava size={24} />
              <span className="text-lg font-medium">Connect with Strava</span>
            </a>

            <div className="mt-6 text-sm text-gray-600 dark:text-gray-400">
              <h2 className="font-medium">Required permissions:</h2>
              <ul className="mt-2 space-y-2">
                <li className="flex items-center">
                  <FaUser className="mr-2 text-blue-500" />
                  View your profile information (read)
                </li>
                <li className="flex items-center">
                  <FaRunning className="mr-2 text-green-500" />
                  Access your activities (activity:read)
                </li>
              </ul>
            </div>

            <div className="mt-6 border-t border-gray-200 pt-4 dark:border-gray-700">
              <Link
                href="/running-log"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                ← Return to Running Log
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
