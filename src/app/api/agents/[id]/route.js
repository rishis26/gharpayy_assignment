import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    db.delete("agents", id);
    return NextResponse.json({ success: true, message: "Agent deleted" });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}

export async function PATCH(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();
    const updated = db.update("agents", id, body);
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
