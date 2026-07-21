import { NextResponse } from "next/server";
import { ingestSubmission, listSubmissions } from "@/server/modules/submissions/service";
import type { IngestSubmissionInput } from "@/server/modules/submissions/service";

export async function GET(request: Request) {
  const projectId = new URL(request.url).searchParams.get("projectId") ?? undefined;
  const submissions = await listSubmissions(projectId);
  return NextResponse.json({ submissions });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as Partial<IngestSubmissionInput>;

  if (!body.projectId || !body.photoHash || !body.capturedAt) {
    return NextResponse.json(
      { error: "projectId, photoHash, and capturedAt are required" },
      { status: 400 }
    );
  }

  const submission = await ingestSubmission({
    projectId: body.projectId,
    userId: body.userId,
    photoDataUrl: body.photoDataUrl,
    photoHash: body.photoHash,
    gps: body.gps,
    capturedAt: body.capturedAt,
    aiResult: body.aiResult,
  });

  return NextResponse.json({ submission }, { status: 201 });
}
