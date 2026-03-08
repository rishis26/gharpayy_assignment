/**
 * Shared configuration for Mobile and Web environments
 */
export const APP_CONFIG = {
  // Use the Vercel URL in production, fallback to localhost
  API_BASE_URL:
    process.env.NEXT_PUBLIC_API_URL || "https://gharpayy-crm-three.vercel.app",

  // Endpoints
  ENDPOINTS: {
    LOGIN: "/api/auth/login",
    LEADS: "/api/leads",
    AGENTS: "/api/agents",
    ANALYTICS: "/api/analytics",
    CHAT: "/api/chat",
  },
};
