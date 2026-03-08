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
      color: "#2563EB",
      icon: "https://img.icons8.com/fluency-systems-filled/48/2563EB/chart-line.png",
    },
    {
      label: "Upcoming Visits",
      value: stats?.visitsScheduled || 0,
      color: "#0EA5E9",
      icon: "https://img.icons8.com/fluency-systems-filled/48/0EA5E9/calendar-2.png",
    },
    {
      label: "Bookings",
      value: stats?.bookingsConfirmed || 0,
      color: "#10B981",
      icon: "https://img.icons8.com/fluency-systems-filled/48/10B981/checked-user-male.png",
    },
    {
      label: "Conversion Rate",
      value: stats
        ? `${Math.round((stats.bookingsConfirmed / stats.totalLeads) * 100) || 0}%`
        : "0%",
      color: "#8B5CF6",
      icon: "https://img.icons8.com/fluency-systems-filled/48/8B5CF6/bullseye.png",
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
                <Badge type={lead.stage}>{lead.stage.replace("_", " ")}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card>
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
        </Card>
      </div>
    </div>
  );
}
