import { prisma } from "@/server/db";
import { createDisputeForSubmission } from "@/server/modules/disputes/service";

export interface IngestSubmissionInput {
  projectId: string;
  userId?: string;
  photoDataUrl?: string;
  photoHash: string;
  gps?: { lat: number; lng: number; accuracy: number } | null;
  capturedAt: string;
  // AI verdict is produced client-side today (Track F's mock/model) and
  // passed in here rather than recomputed — the Submission Service's job
  // is to persist it and act on it, not to run the analysis itself.
  aiResult?: {
    claimedPct: number;
    detectedPct: number;
    classification: string;
    discrepancyFlag: boolean;
  };
}

/**
 * Ingests a citizen submission (photo hash + GPS + AI verdict) and, if the
 * verdict flags a discrepancy, opens a Dispute — this is the one place the
 * "flagged" workflow actually gets triggered from.
 */
export async function ingestSubmission(input: IngestSubmissionInput) {
  const submission = await prisma.submission.create({
    data: {
      projectId: input.projectId,
      userId: input.userId,
      photoDataUrl: input.photoDataUrl,
      photoHash: input.photoHash,
      gpsLat: input.gps?.lat,
      gpsLng: input.gps?.lng,
      gpsAccuracy: input.gps?.accuracy,
      capturedAt: new Date(input.capturedAt),
      aiClaimedPct: input.aiResult?.claimedPct,
      aiDetectedPct: input.aiResult?.detectedPct,
      aiClassification: input.aiResult?.classification,
      aiDiscrepancy: input.aiResult?.discrepancyFlag,
      status: !input.aiResult ? "received" : input.aiResult.discrepancyFlag ? "flagged" : "cleared",
    },
  });

  if (input.aiResult?.discrepancyFlag) {
    await createDisputeForSubmission(submission.id, input.userId);
  }

  return submission;
}

export function getSubmission(id: string) {
  return prisma.submission.findUnique({
    where: { id },
    include: { dispute: true, project: true },
  });
}

export function listSubmissions(projectId?: string) {
  return prisma.submission.findMany({
    where: projectId ? { projectId } : undefined,
    include: { dispute: true },
    orderBy: { createdAt: "desc" },
  });
}
