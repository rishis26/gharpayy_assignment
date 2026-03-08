import Card from "./Card";

export default function StatCard({ label, value, color, icon }) {
  return (
    <Card style={{ display: "flex", alignItems: "center", gap: "20px" }}>
      <div
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "16px",
          background: "var(--bg-main)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "var(--shadow-sunken)",
          border: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <img
          src={icon}
          alt=""
          style={{
            width: "28px",
            height: "28px",
            filter: "drop-shadow(1px 1px 1px rgba(255,255,255,0.8))",
          }}
        />
      </div>
      <div>
        <div
          style={{
            color: "var(--text-muted)",
            fontSize: "14px",
            fontWeight: 500,
            marginBottom: "4px",
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: "24px",
            fontWeight: 800,
            color: "var(--text-main)",
          }}
        >
          {value}
        </div>
      </div>
    </Card>
  );
}
