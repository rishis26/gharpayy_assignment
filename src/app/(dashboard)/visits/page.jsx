"use client";
import { useEffect, useState } from "react";

export default function VisitsPage() {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/leads")
      .then((r) => r.json())
      .then((d) => {
        const filtered =
          d.data?.filter(
            (l) => l.stage === "visit_scheduled" || l.stage === "visit_done",
          ) || [];
        setVisits(filtered);
        setLoading(false);
      });
  }, []);

  return (
    <div className="animate-fade">
      <div style={{ marginBottom: "32px" }}>
        <h1>Site Visits</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
          Schedule and manage property viewings with potential tenants.
        </p>
      </div>

      <div className="card">
        {loading ? (
          <p>Loading visits...</p>
        ) : visits.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🏠</div>
            <h3>No visits scheduled</h3>
            <p style={{ color: "var(--text-muted)" }}>
              Move leads to "Visit Scheduled" to see them here.
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {visits.map((visit) => (
              <div
                key={visit._id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "20px",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "16px" }}
                >
                  <div
                    style={{
                      background: "#fef3c7",
                      color: "#d97706",
                      padding: "8px",
                      borderRadius: "8px",
                      fontSize: "20px",
                    }}
                  >
                    🕒
                  </div>
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
                <button
                  className="btn btn-primary"
                  style={{ fontSize: "12px" }}
                >
                  Check In
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
