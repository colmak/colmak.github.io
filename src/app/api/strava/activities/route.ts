import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("Fetching athlete activities");
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

    const activitiesResponse = await fetch(
      "https://www.strava.com/api/v3/athlete/activities?per_page=100",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        cache: "no-store",
      },
    );

    if (!activitiesResponse.ok) {
      const errorText = await activitiesResponse.text();
      console.error(
        `Failed to fetch activities: ${activitiesResponse.status}`,
        errorText,
      );
      return NextResponse.json(
        { error: `Failed to fetch activities: ${errorText}` },
        { status: activitiesResponse.status },
      );
    }

    const activities = await activitiesResponse.json();
    console.log(`Successfully fetched ${activities.length} activities`);
    return NextResponse.json(activities);
  } catch (error) {
    console.error("Error in activities endpoint:", error);
    return NextResponse.json(
      { error: "Error fetching activities" },
      { status: 500 },
    );
  }
}
