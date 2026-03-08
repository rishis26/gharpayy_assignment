"use client";
import { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

export default function LeadDetailsDrawer({ lead, isOpen, onClose, onUpdate }) {
  const [activeTab, setActiveTab] = useState("info");
  const [note, setNote] = useState("");

  const [agents, setAgents] = useState([]);

  useEffect(() => {
    fetch("/api/agents")
      .then((r) => r.json())
      .then((d) => setAgents(d.data || []));
  }, []);

  if (!isOpen || !lead) return null;

  const handleAction = async (action, data = {}) => {
    try {
      const res = await fetch(`/api/leads/${lead._id}`, {
        method: action === "DELETE" ? "DELETE" : "PATCH",
        body: action === "DELETE" ? null : JSON.stringify(data),
      });
      if (res.ok) {
        if (action === "DELETE") onClose();
        onUpdate();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const [isAddingNote, setIsAddingNote] = useState(false);

  const handleAddNote = async () => {
    if (!note || isAddingNote) return;
    setIsAddingNote(true);
    try {
      await handleAction("PATCH", { note });
      setNote("");
      setActiveTab("timeline"); // Switch to timeline to show the result
    } catch (e) {
      console.error(e);
    }
    setIsAddingNote(false);
  };

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(15, 23, 42, 0.4)",
          backdropFilter: "blur(4px)",
          zIndex: 40,
        }}
      />
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "500px",
          height: "100vh",
          background: "white",
          boxShadow: "-10px 0 30px rgba(0,0,0,0.1)",
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          padding: "32px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "32px",
          }}
        >
          <h2 style={{ fontSize: "20px", fontWeight: 800 }}>Lead Details</h2>
          <Button variant="ghost" onClick={onClose}>
            <img
              src="https://img.icons8.com/fluency-systems-filled/24/0f172a/multiply.png"
              alt=""
              style={{ width: "20px" }}
            />
          </Button>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
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
            {lead.name[0]}
          </div>
          <div>
            <div style={{ fontSize: "18px", fontWeight: 700 }}>{lead.name}</div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginTop: "4px",
              }}
            >
              <Badge type={lead.stage}>{lead.stage.replace("_", " ")}</Badge>
              <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                • {lead.source}
              </span>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            borderBottom: "1px solid var(--border)",
            marginBottom: "24px",
          }}
        >
          {["info", "timeline", "manage"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "12px 24px",
                border: "none",
                background: "none",
                fontSize: "14px",
                fontWeight: 600,
                color: activeTab === tab ? "#3b82f6" : "var(--text-muted)",
                borderBottom:
                  activeTab === tab
                    ? "2px solid #3b82f6"
                    : "2px solid transparent",
                cursor: "pointer",
                textTransform: "capitalize",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <div style={{ flex: 1, overflowY: "auto" }}>
          {activeTab === "info" ? (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "24px" }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    marginBottom: "8px",
                  }}
                >
                  Contact Information
                </label>
                <Card
                  style={{
                    padding: "16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <img
                      src="https://img.icons8.com/fluency-systems-filled/24/3B82F6/iphone.png"
                      alt=""
                      style={{ width: "18px" }}
                    />
                    <span style={{ fontSize: "14px", fontWeight: 600 }}>
                      {lead.phone}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <img
                      src="https://img.icons8.com/fluency-systems-filled/24/25D366/whatsapp.png"
                      alt=""
                      style={{ width: "18px" }}
                    />
                    <a
                      href={`https://wa.me/91${lead.phone}`}
                      target="_blank"
                      style={{
                        fontSize: "14px",
                        color: "#25d366",
                        fontWeight: 600,
                        textDecoration: "none",
                      }}
                    >
                      Chat on WhatsApp
                    </a>
                  </div>
                </Card>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    marginBottom: "8px",
                  }}
                >
                  Quick Note
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Add a progress update..."
                  style={{
                    width: "100%",
                    height: "100px",
                    borderRadius: "12px",
                    border: "1px solid var(--border)",
                    padding: "12px",
                    outline: "none",
                    fontFamily: "inherit",
                    fontSize: "14px",
                    resize: "none",
                  }}
                />
                <Button
                  onClick={handleAddNote}
                  loading={isAddingNote}
                  style={{ width: "100%", marginTop: "12px" }}
                >
                  Add Entry
                </Button>
              </div>
            </div>
          ) : activeTab === "manage" ? (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "24px" }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    marginBottom: "8px",
                  }}
                >
                  Reassign Lead
                </label>
                <div style={{ display: "flex", gap: "8px" }}>
                  <select
                    value={lead.agentId}
                    onChange={(e) =>
                      handleAction("PATCH", { agentId: e.target.value })
                    }
                    style={{
                      flex: 1,
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid var(--border)",
                    }}
                  >
                    {agents.map((a) => (
                      <option key={a._id} value={a._id}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div
                style={{
                  marginTop: "auto",
                  borderTop: "1px solid var(--border)",
                  paddingTop: "24px",
                }}
              >
                <label
                  style={{
                    display: "block",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#ef4444",
                    textTransform: "uppercase",
                    marginBottom: "8px",
                  }}
                >
                  Danger Zone
                </label>
                <Button
                  onClick={() =>
                    confirm("Are you sure you want to delete this lead?") &&
                    handleAction("DELETE")
                  }
                  style={{
                    width: "100%",
                    background: "#fef2f2",
                    color: "#ef4444",
                    border: "1px solid #fee2e2",
                  }}
                >
                  Delete Lead Permanently
                </Button>
              </div>
            </div>
          ) : (
            <div style={{ padding: "0 8px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0",
                  position: "relative",
                }}
              >
                {lead.timeline
                  ?.slice()
                  .reverse()
                  .map((entry, i) => {
                    const isLast = i === (lead.timeline?.length || 0) - 1;
                    const isNote = entry.type === "note";
                    const isSLA = entry.type?.includes("sla");

                    return (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          gap: "20px",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            width: "32px",
                            position: "relative",
                          }}
                        >
                          <div
                            style={{
                              width: "32px",
                              height: "32px",
                              borderRadius: "50%",
                              background: isNote
                                ? "#DBEAFE"
                                : isSLA
                                  ? "#FEF2F2"
                                  : "#F1F5F9",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              zIndex: 2,
                              border: "2px solid white",
                            }}
                          >
                            <img
                              src={
                                isNote
                                  ? "https://img.icons8.com/fluency-systems-filled/16/3B82F6/edit-property.png"
                                  : isSLA
                                    ? "https://img.icons8.com/fluency-systems-filled/16/EF4444/alarm-clock.png"
                                    : "https://img.icons8.com/fluency-systems-filled/16/64748B/activity-history.png"
                              }
                              alt=""
                            />
                          </div>
                          {!isLast && (
                            <div
                              style={{
                                width: "2px",
                                flex: 1,
                                background: "#E2E8F0",
                                margin: "4px 0",
                              }}
                            />
                          )}
                        </div>
                        <div style={{ paddingBottom: "32px", flex: 1 }}>
                          <div
                            style={{
                              fontSize: "14px",
                              lineHeight: "1.6",
                              color: "#1E293B",
                              marginBottom: "6px",
                            }}
                          >
                            {isNote ? (
                              <div
                                style={{
                                  background: "var(--bg-main)",
                                  padding: "16px",
                                  borderRadius: "16px",
                                  boxShadow: "var(--shadow-sunken)",
                                  fontSize: "13px",
                                }}
                              >
                                <span
                                  style={{
                                    fontWeight: 700,
                                    color: "var(--primary)",
                                    display: "block",
                                    marginBottom: "4px",
                                  }}
                                >
                                  Note Added
                                </span>
                                {entry.text.replace("Note added: ", "")}
                              </div>
                            ) : (
                              <span style={{ fontWeight: 500 }}>
                                {entry.text}
                              </span>
                            )}
                          </div>
                          <div
                            style={{
                              fontSize: "11px",
                              color: "#94A3B8",
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                              fontWeight: 500,
                            }}
                          >
                            <img
                              src="https://img.icons8.com/fluency-systems-filled/12/94B3B8/clock.png"
                              alt=""
                            />
                            {new Date(entry.createdAt).toLocaleString([], {
                              dateStyle: "medium",
                              timeStyle: "short",
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
