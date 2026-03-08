"use client";
import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import LeadDetailsDrawer from "@/components/crm/LeadDetailsDrawer";

export default function VisitsPage() {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState(null);

  useEffect(() => {
    fetchVisits();
  }, []);

  const fetchVisits = async () => {
    try {
      const r = await fetch("/api/leads");
      const d = await r.json();
      const filtered =
        d.data?.filter(
          (l) => l.stage === "visit_scheduled" || l.stage === "visit_done",
        ) || [];
      setVisits(filtered);

      if (selectedLead) {
        const updated = d.data.find((l) => l._id === selectedLead._id);
        if (updated) setSelectedLead(updated);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div>
      <div style={{ marginBottom: "32px" }}>
        <h1>Site Visits</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
          Schedule and manage property viewings with potential tenants.
        </p>
      </div>

      <Card style={{ padding: 0 }}>
        {loading ? (
          <p style={{ padding: "20px" }}>Loading visits...</p>
        ) : visits.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <div style={{ marginBottom: "16px" }}>
              <img
                src="https://img.icons8.com/fluency-systems-filled/48/94a3b8/home.png"
                alt=""
                style={{ width: "48px", height: "48px" }}
              />
            </div>
            <h3>No visits scheduled</h3>
            <p style={{ color: "var(--text-muted)" }}>
              Move leads to "Visit Scheduled" to see them here.
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {visits.map((visit) => (
              <div
                key={visit._id}
                onClick={() => setSelectedLead(visit)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "20px",
                  borderBottom: "1px solid var(--border)",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = "#f8fafc")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "16px" }}
                >
                  <img
                    src="https://img.icons8.com/fluency-systems-filled/48/3b82f6/clock.png"
                    alt=""
                    style={{ width: "24px", height: "24px" }}
                  />
                  <div>
                    <div style={{ fontWeight: 700 }}>{visit.name}</div>
                    <div
                      style={{ fontSize: "13px", color: "var(--text-muted)" }}
                    >
                      {visit.visitDetails?.property || "TBD Property"}
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 600, fontSize: "14px" }}>
                    {visit.visitDetails?.date || "No date set"}
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                    {visit.visitDetails?.time || "No time set"}
                  </div>
                </div>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedLead(visit);
                  }}
                >
                  Check In
                </Button>
              </div>
            ))}
          </div>
        )}
      </Card>

      <LeadDetailsDrawer
        lead={selectedLead}
        isOpen={!!selectedLead}
        onClose={() => setSelectedLead(null)}
        onUpdate={fetchVisits}
      />
    </div>
  );
}
