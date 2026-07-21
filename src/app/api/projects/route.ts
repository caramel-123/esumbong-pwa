import { NextResponse } from "next/server";
import { listProjects, syncFromCompass } from "@/server/modules/project-registry/service";

export async function GET() {
  const projects = await listProjects();
  return NextResponse.json({ projects });
}

// Triggers a Compass cache/sync — in production this would run on a
// schedule; exposed as an endpoint here so it can be kicked off on demand
// during the hackathon/demo.
export async function POST() {
  const projects = await syncFromCompass();
  return NextResponse.json({ synced: projects.length, projects });
}
