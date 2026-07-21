import { createHash } from "crypto";
import { prisma } from "@/server/db";

export interface EGovChainAnchorResult {
  source: string;
  anchorRef: string;
  hash: string;
  previousHash: string | null;
  blockHeight: number;
  anchoredAt: string;
}

/**
 * Mock eGovChain integration (Track E).
 * No real eGovChain sandbox credentials exist for this hackathon, so this
 * is an internal append-only hash chain rather than a one-off hash: each
 * new block's hash commits to the previous block's hash, so editing any
 * past row breaks every block chained after it. That's the actual
 * tamper-evident property being demonstrated, not just a label on the
 * confirmation screen — swap this for a real eGovChain call if credentials
 * become available.
 */
export async function anchorToEGovChain(
  payload: Record<string, unknown>,
  submissionId?: string
): Promise<EGovChainAnchorResult> {
  const payloadHash = createHash("sha256").update(JSON.stringify(payload)).digest("hex");

  await new Promise((r) => setTimeout(r, 400));

  // Good enough for a low-throughput hackathon demo; a real chain would need
  // proper concurrency control (e.g. a serializable transaction) to avoid
  // two blocks racing for the same "previous" pointer, which is explicitly
  // out of scope here.
  const latest = await prisma.chainBlock.findFirst({ orderBy: { id: "desc" } });
  const previousHash = latest?.blockHash ?? null;
  const blockHash = createHash("sha256")
    .update(`${previousHash ?? "GENESIS"}:${payloadHash}`)
    .digest("hex");

  const block = await prisma.chainBlock.create({
    data: { submissionId, previousHash, payloadHash, blockHash },
  });

  return {
    source: "eGovChain",
    anchorRef: `#ES-${blockHash.slice(0, 8).toUpperCase()}-TX`,
    hash: blockHash,
    previousHash,
    blockHeight: block.id,
    anchoredAt: block.createdAt.toISOString(),
  };
}
