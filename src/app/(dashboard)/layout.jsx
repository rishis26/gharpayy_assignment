"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import TopHeader from "@/components/layout/TopHeader";
import AIChatAssistant from "@/components/crm/AIChatAssistant";

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
      if (window.innerWidth > 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        background: "var(--bg-main)",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.3)",
            backdropFilter: "blur(4px)",
            zIndex: 40,
            transition: "opacity 0.3s ease",
          }}
        />
      )}

      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        isMobile={isMobile}
      />

      <main
        style={{
          flex: 1,
          padding: isMobile ? "20px" : "32px",
          height: "100vh",
          overflowY: "auto",
          marginLeft: isMobile ? 0 : "var(--sidebar-w)",
          transition: "margin 0.3s ease",
        }}
      >
        <TopHeader onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>{children}</div>
      </main>

      <div id="ai-assistant-portal">
        <AIChatAssistant />
      </div>
    </div>
  );
}
