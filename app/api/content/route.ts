import { NextRequest, NextResponse } from "next/server";
import { getVideos, getArticles, getHubs } from "@/lib/sheets";

export async function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get("type");

  switch (type) {
    case "videos": {
      const videos = await getVideos();
      return NextResponse.json(videos);
    }
    case "articles": {
      const articles = await getArticles();
      return NextResponse.json(articles);
    }
    case "hubs": {
      const hubs = await getHubs();
      return NextResponse.json(hubs);
    }
    default:
      return NextResponse.json(
        { error: "Invalid type. Use: videos, articles, hubs" },
        { status: 400 }
      );
  }
}
