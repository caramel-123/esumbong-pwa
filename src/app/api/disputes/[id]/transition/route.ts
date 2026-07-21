import { NextResponse } from "next/server";
import {
  DisputeTransitionError,
  notifyAgency,
  recordAgencyResponse,
  resolveDispute,
} from "@/server/modules/disputes/service";

type TransitionBody =
  | { action: "notify"; agencyRecipient: string }
  | { action: "respond"; agencyResponse: string }
  | { action: "resolve"; resolutionNote: string };

// Single endpoint for advancing the Flagged → Agency Notified → Responded →
// Resolved workflow one stage at a time; the service layer rejects any
// attempt to skip or reverse a stage.
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = (await request.json().catch(() => ({}))) as Partial<TransitionBody>;

  try {
    switch (body.action) {
      case "notify": {
        if (!body.agencyRecipient) {
          return NextResponse.json({ error: "agencyRecipient is required" }, { status: 400 });
        }
        const dispute = await notifyAgency(id, body.agencyRecipient);
        return NextResponse.json({ dispute });
      }
      case "respond": {
        if (!body.agencyResponse) {
          return NextResponse.json({ error: "agencyResponse is required" }, { status: 400 });
        }
        const dispute = await recordAgencyResponse(id, body.agencyResponse);
        return NextResponse.json({ dispute });
      }
      case "resolve": {
        if (!body.resolutionNote) {
          return NextResponse.json({ error: "resolutionNote is required" }, { status: 400 });
        }
        const dispute = await resolveDispute(id, body.resolutionNote);
        return NextResponse.json({ dispute });
      }
      default:
        return NextResponse.json(
          { error: "action must be one of: notify, respond, resolve" },
          { status: 400 }
        );
    }
  } catch (err) {
    if (err instanceof DisputeTransitionError) {
      return NextResponse.json({ error: err.message }, { status: 409 });
    }
    throw err;
  }
}
