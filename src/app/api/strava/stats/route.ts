import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("Fetching athlete stats");
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const tokenResponse = await fetch(`${baseUrl}/api/strava/token`, {
      cache: "no-store",
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      console.error("Failed to get access token:", errorData);
      return NextResponse.json(
        { error: "Failed to get access token" },
        { status: tokenResponse.status },
      );
    }

    const { access_token } = await tokenResponse.json();

    if (!access_token) {
      console.error("No access token returned");
      return NextResponse.json(
        { error: "No access token returned" },
        { status: 500 },
      );
    }

    const athleteResponse = await fetch(
      "https://www.strava.com/api/v3/athlete",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        cache: "no-store",
      },
    );

    if (!athleteResponse.ok) {
      const errorText = await athleteResponse.text();
      console.error(
        `Failed to fetch athlete: ${athleteResponse.status}`,
        errorText,
      );
      return NextResponse.json(
        { error: `Failed to fetch athlete: ${errorText}` },
        { status: athleteResponse.status },
      );
    }

    const athlete = await athleteResponse.json();
    const athleteId = athlete.id;

    if (!athleteId) {
      console.error("No athlete ID found in response");
      return NextResponse.json(
        { error: "No athlete ID found" },
        { status: 500 },
      );
    }

    console.log(`Got athlete ID: ${athleteId}, fetching stats`);

    const statsResponse = await fetch(
      `https://www.strava.com/api/v3/athletes/${athleteId}/stats`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        cache: "no-store",
      },
    );

    if (!statsResponse.ok) {
      const errorText = await statsResponse.text();
      console.error(
        `Failed to fetch stats: ${statsResponse.status}`,
        errorText,
      );
      return NextResponse.json(
        { error: `Failed to fetch stats: ${errorText}` },
        { status: statsResponse.status },
      );
    }

    const stats = await statsResponse.json();
    console.log("Successfully fetched athlete stats");
    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error in stats endpoint:", error);
    return NextResponse.json(
      { error: "Error fetching athlete stats" },
      { status: 500 },
    );
  }
}
