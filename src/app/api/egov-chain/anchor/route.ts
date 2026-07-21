import { NextResponse } from "next/server";
import { anchorToEGovChain } from "@/server/modules/egov-chain/mock";

/**
 * Mock eGovChain integration.
 * Real eGovChain anchors a document hash on the government blockchain
 * ledger for tamper-evident verification. The Anchoring Service (Track E)
 * calls anchorToEGovChain() directly rather than hitting this route
 * internally — this endpoint exists for external/manual testing.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const result = await anchorToEGovChain(body);
  return NextResponse.json(result);
}
