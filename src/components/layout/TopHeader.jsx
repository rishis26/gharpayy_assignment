"use client";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export default function TopHeader({ onMenuClick }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const getPageTitle = () => {
    const segment = pathname.split("/").pop();
    if (!segment || segment === "dashboard") return "Dashboard Overview";
    return segment.charAt(0).toUpperCase() + segment.slice(1);
  };

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 24px",
        marginBottom: "24px",
        borderRadius: "var(--radius-md)",
        background: "var(--bg-main)",
        boxShadow: "var(--shadow-raised)",
        border: "1px solid var(--border-light)",
        position: "sticky",
        top: 0,
        zIndex: 30,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {/* Hamburger Menu for Mobile */}
        <button
          onClick={onMenuClick}
          className="mobile-only"
          style={{
            display: "none",
            width: "44px",
            height: "44px",
            borderRadius: "12px",
            background: "var(--bg-main)",
            boxShadow: "var(--shadow-btn)",
            border: "1.5px solid var(--border-light)",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <img
            src="https://img.icons8.com/fluency-systems-filled/24/bc4749/menu--v1.png"
            alt="Menu"
            style={{ width: "24px" }}
          />
        </button>

        <style jsx>{`
          @media (max-width: 1024px) {
            button.mobile-only {
              display: flex !important;
            }
          }
        `}</style>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src="/logo.png"
            alt=""
            style={{ height: "20px", width: "auto" }}
          />
          <div>
            <h1
              style={{
                fontSize: "18px",
                fontWeight: 800,
                color: "var(--text-main)",
                margin: 0,
                letterSpacing: "-0.5px",
              }}
            >
              {getPageTitle()}
            </h1>
            <p
              className="mobile-hide"
              style={{
                fontSize: "11px",
                color: "var(--text-muted)",
                margin: "2px 0 0 0",
                fontWeight: 600,
              }}
            >
              Gharpayy Internal Operations Portal
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div className="mobile-hide" style={{ textAlign: "right" }}>
          <div
            style={{
              fontSize: "13px",
              fontWeight: 700,
              color: "var(--text-main)",
            }}
          >
            {session?.user?.name || "Admin User"}
          </div>
          <div
            style={{
              fontSize: "10px",
              color: "var(--primary)",
              fontWeight: 800,
            }}
          >
            Super Admin
          </div>
        </div>

        <div
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "12px",
            background: "var(--bg-main)",
            boxShadow: "var(--shadow-btn)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            border: "1.5px solid var(--border-light)",
          }}
        >
          <img
            src="https://img.icons8.com/fluency-systems-filled/48/6b705c/user-male-circle.png"
            alt="Profile"
            style={{ width: "24px" }}
          />
        </div>
      </div>
    </header>
  );
}
