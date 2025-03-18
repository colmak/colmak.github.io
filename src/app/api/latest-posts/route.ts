import { NextResponse } from "next/server";
import { getLatestPosts } from "~/lib/mdx";

export function GET() {
  try {
    const posts = getLatestPosts(5);
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching latest posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch latest posts" },
      { status: 500 },
    );
  }
}
