import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { SignJWT } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || "gharpayy-secret-123",
);

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 },
      );
    }

    const emailOrUser = email.toLowerCase();
    const agents = db.read("agents");
    const agent = agents.find(
      (a) =>
        a.email.toLowerCase() === emailOrUser ||
        (emailOrUser === "admin" && a.role.toLowerCase() === "admin"),
    );

    // Simplification for assignment/testing: accept any password for valid agent
    if (agent) {
      // Create a JWT for mobile
      const token = await new SignJWT({
        id: agent._id,
        name: agent.name,
        role: agent.role,
        email: agent.email,
      })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("30d") // Long session for mobile
        .sign(SECRET);

      return NextResponse.json({
        success: true,
        token,
        user: {
          id: agent._id,
          name: agent.name,
          role: agent.role,
          email: agent.email,
          avatar: agent.avatar,
        },
      });
    }

    return NextResponse.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
