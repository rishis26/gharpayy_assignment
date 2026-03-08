"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function Login() {
  const [email, setEmail] = useState("admin");
  const [password, setPassword] = useState("gharpayy123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e?.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid credentials. Please try again.");
      setLoading(false);
    } else {
      window.location.href = "/dashboard";
    }
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(circle at top right, #f5ebe0, #e3d5c5, #d5c7b8)",
        position: "relative",
        padding: "20px",
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
          width: "100%",
          maxWidth: "440px",
          textAlign: "center",
          padding: "48px 32px",
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
            padding: "16px",
            borderRadius: "22px",
            background: "#f5ebe0",
            boxShadow: "8px 8px 16px #d5c7b8, -8px -8px 16px #ffffff",
          }}
        >
          <img
            src="/logo.png"
            alt="Gharpayy Logo"
            style={{ width: "64px", height: "auto" }}
          />
        </div>

        <h1
          style={{
            fontFamily: "Plus Jakarta Sans",
            fontWeight: 800,
            fontSize: "26px",
            marginBottom: "8px",
            color: "#3d405b",
            letterSpacing: "-1px",
          }}
        >
          CRM Portal
        </h1>
        <p
          style={{
            color: "#6b705c",
            marginBottom: "32px",
            fontSize: "14px",
            fontWeight: 600,
          }}
        >
          Administrative Access Gateway
        </p>

        <form
          onSubmit={handleLogin}
          style={{ textAlign: "left", marginBottom: "24px" }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
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
                type="text"
                placeholder="Username or Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  outline: "none",
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
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                  outline: "none",
                }}
              />
            </div>
          </div>

          {error && (
            <div
              style={{
                marginTop: "16px",
                color: "#bc4749",
                fontSize: "12px",
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}

          <Button
            type="submit"
            loading={loading}
            style={{
              width: "100%",
              height: "56px",
              marginTop: "32px",
              borderRadius: "18px",
              fontSize: "16px",
              fontWeight: 800,
              background: "#f5ebe0",
              color: "#bc4749",
              boxShadow: "6px 6px 12px #d5c7b8, -6px -6px 12px #ffffff",
              border: "1px solid rgba(188, 71, 73, 0.1)",
              cursor: "pointer",
            }}
          >
            Access Portal
          </Button>
        </form>

        {/* Hint Box */}
        <div
          style={{
            padding: "12px",
            borderRadius: "12px",
            background: "rgba(188, 71, 73, 0.05)",
            border: "1px dashed rgba(188, 71, 73, 0.3)",
            marginBottom: "24px",
            textAlign: "left",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
              marginBottom: "4px",
            }}
          >
            <img
              src="https://img.icons8.com/fluency-systems-filled/24/bc4749/info.png"
              alt=""
              style={{ width: "14px" }}
            />
            <span
              style={{
                fontSize: "11px",
                fontWeight: 800,
                color: "#bc4749",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Quick Hint
            </span>
          </div>
          <p
            style={{
              fontSize: "11px",
              color: "#6b705c",
              margin: 0,
              fontWeight: 600,
            }}
          >
            Use <span style={{ color: "#bc4749", fontWeight: 800 }}>admin</span>{" "}
            as username and any password to enter.
          </p>
        </div>

        <div
          style={{
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
