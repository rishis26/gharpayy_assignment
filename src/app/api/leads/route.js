import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { checkSLABreaches } from "@/lib/sla";
import { getAuthUser } from "@/lib/auth";

// In-memory counter for Round-Robin (resets on server restart, fine for MVP)
let rrIndex = 0;

export async function GET(req) {
  try {
    const user = await getAuthUser(req);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(req.url);
    const stage = searchParams.get("stage");

    // Check for SLA breaches before returning leads
    checkSLABreaches();

    let leads = db.read("leads");
    const agents = db.read("agents");

    // Populate Agent details
    leads = leads.map((l) => {
      const agent = agents.find((a) => a._id === l.agentId);
      return { ...l, agent: agent || null };
    });

    if (stage && stage !== "all") {
      leads = leads.filter((l) => l.stage === stage);
    }

    return NextResponse.json({ success: true, data: leads.reverse() });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, phone, source, notes } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, message: "Name and Phone are required" },
        { status: 400 },
      );
    }

    const agents = db.read("agents").filter((a) => a.active);
    let assignedAgentId = null;

    if (agents.length > 0) {
      const agent = agents[rrIndex % agents.length];
      assignedAgentId = agent._id;
      rrIndex++;
    }

    const newLead = {
      name,
      phone,
      source: source || "Website Form",
      notes: notes || "",
      stage: "new",
      agentId: assignedAgentId,
      lastActivity: new Date().toISOString(),
      timeline: [
        {
          text: `Lead captured via ${source || "Website Form"}`,
          type: "system",
          createdAt: new Date().toISOString(),
        },
        {
          text: assignedAgentId
            ? `Automatically assigned to ${agents.find((a) => a._id === assignedAgentId).name}`
            : "Lead created (unassigned)",
          type: "assignment",
          createdAt: new Date().toISOString(),
        },
      ],
    };

    const savedLead = db.insert("leads", newLead);

    return NextResponse.json(
      { success: true, data: savedLead },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
