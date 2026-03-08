import { STAGES } from "@/lib/constants";

export default function Badge({ children, type = "new", style = {} }) {
  const stage = STAGES.find((s) => s.id === type) || STAGES[0];

  return (
    <span
      className={`badge badge-${type}`}
      style={{
        fontSize: "10px",
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "6px 12px",
        borderRadius: "10px",
        background: "#e0e5ec",
        boxShadow: "inset 2px 2px 5px #b8b9be, inset -2px -2px 5px #ffffff",
        fontWeight: "800",
        color: stage.color,
        ...style,
      }}
    >
      <img
        src={`https://img.icons8.com/fluency-systems-filled/14/${stage.color.replace("#", "").toUpperCase()}/${stage.icon}.png`}
        alt=""
        style={{ width: "12px", height: "12px" }}
      />
      {children}
    </span>
  );
}
