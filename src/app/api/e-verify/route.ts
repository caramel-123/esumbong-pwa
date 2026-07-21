import { NextResponse } from "next/server";

/**
 * Mock eVerify integration.
 * Real eVerify confirms a citizen's identity against PhilSys with consent
 * on every check. This stub simulates that round trip for the demo/hackathon
 * build — swap the body of this handler for the real eVerify API call.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { sessionToken } = body as { sessionToken?: string };

  if (!sessionToken) {
    return NextResponse.json(
      { verified: false, error: "Missing eGovPH session token" },
      { status: 401 }
    );
  }

  await new Promise((r) => setTimeout(r, 300));

  return NextResponse.json({
    verified: true,
    philsysRefId: `PSN-${Math.floor(100000 + Math.random() * 899999)}`,
    consentTimestamp: new Date().toISOString(),
  });
}
