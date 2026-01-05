import { NextResponse } from "next/server";


// Fields that are safe to expose publicly (no personal/location info)
interface SafeActivity {
  id: number;
  name: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  type: string;
  start_date: string;
  start_date_local: string;
  total_elevation_gain?: number;
  average_speed?: number;
  max_speed?: number;
  average_heartrate?: number;
  max_heartrate?: number;
}

// Raw Strava API response type
interface StravaActivity {
  id: number;
  name: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  type: string;
  start_date: string;
  start_date_local: string;
  total_elevation_gain?: number;
  average_speed?: number;
  max_speed?: number;
  average_heartrate?: number;
  max_heartrate?: number;
  // Location data (will be stripped)
  start_latlng?: [number, number];
  end_latlng?: [number, number];
  map?: unknown;
  athlete?: unknown;
  [key: string]: unknown;
}

// Sanitize activity to remove personal/location data
function sanitizeActivity(activity: StravaActivity): SafeActivity {
  return {
    id: activity.id,
    name: activity.name,
    distance: activity.distance,
    moving_time: activity.moving_time,
    elapsed_time: activity.elapsed_time,
    type: activity.type,
    start_date: activity.start_date,
    start_date_local: activity.start_date_local,
    total_elevation_gain: activity.total_elevation_gain,
    average_speed: activity.average_speed,
    max_speed: activity.max_speed,
    average_heartrate: activity.average_heartrate,
    max_heartrate: activity.max_heartrate,
  };
}

type StravaError = {
  message?: string;
  errors?: string | string[];
};

export async function GET(request: Request) {
  try {
    console.log("Fetching athlete activities...");


    const url = new URL(request.url);
    const before = url.searchParams.get("before");
    const after = url.searchParams.get("after");
    const page = url.searchParams.get("page") || "1";
    const perPage = url.searchParams.get("per_page") || "30";
    const forceRefresh = url.searchParams.get("refresh") === "true";

    const accessToken = await getAccessToken(forceRefresh);
    if (!accessToken) {
      return NextResponse.json(
        { error: "Failed to get access token" },
        { status: 500 },
      );
    }


    try {
      const activities = await getActivities(accessToken, {
        before,
        after,
        page,
        perPage,
      });
      // Sanitize activities to remove personal/location data
      const sanitizedActivities = activities.map(sanitizeActivity);
      console.log(`Successfully fetched ${sanitizedActivities.length} activities (sanitized)`);
      return NextResponse.json(sanitizedActivities);
    } catch (activityError: unknown) {
      const error = activityError as Error;
      if (error.message && error.message.includes("401")) {
        console.error(
          "Authorization error for activities. Token likely lacks required scopes.",
        );
        return NextResponse.json(
          {
            error:
              "Authorization Error: Your Strava token doesn't have permission to access activities. Please re-authorize with activity:read scope.",
            authUrl: `/running-log/auth`,
          },
          { status: 401 },
        );
      }
      throw activityError;
    }
  } catch (error: unknown) {
    console.error("Error in activities endpoint:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Error fetching activities",
      },
      { status: 500 },
    );
  }
}

async function getAccessToken(forceRefresh = false): Promise<string | null> {
  try {
    if (!forceRefresh) {
      const directToken = process.env.STRAVA_ACCESS_TOKEN;
      if (directToken) {
        const testResponse = await fetch(
          "https://www.strava.com/api/v3/athlete",
          {
            headers: { Authorization: `Bearer ${directToken}` },
            cache: "no-store",
          },
        );

        if (testResponse.ok) {
          console.log("Using access token from environment");
          return directToken;
        }

        console.log("Env token invalid, trying token endpoint");
      }
    } else {
      console.log("Force refresh requested, skipping cached token");
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const tokenUrl = new URL(`${baseUrl}/api/strava/token`);
    if (forceRefresh) {
      tokenUrl.searchParams.append("refresh", "true");
    }

    const tokenResponse = await fetch(tokenUrl.toString(), {
      cache: "no-store",
    });

    if (!tokenResponse.ok) {
      console.error("Token endpoint failed:", await tokenResponse.text());
      return null;
    }

    const { access_token } = (await tokenResponse.json()) as {
      access_token: string;
    };
    return access_token;
  } catch (error) {
    console.error("Error getting access token:", error);
    return null;
  }
}

async function getActivities(
  accessToken: string,
  options: {
    before?: string | null;
    after?: string | null;
    page: string;
    perPage: string;
  },
): Promise<StravaActivity[]> {
  const { before, after, page, perPage } = options;
  let activitiesUrl = `https://www.strava.com/api/v3/athlete/activities?page=${page}&per_page=${perPage}`;

  if (before) {
    activitiesUrl += `&before=${before}`;
  }

  if (after) {
    activitiesUrl += `&after=${after}`;
  }

  console.log(`Requesting: ${activitiesUrl}`);
  const activitiesResponse = await fetch(activitiesUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });

  if (!activitiesResponse.ok) {
    let errorMessage = "";
    try {
      const errorData = (await activitiesResponse.json()) as StravaError;
      errorMessage =
        errorData.message ||
        (typeof errorData.errors === "string"
          ? errorData.errors
          : "Unknown error");
    } catch {
      errorMessage = await activitiesResponse.text();
    }

    console.error(
      `Failed to fetch activities: ${activitiesResponse.status}`,
      errorMessage,
    );

    throw new Error(
      `Activities error (${activitiesResponse.status}): ${errorMessage}`,
    );
  }

  return (await activitiesResponse.json()) as StravaActivity[];
}
