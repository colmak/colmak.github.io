import { NextResponse } from "next/server";
import { mockStats } from "~/app/running-log/mock-data";

export async function GET() {
  try {
    console.log("Starting stats fetch");
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    if (process.env.USE_MOCK_DATA === "true") {
      console.log("Using mock data for stats (environment variable)");
      return NextResponse.json(mockStats);
    }

    const tokenResponse = await fetch(`${baseUrl}/api/strava/token`);

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error(
        `Failed to get access token: ${tokenResponse.status}`,
        errorText,
      );
      throw new Error(
        `Failed to get access token: ${tokenResponse.status} - ${errorText}`,
      );
    }

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      console.error(
        "Token response doesn't contain an access_token",
        tokenData,
      );
      throw new Error("Invalid token response");
    }

    const { access_token } = tokenData;

    const athleteResponse = await fetch(
      "https://www.strava.com/api/v3/athlete",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );

    if (!athleteResponse.ok) {
      const errorText = await athleteResponse.text();
      console.error(
        `Failed to fetch athlete information: ${athleteResponse.status}`,
        errorText,
      );
      console.log("Falling back to mock stats data");
      return NextResponse.json(mockStats);
    }

    const athleteData = await athleteResponse.json();

    if (!athleteData.id) {
      console.error("Athlete data doesn't contain an ID", athleteData);
      console.log("Falling back to mock stats data");
      return NextResponse.json(mockStats);
    }

    const athleteId = athleteData.id;

    const statsResponse = await fetch(
      `https://www.strava.com/api/v3/athletes/${athleteId}/stats`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );

    if (!statsResponse.ok) {
      const errorText = await statsResponse.text();
      console.error(
        `Failed to fetch athlete stats: ${statsResponse.status}`,
        errorText,
      );
      console.log("Falling back to mock stats data");
      return NextResponse.json(mockStats);
    }

    const stats = await statsResponse.json();
    console.log("Successfully fetched athlete stats");

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching athlete stats:", error);
    console.log("Error occurred, using mock stats data as fallback");
    return NextResponse.json(mockStats);
  }
}
