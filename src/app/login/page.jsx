"use client";
import { signIn } from "next-auth/react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function Login() {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        background: "#0F172A",
      }}
    >
      <Card style={{ width: "400px", textAlign: "center", padding: "48px" }}>
        <h1
          style={{
            fontFamily: "Plus Jakarta Sans",
            fontWeight: 800,
            fontSize: "32px",
            marginBottom: "8px",
          }}
        >
          gharpayy <span style={{ color: "#3b82f6" }}>CRM</span>
        </h1>
        <p
          style={{
            color: "var(--text-muted)",
            marginBottom: "32px",
            fontSize: "14px",
          }}
        >
          Administrative Portal
        </p>

        <Button
          onClick={() =>
            signIn("credentials", {
              email: "admin@gharpayy.com",
              password: "gharpayy123",
              callbackUrl: "/dashboard",
            })
          }
          style={{ width: "100%", height: "48px" }}
          icon="https://img.icons8.com/fluency-systems-filled/24/FFFFFF/door-opened.png"
        >
          Enter Dashboard
        </Button>

        <div
          style={{
            marginTop: "24px",
            fontSize: "12px",
            color: "var(--text-muted)",
          }}
        >
          Secure environment for Gharpayy leads and visits management.
        </div>
      </Card>
    </div>
  );
}
