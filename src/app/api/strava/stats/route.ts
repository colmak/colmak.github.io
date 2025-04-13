import { NextResponse } from "next/server";

interface StravaAthlete {
  id: number;
  firstname?: string;
  lastname?: string;
  [key: string]: unknown;
}

interface StravaStats {
  recent_run_totals: RunTotals;
  all_run_totals: RunTotals;
  ytd_run_totals: RunTotals;
  [key: string]: unknown;
}

interface RunTotals {
  count: number;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  elevation_gain: number;
  [key: string]: unknown;
}

interface StravaError {
  message?: string;
  errors?: string | string[];
}

export async function GET() {
  try {
    console.log("Fetching athlete stats...");

    const accessToken = await getAccessToken();
    if (!accessToken) {
      return NextResponse.json(
        { error: "Failed to get access token" },
        { status: 500 },
      );
    }

    const athleteId = await getAthleteId(accessToken);
    if (!athleteId) {
      return NextResponse.json(
        { error: "Failed to get athlete ID" },
        { status: 500 },
      );
    }

    const stats = await getAthleteStats(athleteId, accessToken);
    console.log("Successfully fetched athlete stats");

    return NextResponse.json(stats);
  } catch (error: unknown) {
    console.error("Error in stats endpoint:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Error fetching athlete stats",
      },
      { status: 500 },
    );
  }
}

async function getAccessToken(): Promise<string | null> {
  try {
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

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const tokenResponse = await fetch(`${baseUrl}/api/strava/token`, {
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

async function getAthleteId(
  accessToken: string,
): Promise<string | number | null> {
  try {
    const envAthleteId = process.env.STRAVA_ATHLETE_ID;
    if (envAthleteId && envAthleteId !== "rolandvd") {
      console.log("Using athlete ID from environment");
      return envAthleteId;
    }

    console.log("Fetching athlete ID from Strava API");
    const athleteResponse = await fetch(
      "https://www.strava.com/api/v3/athlete",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        cache: "no-store",
      },
    );

    if (!athleteResponse.ok) {
      console.error("Failed to fetch athlete:", await athleteResponse.text());
      return null;
    }

    const athlete = (await athleteResponse.json()) as StravaAthlete;
    console.log(`Got athlete ID: ${athlete.id}`);
    return athlete.id;
  } catch (error) {
    console.error("Error getting athlete ID:", error);
    return null;
  }
}

async function getAthleteStats(
  athleteId: string | number,
  accessToken: string,
): Promise<StravaStats> {
  try {
    const statsResponse = await fetch(
      `https://www.strava.com/api/v3/athletes/${athleteId}/stats`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        cache: "no-store",
      },
    );

    if (!statsResponse.ok) {
      let errorText: string;
      try {
        const errorData = (await statsResponse.json()) as StravaError;
        errorText =
          errorData.message ||
          (typeof errorData.errors === "string"
            ? errorData.errors
            : "Unknown error");
      } catch {
        errorText = await statsResponse.text();
      }

      console.error(
        `Failed to fetch stats: ${statsResponse.status}`,
        errorText,
      );
      throw new Error(`Stats error (${statsResponse.status}): ${errorText}`);
    }

    return (await statsResponse.json()) as StravaStats;
  } catch (error) {
    console.error("Error fetching stats:", error);
    throw error;
  }
}
