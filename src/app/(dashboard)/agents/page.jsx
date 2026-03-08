"use client";
import { useEffect, useState } from "react";

export default function AgentsPage() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/agents")
      .then((r) => r.json())
      .then((d) => {
        setAgents(d.data || []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="animate-fade">
      <div style={{ marginBottom: "32px" }}>
        <h1>Agent Leaderboard</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
          Track performance and productivity of all sales agents.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "24px",
        }}
      >
        {loading ? (
          <p>Loading agents...</p>
        ) : (
          agents.map((agent) => (
            <div key={agent._id} className="card">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    background: "#3b82f615",
                    color: "#3b82f6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                    fontWeight: 800,
                  }}
                >
                  {agent.avatar}
                </div>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700 }}>
                    {agent.name}
                  </h3>
                  <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                    {agent.email}
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    padding: "12px",
                    background: "#f8fafc",
                    borderRadius: "8px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "11px",
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      fontWeight: 600,
                    }}
                  >
                    Active Leads
                  </div>
                  <div style={{ fontSize: "18px", fontWeight: 700 }}>
                    {Math.floor(Math.random() * 20) + 5}
                  </div>
                </div>
                <div
                  style={{
                    padding: "12px",
                    background: "#f8fafc",
                    borderRadius: "8px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "11px",
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      fontWeight: 600,
                    }}
                  >
                    Closed
                  </div>
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#10b981",
                    }}
                  >
                    {Math.floor(Math.random() * 5) + 1}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: "20px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "12px",
                    marginBottom: "8px",
                  }}
                >
                  <span style={{ color: "var(--text-muted)" }}>
                    Performance Rank
                  </span>
                  <span style={{ fontWeight: 600 }}>{agent.performance}%</span>
                </div>
                <div
                  style={{
                    height: "4px",
                    background: "#e2e8f0",
                    borderRadius: "2px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${agent.performance}%`,
                      height: "100%",
                      background: "#3b82f6",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
