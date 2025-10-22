import { NextResponse } from "next/server";

export const runtime = "edge";

// Handle POST requests
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message = body?.message || body?.messages || null;

    if (!message) {
      return NextResponse.json(
        { ok: false, error: "Missing 'message' or 'messages' field" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      ok: true,
      echo: message,
      message: "Chat endpoint reached successfully ✅",
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON or server error", details: String(err) },
      { status: 500 }
    );
  }
}

// Handle GET requests gracefully
export async function GET() {
  return NextResponse.json({
    ok: false,
    message: "Use POST with JSON { message: '...' } to chat with this endpoint.",
  });
}
