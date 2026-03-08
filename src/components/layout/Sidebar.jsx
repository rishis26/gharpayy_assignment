"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export default function Sidebar({ isOpen, setIsOpen, isMobile }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const menuItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: "https://img.icons8.com/fluency-systems-filled/24/6b705c/home.png",
      activeIcon:
        "https://img.icons8.com/fluency-systems-filled/24/bc4749/home.png",
    },
    {
      label: "Leads",
      path: "/leads",
      icon: "https://img.icons8.com/fluency-systems-filled/24/6b705c/contacts.png",
      activeIcon:
        "https://img.icons8.com/fluency-systems-filled/24/bc4749/contacts.png",
    },
    {
      label: "Pipeline",
      path: "/pipeline",
      icon: "https://img.icons8.com/fluency-systems-filled/24/6b705c/sales-performance.png",
      activeIcon:
        "https://img.icons8.com/fluency-systems-filled/24/bc4749/sales-performance.png",
    },
    {
      label: "Agents",
      path: "/agents",
      icon: "https://img.icons8.com/fluency-systems-filled/24/6b705c/manager.png",
      activeIcon:
        "https://img.icons8.com/fluency-systems-filled/24/bc4749/manager.png",
    },
    {
      label: "AI Assistant",
      path: "#",
      icon: "https://img.icons8.com/fluency-systems-filled/24/6b705c/chatbot.png",
      activeIcon:
        "https://img.icons8.com/fluency-systems-filled/24/bc4749/chatbot.png",
      onClick: (e) => {
        e.preventDefault();
        document.getElementById("ai-chat-btn")?.click();
        if (isMobile) setIsOpen(false);
      },
    },
  ];

  return (
    <aside
      style={{
        width: "var(--sidebar-w)",
        height: "100vh",
        background: "var(--bg-main)",
        color: "var(--text-main)",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        top: 0,
        left: isOpen ? 0 : "calc(-1 * var(--sidebar-w))",
        padding: "40px 24px",
        boxShadow:
          isMobile && isOpen
            ? "20px 0 50px rgba(0,0,0,0.1)"
            : "inset -1px 0 0 rgba(188, 71, 73, 0.1)",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        zIndex: 50,
        borderRight: "1px solid var(--border-light)",
        borderTopRightRadius: isMobile ? "32px" : "0",
        borderBottomRightRadius: isMobile ? "32px" : "0",
      }}
    >
      {isMobile && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsOpen(false);
          }}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            background: "var(--bg-main)",
            border: "1px solid var(--border-light)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "var(--shadow-btn)",
            zIndex: 100,
            transition: "transform 0.2s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.05)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <img
            src="https://img.icons8.com/material-rounded/24/6b705c/multiply.png"
            alt="Close"
            style={{ width: "20px", height: "20px" }}
          />
        </button>
      )}

      {/* Branding Header */}
      <div style={{ marginBottom: "48px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              padding: "8px",
              background: "white",
              borderRadius: "12px",
              boxShadow: "var(--shadow-btn)",
            }}
          >
            <img
              src="https://gharpayy.com/img/logo/gharpayy_logo2.png"
              alt="Logo"
              style={{ height: "24px", width: "auto" }}
            />
          </div>
          <h2
            style={{
              color: "var(--text-main)",
              fontFamily: "Plus Jakarta Sans",
              fontWeight: 800,
              fontSize: "20px",
              letterSpacing: "-1px",
              margin: 0,
            }}
          >
            CRM
          </h2>
        </div>
      </div>

      <nav
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.label}
              href={item.path}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "14px 18px",
                borderRadius: "18px",
                textDecoration: "none",
                color: isActive ? "white" : "var(--text-muted)",
                background: isActive ? "var(--primary)" : "transparent",
                boxShadow: isActive
                  ? "0 8px 16px rgba(188, 71, 73, 0.2)"
                  : "none",
                fontWeight: isActive ? 700 : 600,
                fontSize: "14px",
                transition: "all 0.3s ease",
                border: "1px solid transparent",
              }}
              onClick={(e) => {
                if (item.onClick) item.onClick(e);
                else if (isMobile) setIsOpen(false);
              }}
            >
              <img
                src={isActive ? item.activeIcon : item.icon}
                alt=""
                style={{
                  width: "20px",
                  height: "20px",
                  filter: isActive ? "brightness(0) invert(1)" : "none",
                }}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Download Section - More Sleek */}
      <div style={{ marginTop: "auto", marginBottom: "32px" }}>
        <a
          href="/gharpayy-crm.apk"
          download
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "16px",
            borderRadius: "22px",
            background: "var(--bg-main)",
            boxShadow: "var(--shadow-raised)",
            textDecoration: "none",
            color: "var(--text-main)",
            fontSize: "13px",
            border: "1px solid var(--border-light)",
            transition: "all 0.2s ease",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "12px",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "inset 2px 2px 5px rgba(0,0,0,0.05)",
            }}
          >
            <img
              src="https://img.icons8.com/fluency-systems-filled/24/bc4749/android-os.png"
              alt=""
              style={{ width: "20px" }}
            />
          </div>
          <div>
            <div
              style={{
                fontWeight: 800,
                fontSize: "12px",
                color: "var(--primary)",
              }}
            >
              Mobile App
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "var(--text-muted)",
                fontWeight: 600,
              }}
            >
              Get the APK
            </div>
          </div>
        </a>
      </div>

      {/* User Footer */}
      <div
        style={{
          borderTop: "1px solid var(--border-dark)",
          paddingTop: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "14px",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              color: "var(--primary)",
              boxShadow: "var(--shadow-btn)",
              fontSize: "16px",
            }}
          >
            {session?.user?.name?.[0] || "A"}
          </div>
          <div style={{ flex: 1, overflow: "hidden" }}>
            <div
              style={{
                fontSize: "14px",
                fontWeight: 800,
                color: "var(--text-main)",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {session?.user?.name || "Admin User"}
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "var(--text-muted)",
                fontWeight: 600,
              }}
            >
              {session?.user?.role || "Operations"}
            </div>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          style={{
            width: "100%",
            background: "transparent",
            border: "1px solid var(--border-light)",
            color: "#ef4444",
            fontSize: "13px",
            padding: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            cursor: "pointer",
            borderRadius: "14px",
            boxShadow: "var(--shadow-btn)",
            fontWeight: 700,
            transition: "all 0.2s ease",
          }}
        >
          <img
            src="https://img.icons8.com/fluency-systems-filled/24/EF4444/logout-rounded-left.png"
            alt=""
            style={{ width: "18px" }}
          />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
