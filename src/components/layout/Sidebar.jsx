"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const menuItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: "https://img.icons8.com/fluency-systems-filled/24/718096/home.png",
      activeIcon:
        "https://img.icons8.com/fluency-systems-filled/24/3B82F6/home.png",
    },
    {
      label: "Leads",
      path: "/leads",
      icon: "https://img.icons8.com/fluency-systems-filled/24/718096/conference-call.png",
      activeIcon:
        "https://img.icons8.com/fluency-systems-filled/24/3B82F6/conference-call.png",
    },
    {
      label: "Pipeline",
      path: "/pipeline",
      icon: "https://img.icons8.com/fluency-systems-filled/24/718096/workflow.png",
      activeIcon:
        "https://img.icons8.com/fluency-systems-filled/24/3B82F6/workflow.png",
    },
    {
      label: "Agents",
      path: "/agents",
      icon: "https://img.icons8.com/fluency-systems-filled/24/718096/management.png",
      activeIcon:
        "https://img.icons8.com/fluency-systems-filled/24/3B82F6/management.png",
    },
    {
      label: "AI Assistant",
      path: "#",
      icon: "https://img.icons8.com/fluency-systems-filled/24/718096/chatbot.png",
      activeIcon:
        "https://img.icons8.com/fluency-systems-filled/24/3B82F6/chatbot.png",
      onClick: (e) => {
        e.preventDefault();
        document.getElementById("ai-chat-btn")?.click();
      },
    },
  ];

  return (
    <aside
      style={{
        width: "var(--sidebar-w)",
        height: "100vh",
        background: "#e0e5ec",
        color: "#2d3748",
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 0,
        padding: "32px 16px",
        boxShadow: "inset -10px 0 20px rgba(163,177,198,0.3)",
      }}
    >
      <div style={{ padding: "0 16px", marginBottom: "40px" }}>
        <h2
          style={{
            color: "#1a202c",
            fontFamily: "Plus Jakarta Sans",
            fontWeight: 800,
            fontSize: "24px",
            letterSpacing: "-1px",
            textShadow:
              "2px 2px 4px rgba(255,255,255,0.8), -1px -1px 2px rgba(163,177,198,0.5)",
          }}
        >
          gharpayy <span style={{ color: "#3b82f6" }}>CRM</span>
        </h2>
      </div>

      <nav style={{ flex: 1 }}>
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.label}
              href={item.path}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 16px",
                borderRadius: "8px",
                textDecoration: "none",
                color: isActive ? "#3b82f6" : "#718096",
                background: isActive ? "#e0e5ec" : "transparent",
                boxShadow: isActive
                  ? "inset 6px 6px 12px #b8b9be, inset -6px -6px 12px #ffffff"
                  : "none",
                fontWeight: isActive ? 800 : 500,
                fontSize: "14px",
                marginBottom: "12px",
                transition: "all 0.3s ease",
              }}
              onClick={item.onClick}
            >
              <img
                src={isActive ? item.activeIcon : item.icon}
                alt=""
                style={{ width: "20px", height: "20px" }}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div
        style={{
          borderTop: "1px solid #1e293b",
          paddingTop: "24px",
          padding: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              background: "#e0e5ec",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: "14px",
              color: "#3b82f6",
              boxShadow: "5px 5px 10px #b8b9be, -5px -5px 10px #ffffff",
            }}
          >
            {session?.user?.name?.[0] || "A"}
          </div>
          <div style={{ overflow: "hidden" }}>
            <div
              style={{
                fontSize: "14px",
                fontWeight: 600,
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {session?.user?.name || "Admin User"}
            </div>
            <div style={{ fontSize: "11px", color: "#64748b" }}>
              {session?.user?.role || "Administrator"}
            </div>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          style={{
            width: "100%",
            background: "transparent",
            border: "none",
            color: "#ef4444",
            fontSize: "13px",
            padding: "8px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
            borderRadius: "8px",
          }}
        >
          <img
            src="https://img.icons8.com/fluency-systems-filled/24/EF4444/exit.png"
            alt=""
            style={{ width: "18px", height: "18px" }}
          />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
