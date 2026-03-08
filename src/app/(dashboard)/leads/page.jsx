"use client";
import { useEffect, useState, useMemo } from "react";
import { STAGES } from "@/lib/constants";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import LeadDetailsDrawer from "@/components/crm/LeadDetailsDrawer";

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selectedLead, setSelectedLead] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [filter]);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/leads${filter !== "all" ? `?stage=${filter}` : ""}`,
      );
      const data = await res.json();
      setLeads(data.data || []);

      if (selectedLead) {
        const updated = data.data.find((l) => l._id === selectedLead._id);
        if (updated) setSelectedLead(updated);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const filteredLeads = useMemo(() => leads, [leads]);

  return (
    <div style={{ paddingBottom: "40px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "center",
          gap: "20px",
          marginBottom: "32px",
        }}
      >
        <div>
          <h1
            style={{
              marginBottom: "8px",
              fontSize: isMobile ? "24px" : "32px",
            }}
          >
            Lead Management
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
            Track and manage all your property inquiries.
          </p>
        </div>
        <div
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "center",
            width: isMobile ? "100%" : "auto",
          }}
        >
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              flex: isMobile ? 1 : "initial",
              padding: "10px 12px",
              borderRadius: "12px",
              border: "1px solid var(--border-light)",
              background: "var(--bg-main)",
              boxShadow: "var(--shadow-btn)",
              outline: "none",
              fontSize: "14px",
              fontWeight: 600,
              color: "var(--text-main)",
            }}
          >
            <option value="all">All Stages</option>
            {STAGES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
          <Button
            onClick={() => (window.location.href = "/leads/new")}
            style={{ borderRadius: "12px", padding: "10px 16px" }}
          >
            {isMobile ? "+" : "Add Lead"}
          </Button>
        </div>
      </div>

      {isMobile ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {loading ? (
            <div
              style={{
                textAlign: "center",
                padding: "40px",
                color: "var(--text-muted)",
              }}
            >
              Loading leads...
            </div>
          ) : filteredLeads.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "40px",
                color: "var(--text-muted)",
              }}
            >
              No leads found.
            </div>
          ) : (
            filteredLeads.map((lead) => (
              <Card
                key={lead._id}
                onClick={() => setSelectedLead(lead)}
                style={{
                  padding: "16px",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "12px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontWeight: 800,
                        fontSize: "16px",
                        color: "var(--text-main)",
                      }}
                    >
                      {lead.name}
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: "var(--text-muted)",
                        marginTop: "2px",
                      }}
                    >
                      {lead.phone}
                    </div>
                  </div>
                  <Badge type={lead.stage}>
                    {lead.stage.replace("_", " ")}
                  </Badge>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTop: "1px solid var(--border-light)",
                    paddingTop: "12px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        background: "#e2e8f0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src="https://img.icons8.com/fluency-systems-filled/24/94a3b8/user.png"
                        alt=""
                        style={{ width: "12px" }}
                      />
                    </div>
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "var(--text-muted)",
                      }}
                    >
                      {lead.agent?.name || "Unassigned"}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: "11px",
                      color: "var(--text-muted)",
                      fontWeight: 500,
                    }}
                  >
                    {new Date(lead.lastActivity).toLocaleDateString()}
                  </span>
                </div>
              </Card>
            ))
          )}
        </div>
      ) : (
        <Card
          style={{
            padding: 0,
            overflow: "hidden",
            border: "1px solid var(--border-light)",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
            }}
          >
            <thead>
              <tr
                style={{
                  borderBottom: "1px solid var(--border-light)",
                  background: "rgba(0,0,0,0.02)",
                }}
              >
                <th
                  style={{
                    padding: "16px 24px",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Lead Name
                </th>
                <th
                  style={{
                    padding: "16px 24px",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Source
                </th>
                <th
                  style={{
                    padding: "16px 24px",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Stage
                </th>
                <th
                  style={{
                    padding: "16px 24px",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Assigned To
                </th>
                <th
                  style={{
                    padding: "16px 24px",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Last Activity
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="5"
                    style={{
                      padding: "40px",
                      textAlign: "center",
                      color: "var(--text-muted)",
                    }}
                  >
                    Loading leads...
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    style={{
                      padding: "40px",
                      textAlign: "center",
                      color: "var(--text-muted)",
                    }}
                  >
                    No leads found.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr
                    key={lead._id}
                    onClick={() => setSelectedLead(lead)}
                    style={{
                      borderBottom: "1px solid var(--border-light)",
                      transition: "all 0.2s",
                      cursor: "pointer",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.background =
                        "rgba(188, 71, 73, 0.03)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    <td style={{ padding: "20px 24px" }}>
                      <div
                        style={{ fontWeight: 800, color: "var(--text-main)" }}
                      >
                        {lead.name}
                      </div>
                      <div
                        style={{ fontSize: "13px", color: "var(--text-muted)" }}
                      >
                        {lead.phone}
                      </div>
                    </td>
                    <td style={{ padding: "20px 24px" }}>
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: 700,
                          padding: "4px 10px",
                          background: "var(--bg-main)",
                          borderRadius: "8px",
                          boxShadow: "var(--shadow-btn)",
                          color: "var(--text-muted)",
                          border: "1px solid var(--border-light)",
                        }}
                      >
                        {lead.source}
                      </span>
                    </td>
                    <td style={{ padding: "20px 24px" }}>
                      <Badge type={lead.stage}>
                        {lead.stage.replace("_", " ")}
                      </Badge>
                    </td>
                    <td style={{ padding: "20px 24px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <div
                          style={{
                            width: "28px",
                            height: "28px",
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
                            style={{ width: "16px" }}
                          />
                        </div>
                        <span
                          style={{
                            fontSize: "14px",
                            fontWeight: 600,
                            color: "var(--text-main)",
                          }}
                        >
                          {lead.agent?.name || "Unassigned"}
                        </span>
                      </div>
                    </td>
                    <td
                      style={{
                        padding: "20px 24px",
                        fontSize: "13px",
                        color: "var(--text-muted)",
                        fontWeight: 500,
                      }}
                    >
                      {new Date(lead.lastActivity).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </Card>
      )}

      <LeadDetailsDrawer
        lead={selectedLead}
        isOpen={!!selectedLead}
        onClose={() => setSelectedLead(null)}
        onUpdate={fetchLeads}
      />
    </div>
  );
}
