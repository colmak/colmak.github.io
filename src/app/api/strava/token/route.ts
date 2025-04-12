import { NextResponse } from "next/server";

export async function GET() {
  try {
    const clientId = process.env.STRAVA_CLIENT_ID;
    const clientSecret = process.env.STRAVA_CLIENT_SECRET;
    const refreshToken = process.env.STRAVA_REFRESH_TOKEN;

    if (!clientId || !clientSecret || !refreshToken) {
      console.error(
        "Missing required Strava credentials in environment variables",
      );
      return NextResponse.json(
        { error: "Missing Strava credentials" },
        { status: 500 },
      );
    }

    const tokenResponse = await fetch(
      "https://www.strava.com/api/v3/oauth/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        }),
      },
    );

    if (!tokenResponse.ok) {
      const error = await tokenResponse.text();
      console.error("Failed to refresh token:", error);
      return NextResponse.json(
        { error: "Failed to refresh token" },
        { status: tokenResponse.status },
      );
    }

    const data = await tokenResponse.json();
    console.log("Successfully refreshed token");

    return NextResponse.json({
      access_token: data.access_token,
      expires_at: data.expires_at,
    });
  } catch (error) {
    console.error("Error getting Strava token:", error);
    return NextResponse.json(
      { error: "Error getting Strava token" },
      { status: 500 },
    );
  }
}
