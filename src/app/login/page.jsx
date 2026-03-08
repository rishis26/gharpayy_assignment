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
        background:
          "radial-gradient(circle at top right, #1e293b, #0f172a, #020617)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative blurry backgrounds */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          right: "-5%",
          width: "40%",
          height: "40%",
          background: "rgba(37, 99, 235, 0.15)",
          filter: "blur(120px)",
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "-5%",
          width: "40%",
          height: "40%",
          background: "rgba(139, 92, 246, 0.1)",
          filter: "blur(120px)",
          borderRadius: "50%",
        }}
      />

      <Card
        style={{
          width: "440px",
          textAlign: "center",
          padding: "54px 40px",
          background: "rgba(255, 255, 255, 1)",
          border: "none",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          borderRadius: "32px",
          zIndex: 10,
        }}
      >
        <div
          style={{
            marginBottom: "24px",
            display: "inline-flex",
            padding: "16px",
            borderRadius: "20px",
            background: "#f1f5f9",
          }}
        >
          <img
            src="https://img.icons8.com/fluency-systems-filled/48/2563EB/shield.png"
            alt=""
            style={{ width: "32px" }}
          />
        </div>

        <h1
          style={{
            fontFamily: "Plus Jakarta Sans",
            fontWeight: 800,
            fontSize: "36px",
            marginBottom: "12px",
            color: "#0f172a",
            letterSpacing: "-1px",
          }}
        >
          gharpayy <span style={{ color: "#2563eb" }}>CRM</span>
        </h1>
        <p
          style={{
            color: "#64748b",
            marginBottom: "44px",
            fontSize: "15px",
            fontWeight: 500,
          }}
        >
          Welcome to the Administrative Portal
        </p>

        <div style={{ textAlign: "left", marginBottom: "32px" }}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <div style={{ position: "relative" }}>
              <img
                src="https://img.icons8.com/fluency-systems-filled/24/94A3B8/name.png"
                alt=""
                style={{
                  position: "absolute",
                  top: "14px",
                  left: "16px",
                  width: "18px",
                }}
              />
              <input
                disabled
                value="admin@gharpayy.com"
                style={{
                  width: "100%",
                  padding: "14px 14px 14px 44px",
                  borderRadius: "14px",
                  border: "1.5px solid #f1f5f9",
                  background: "#f8fafc",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#1e293b",
                  cursor: "not-allowed",
                }}
              />
            </div>
            <div style={{ position: "relative" }}>
              <img
                src="https://img.icons8.com/fluency-systems-filled/24/94A3B8/lock.png"
                alt=""
                style={{
                  position: "absolute",
                  top: "14px",
                  left: "16px",
                  width: "18px",
                }}
              />
              <input
                type="password"
                disabled
                value="••••••••"
                style={{
                  width: "100%",
                  padding: "14px 14px 14px 44px",
                  borderRadius: "14px",
                  border: "1.5px solid #f1f5f9",
                  background: "#f8fafc",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#1e293b",
                  cursor: "not-allowed",
                }}
              />
            </div>
          </div>
        </div>

        <Button
          onClick={() =>
            signIn("credentials", {
              email: "admin@gharpayy.com",
              password: "gharpayy123",
              callbackUrl: "/dashboard",
            })
          }
          style={{
            width: "100%",
            height: "54px",
            borderRadius: "16px",
            fontSize: "16px",
            fontWeight: 800,
            background: "#2563eb",
            color: "white",
            boxShadow: "0 10px 15px -3px rgba(37, 99, 235, 0.3)",
          }}
        >
          Login Securely
        </Button>

        <div
          style={{
            marginTop: "32px",
            fontSize: "12px",
            color: "#94a3b8",
            fontWeight: 500,
            lineHeight: 1.6,
          }}
        >
          Protecting Gharpayy's operational data with <br /> enterprise-grade
          security.
        </div>
      </Card>
    </div>
  );
}
