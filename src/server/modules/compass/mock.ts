import { getProject } from "@/lib/mock-data";

export interface CompassProjectData {
  source: string;
  projectId: string;
  agency: string;
  budgetAllocated: string;
  contractId: string;
  resolvedAt: string;
}

/**
 * Mock Compass integration (Track D).
 * Real Compass resolves agencies, offices, and budget references from the
 * DBM registry. It does NOT supply contractor names or completion
 * percentages — those come from the agency's own submission into eSumbong,
 * not from Compass itself. Extracted here (rather than living only in the
 * route handler) so the Project Registry Service can call it directly
 * during sync, without an internal HTTP round-trip.
 */
export async function fetchCompassProjectData(projectId: string): Promise<CompassProjectData> {
  const project = getProject(projectId);

  await new Promise((r) => setTimeout(r, 200));

  return {
    source: "Compass Budget Registry",
    projectId: project.id,
    agency: project.agency,
    budgetAllocated: project.budget,
    contractId: project.contractId,
    resolvedAt: new Date().toISOString(),
  };
}
