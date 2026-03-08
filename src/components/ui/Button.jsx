export default function Button({
  children,
  onClick,
  variant = "primary",
  style = {},
  icon = null,
  disabled = false,
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        ...style,
      }}
    >
      {icon && (
        <img src={icon} alt="" style={{ width: "18px", height: "18px" }} />
      )}
      {children}
    </button>
  );
}
