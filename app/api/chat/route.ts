import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { ok: false, error: "Missing 'message' field" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    const workflowId = process.env.NEXT_PUBLIC_CHATKIT_WORKFLOW_ID;

    if (!apiKey) {
      return NextResponse.json(
        { ok: false, error: "Missing OPENAI_API_KEY in environment" },
        { status: 500 }
      );
    }

    // 👇 Send message to OpenAI or your workflow
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: `Workflow ID: ${workflowId ?? "none"}` },
          { role: "user", content: message },
        ],
      }),
    });

    const data = await response.json();

    return NextResponse.json({
      ok: true,
      reply: data?.choices?.[0]?.message?.content ?? "(no response)",
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "Server error", details: String(err) },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    ok: false,
    message:
      "Use POST with JSON { message: '...' } to chat with this endpoint.",
  });
}
