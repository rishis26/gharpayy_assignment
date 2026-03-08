"use client";
import { useEffect, useState } from "react";
import { STAGES } from "@/lib/constants";

export default function PipelinePage() {
  const [leadsByStage, setLeadsByStage] = useState({});
  const [loading, setLoading] = useState(true);

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
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div className="animate-fade">
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
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: stage.color,
                  }}
                ></div>
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
                <div
                  key={lead._id}
                  className="card"
                  style={{ padding: "16px", cursor: "grab" }}
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
                      {lead.agent?.avatar || "?"}
                    </div>
                  </div>
                </div>
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
    </div>
  );
}
