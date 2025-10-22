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

    if (!apiKey || !workflowId) {
      return NextResponse.json(
        { ok: false, error: "Missing OPENAI_API_KEY or Workflow ID" },
        { status: 500 }
      );
    }

    // ✅ Updated endpoint per current AgentBuilder spec
    const runResponse = await fetch(
      `https://api.openai.com/v1/agent/workflows/${workflowId}/runs`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ input: { message } }),
      }
    );

    const runData = await runResponse.json();

    if (!runData?.id) {
      return NextResponse.json(
        { ok: false, error: "Failed to start workflow", details: runData },
        { status: 500 }
      );
    }

    // Poll for completion
    let outputData = null;
    for (let i = 0; i < 15; i++) {
      const check = await fetch(
        `https://api.openai.com/v1/agent/workflows/runs/${runData.id}`,
        { headers: { Authorization: `Bearer ${apiKey}` } }
      );

      const result = await check.json();
      if (result.status === "succeeded") {
        outputData = result.output;
        break;
      }
      await new Promise((r) => setTimeout(r, 1000));
    }

    return NextResponse.json({
      ok: true,
      workflow_id: workflowId,
      output: outputData ?? "(no workflow output after polling)",
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
    message: "Use POST with JSON { message: '...' } to chat with this endpoint.",
  });
}
