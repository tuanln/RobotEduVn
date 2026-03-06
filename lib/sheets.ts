import { VideoItem, Article, MakerHub, LearningStage } from "./types";
import { MOCK_VIDEOS, MOCK_ARTICLES, MOCK_HUBS } from "./data";

const SHEETS_API_KEY = process.env.GOOGLE_SHEETS_API_KEY;
const SHEETS_ID = process.env.GOOGLE_SHEETS_ID;
const BASE_URL = "https://sheets.googleapis.com/v4/spreadsheets";

async function fetchSheet(sheetName: string): Promise<string[][] | null> {
  if (!SHEETS_API_KEY || !SHEETS_ID) return null;

  try {
    const url = `${BASE_URL}/${SHEETS_ID}/values/${encodeURIComponent(sheetName)}?key=${SHEETS_API_KEY}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data.values || null;
  } catch {
    return null;
  }
}

function parseVideos(rows: string[][]): VideoItem[] {
  const [, ...dataRows] = rows; // skip header
  return dataRows
    .map((row) => {
      const youtubeUrl = row[3] || "";
      const youtubeId = extractYouTubeId(youtubeUrl);
      return {
        id: row[0] || "",
        title: row[1] || "",
        youtubeUrl,
        youtubeId,
        stage: (row[4] || "kham-pha") as LearningStage,
        ageRange: row[5] || "",
        tags: (row[6] || "").split(",").map((t) => t.trim()).filter(Boolean),
        description: row[7] || "",
        thumbnail:
          row[8] ||
          (youtubeId
            ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
            : ""),
        featured: row[9]?.toUpperCase() === "TRUE",
        published: row[10]?.toUpperCase() !== "FALSE",
        order: parseInt(row[11] || "0", 10),
        createdAt: row[12] || "",
      };
    })
    .filter((v) => v.published && v.youtubeId);
}

function parseArticles(rows: string[][]): Article[] {
  const [, ...dataRows] = rows;
  return dataRows
    .map((row) => ({
      id: row[0] || "",
      title: row[1] || "",
      slug: row[2] || "",
      category: (row[3] || "tin-tuc") as Article["category"],
      content: row[4] || "",
      excerpt: row[5] || "",
      coverImage: row[6] || "/images/placeholder-project.jpg",
      author: row[7] || "",
      tags: (row[8] || "").split(",").map((t) => t.trim()).filter(Boolean),
      youtubeUrl: row[9] || undefined,
      published: row[10]?.toUpperCase() !== "FALSE",
      publishDate: row[11] || "",
    }))
    .filter((a) => a.published);
}

function parseHubs(rows: string[][]): MakerHub[] {
  const [, ...dataRows] = rows;
  return dataRows
    .map((row) => ({
      id: row[0] || "",
      name: row[1] || "",
      type: (row[2] || "clb") as MakerHub["type"],
      address: row[3] || "",
      lat: parseFloat(row[4] || "0"),
      lng: parseFloat(row[5] || "0"),
      mentors: (row[6] || "").split(",").map((m) => m.trim()).filter(Boolean),
      schedule: row[7] || "",
      equipment: (row[8] || "").split(",").map((e) => e.trim()).filter(Boolean),
      contact: row[9] || "",
      active: row[10]?.toUpperCase() !== "FALSE",
    }))
    .filter((h) => h.active);
}

function extractYouTubeId(url: string): string {
  if (!url) return "";
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s?]+)/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return "";
}

export async function getVideos(): Promise<VideoItem[]> {
  const rows = await fetchSheet("Videos");
  if (!rows) return MOCK_VIDEOS;
  return parseVideos(rows);
}

export async function getArticles(): Promise<Article[]> {
  const rows = await fetchSheet("Articles");
  if (!rows) return MOCK_ARTICLES;
  return parseArticles(rows);
}

export async function getHubs(): Promise<MakerHub[]> {
  const rows = await fetchSheet("Hubs");
  if (!rows) return MOCK_HUBS;
  return parseHubs(rows);
}

export async function appendToSheet(
  sheetName: string,
  values: string[][]
): Promise<boolean> {
  if (!SHEETS_API_KEY || !SHEETS_ID) return false;

  try {
    const url = `${BASE_URL}/${SHEETS_ID}/values/${encodeURIComponent(sheetName)}:append?valueInputOption=USER_ENTERED&key=${SHEETS_API_KEY}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ values }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
