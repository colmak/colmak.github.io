"use client";

import { useState, useEffect } from "react";
import Header from "~/components/Header";
import { FaRunning, FaStrava, FaCalendarAlt, FaTrophy, FaExternalLinkAlt, FaInfoCircle } from "react-icons/fa";
import { mockActivities, mockStats } from "./mock-data";

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

type AthleteStats = {
  recent_run_totals: {
    count: number;
    distance: number;
    moving_time: number;
    elapsed_time: number;
    elevation_gain: number;
  };
  all_run_totals: {
    count: number;
    distance: number;
    moving_time: number;
    elapsed_time: number;
    elevation_gain: number;
  };
};

export default function RunningLogClient() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [stats, setStats] = useState<AthleteStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [useMockData, setUseMockData] = useState(false);

  useEffect(() => {
    async function fetchRunningData() {
      try {
        setLoading(true);
        
        const statsResponse = await fetch("/api/strava/stats");
        const statsData = await statsResponse.json();
        
        if (!statsResponse.ok) {
          console.error("Stats error:", statsData.message || 'Failed to fetch athlete stats');
          throw new Error(statsData.message || 'Failed to fetch athlete stats');
        }
        
        const activitiesResponse = await fetch("/api/strava/activities");
        const activitiesData = await activitiesResponse.json();
        
        if (!activitiesResponse.ok) {
          console.error("Activities error:", activitiesData.message || 'Failed to fetch activities');
          throw new Error(activitiesData.message || 'Failed to fetch activities');
        }
        
        setStats(statsData);
        setActivities(activitiesData.filter((activity: Activity) => activity.type === "Run"));
        setLoading(false);
      } catch (err) {
        console.error("Error fetching Strava data:", err);
        
        console.log("Using mock data as fallback");
        setUseMockData(true);
        setStats(mockStats);
        setActivities(mockActivities);
        setLoading(false);
      }
    }

    fetchRunningData();
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    
    return `${hours ? `${hours}h ` : ''}${minutes}m ${remainingSeconds}s`;
  };

  const formatDistance = (meters: number) => {
    const miles = (meters / 1609.34).toFixed(2);
    return `${miles} mi`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const calculatePace = (distance: number, seconds: number) => {
    const miles = distance / 1609.34;
    const minutesPerMile = seconds / 60 / miles;
    const minutes = Math.floor(minutesPerMile);
    const secondsRemainder = Math.round((minutesPerMile - minutes) * 60);
    
    return `${minutes}:${secondsRemainder.toString().padStart(2, '0')} /mi`;
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

          {useMockData && (
            <div className="mb-4 w-full rounded-lg border border-yellow-200 bg-yellow-50 p-3 text-yellow-800 dark:border-yellow-700/50 dark:bg-yellow-900/20 dark:text-yellow-400">
              <div className="flex items-start">
                <FaInfoCircle className="mr-2 mt-0.5" />
                <p>
                  <strong>Note:</strong> Using demo data. Real-time Strava connection unavailable.
                </p>
              </div>
            </div>
          )}

          {loading && (
            <div className="flex w-full items-center justify-center py-12">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
            </div>
          )}

          {error && !useMockData && (
            <div className="w-full rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-900/30 dark:bg-red-900/20 dark:text-red-400">
              <p>{error}</p>
            </div>
          )}

          {!loading && stats && (
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
              <div className="rounded-lg border border-gray-200/50 bg-gray-50/70 p-4 shadow-sm dark:border-gray-800/50 dark:bg-gray-900/30">
                <div className="flex items-center gap-2">
                  <FaRunning className="text-blue-500" />
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Distance</h3>
                </div>
                <p className="mt-2 text-xl font-bold text-black dark:text-white">
                  {formatDistance(stats.all_run_totals.distance)}
                </p>
              </div>

              <div className="rounded-lg border border-gray-200/50 bg-gray-50/70 p-4 shadow-sm dark:border-gray-800/50 dark:bg-gray-900/30">
                <div className="flex items-center gap-2">
                  <FaTrophy className="text-yellow-500" />
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Runs</h3>
                </div>
                <p className="mt-2 text-xl font-bold text-black dark:text-white">
                  {stats.all_run_totals.count}
                </p>
              </div>

              <div className="rounded-lg border border-gray-200/50 bg-gray-50/70 p-4 shadow-sm dark:border-gray-800/50 dark:bg-gray-900/30">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-green-500" />
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Time</h3>
                </div>
                <p className="mt-2 text-xl font-bold text-black dark:text-white">
                  {formatTime(stats.all_run_totals.moving_time)}
                </p>
              </div>

              <div className="rounded-lg border border-gray-200/50 bg-gray-50/70 p-4 shadow-sm dark:border-gray-800/50 dark:bg-gray-900/30">
                <div className="flex items-center gap-2">
                  <FaRunning className="text-purple-500" />
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Recent (4 weeks)</h3>
                </div>
                <p className="mt-2 text-xl font-bold text-black dark:text-white">
                  {formatDistance(stats.recent_run_totals.distance)}
                </p>
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
                      href={useMockData ? "#" : `https://www.strava.com/activities/${activity.id}`}
                      target={useMockData ? "_self" : "_blank"}
                      rel={useMockData ? "" : "noopener noreferrer"}
                      className="block p-4"
                      onClick={useMockData ? (e) => e.preventDefault() : undefined}
                    >
                      <div className="flex w-full flex-wrap items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-1">
                            <h3 className="font-medium text-black dark:text-white">
                              {activity.name}
                            </h3>
                            <FaExternalLinkAlt size={12} className="text-gray-400" />
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(activity.start_date_local)}
                          </p>
                        </div>
                        <div className="flex gap-4">
                          <div>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Distance</p>
                            <p className="text-sm font-medium text-black dark:text-white">
                              {formatDistance(activity.distance)}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Time</p>
                            <p className="text-sm font-medium text-black dark:text-white">
                              {formatTime(activity.moving_time)}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Pace</p>
                            <p className="text-sm font-medium text-black dark:text-white">
                              {calculatePace(activity.distance, activity.moving_time)}
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
        </main>
      </div>
    </div>
  );
}
