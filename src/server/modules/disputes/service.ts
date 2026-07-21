import { prisma } from "@/server/db";
import { sendEMessage } from "@/server/modules/notifications/eMessage";
import type { DisputeStatus } from "@prisma/client";

export class DisputeTransitionError extends Error {
  constructor(from: DisputeStatus, to: DisputeStatus) {
    super(`Cannot move dispute from "${from}" to "${to}" — workflow only advances one stage at a time.`);
    this.name = "DisputeTransitionError";
  }
}

// Flagged → Agency Notified → Responded → Resolved. Each function below
// checks the current stage before writing, so callers can't skip ahead or
// go backward by mistake.
const NEXT_STAGE: Record<DisputeStatus, DisputeStatus | null> = {
  flagged: "agency_notified",
  agency_notified: "responded",
  responded: "resolved",
  resolved: null,
};

// Called by the Submission Service when a submission's AI verdict flags a
// discrepancy — this is what actually kicks the workflow off.
export async function createDisputeForSubmission(submissionId: string, reporterId?: string) {
  return prisma.dispute.create({
    data: {
      submissionId,
      reporterId,
      status: "flagged",
    },
  });
}

async function assertStage(disputeId: string, expected: Exclude<DisputeStatus, "resolved">) {
  const dispute = await prisma.dispute.findUniqueOrThrow({ where: { id: disputeId } });
  const attemptedTarget = NEXT_STAGE[expected]!;
  if (dispute.status !== expected) {
    throw new DisputeTransitionError(dispute.status, attemptedTarget);
  }
  return dispute;
}

export async function notifyAgency(disputeId: string, agencyRecipient: string) {
  const dispute = await assertStage(disputeId, "flagged");

  await sendEMessage(
    agencyRecipient,
    `A citizen report has flagged a discrepancy on submission ${dispute.submissionId}. Please review and respond via eSumbong.`
  );

  return prisma.dispute.update({
    where: { id: disputeId },
    data: { status: "agency_notified", agencyNotifiedAt: new Date() },
  });
}

export async function recordAgencyResponse(disputeId: string, agencyResponse: string) {
  await assertStage(disputeId, "agency_notified");

  return prisma.dispute.update({
    where: { id: disputeId },
    data: { status: "responded", respondedAt: new Date(), agencyResponse },
  });
}

export async function resolveDispute(disputeId: string, resolutionNote: string) {
  const dispute = await assertStage(disputeId, "responded");

  await sendEMessage(
    "reporter", // placeholder recipient — real identity resolution is Track D's eVerify/eMessage integration
    `Your flagged report (submission ${dispute.submissionId}) has been resolved: ${resolutionNote}`
  );

  return prisma.dispute.update({
    where: { id: disputeId },
    data: { status: "resolved", resolvedAt: new Date(), resolutionNote },
  });
}

export function getDispute(id: string) {
  return prisma.dispute.findUnique({
    where: { id },
    include: { submission: true },
  });
}

export function listDisputes(status?: DisputeStatus) {
  return prisma.dispute.findMany({
    where: status ? { status } : undefined,
    include: { submission: true },
    orderBy: { createdAt: "desc" },
  });
}
