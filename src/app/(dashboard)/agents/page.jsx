"use client";
import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

export default function AgentsPage() {
  const [agents, setAgents] = useState([]);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [agentsRes, leadsRes] = await Promise.all([
          fetch("/api/agents"),
          fetch("/api/leads"),
        ]);
        const agentsData = await agentsRes.json();
        const leadsData = await leadsRes.json();

        setAgents(agentsData.data || []);
        setLeads(leadsData.data || []);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const getAgentStats = (agentId) => {
    const agentLeads = leads.filter((l) => l.agentId === agentId);
    return {
      active: agentLeads.filter(
        (l) => l.stage !== "booked" && l.stage !== "lost",
      ).length,
      closed: agentLeads.filter((l) => l.stage === "booked").length,
      total: agentLeads.length,
    };
  };

  const sortedAgents = [...agents].sort((a, b) => {
    const statsA = getAgentStats(a._id);
    const statsB = getAgentStats(b._id);
    return statsB.closed - statsA.closed;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAgent, setNewAgent] = useState({
    name: "",
    email: "",
    role: "agent",
  });

  const handleAddAgent = async (e) => {
    e.preventDefault();
    try {
      await fetch("/api/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAgent),
      });
      setIsModalOpen(false);
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "32px",
        }}
      >
        <div>
          <h1>Agent Leaderboard</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
            Track performance and productivity based on closed bookings.
          </p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          icon="https://img.icons8.com/fluency-systems-filled/20/FFFFFF/add-user-male.png"
        >
          Add Agent
        </Button>
      </div>

      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1100,
          }}
        >
          <Card style={{ width: "400px", padding: "32px" }}>
            <h2 style={{ marginBottom: "24px" }}>Add New Agent</h2>
            <form
              onSubmit={handleAddAgent}
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "13px",
                    fontWeight: 600,
                  }}
                >
                  Full Name
                </label>
                <input
                  required
                  value={newAgent.name}
                  onChange={(e) =>
                    setNewAgent({ ...newAgent, name: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid var(--border)",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "13px",
                    fontWeight: 600,
                  }}
                >
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  value={newAgent.email}
                  onChange={(e) =>
                    setNewAgent({ ...newAgent, email: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid var(--border)",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  justifyContent: "flex-end",
                  marginTop: "12px",
                }}
              >
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Create Agent</Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "24px",
        }}
      >
        {loading ? (
          <p>Loading agents...</p>
        ) : (
          sortedAgents.map((agent, index) => {
            const stats = getAgentStats(agent._id);
            const isTop = index === 0;

            return (
              <Card
                key={agent._id}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  border: isTop
                    ? "2px solid #3b82f6"
                    : "1px solid var(--border)",
                }}
              >
                {isTop && (
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "-25px",
                      background: "#3b82f6",
                      color: "white",
                      fontSize: "10px",
                      fontWeight: 800,
                      padding: "4px 30px",
                      transform: "rotate(45deg)",
                    }}
                  >
                    TOP AGENT
                  </div>
                )}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    marginBottom: "20px",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                    }}
                  >
                    <div
                      style={{
                        width: "56px",
                        height: "56px",
                        borderRadius: "16px",
                        background: "#3b82f615",
                        color: "#3b82f6",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "24px",
                        fontWeight: 800,
                      }}
                    >
                      {agent.avatar}
                    </div>
                    <div>
                      <h3 style={{ fontSize: "16px", fontWeight: 700 }}>
                        {agent.name}
                      </h3>
                      <div
                        style={{ fontSize: "12px", color: "var(--text-muted)" }}
                      >
                        {agent.role}
                      </div>
                    </div>
                  </div>
                  {agent._id !== "admin" && (
                    <button
                      onClick={async () => {
                        if (confirm(`Delete ${agent.name}?`)) {
                          await fetch(`/api/agents/${agent._id}`, {
                            method: "DELETE",
                          });
                          window.location.reload();
                        }
                      }}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "8px",
                      }}
                    >
                      <img
                        src="https://img.icons8.com/fluency-systems-filled/20/EF4444/delete-forever.png"
                        alt=""
                      />
                    </button>
                  )}
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "12px",
                    marginBottom: "20px",
                  }}
                >
                  <div
                    style={{
                      padding: "12px",
                      background: "#f8fafc",
                      borderRadius: "12px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "10px",
                        color: "var(--text-muted)",
                        textTransform: "uppercase",
                        fontWeight: 700,
                        marginBottom: "4px",
                      }}
                    >
                      Active
                    </div>
                    <div style={{ fontSize: "18px", fontWeight: 800 }}>
                      {stats.active}
                    </div>
                  </div>
                  <div
                    style={{
                      padding: "12px",
                      background: "#f0fdf4",
                      borderRadius: "12px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "10px",
                        color: "#16a34a",
                        textTransform: "uppercase",
                        fontWeight: 700,
                        marginBottom: "4px",
                      }}
                    >
                      Closed
                    </div>
                    <div
                      style={{
                        fontSize: "18px",
                        fontWeight: 800,
                        color: "#16a34a",
                      }}
                    >
                      {stats.closed}
                    </div>
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "12px",
                      marginBottom: "8px",
                    }}
                  >
                    <span
                      style={{ color: "var(--text-muted)", fontWeight: 500 }}
                    >
                      Global Performance
                    </span>
                    <span style={{ fontWeight: 700, color: "#3B82F6" }}>
                      {Math.round((stats.closed / (stats.total || 1)) * 100)}%
                    </span>
                  </div>
                  <div
                    style={{
                      height: "6px",
                      background: "#F1F5F9",
                      borderRadius: "3px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${Math.round((stats.closed / (stats.total || 1)) * 100)}%`,
                        height: "100%",
                        background: "#3B82F6",
                      }}
                    ></div>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
