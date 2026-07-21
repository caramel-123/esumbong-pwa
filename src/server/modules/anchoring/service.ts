import { prisma } from "@/server/db";
import { anchorToEGovChain } from "@/server/modules/egov-chain/mock";

/**
 * Anchoring Service (Track E). Takes a submission already ingested by the
 * Submission Service and anchors {project_id, submitter_pseudonym,
 * photo_hash, gps, timestamp} to eGovChain, then stores the returned
 * anchor reference back onto the submission.
 */
export async function anchorSubmission(submissionId: string) {
  const submission = await prisma.submission.findUniqueOrThrow({
    where: { id: submissionId },
    include: { user: true },
  });

  const result = await anchorToEGovChain(
    {
      project_id: submission.projectId,
      submitter_pseudonym: submission.user?.pseudonym ?? "anonymous",
      photo_hash: submission.photoHash,
      gps: { lat: submission.gpsLat, lng: submission.gpsLng },
      timestamp: submission.capturedAt.toISOString(),
    },
    submissionId
  );

  return prisma.submission.update({
    where: { id: submissionId },
    data: { anchorRef: result.anchorRef },
  });
}
