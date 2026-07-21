import { NextResponse } from "next/server";
import { listDisputes } from "@/server/modules/disputes/service";
import type { DisputeStatus } from "@prisma/client";

const VALID_STATUSES: DisputeStatus[] = ["flagged", "agency_notified", "responded", "resolved"];

export async function GET(request: Request) {
  const statusParam = new URL(request.url).searchParams.get("status");
  const status =
    statusParam && VALID_STATUSES.includes(statusParam as DisputeStatus)
      ? (statusParam as DisputeStatus)
      : undefined;

  const disputes = await listDisputes(status);
  return NextResponse.json({ disputes });
}
