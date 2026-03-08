"use client";
import { useState, useRef, useEffect } from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";

export default function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I am your Gharpayy AI assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "Something went wrong." },
      ]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error: Could not connect to AI." },
      ]);
    }
    setLoading(false);
  };

  return (
    <div
      style={{ position: "fixed", bottom: "30px", right: "30px", zIndex: 1000 }}
    >
      {isOpen ? (
        <Card
          style={{
            width: "350px",
            height: "500px",
            display: "flex",
            flexDirection: "column",
            padding: 0,
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            border: "1px solid var(--border)",
          }}
        >
          <div
            style={{
              padding: "16px",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#e0e5ec",
              borderRadius: "24px 24px 0 0",
              boxShadow: "0 4px 10px rgba(163,177,198,0.2)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <img
                src="https://img.icons8.com/fluency-systems-filled/24/3B82F6/chatbot.png"
                alt=""
                style={{ width: "22px" }}
              />
              <span style={{ fontWeight: 700, fontSize: "14px" }}>
                Gharpayy AI Assistant
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "20px",
                color: "var(--text-muted)",
              }}
            >
              ×
            </button>
          </div>

          <div
            ref={scrollRef}
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                  background: m.role === "user" ? "#3B82F6" : "#f1f5f9",
                  color: m.role === "user" ? "white" : "var(--text-main)",
                  padding: "10px 14px",
                  borderRadius: "12px",
                  fontSize: "13px",
                  maxWidth: "80%",
                  lineHeight: "1.5",
                }}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div
                style={{
                  alignSelf: "flex-start",
                  background: "#f1f5f9",
                  padding: "10px 12px",
                  borderRadius: "10px",
                  fontSize: "12px",
                  color: "var(--text-muted)",
                  fontStyle: "italic",
                }}
              >
                AI is thinking...
              </div>
            )}
          </div>

          <div
            style={{ padding: "16px", borderTop: "1px solid var(--border)" }}
          >
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask anything about CRM..."
                style={{
                  flex: 1,
                  padding: "10px 12px",
                  borderRadius: "14px",
                  border: "none",
                  boxShadow:
                    "inset 4px 4px 8px #b8b9be, inset -4px -4px 8px #ffffff",
                  background: "#e0e5ec",
                  outline: "none",
                  fontSize: "13px",
                  color: "#2d3748",
                }}
              />
              <Button
                onClick={handleSend}
                style={{ width: "40px", height: "40px", padding: 0 }}
              >
                <img
                  src="https://img.icons8.com/fluency-systems-filled/24/3B82F6/sent.png"
                  alt=""
                  style={{ width: "18px" }}
                />
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <button
          id="ai-chat-btn"
          onClick={() => setIsOpen(true)}
          style={{
            width: "65px",
            height: "65px",
            borderRadius: "20px",
            background: "#e0e5ec",
            color: "#3B82F6",
            border: "none",
            cursor: "pointer",
            boxShadow: "8px 8px 16px #b8b9be, -8px -8px 16px #ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease",
          }}
          onMouseDown={(e) =>
            (e.currentTarget.style.boxShadow =
              "inset 4px 4px 8px #b8b9be, inset -4px -4px 8px #ffffff")
          }
          onMouseUp={(e) =>
            (e.currentTarget.style.boxShadow =
              "8px 8px 16px #b8b9be, -8px -8px 16px #ffffff")
          }
        >
          <img
            src="https://img.icons8.com/fluency-systems-filled/32/3B82F6/chatbot.png"
            alt=""
            style={{ width: "32px" }}
          />
        </button>
      )}
    </div>
  );
}
