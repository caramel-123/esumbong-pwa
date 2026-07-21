import { NextResponse } from "next/server";
import { createHash } from "crypto";

/**
 * Mock eGovChain integration.
 * Real eGovChain anchors a document hash on the government blockchain
 * ledger for tamper-evident verification. This stub hashes the submitted
 * payload and returns a deterministic-looking anchor reference — enough to
 * demo the "anchored, can't be silently edited" mechanic end to end.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));

  const payload = JSON.stringify({ ...body, salt: Date.now() });
  const hash = createHash("sha256").update(payload).digest("hex");

  await new Promise((r) => setTimeout(r, 400));

  return NextResponse.json({
    source: "eGovChain",
    anchorRef: `#ES-${hash.slice(0, 8).toUpperCase()}-TX`,
    hash,
    anchoredAt: new Date().toISOString(),
  });
}
