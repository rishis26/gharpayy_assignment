"use client";
import { useEffect, useState, useRef } from "react";
import { STAGES } from "@/lib/constants";
import Card from "@/components/ui/Card";
import LeadDetailsDrawer from "@/components/crm/LeadDetailsDrawer";

export default function PipelinePage() {
  const [leadsByStage, setLeadsByStage] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState(null);
  const scrollContainerRef = useRef(null);

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
    <div
      style={{
        height: "calc(100vh - 120px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h1 style={{ margin: 0 }}>Sales Pipeline</h1>
        <div
          style={{
            fontSize: "12px",
            color: "var(--text-muted)",
            fontWeight: 600,
            background: "var(--bg-main)",
            padding: "6px 12px",
            borderRadius: "10px",
            boxShadow: "var(--shadow-btn)",
          }}
        >
          {Object.values(leadsByStage).flat().length} Total Leads
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="pipeline-container"
        style={{
          display: "flex",
          gap: "20px",
          overflowX: "auto",
          paddingBottom: "24px",
          flex: 1,
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE
        }}
      >
        <style jsx>{`
          .pipeline-container::-webkit-scrollbar {
            display: none;
          }
          .pipeline-column {
            min-width: 320px;
            width: 320px;
            display: flex;
            flex-direction: column;
            background: rgba(0, 0, 0, 0.02);
            border-radius: 24px;
            padding: 12px;
            height: 100%;
          }
          @media (max-width: 768px) {
            .pipeline-column {
              min-width: 280px;
              width: 280px;
            }
          }
        `}</style>

        {STAGES.map((stage) => (
          <div key={stage.id} className="pipeline-column">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "16px",
                padding: "8px 12px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "10px",
                    background: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "var(--shadow-btn)",
                    border: `1px solid ${stage.color}40`,
                  }}
                >
                  <img
                    src={`https://img.icons8.com/fluency-systems-filled/20/${stage.color.replace("#", "").toUpperCase()}/${stage.icon}.png`}
                    alt=""
                    style={{ width: "18px", height: "18px" }}
                  />
                </div>
                <h3
                  style={{
                    fontSize: "13px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "var(--text-main)",
                    margin: 0,
                  }}
                >
                  {stage.label}
                </h3>
              </div>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  color: stage.color,
                  background: `${stage.color}15`,
                  padding: "4px 10px",
                  borderRadius: "8px",
                }}
              >
                {leadsByStage[stage.id]?.length || 0}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                overflowY: "auto",
                flex: 1,
                padding: "4px",
              }}
            >
              {leadsByStage[stage.id]?.map((lead) => (
                <Card
                  key={lead._id}
                  onClick={() => setSelectedLead(lead)}
                  style={{
                    padding: "16px",
                    cursor: "pointer",
                    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                    border: "1px solid var(--border-light)",
                    background: "white",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "translateY(-2px)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "translateY(0)")
                  }
                >
                  <div
                    style={{
                      fontWeight: 800,
                      fontSize: "14px",
                      marginBottom: "4px",
                      color: "var(--text-main)",
                    }}
                  >
                    {lead.name}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "var(--text-muted)",
                      marginBottom: "12px",
                      fontWeight: 600,
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
                        fontSize: "10px",
                        fontWeight: 700,
                        padding: "3px 8px",
                        background: "var(--bg-main)",
                        borderRadius: "6px",
                        color: "var(--text-muted)",
                        border: "1px solid var(--border-light)",
                      }}
                    >
                      {lead.source}
                    </span>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <div
                        style={{
                          width: "24px",
                          height: "24px",
                          borderRadius: "8px",
                          background: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "var(--shadow-btn)",
                          border: "1px solid var(--border-light)",
                        }}
                      >
                        <img
                          src="https://img.icons8.com/fluency-systems-filled/24/bc4749/user.png"
                          alt=""
                          style={{ width: "14px" }}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
              {leadsByStage[stage.id]?.length === 0 && !loading && (
                <div
                  style={{
                    padding: "32px 20px",
                    border: "2px dashed var(--border-light)",
                    borderRadius: "20px",
                    textAlign: "center",
                    color: "var(--text-muted)",
                    fontSize: "13px",
                    fontWeight: 600,
                  }}
                >
                  No leads in this stage
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
