import { NextResponse } from "next/server";
import { mockActivities } from "~/app/running-log/mock-data";

export async function GET() {
  try {
    console.log("Starting activities fetch");
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    if (process.env.USE_MOCK_DATA === "true") {
      console.log("Using mock data for activities (environment variable)");
      return NextResponse.json(mockActivities);
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

    const activitiesResponse = await fetch(
      "https://www.strava.com/api/v3/athlete/activities?per_page=10",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );

    if (!activitiesResponse.ok) {
      const errorText = await activitiesResponse.text();
      console.error(
        `Failed to fetch Strava activities: ${activitiesResponse.status}`,
        errorText,
      );

      // If we get an authorization error, fallback to mock data
      console.log("Falling back to mock activities data");
      return NextResponse.json(mockActivities);
    }

    const activities = await activitiesResponse.json();
    console.log(`Successfully fetched ${activities.length} activities`);

    return NextResponse.json(activities);
  } catch (error) {
    console.error("Error fetching Strava activities:", error);
    // On any error, fall back to mock data
    console.log("Error occurred, using mock activities data as fallback");
    return NextResponse.json(mockActivities);
  }
}
