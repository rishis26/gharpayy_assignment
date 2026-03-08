"use client";
import { useEffect, useState } from "react";
import { STAGES } from "@/lib/constants";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import StatCard from "@/components/ui/StatCard";

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

  const statCardsData = [
    {
      label: "Total Leads",
      value: stats?.totalLeads || 0,
      color: "#bc4749",
      icon: "https://img.icons8.com/material-rounded/48/bc4749/line-chart.png",
    },
    {
      label: "Upcoming Visits",
      value: stats?.visitsScheduled || 0,
      color: "#6b705c",
      icon: "https://img.icons8.com/material-rounded/48/6b705c/calendar.png",
    },
    {
      label: "Bookings",
      value: stats?.bookingsConfirmed || 0,
      color: "#bc4749",
      icon: "https://img.icons8.com/material-rounded/48/bc4749/checked-user-male.png",
    },
    {
      label: "Conversion Rate",
      value: stats
        ? `${Math.round((stats.bookingsConfirmed / stats.totalLeads) * 100) || 0}%`
        : "0%",
      color: "#6b705c",
      icon: "https://img.icons8.com/material-rounded/48/6b705c/target.png",
    },
  ];

  return (
    <div>
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
        {statCardsData.map((card, i) => (
          <StatCard key={i} {...card} />
        ))}
      </div>

      <div
        className="dashboard-grid"
        style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}
      >
        <Card>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px",
            }}
          >
            <h2>Recent Activity</h2>
            <Button variant="ghost" style={{ fontSize: "13px" }}>
              View all
            </Button>
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
                  padding: "16px",
                  borderRadius: "var(--radius-sm)",
                  background: "var(--bg-main)",
                  boxShadow: "var(--shadow-sunken)",
                  border: "1px solid var(--border-light)",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "12px",
                      background: "var(--bg-main)",
                      color: "var(--primary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: "14px",
                      boxShadow: "var(--shadow-raised)",
                    }}
                  >
                    {lead.name[0]}
                  </div>
                  <div>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: "14px",
                        color: "var(--text-main)",
                      }}
                    >
                      {lead.name}
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "var(--text-muted)",
                        fontWeight: 600,
                      }}
                    >
                      {lead.source}
                    </div>
                  </div>
                </div>
                <Badge type={lead.stage}>{lead.stage.replace("_", " ")}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 style={{ marginBottom: "24px" }}>Pipeline Health</h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
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
                      marginBottom: "10px",
                    }}
                  >
                    <span
                      style={{ color: "var(--text-muted)", fontWeight: 600 }}
                    >
                      {s.label}
                    </span>
                    <span
                      style={{ fontWeight: 800, color: "var(--text-main)" }}
                    >
                      {count}
                    </span>
                  </div>
                  <div
                    style={{
                      height: "10px",
                      background: "var(--bg-main)",
                      borderRadius: "5px",
                      overflow: "hidden",
                      boxShadow: "var(--shadow-sunken)",
                      border: "1px solid var(--border-light)",
                    }}
                  >
                    <div
                      style={{
                        width: `${percentage}%`,
                        height: "100%",
                        background: s.color,
                        borderRadius: "5px",
                        boxShadow: "0 0 10px " + s.color + "44",
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <style jsx>{`
          @media (max-width: 1100px) {
            .dashboard-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
