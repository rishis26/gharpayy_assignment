import { jwtVerify } from "jose";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || "gharpayy-secret-123",
);

export async function getAuthUser(req) {
  // 1. Try NextAuth Session (for Web)
  try {
    const session = await getServerSession(authOptions);
    if (session?.user) {
      return session.user;
    }
  } catch (e) {
    // Ignore session errors and try token
  }

  // 2. Try JWT from Authorization Header (for Mobile)
  const authHeader = req.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7);
    try {
      const { payload } = await jwtVerify(token, SECRET);
      return payload;
    } catch (err) {
      console.error("JWT verification failed:", err.message);
      return null;
    }
  }

  return null;
}
