import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    return NextResponse.json({
      ok: true,
      echo: messages ?? null,
      message: "Chat endpoint reached successfully ✅",
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid request", details: String(err) },
      { status: 400 }
    );
  }
}
