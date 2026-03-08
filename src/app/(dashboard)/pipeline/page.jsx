"use client";
import { useEffect, useState } from "react";
import { STAGES } from "@/lib/constants";
import Card from "@/components/ui/Card";
import LeadDetailsDrawer from "@/components/crm/LeadDetailsDrawer";

export default function PipelinePage() {
  const [leadsByStage, setLeadsByStage] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await fetch("/api/leads");
      const { data } = await res.json();

      const grouped = {};
      STAGES.forEach((s) => (grouped[s.id] = []));
      data.forEach((l) => {
        if (grouped[l.stage]) grouped[l.stage].push(l);
      });
      setLeadsByStage(grouped);

      if (selectedLead) {
        const updated = data.find((l) => l._id === selectedLead._id);
        if (updated) setSelectedLead(updated);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1 style={{ marginBottom: "32px" }}>Sales Pipeline</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          overflowX: "auto",
          paddingBottom: "20px",
          minHeight: "calc(100vh - 200px)",
        }}
      >
        {STAGES.map((stage) => (
          <div key={stage.id} style={{ minWidth: "300px", flex: 1 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "16px",
                padding: "0 4px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <img
                  src={`https://img.icons8.com/fluency-systems-filled/20/${stage.color.replace("#", "").toUpperCase()}/${stage.icon}.png`}
                  alt=""
                  style={{ width: "18px", height: "18px" }}
                />
                <h3
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "var(--text-muted)",
                  }}
                >
                  {stage.label}
                </h3>
              </div>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "var(--text-muted)",
                  background: "#e2e8f0",
                  padding: "2px 8px",
                  borderRadius: "10px",
                }}
              >
                {leadsByStage[stage.id]?.length || 0}
              </span>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {leadsByStage[stage.id]?.map((lead) => (
                <Card
                  key={lead._id}
                  onClick={() => setSelectedLead(lead)}
                  style={{ padding: "16px", cursor: "pointer" }}
                >
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: "14px",
                      marginBottom: "4px",
                    }}
                  >
                    {lead.name}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "var(--text-muted)",
                      marginBottom: "12px",
                    }}
                  >
                    {lead.phone}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "11px",
                        padding: "2px 6px",
                        background: "#f1f5f9",
                        borderRadius: "4px",
                        color: "var(--text-muted)",
                      }}
                    >
                      {lead.source}
                    </span>
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        background: "#3b82f6",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "9px",
                        fontWeight: 700,
                      }}
                    >
                      {lead.agent?.avatar || (
                        <img
                          src="https://img.icons8.com/fluency-systems-filled/24/ffffff/user.png"
                          alt=""
                          style={{ width: "12px" }}
                        />
                      )}
                    </div>
                  </div>
                </Card>
              ))}
              {leadsByStage[stage.id]?.length === 0 && (
                <div
                  style={{
                    padding: "20px",
                    border: "2px dashed var(--border)",
                    borderRadius: "var(--radius-md)",
                    textAlign: "center",
                    color: "var(--text-muted)",
                    fontSize: "13px",
                  }}
                >
                  No leads
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <LeadDetailsDrawer
        lead={selectedLead}
        isOpen={!!selectedLead}
        onClose={() => setSelectedLead(null)}
        onUpdate={fetchLeads}
      />
    </div>
  );
}
