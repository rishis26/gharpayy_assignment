"use client";
import { useEffect, useState } from "react";
import { STAGES } from "@/lib/constants";

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

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
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div className="animate-fade">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "32px",
        }}
      >
        <div>
          <h1 style={{ marginBottom: "8px" }}>Lead Management</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
            Track and manage all your property inquiries.
          </p>
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: "8px",
            border: "1px solid var(--border)",
            outline: "none",
          }}
        >
          <option value="all">All Stages</option>
          {STAGES.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
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
                borderBottom: "1px solid var(--border)",
                background: "#f8fafc",
              }}
            >
              <th
                style={{
                  padding: "16px 24px",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "var(--text-muted)",
                }}
              >
                LEAD NAME
              </th>
              <th
                style={{
                  padding: "16px 24px",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "var(--text-muted)",
                }}
              >
                SOURCE
              </th>
              <th
                style={{
                  padding: "16px 24px",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "var(--text-muted)",
                }}
              >
                STAGE
              </th>
              <th
                style={{
                  padding: "16px 24px",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "var(--text-muted)",
                }}
              >
                ASSIGNED TO
              </th>
              <th
                style={{
                  padding: "16px 24px",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "var(--text-muted)",
                }}
              >
                LAST ACTIVITY
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
                  style={{
                    borderBottom: "1px solid var(--border)",
                    transition: "background 0.2s",
                  }}
                >
                  <td style={{ padding: "16px 24px" }}>
                    <div style={{ fontWeight: 600 }}>{lead.name}</div>
                    <div
                      style={{ fontSize: "13px", color: "var(--text-muted)" }}
                    >
                      {lead.phone}
                    </div>
                  </td>
                  <td style={{ padding: "16px 24px" }}>
                    <span
                      style={{
                        fontSize: "13px",
                        padding: "4px 8px",
                        background: "#f1f5f9",
                        borderRadius: "4px",
                      }}
                    >
                      {lead.source}
                    </span>
                  </td>
                  <td style={{ padding: "16px 24px" }}>
                    <span className={`badge badge-${lead.stage}`}>
                      {lead.stage.replace("_", " ")}
                    </span>
                  </td>
                  <td style={{ padding: "16px 24px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <div
                        style={{
                          width: "24px",
                          height: "24px",
                          borderRadius: "50%",
                          background: "#e2e8f0",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "10px",
                          fontWeight: 700,
                        }}
                      >
                        {lead.agent?.avatar || "?"}
                      </div>
                      <span style={{ fontSize: "14px" }}>
                        {lead.agent?.name || "Unassigned"}
                      </span>
                    </div>
                  </td>
                  <td
                    style={{
                      padding: "16px 24px",
                      fontSize: "13px",
                      color: "var(--text-muted)",
                    }}
                  >
                    {new Date(lead.lastActivity).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
