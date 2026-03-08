import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const agents = db.read("agents");
    return NextResponse.json({ success: true, data: agents });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, avatar, role } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: "Name and Email are required" },
        { status: 400 },
      );
    }

    const newAgent = {
      name,
      email: email.toLowerCase(),
      avatar:
        avatar ||
        name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase(),
      role: role || "agent",
      active: true,
      performance: 100,
    };

    const savedAgent = db.insert("agents", newAgent);
    return NextResponse.json(
      { success: true, data: savedAgent },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
