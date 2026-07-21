import { NextResponse } from "next/server";
import { getProject } from "@/lib/mock-data";
import { explainVerdict } from "@/server/modules/egov-ai/groq";

/**
 * Mock eGovAI integration.
 * eGovAI's advertised scope is document intelligence, translation, and
 * conversational endpoints — not computer vision. This route simulates the
 * *extended* vision-classification layer eSumbong builds on top of it
 * (see architecture doc, Track F). Swap the classification logic here for
 * a real CV model or an actual eGovAI vision endpoint if/when available.
 * The verdict numbers below are still scripted; only the explanation text
 * is a real model call (Groq — no vision access on this account, so a real
 * photo-based verdict wasn't possible; see explainVerdict()).
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { projectId } = body as { projectId?: string };
  const project = getProject(projectId ?? "1");

  await new Promise((r) => setTimeout(r, 800));

  const gap = project.claimedPct - project.actualPct;
  const classification =
    project.actualPct < 50
      ? "foundations_only"
      : project.actualPct < 85
      ? "partial_structure"
      : "substantially_complete";
  const discrepancyFlag = gap >= 15;

  const explanation = await explainVerdict({
    projectName: project.name,
    claimedPct: project.claimedPct,
    detectedPct: project.actualPct,
    classification,
    discrepancyFlag,
  });

  return NextResponse.json({
    source: "eGovAI Visual Verification",
    projectId: project.id,
    claimedPct: project.claimedPct,
    detectedPct: project.actualPct,
    classification,
    discrepancyFlag,
    discrepancyPct: gap,
    explanation,
    analyzedAt: new Date().toISOString(),
  });
}
