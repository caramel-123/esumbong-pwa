import { NextResponse } from "next/server";
import { sendEMessage } from "@/server/modules/notifications/eMessage";

/**
 * Mock eMessage integration.
 * Real eMessage delivers SMS, email, and in-app notices through a single
 * messaging API. This stub logs and echoes back what would have been sent —
 * swap for the real eMessage call when credentials are available. The
 * Dispute/Review Service (Track C) calls sendEMessage() directly rather
 * than hitting this route internally.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { recipient, message } = body as { recipient?: string; message?: string };

  if (!message) {
    return NextResponse.json({ sent: false, error: "Missing message" }, { status: 400 });
  }

  const result = await sendEMessage(recipient ?? "current_user", message);

  return NextResponse.json({ source: "eMessage", ...result });
}
