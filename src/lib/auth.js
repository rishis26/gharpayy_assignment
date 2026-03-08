import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "./db";

export const authOptions = {
  providers: [CredentialsProvider({
    name: "credentials",
    credentials: { email: {}, password: {} },
    async authorize(creds) {
      const agents = db.read('agents');
      const agent = agents.find(a => a.email.toLowerCase() === creds.email.toLowerCase());
      if (!agent || !(await bcrypt.compare(creds.password, agent.password))) return null;
      return { id: agent._id, name: agent.name, email: agent.email, role: agent.role, avatar: agent.avatar };
    },
  })],
  callbacks: {
    async jwt({ token, user }) { if (user) { token.id = user.id; token.role = user.role; token.avatar = user.avatar; } return token; },
    async session({ session, token }) { if (token) { session.user.id = token.id; session.user.role = token.role; session.user.avatar = token.avatar; } return session; },
  },
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  secret: "gharpayy-crm-secret-2024",
};
