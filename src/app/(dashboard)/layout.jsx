"use client";
import Sidebar from "@/components/layout/Sidebar";
import AIChatAssistant from "@/components/crm/AIChatAssistant";

export default function Layout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main
        style={{ flex: 1, padding: 30, height: "100vh", overflowY: "auto" }}
      >
        {children}
      </main>
      <div id="ai-assistant-portal">
        <AIChatAssistant />
      </div>
    </div>
  );
}
