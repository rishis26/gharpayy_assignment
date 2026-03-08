import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { STAGES } from "@/lib/constants";
import { getAuthUser } from "@/lib/auth";

export async function GET(req) {
  try {
    const user = await getAuthUser(req);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const leads = db.read("leads");

    const stats = {
      totalLeads: leads.length,
      stageDistribution: {},
      visitsScheduled: leads.filter((l) => l.stage === "visit_scheduled")
        .length,
      bookingsConfirmed: leads.filter((l) => l.stage === "booked").length,
      sourceDistribution: {},
      agentPerformance: [],
    };

    // Initialize stages with 0
    STAGES.forEach((s) => (stats.stageDistribution[s.id] = 0));

    leads.forEach((l) => {
      stats.stageDistribution[l.stage] =
        (stats.stageDistribution[l.stage] || 0) + 1;
      stats.sourceDistribution[l.source] =
        (stats.sourceDistribution[l.source] || 0) + 1;
    });

    const agents = db.read("agents");
    stats.agentPerformance = agents.map((a) => {
      const agentLeads = leads.filter((l) => l.agentId === a._id);
      return {
        name: a.name,
        leads: agentLeads.length,
        bookings: agentLeads.filter((l) => l.stage === "booked").length,
      };
    });

    return NextResponse.json({ success: true, data: stats });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
