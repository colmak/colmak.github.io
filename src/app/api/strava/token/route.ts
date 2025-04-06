import { NextResponse } from "next/server";

const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID;
const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;
const STRAVA_REFRESH_TOKEN = process.env.STRAVA_REFRESH_TOKEN;
const STRAVA_ACCESS_TOKEN = process.env.STRAVA_ACCESS_TOKEN;

type StravaTokenResponse = {
  token_type: string;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  access_token: string;
};

export async function GET() {
  try {
    console.log(`STRAVA_CLIENT_ID exists: ${!!STRAVA_CLIENT_ID}`);
    console.log(`STRAVA_CLIENT_SECRET exists: ${!!STRAVA_CLIENT_SECRET}`);
    console.log(`STRAVA_REFRESH_TOKEN exists: ${!!STRAVA_REFRESH_TOKEN}`);
    console.log(`STRAVA_ACCESS_TOKEN exists: ${!!STRAVA_ACCESS_TOKEN}`);

    if (!STRAVA_CLIENT_ID || !STRAVA_CLIENT_SECRET || !STRAVA_REFRESH_TOKEN) {
      console.error("Missing Strava credentials in environment variables");
      return NextResponse.json(
        { error: "Configuration error" },
        { status: 500 },
      );
    }

    if (STRAVA_ACCESS_TOKEN) {
      return NextResponse.json({
        access_token: STRAVA_ACCESS_TOKEN,
        expires_at: Math.floor(Date.now() / 1000) + 3600,
      });
    }

    const response = await fetch("https://www.strava.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: STRAVA_CLIENT_ID,
        client_secret: STRAVA_CLIENT_SECRET,
        refresh_token: STRAVA_REFRESH_TOKEN,
        grant_type: "refresh_token",
        scope: "activity:read_all,profile:read_all",
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error(`Failed to refresh token: ${response.status}`, errorData);
      throw new Error(
        `Failed to refresh token: ${response.status} - ${errorData}`,
      );
    }

    const data: StravaTokenResponse = await response.json();

    return NextResponse.json({
      access_token: data.access_token,
      expires_at: data.expires_at,
    });
  } catch (error) {
    console.error("Error refreshing Strava token:", error);
    return NextResponse.json(
      { error: "Failed to refresh token" },
      { status: 500 },
    );
  }
}
