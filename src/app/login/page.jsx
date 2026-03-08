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
          "radial-gradient(circle at top right, #f5ebe0, #e3d5c5, #d5c7b8)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative blurry backgrounds - using terracotta and olive for the warm theme */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          right: "-5%",
          width: "40%",
          height: "40%",
          background: "rgba(188, 71, 73, 0.1)",
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
          background: "rgba(107, 112, 92, 0.08)",
          filter: "blur(120px)",
          borderRadius: "50%",
        }}
      />

      <Card
        style={{
          width: "440px",
          textAlign: "center",
          padding: "54px 40px",
          background: "#f5ebe0",
          border: "1px solid rgba(255, 255, 255, 0.8)",
          boxShadow: "15px 15px 30px #d5c7b8, -15px -15px 30px #ffffff",
          borderRadius: "40px",
          zIndex: 10,
        }}
      >
        <div
          style={{
            marginBottom: "32px",
            display: "inline-flex",
            padding: "20px",
            borderRadius: "24px",
            background: "#f5ebe0",
            boxShadow: "10px 10px 20px #d5c7b8, -10px -10px 20px #ffffff",
          }}
        >
          <img
            src="https://gharpayy.com/img/logo/gharpayy_logo2.png"
            alt="Gharpayy Logo"
            style={{ width: "80px", height: "auto" }}
          />
        </div>

        <h1
          style={{
            fontFamily: "Plus Jakarta Sans",
            fontWeight: 800,
            fontSize: "28px",
            marginBottom: "12px",
            color: "#3d405b",
            letterSpacing: "-1.5px",
          }}
        >
          CRM Portal
        </h1>
        <p
          style={{
            color: "#6b705c",
            marginBottom: "44px",
            fontSize: "15px",
            fontWeight: 600,
          }}
        >
          Administrative Portal
        </p>

        <div style={{ textAlign: "left", marginBottom: "32px" }}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <div style={{ position: "relative" }}>
              <img
                src="https://img.icons8.com/fluency-systems-filled/24/6b705c/name.png"
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
                  borderRadius: "16px",
                  border: "none",
                  background: "#f5ebe0",
                  boxShadow:
                    "inset 4px 4px 8px #d5c7b8, inset -4px -4px 8px #ffffff",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#3d405b",
                  cursor: "not-allowed",
                }}
              />
            </div>
            <div style={{ position: "relative" }}>
              <img
                src="https://img.icons8.com/fluency-systems-filled/24/6b705c/lock.png"
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
                  borderRadius: "16px",
                  border: "none",
                  background: "#f5ebe0",
                  boxShadow:
                    "inset 4px 4px 8px #d5c7b8, inset -4px -4px 8px #ffffff",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#3d405b",
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
            height: "56px",
            borderRadius: "18px",
            fontSize: "16px",
            fontWeight: 800,
            background: "#f5ebe0",
            color: "#bc4749",
            boxShadow: "6px 6px 12px #d5c7b8, -6px -6px 12px #ffffff",
            border: "1px solid rgba(188, 71, 73, 0.1)",
          }}
        >
          Access Portal
        </Button>

        <div
          style={{
            marginTop: "32px",
            fontSize: "12px",
            color: "#6b705c",
            fontWeight: 600,
            lineHeight: 1.6,
          }}
        >
          Secure Gharpayy operational gateway. <br /> Tactile identity enabled.
        </div>
      </Card>
    </div>
  );
}
