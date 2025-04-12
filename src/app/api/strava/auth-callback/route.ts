import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
      console.error("Authorization error:", error);
      return NextResponse.json(
        { error: `Authorization denied: ${error}` },
        { status: 400 },
      );
    }

    if (!code) {
      console.error("No authorization code provided");
      return NextResponse.json(
        { error: "No authorization code provided" },
        { status: 400 },
      );
    }

    const clientId = process.env.STRAVA_CLIENT_ID;
    const clientSecret = process.env.STRAVA_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      console.error("Missing required Strava credentials");
      return NextResponse.json(
        { error: "Missing required Strava credentials" },
        { status: 500 },
      );
    }

    const tokenExchangeResponse = await fetch(
      "https://www.strava.com/oauth/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code: code,
          grant_type: "authorization_code",
        }),
      },
    );

    if (!tokenExchangeResponse.ok) {
      const errorText = await tokenExchangeResponse.text();
      console.error("Token exchange failed:", errorText);
      return NextResponse.json(
        { error: `Token exchange failed: ${errorText}` },
        { status: tokenExchangeResponse.status },
      );
    }

    const tokenData = await tokenExchangeResponse.json();

    return new NextResponse(
      `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Strava Authorization Complete</title>
        <style>
          body { font-family: system-ui, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
          pre { background: #f4f4f4; padding: 20px; overflow-x: auto; border-radius: 5px; }
          .success { color: #22c55e; }
          .instruction { margin-top: 30px; border-left: 4px solid #3b82f6; padding-left: 20px; }
          .token { word-break: break-all; font-family: monospace; }
        </style>
      </head>
      <body>
        <h1>Strava Authorization <span class="success">Successful!</span></h1>
        <p>Your Strava account has been successfully authorized with the required scopes.</p>
        
        <div class="instruction">
          <h2>Next Steps:</h2>
          <p>1. Update your <code>.env</code> file with the new refresh token:</p>
          <pre>STRAVA_REFRESH_TOKEN=${tokenData.refresh_token}</pre>
          
          <p>2. Restart your Next.js development server</p>
          <p>3. Your running log should now display your Strava activities!</p>
        </div>
        
        <div class="instruction">
          <h2>Full Response (for reference):</h2>
          <pre class="token">${JSON.stringify(tokenData, null, 2)}</pre>
        </div>
      </body>
      </html>`,
      {
        headers: {
          "Content-Type": "text/html",
        },
      },
    );
  } catch (error) {
    console.error("Error in auth callback:", error);
    return NextResponse.json(
      { error: "Error processing authorization" },
      { status: 500 },
    );
  }
}
