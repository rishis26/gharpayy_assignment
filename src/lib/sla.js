import { db } from "./db";
import { RESPONSE_SLA_MINUTES } from "./constants";

export function checkSLABreaches() {
  const leads = db.read("leads");
  const agents = db.read("agents").filter((a) => a.active);
  const now = new Date();
  let changed = false;

  const updatedLeads = leads.map((lead) => {
    // Only reassign new/contacted leads that haven't had activity
    if (lead.stage !== "new" && lead.stage !== "contacted") return lead;

    const lastActivity = new Date(lead.lastActivity);
    const diffMs = now - lastActivity;
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins >= RESPONSE_SLA_MINUTES && lead.agentId) {
      // Find current agent name for the log
      const oldAgent = agents.find((a) => a._id === lead.agentId);

      // Select next agent (Round-Robin logic or just pick different one)
      const otherAgents = agents.filter((a) => a._id !== lead.agentId);
      if (otherAgents.length > 0) {
        const newAgent =
          otherAgents[Math.floor(Math.random() * otherAgents.length)];

        changed = true;
        return {
          ...lead,
          agentId: newAgent._id,
          lastActivity: now.toISOString(),
          timeline: [
            ...(lead.timeline || []),
            {
              text: `SLA Breach (${diffMins}m): Automatically reassigned from ${oldAgent?.name || "Agent"} to ${newAgent.name}`,
              type: "sla_reassignment",
              createdAt: now.toISOString(),
            },
          ],
        };
      }
    }
    return lead;
  });

  if (changed) {
    db.write("leads", updatedLeads);
    return true;
  }
  return false;
}
