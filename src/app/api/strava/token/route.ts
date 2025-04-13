import { NextResponse } from "next/server";

export async function GET() {
  try {
    const accessToken = process.env.STRAVA_ACCESS_TOKEN;
    const refreshToken = process.env.STRAVA_REFRESH_TOKEN;
    const clientId = process.env.STRAVA_CLIENT_ID;
    const clientSecret = process.env.STRAVA_CLIENT_SECRET;

    if (!clientId || !clientSecret || !refreshToken) {
      console.error("Missing required Strava credentials");
      return NextResponse.json(
        { error: "Missing Strava credentials" },
        { status: 500 },
      );
    }

    console.log("Refreshing Strava token...");

    try {
      const tokenResponse = await fetch("https://www.strava.com/oauth/token", {
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
        cache: "no-store",
      });

      if (!tokenResponse.ok) {
        console.error("Failed to refresh token:", await tokenResponse.text());

        if (accessToken) {
          console.log("Using existing access token as fallback");
          return NextResponse.json({
            access_token: accessToken,
            message: "Using existing token (refresh failed)",
          });
        }

        return NextResponse.json(
          { error: "Failed to refresh token" },
          { status: tokenResponse.status },
        );
      }

      const data = await tokenResponse.json();
      console.log("Successfully refreshed Strava token");

      return NextResponse.json({
        access_token: data.access_token,
        expires_at: data.expires_at,
        refresh_token: data.refresh_token || refreshToken,
      });
    } catch (refreshError) {
      console.error("Error refreshing token:", refreshError);

      if (accessToken) {
        console.log("Using existing access token as fallback after error");
        return NextResponse.json({
          access_token: accessToken,
          message: "Using existing token (refresh error)",
        });
      }

      throw refreshError;
    }
  } catch (error) {
    console.error("Error in token endpoint:", error);
    return NextResponse.json(
      { error: "Error getting Strava token" },
      { status: 500 },
    );
  }
}
