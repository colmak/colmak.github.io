import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const error = url.searchParams.get("error");
    const scope = url.searchParams.get("scope");

    if (error) {
      console.error("Authorization error:", error);
      return new Response(
        `
        <html>
          <head>
            <title>Authorization Failed</title>
            <style>
              body {
                font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background-color: #f9f9f9;
                color: #333;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                margin: 0;
                padding: 20px;
              }
              .container {
                max-width: 600px;
                background-color: white;
                border-radius: 8px;
                padding: 32px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                text-align: center;
              }
              .error {
                color: #e53e3e;
                font-weight: 600;
                margin-bottom: 16px;
              }
              a {
                display: inline-block;
                background-color: #FC4C02;
                color: white;
                text-decoration: none;
                padding: 10px 16px;
                border-radius: 6px;
                font-weight: 500;
                margin-top: 16px;
              }
              a:hover {
                background-color: #e34500;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Authorization Failed</h1>
              <p class="error">Error: ${error}</p>
              <p>The authorization process was not completed successfully.</p>
              <a href="/running-log">Return to Running Log</a>
            </div>
          </body>
        </html>
        `,
        {
          headers: {
            "Content-Type": "text/html",
          },
        },
      );
    }

    if (!code) {
      console.error("No authorization code provided");
      return new Response(
        `
        <html>
          <head>
            <title>Authorization Failed</title>
            <style>
              body {
                font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background-color: #f9f9f9;
                color: #333;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                margin: 0;
                padding: 20px;
              }
              .container {
                max-width: 600px;
                background-color: white;
                border-radius: 8px;
                padding: 32px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                text-align: center;
              }
              .error {
                color: #e53e3e;
                font-weight: 600;
                margin-bottom: 16px;
              }
              a {
                display: inline-block;
                background-color: #FC4C02;
                color: white;
                text-decoration: none;
                padding: 10px 16px;
                border-radius: 6px;
                font-weight: 500;
                margin-top: 16px;
              }
              a:hover {
                background-color: #e34500;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Authorization Failed</h1>
              <p class="error">No authorization code provided</p>
              <p>The authorization process was not completed successfully.</p>
              <a href="/running-log">Return to Running Log</a>
            </div>
          </body>
        </html>
        `,
        {
          headers: {
            "Content-Type": "text/html",
          },
        },
      );
    }

    // Get necessary credentials from environment
    const clientId = process.env.STRAVA_CLIENT_ID;
    const clientSecret = process.env.STRAVA_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      console.error("Missing required environment variables");
      return new Response(
        `
        <html>
          <head>
            <title>Configuration Error</title>
            <style>
              body {
                font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background-color: #f9f9f9;
                color: #333;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                margin: 0;
                padding: 20px;
              }
              .container {
                max-width: 600px;
                background-color: white;
                border-radius: 8px;
                padding: 32px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                text-align: center;
              }
              .error {
                color: #e53e3e;
                font-weight: 600;
                margin-bottom: 16px;
              }
              a {
                display: inline-block;
                background-color: #FC4C02;
                color: white;
                text-decoration: none;
                padding: 10px 16px;
                border-radius: 6px;
                font-weight: 500;
                margin-top: 16px;
              }
              a:hover {
                background-color: #e34500;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Configuration Error</h1>
              <p class="error">Missing required environment variables</p>
              <p>The server is missing required configuration. Please contact the site administrator.</p>
              <a href="/running-log">Return to Running Log</a>
            </div>
          </body>
        </html>
        `,
        {
          headers: {
            "Content-Type": "text/html",
          },
        },
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || url.origin;
    const redirectUri = `${baseUrl}/api/strava/auth-callback`;

    console.log("Exchanging authorization code for tokens");

    const tokenResponse = await fetch("https://www.strava.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        grant_type: "authorization_code",
      }),
      cache: "no-store",
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error("Token exchange failed:", tokenResponse.status, errorText);
      return new Response(
        `
        <html>
          <head>
            <title>Token Exchange Failed</title>
            <style>
              body {
                font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background-color: #f9f9f9;
                color: #333;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                margin: 0;
                padding: 20px;
              }
              .container {
                max-width: 600px;
                background-color: white;
                border-radius: 8px;
                padding: 32px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                text-align: center;
              }
              .error {
                color: #e53e3e;
                font-weight: 600;
                margin-bottom: 16px;
              }
              pre {
                background-color: #f1f1f1;
                padding: 16px;
                border-radius: 4px;
                overflow-x: auto;
                text-align: left;
                margin-top: 16px;
                font-size: 14px;
              }
              a {
                display: inline-block;
                background-color: #FC4C02;
                color: white;
                text-decoration: none;
                padding: 10px 16px;
                border-radius: 6px;
                font-weight: 500;
                margin-top: 16px;
              }
              a:hover {
                background-color: #e34500;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Token Exchange Failed</h1>
              <p class="error">Could not exchange authorization code for tokens (${tokenResponse.status})</p>
              <p>The server could not complete the authorization process with Strava.</p>
              <pre>${errorText}</pre>
              <a href="/running-log">Return to Running Log</a>
            </div>
          </body>
        </html>
        `,
        {
          headers: {
            "Content-Type": "text/html",
          },
        },
      );
    }

    const tokenData = await tokenResponse.json();
    const { refresh_token, access_token, athlete, expires_at, expires_in } =
      tokenData;

    if (!refresh_token) {
      console.error("No refresh token returned");
      return new Response(
        `
        <html>
          <head>
            <title>Invalid Response</title>
            <style>
              body {
                font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background-color: #f9f9f9;
                color: #333;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                margin: 0;
                padding: 20px;
              }
              .container {
                max-width: 600px;
                background-color: white;
                border-radius: 8px;
                padding: 32px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                text-align: center;
              }
              .error {
                color: #e53e3e;
                font-weight: 600;
                margin-bottom: 16px;
              }
              a {
                display: inline-block;
                background-color: #FC4C02;
                color: white;
                text-decoration: none;
                padding: 10px 16px;
                border-radius: 6px;
                font-weight: 500;
                margin-top: 16px;
              }
              a:hover {
                background-color: #e34500;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Invalid Response</h1>
              <p class="error">No refresh token returned from Strava</p>
              <p>The server did not receive a valid response from Strava.</p>
              <a href="/running-log">Return to Running Log</a>
            </div>
          </body>
        </html>
        `,
        {
          headers: {
            "Content-Type": "text/html",
          },
        },
      );
    }

    return new Response(
      `
      <html>
        <head>
          <title>Authorization Successful</title>
          <style>
            body {
              font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              background-color: #f9f9f9;
              color: #333;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              margin: 0;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              background-color: white;
              border-radius: 8px;
              padding: 32px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.1);
              text-align: center;
            }
            .success {
              color: #38a169;
              font-weight: 600;
              margin-bottom: 16px;
            }
            .token-box {
              background-color: #f1f1f1;
              padding: 16px;
              border-radius: 4px;
              margin: 16px 0;
              word-break: break-all;
              text-align: left;
              font-family: monospace;
              position: relative;
            }
            .copy-btn {
              position: absolute;
              top: 8px;
              right: 8px;
              background: #e2e8f0;
              border: none;
              border-radius: 4px;
              padding: 4px 8px;
              cursor: pointer;
              font-size: 12px;
            }
            .copy-btn:hover {
              background: #cbd5e0;
            }
            .instructions {
              text-align: left;
              margin-top: 24px;
              background: #f8f9fa;
              padding: 16px;
              border-radius: 4px;
              font-size: 14px;
            }
            .instructions h2 {
              margin-top: 0;
            }
            .instructions ol {
              padding-left: 20px;
            }
            a {
              display: inline-block;
              background-color: #FC4C02;
              color: white;
              text-decoration: none;
              padding: 10px 16px;
              border-radius: 6px;
              font-weight: 500;
              margin-top: 16px;
            }
            a:hover {
              background-color: #e34500;
            }
            .user-info {
              margin-top: 16px;
              padding: 16px;
              border-radius: 4px;
              background-color: #f0f9ff;
              text-align: left;
            }
            .scope-info {
              margin-top: 16px;
              padding: 12px;
              border-radius: 4px;
              background-color: #f0fff4;
              text-align: left;
              font-size: 14px;
            }
            .token-section {
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Authorization Successful</h1>
            <p class="success">You have successfully authorized your Strava account!</p>
            ${
              athlete
                ? `
              <div class="user-info">
                <p><strong>Athlete:</strong> ${athlete.firstname} ${athlete.lastname}</p>
                ${athlete.profile ? `<img src="${athlete.profile}" alt="Profile" style="width: 50px; height: 50px; border-radius: 50%;">` : ""}
              </div>
            `
                : ""
            }
            ${
              scope
                ? `
              <div class="scope-info">
                <p><strong>Granted Permissions:</strong> ${scope}</p>
              </div>
            `
                : ""
            }
            <div class="instructions">
              <h2>Next Steps:</h2>
              <ol>
                <li>Copy your Strava tokens below.</li>
                <li>Add them to your <code>.env</code> file as shown below.</li>
                <li>Restart your development server.</li>
              </ol>
            </div>
            <div class="token-section">
              <h3>Your Refresh Token:</h3>
              <div class="token-box">
                STRAVA_REFRESH_TOKEN=${refresh_token}
                <button class="copy-btn" onclick="copyToClipboard('STRAVA_REFRESH_TOKEN=${refresh_token}')">Copy</button>
              </div>
            </div>
            <div class="token-section">
              <h3>Access Token (expires in ${Math.floor((expires_at - Date.now() / 1000) / 60)} minutes):</h3>
              <div class="token-box">
                STRAVA_ACCESS_TOKEN=${access_token}
                <button class="copy-btn" onclick="copyToClipboard('STRAVA_ACCESS_TOKEN=${access_token}')">Copy</button>
              </div>
            </div>
            <div class="token-section">
              <h3>Expires At:</h3>
              <div class="token-box">
                STRAVA_TOKEN_EXPIRES_AT=${expires_at}
                <button class="copy-btn" onclick="copyToClipboard('STRAVA_TOKEN_EXPIRES_AT=${expires_at}')">Copy</button>
              </div>
            </div>
            <div class="token-section">
              <h3>Athlete ID:</h3>
              <div class="token-box">
                STRAVA_ATHLETE_ID=${athlete?.id || ""}
                <button class="copy-btn" onclick="copyToClipboard('STRAVA_ATHLETE_ID=${athlete?.id || ""}')">Copy</button>
              </div>
            </div>
            <a href="/running-log">Return to Running Log</a>
          </div>
          <script>
            function copyToClipboard(text) {
              navigator.clipboard.writeText(text).then(() => {
                const btn = document.activeElement;
                btn.textContent = 'Copied!';
                setTimeout(() => {
                  btn.textContent = 'Copy';
                }, 2000);
              });
            }
          </script>
        </body>
      </html>
      `,
      {
        headers: {
          "Content-Type": "text/html",
        },
      },
    );
  } catch (error) {
    console.error("Auth callback error:", error);
    return new Response(
      `
      <html>
        <head>
          <title>Authorization Error</title>
          <style>
            body {
              font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              background-color: #f9f9f9;
              color: #333;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              margin: 0;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              background-color: white;
              border-radius: 8px;
              padding: 32px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.1);
              text-align: center;
            }
            .error {
              color: #e53e3e;
              font-weight: 600;
              margin-bottom: 16px;
            }
            a {
              display: inline-block;
              background-color: #FC4C02;
              color: white;
              text-decoration: none;
              padding: 10px 16px;
              border-radius: 6px;
              font-weight: 500;
              margin-top: 16px;
            }
            a:hover {
              background-color: #e34500;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Authorization Error</h1>
            <p class="error">An unexpected error occurred during authorization</p>
            <p>Please try again or contact the site administrator.</p>
            <a href="/running-log">Return to Running Log</a>
          </div>
        </body>
      </html>
      `,
      {
        headers: {
          "Content-Type": "text/html",
        },
      },
    );
  }
}
