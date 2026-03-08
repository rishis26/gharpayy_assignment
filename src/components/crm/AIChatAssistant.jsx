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
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
      style={{
        position: "fixed",
        bottom: isMobile && isOpen ? "0" : "30px",
        right: isMobile && isOpen ? "0" : "30px",
        zIndex: 1000,
        width: isMobile && isOpen ? "100%" : "auto",
      }}
    >
      {isOpen ? (
        <Card
          style={{
            width: isMobile ? "100%" : "350px",
            height: isMobile ? "80vh" : "500px",
            display: "flex",
            flexDirection: "column",
            padding: 0,
            boxShadow: "0 10px 50px rgba(0,0,0,0.2)",
            border: "1px solid var(--border-light)",
            borderRadius: isMobile ? "30px 30px 0 0" : "var(--radius-lg)",
            background: "var(--bg-main)",
          }}
        >
          <div
            style={{
              padding: "20px",
              borderBottom: "1px solid var(--border-dark)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "var(--bg-main)",
              borderRadius: isMobile
                ? "30px 30px 0 0"
                : "calc(var(--radius-lg) - 1px) calc(var(--radius-lg) - 1px) 0 0",
              boxShadow: "0 4px 10px rgba(188, 71, 73, 0.05)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img
                src="https://img.icons8.com/fluency-systems-filled/24/bc4749/chatbot.png"
                alt=""
                style={{ width: "22px" }}
              />
              <span
                style={{
                  fontWeight: 800,
                  fontSize: "14px",
                  color: "var(--text-main)",
                }}
              >
                AI Assistant
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "24px",
                color: "var(--text-muted)",
                fontWeight: 300,
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
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                  background: m.role === "user" ? "var(--primary)" : "white",
                  color: m.role === "user" ? "white" : "var(--text-main)",
                  padding: "12px 16px",
                  borderRadius: "18px",
                  fontSize: "13px",
                  maxWidth: "85%",
                  lineHeight: "1.5",
                  boxShadow:
                    m.role === "assistant" ? "var(--shadow-btn)" : "none",
                  fontWeight: 600,
                }}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div
                style={{
                  alignSelf: "flex-start",
                  color: "var(--text-muted)",
                  fontSize: "12px",
                  fontStyle: "italic",
                  paddingLeft: "10px",
                }}
              >
                AI is typing...
              </div>
            )}
          </div>

          <div
            style={{
              padding: "20px",
              borderTop: "1px solid var(--border-dark)",
            }}
          >
            <div style={{ display: "flex", gap: "10px" }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask Gharpayy AI..."
                style={{
                  flex: 1,
                  padding: "12px 16px",
                  borderRadius: "16px",
                  border: "none",
                  boxShadow: "var(--shadow-sunken)",
                  background: "var(--bg-main)",
                  outline: "none",
                  fontSize: "13px",
                  color: "var(--text-main)",
                  fontWeight: 600,
                }}
              />
              <button
                onClick={handleSend}
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "14px",
                  background: "var(--bg-main)",
                  boxShadow: "var(--shadow-btn)",
                  border: "1px solid var(--border-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <img
                  src="https://img.icons8.com/fluency-systems-filled/24/bc4749/sent.png"
                  alt=""
                  style={{ width: "20px" }}
                />
              </button>
            </div>
          </div>
        </Card>
      ) : (
        <button
          id="ai-chat-btn"
          onClick={() => setIsOpen(true)}
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "18px",
            background: "var(--bg-main)",
            border: "1px solid var(--border-light)",
            cursor: "pointer",
            boxShadow: "var(--shadow-raised)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease",
          }}
        >
          <img
            src="https://img.icons8.com/fluency-systems-filled/32/bc4749/chatbot.png"
            alt=""
            style={{ width: "28px" }}
          />
        </button>
      )}
    </div>
  );
}
