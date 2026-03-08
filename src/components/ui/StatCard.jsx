import Card from "./Card";

export default function StatCard({ label, value, color, icon }) {
  return (
    <Card style={{ display: "flex", alignItems: "center", gap: "20px" }}>
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "12px",
          background: `${color}15`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={icon} alt="" style={{ width: "24px", height: "24px" }} />
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
