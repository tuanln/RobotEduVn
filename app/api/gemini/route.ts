import { NextRequest, NextResponse } from "next/server";
import { chatWithGemini } from "@/lib/gemini";

// Simple in-memory rate limiter
const rateLimit = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }

  if (entry.count >= 10) return false;
  entry.count++;
  return true;
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Qua nhieu yeu cau. Vui long doi 1 phut." },
      { status: 429 }
    );
  }

  try {
    const { messages } = await request.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages required" },
        { status: 400 }
      );
    }

    if (messages.length > 20) {
      return NextResponse.json(
        {
          error:
            "Cuoc hoi thoai qua dai. Vui long bat dau cuoc tro chuyen moi.",
        },
        { status: 400 }
      );
    }

    const reply = await chatWithGemini(messages);
    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      {
        error:
          "Co loi xay ra. Vui long thu lai hoac lien he lang@makerviet.org.",
      },
      { status: 500 }
    );
  }
}
