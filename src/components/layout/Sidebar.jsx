"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const menuItems = [
    { label: "Dashboard", path: "/dashboard", icon: "📊" },
    { label: "Leads", path: "/leads", icon: "👤" },
    { label: "Pipeline", path: "/pipeline", icon: "🎯" },
    { label: "Agents", path: "/agents", icon: "💼" },
  ];

  return (
    <aside
      style={{
        width: "var(--sidebar-w)",
        height: "100vh",
        background: "#0F172A",
        color: "white",
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 0,
        padding: "32px 16px",
      }}
    >
      <div style={{ padding: "0 16px", marginBottom: "40px" }}>
        <h2
          style={{
            color: "white",
            fontFamily: "Plus Jakarta Sans",
            fontWeight: 800,
            fontSize: "24px",
            letterSpacing: "-1px",
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
              key={item.path}
              href={item.path}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 16px",
                borderRadius: "8px",
                textDecoration: "none",
                color: isActive ? "white" : "#94a3b8",
                background: isActive ? "#1e293b" : "transparent",
                fontWeight: isActive ? 600 : 500,
                fontSize: "14px",
                marginBottom: "4px",
                transition: "all 0.2s",
              }}
            >
              <span>{item.icon}</span>
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
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "#3b82f6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: "14px",
            }}
          >
            {session?.user?.name?.[0] || "A"}
          </div>
          <div>
            <div style={{ fontSize: "14px", fontWeight: 600 }}>
              {session?.user?.name || "Admin User"}
            </div>
            <div style={{ fontSize: "11px", color: "#64748b" }}>
              {session?.user?.role || "Administrator"}
            </div>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="btn btn-ghost"
          style={{
            width: "100%",
            justifyContent: "flex-start",
            color: "#ef4444",
            fontSize: "13px",
            padding: "8px",
          }}
        >
          🚪 Sign Out
        </button>
      </div>
    </aside>
  );
}
