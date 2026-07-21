import { NextResponse } from "next/server";
import { getProject } from "@/lib/mock-data";

/**
 * Mock Compass integration.
 * Real Compass resolves agencies, offices, and budget references from the
 * DBM registry. It does NOT supply contractor names or completion
 * percentages — those come from the agency's own submission into eSumbong,
 * not from Compass itself (see design/esumbong-figma-handoff.md and the
 * architecture doc for why this distinction matters).
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const project = getProject(id);

  await new Promise((r) => setTimeout(r, 200));

  return NextResponse.json({
    source: "Compass Budget Registry",
    projectId: project.id,
    agency: project.agency,
    budgetAllocated: project.budget,
    contractId: project.contractId,
    resolvedAt: new Date().toISOString(),
  });
}
