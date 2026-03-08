import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        background: "#f8fafc",
        padding: "20px",
      }}
    >
      <Card
        style={{
          maxWidth: "480px",
          width: "100%",
          textAlign: "center",
          padding: "60px 40px",
        }}
      >
        <div style={{ marginBottom: "32px" }}>
          <img
            src="https://img.icons8.com/fluency-systems-filled/96/3B82F6/search-property.png"
            alt="Not Found"
            style={{ width: "80px", height: "80px", margin: "0 auto" }}
          />
        </div>

        <h1
          style={{
            fontSize: "72px",
            fontWeight: 800,
            color: "#0F172A",
            marginBottom: "8px",
            letterSpacing: "-2px",
          }}
        >
          404
        </h1>
        <h2
          style={{
            fontSize: "20px",
            fontWeight: 700,
            color: "#1E293B",
            marginBottom: "16px",
          }}
        >
          Page Not Found
        </h2>

        <p
          style={{
            color: "#64748B",
            fontSize: "15px",
            lineHeight: "1.6",
            marginBottom: "40px",
          }}
        >
          The property or page you are looking for doesn't exist or has been
          moved to a different location.
        </p>

        <Link href="/dashboard" style={{ textDecoration: "none" }}>
          <Button
            style={{ width: "100%", height: "48px" }}
            icon="https://img.icons8.com/fluency-systems-filled/24/FFFFFF/home.png"
          >
            Back to Dashboard
          </Button>
        </Link>

        <div style={{ marginTop: "24px" }}>
          <Link
            href="/leads"
            style={{
              color: "#3b82f6",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            View Recent Leads
          </Link>
        </div>
      </Card>
    </div>
  );
}
