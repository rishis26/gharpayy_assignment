import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getAuthUser } from "@/lib/auth";

export async function PATCH(req, { params }) {
  try {
    const user = await getAuthUser(req);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    // params is an object, await it in Next.js 15+ if it's a promise, but here it seems standard
    const id = (await params).id;
    const body = await req.json();
    const { stage, agentId, note, visitOutcome, visitDetails } = body;

    const leads = db.read("leads");
    const existingLead = leads.find((l) => l._id === id);

    if (!existingLead) {
      return NextResponse.json(
        { success: false, message: "Lead not found" },
        { status: 404 },
      );
    }

    const updates = { ...body };
    const timelineEntry = [];

    if (stage && stage !== existingLead.stage) {
      timelineEntry.push({
        text: `Moved to stage: ${stage.replace("_", " ")}`,
        type: "stage_change",
        createdAt: new Date().toISOString(),
      });
    }

    if (note) {
      timelineEntry.push({
        text: `Note added: ${note}`,
        type: "note",
        createdAt: new Date().toISOString(),
      });
      delete updates.note; // Don't save 'note' as a field
    }

    if (visitOutcome) {
      timelineEntry.push({
        text: `Visit Outcome: ${visitOutcome}`,
        type: "visit",
        createdAt: new Date().toISOString(),
      });
    }

    const updatedTimeline = [
      ...(existingLead.timeline || []),
      ...timelineEntry,
    ];

    const result = db.update("leads", id, {
      ...updates,
      timeline: updatedTimeline,
      lastActivity: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const user = await getAuthUser(req);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const { id } = await params;
    db.delete("leads", id);
    return NextResponse.json({ success: true, message: "Lead deleted" });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
