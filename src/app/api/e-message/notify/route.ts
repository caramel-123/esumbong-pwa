import { NextResponse } from "next/server";

/**
 * Mock eMessage integration.
 * Real eMessage delivers SMS, email, and in-app notices through a single
 * messaging API. This stub logs and echoes back what would have been sent —
 * swap for the real eMessage call when credentials are available.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { recipient, message } = body as { recipient?: string; message?: string };

  if (!message) {
    return NextResponse.json({ sent: false, error: "Missing message" }, { status: 400 });
  }

  await new Promise((r) => setTimeout(r, 150));

  return NextResponse.json({
    source: "eMessage",
    sent: true,
    recipient: recipient ?? "current_user",
    message,
    sentAt: new Date().toISOString(),
  });
}
