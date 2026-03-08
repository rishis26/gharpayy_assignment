"use client";
import { useEffect, useState } from "react";
import { STAGES } from "@/lib/constants";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [recentLeads, setRecentLeads] = useState([]);

  useEffect(() => {
    fetch("/api/analytics")
      .then((r) => r.json())
      .then((d) => setStats(d.data));
    fetch("/api/leads")
      .then((r) => r.json())
      .then((d) => setRecentLeads(d.data?.slice(0, 5) || []));
  }, []);

  const statCards = [
    {
      label: "Total Leads",
      value: stats?.totalLeads || 0,
      color: "#3b82f6",
      icon: "📈",
    },
    {
      label: "Upcoming Visits",
      value: stats?.visitsScheduled || 0,
      color: "#0ea5e9",
      icon: "📍",
    },
    {
      label: "Bookings",
      value: stats?.bookingsConfirmed || 0,
      color: "#10b981",
      icon: "✅",
    },
    {
      label: "Conversion Rate",
      value: stats
        ? `${Math.round((stats.bookingsConfirmed / stats.totalLeads) * 100) || 0}%`
        : "0%",
      color: "#8b5cf6",
      icon: "🎯",
    },
  ];

  return (
    <div className="animate-fade">
      <div style={{ marginBottom: "40px" }}>
        <h1 style={{ marginBottom: "8px" }}>Welcome back, Rahul</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
          Here's what's happening with your leads today.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "24px",
          marginBottom: "40px",
        }}
      >
        {statCards.map((card, i) => (
          <div
            key={i}
            className="card"
            style={{ display: "flex", alignItems: "center", gap: "20px" }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: `${card.color}15`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
              }}
            >
              {card.icon}
            </div>
            <div>
              <div
                style={{
                  color: "var(--text-muted)",
                  fontSize: "14px",
                  fontWeight: 500,
                  marginBottom: "4px",
                }}
              >
                {card.label}
              </div>
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: 800,
                  color: "var(--text-main)",
                }}
              >
                {card.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}
      >
        <div className="card">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px",
            }}
          >
            <h2>Recent Activity</h2>
            <button className="btn btn-ghost" style={{ fontSize: "13px" }}>
              View all →
            </button>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {recentLeads.map((lead) => (
              <div
                key={lead._id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px",
                  borderRadius: "8px",
                  background: "#f8fafc",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: "#3b82f6",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "12px",
                    }}
                  >
                    {lead.name[0]}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "14px" }}>
                      {lead.name}
                    </div>
                    <div
                      style={{ fontSize: "12px", color: "var(--text-muted)" }}
                    >
                      {lead.source}
                    </div>
                  </div>
                </div>
                <span
                  className={`badge badge-${lead.stage}`}
                  style={{ fontSize: "11px" }}
                >
                  {lead.stage.replace("_", " ")}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 style={{ marginBottom: "24px" }}>Pipeline Health</h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {STAGES.slice(0, 4).map((s) => {
              const count = stats?.stageDistribution[s.id] || 0;
              const percentage = stats ? (count / stats.totalLeads) * 100 : 0;
              return (
                <div key={s.id}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "13px",
                      marginBottom: "8px",
                    }}
                  >
                    <span style={{ color: "var(--text-muted)" }}>
                      {s.label}
                    </span>
                    <span style={{ fontWeight: 600 }}>{count}</span>
                  </div>
                  <div
                    style={{
                      height: "6px",
                      background: "#f1f5f9",
                      borderRadius: "3px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${percentage}%`,
                        height: "100%",
                        background: s.color,
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
