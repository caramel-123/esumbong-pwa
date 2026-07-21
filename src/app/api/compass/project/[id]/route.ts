import { NextResponse } from "next/server";
import { fetchCompassProjectData } from "@/server/modules/compass/mock";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const data = await fetchCompassProjectData(id);
  return NextResponse.json(data);
}
