import { NextResponse } from "next/server";


interface StravaActivity {
  id: number;
  name: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  type: string;
  start_date: string;
  start_date_local: string;

  [key: string]: unknown;
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
      console.log(`Successfully fetched ${activities.length} activities`);
      return NextResponse.json(activities);
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
