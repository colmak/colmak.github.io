"use client";

import { useState, useEffect } from "react";
import Header from "~/components/Header";
import {
  FaRunning,
  FaStrava,
  FaCalendarAlt,
  FaTrophy,
  FaExternalLinkAlt,
  FaInfoCircle,
  FaChartLine,
  FaSync,
  FaLock,
} from "react-icons/fa";
import Link from "next/link";

interface ApiErrorResponse {
  error: string;
  authUrl?: string;
}

type Activity = {
  id: number;
  name: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  total_elevation_gain: number;
  start_date: string;
  start_date_local: string;
  type: string;
  average_speed: number;
  max_speed: number;
  average_heartrate?: number;
  max_heartrate?: number;
};

type RunTotals = {
  count: number;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  elevation_gain: number;
};

type AthleteStats = {
  recent_run_totals: RunTotals;
  all_run_totals: RunTotals;
  ytd_run_totals: RunTotals;
};

export default function RunningLogClient() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [stats, setStats] = useState<AthleteStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [permissionError, setPermissionError] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activityScope, setActivityScope] = useState(true); 

  const fetchRunningData = async (forceRefresh = false) => {
    try {
      if (!forceRefresh) setLoading(true);
      else setIsRefreshing(true);

      setError("");
      setPermissionError(false);
      setActivityScope(true); 

      try {
        const statsUrl = new URL("/api/strava/stats", window.location.origin);
        if (forceRefresh) {
          statsUrl.searchParams.append("refresh", "true");
        }

        const statsResponse = await fetch(statsUrl.toString(), {
          cache: "no-store",
        });

        if (!statsResponse.ok) {
          const errorText = await statsResponse.text();
          console.error(
            "Stats response error:",
            statsResponse.status,
            errorText,
          );

          try {
            const errorData = JSON.parse(errorText) as ApiErrorResponse;
            throw new Error(
              errorData.error || `Stats error (${statsResponse.status})`,
            );
          } catch (jsonError) {
            throw new Error(
              `Stats error (${statsResponse.status}): ${errorText}`,
            );
          }
        }

        const statsData = (await statsResponse.json()) as AthleteStats;
        setStats(statsData);
        console.log("Stats data received successfully");
      } catch (statsError: unknown) {
        const error = statsError as Error;
        console.error("Stats error:", error);
        throw statsError;
      }

      try {
        const activitiesUrl = new URL(
          "/api/strava/activities",
          window.location.origin,
        );
        if (forceRefresh) {
          activitiesUrl.searchParams.append("refresh", "true");
        }

        const activitiesResponse = await fetch(activitiesUrl.toString(), {
          cache: "no-store",
        });

        if (!activitiesResponse.ok) {
          const errorText = await activitiesResponse.text();
          console.error(
            "Activities response error:",
            activitiesResponse.status,
            errorText,
          );

          try {
            const errorData = JSON.parse(errorText) as ApiErrorResponse;

            if (activitiesResponse.status === 401) {
              setPermissionError(true);

              if (
                errorData.error &&
                (errorData.error.includes("activity:read") ||
                  errorData.error.includes("permission") ||
                  errorData.error.includes("Authorization Error"))
              ) {
                setActivityScope(false);
                console.log("Activity scope permission error detected");
              }
            }

            throw new Error(
              errorData.error ||
                `Activities error (${activitiesResponse.status})`,
            );
          } catch (jsonError) {
            if (activitiesResponse.status === 401) {
              setPermissionError(true);
            }
            throw new Error(
              `Activities error (${activitiesResponse.status}): ${errorText}`,
            );
          }
        }

        const activitiesData = (await activitiesResponse.json()) as Activity[];

        const runningActivities = activitiesData.filter(
          (activity: Activity) => activity.type === "Run",
        );

        setActivities(runningActivities);
        console.log(`Received ${runningActivities.length} running activities`);
      } catch (activitiesError: unknown) {
        const error = activitiesError as Error;
        console.error("Activities error:", error);
        throw activitiesError;
      }
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error fetching Strava data:", error);
      setError(error.message || "Failed to fetch Strava data");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRunningData();
  }, []);

  const handleRefresh = () => {
    fetchRunningData(true);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${hours ? `${hours}h ` : ""}${minutes}m ${remainingSeconds}s`;
  };

  const formatDistance = (meters: number) => {
    const miles = (meters / 1609.34).toFixed(2);
    return `${miles} mi`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const calculatePace = (distance: number, seconds: number) => {
    const miles = distance / 1609.34;
    const minutesPerMile = seconds / 60 / miles;
    const minutes = Math.floor(minutesPerMile);
    const secondsRemainder = Math.round((minutesPerMile - minutes) * 60);

    return `${minutes}:${secondsRemainder.toString().padStart(2, "0")} /mi`;
  };

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-500 dark:bg-black dark:text-gray-200">
      <Header />
      <div className="container mx-auto flex items-center justify-center">
        <main className="slide-enter-content container flex max-w-screen-md flex-col items-start justify-center gap-4 px-4 py-12">
          <div className="flex w-full items-center justify-between">
            <h1 className="pb-3 text-2xl font-bold tracking-tight text-black dark:text-white">
              Running Log
            </h1>
            <div className="flex items-center gap-2">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="flex items-center gap-1 rounded-md bg-blue-500 px-3 py-2 text-white transition-colors hover:bg-blue-600 disabled:opacity-50"
              >
                <FaSync className={isRefreshing ? "animate-spin" : ""} />
                <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
              </button>
              <a
                href="https://www.strava.com/athletes/rolandvd"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-md bg-[#FC4C02] px-4 py-2 text-white transition-colors hover:bg-[#e34500]"
              >
                <FaStrava size={20} />
                <span>Follow on Strava</span>
              </a>
            </div>
          </div>

          {loading && !isRefreshing && (
            <div className="flex w-full items-center justify-center py-12">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
            </div>
          )}

          {error && (
            <div className="w-full rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-900/30 dark:bg-red-900/20 dark:text-red-400">
              <p className="font-medium">{error}</p>

              {permissionError && (
                <div className="mt-4">
                  <div className="flex items-start">
                    <FaLock className="mr-2 mt-1" />
                    <div>
                      <p className="font-medium">
                        {!activityScope
                          ? "Your Strava token is missing the activity:read permission scope."
                          : "Your Strava token is missing required permissions."}
                      </p>
                      <p className="mt-1 text-sm">
                        You need to re-authorize with Strava to view activities.
                        Stats are still viewable.
                      </p>
                      <Link
                        href="/running-log/auth"
                        className="mt-3 inline-flex items-center rounded-md bg-[#FC4C02] px-4 py-2 text-sm font-medium text-white hover:bg-[#e34500]"
                      >
                        <FaStrava className="mr-2" /> Authorize Strava
                      </Link>
                      <p className="mt-2 text-xs">
                        After authorizing, you&apos;ll be given a new refresh
                        token to update in your .env file.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {!loading && stats && (
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
              <div className="rounded-lg border border-gray-200/50 bg-gray-50/70 p-4 shadow-sm dark:border-gray-800/50 dark:bg-gray-900/30">
                <div className="flex items-center gap-2">
                  <FaRunning className="text-blue-500" />
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Total Distance
                  </h3>
                </div>
                <p className="mt-2 text-xl font-bold text-black dark:text-white">
                  {formatDistance(stats.all_run_totals.distance)}
                </p>
              </div>

              <div className="rounded-lg border border-gray-200/50 bg-gray-50/70 p-4 shadow-sm dark:border-gray-800/50 dark:bg-gray-900/30">
                <div className="flex items-center gap-2">
                  <FaTrophy className="text-yellow-500" />
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Total Runs
                  </h3>
                </div>
                <p className="mt-2 text-xl font-bold text-black dark:text-white">
                  {stats.all_run_totals.count}
                </p>
              </div>

              <div className="rounded-lg border border-gray-200/50 bg-gray-50/70 p-4 shadow-sm dark:border-gray-800/50 dark:bg-gray-900/30">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-green-500" />
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Total Time
                  </h3>
                </div>
                <p className="mt-2 text-xl font-bold text-black dark:text-white">
                  {formatTime(stats.all_run_totals.moving_time)}
                </p>
              </div>

              <div className="rounded-lg border border-gray-200/50 bg-gray-50/70 p-4 shadow-sm dark:border-gray-800/50 dark:bg-gray-900/30">
                <div className="flex items-center gap-2">
                  <FaChartLine className="text-purple-500" />
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Recent (4 weeks)
                  </h3>
                </div>
                <p className="mt-2 text-xl font-bold text-black dark:text-white">
                  {formatDistance(stats.recent_run_totals.distance)}
                </p>
              </div>
            </div>
          )}

          {!loading && stats && permissionError && !activityScope && !error && (
            <div className="w-full rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-yellow-700 dark:border-yellow-900/30 dark:bg-yellow-900/10 dark:text-yellow-500">
              <div className="flex items-start">
                <FaLock className="mr-3 mt-0.5" />
                <div>
                  <p className="font-medium">Activity data unavailable</p>
                  <p className="mt-1">
                    Your Strava token is missing the activity:read permission
                    scope.
                  </p>
                  <Link
                    href="/running-log/auth"
                    className="mt-3 inline-flex items-center rounded-md bg-[#FC4C02] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#e34500]"
                  >
                    <FaStrava className="mr-1.5" /> Reauthorize Strava
                  </Link>
                </div>
              </div>
            </div>
          )}

          {!loading && activities.length > 0 && (
            <div className="mt-8 w-full">
              <h2 className="mb-4 text-xl font-semibold text-black dark:text-white">
                Recent Runs
              </h2>
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="overflow-hidden rounded-lg border border-gray-200/50 bg-gray-50/70 shadow-sm transition-all hover:shadow-md dark:border-gray-800/50 dark:bg-gray-900/30"
                  >
                    <a
                      href={`https://www.strava.com/activities/${activity.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4"
                    >
                      <div className="flex w-full flex-wrap items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-1">
                            <h3 className="font-medium text-black dark:text-white">
                              {activity.name}
                            </h3>
                            <FaExternalLinkAlt
                              size={12}
                              className="text-gray-400"
                            />
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(activity.start_date_local)}
                          </p>
                        </div>
                        <div className="flex gap-4">
                          <div>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                              Distance
                            </p>
                            <p className="text-sm font-medium text-black dark:text-white">
                              {formatDistance(activity.distance)}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                              Time
                            </p>
                            <p className="text-sm font-medium text-black dark:text-white">
                              {formatTime(activity.moving_time)}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                              Pace
                            </p>
                            <p className="text-sm font-medium text-black dark:text-white">
                              {calculatePace(
                                activity.distance,
                                activity.moving_time,
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!loading && activities.length === 0 && !error && (
            <div className="mt-4 w-full rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-yellow-700 dark:border-yellow-900/30 dark:bg-yellow-900/10 dark:text-yellow-500">
              <div className="flex items-start">
                <FaInfoCircle className="mr-3 mt-0.5" />
                <div>
                  <p>No running activities found in your Strava account.</p>
                  <p className="mt-2">
                    If you have activities but they&apos;re not showing, make
                    sure you&apos;ve granted the proper permissions.
                  </p>
                  <Link
                    href="/running-log/auth"
                    className="mt-3 inline-flex items-center rounded-md bg-[#FC4C02] px-3 py-1.5 text-sm font-medium text-white hover:bg-[#e34500]"
                  >
                    <FaStrava className="mr-1.5" /> Authorize Strava
                  </Link>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
