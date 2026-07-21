import { prisma } from "@/server/db";
import { projects as seedProjects } from "@/lib/mock-data";
import { fetchCompassProjectData } from "@/server/modules/compass/mock";

// "₱120M" -> 120000000, "₱1.2B" -> 1200000000. Good enough for seed/demo
// data; a real integration would get a structured numeric amount from
// Compass rather than a display string.
function parseBudgetToNumber(display: string): number {
  const match = display.replace(/[₱,]/g, "").match(/([\d.]+)\s*([MB]?)/i);
  if (!match) return 0;
  const value = parseFloat(match[1]);
  const unit = match[2]?.toUpperCase();
  if (unit === "B") return value * 1_000_000_000;
  if (unit === "M") return value * 1_000_000;
  return value;
}

/**
 * Syncs every known project from Compass into our own registry (Postgres).
 * Compass only supplies agency/budget/contract reference data — the rest
 * (name, location, claimed %, status, description) comes from the seed
 * catalog today, standing in for the agency's own project registration
 * until that intake flow exists.
 */
export async function syncFromCompass() {
  const synced = [];
  for (const seed of seedProjects) {
    const compass = await fetchCompassProjectData(seed.id);
    // Uses the seed catalog's own id as the primary key (rather than
    // letting Prisma generate a cuid) so it matches the ids the frontend
    // already sends via ?project= — the mobile app has no separate lookup
    // step to resolve one id scheme into the other.
    const project = await prisma.project.upsert({
      where: { id: seed.id },
      create: {
        id: seed.id,
        contractId: compass.contractId,
        name: seed.name,
        agency: compass.agency,
        location: seed.location,
        budgetPhp: parseBudgetToNumber(compass.budgetAllocated),
        claimedPct: seed.claimedPct,
        actualPct: seed.actualPct,
        status: seed.status,
        description: seed.description,
        compassSyncedAt: new Date(),
      },
      update: {
        agency: compass.agency,
        budgetPhp: parseBudgetToNumber(compass.budgetAllocated),
        compassSyncedAt: new Date(),
      },
    });
    synced.push(project);
  }
  return synced;
}

export function listProjects() {
  return prisma.project.findMany({ orderBy: { createdAt: "desc" } });
}

export function getProjectById(id: string) {
  return prisma.project.findUnique({ where: { id } });
}

export function getProjectByContractId(contractId: string) {
  return prisma.project.findUnique({ where: { contractId } });
}
