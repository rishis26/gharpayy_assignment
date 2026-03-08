import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const AGENTS = [
  {
    _id: "a1",
    name: "Rahul Sharma",
    email: "rahul@gharpayy.com",
    avatar: "RS",
    active: true,
    role: "agent",
  },
  {
    _id: "a2",
    name: "Priya Nair",
    email: "priya@gharpayy.com",
    avatar: "PN",
    active: true,
    role: "agent",
  },
  {
    _id: "a3",
    name: "Arjun Mehta",
    email: "arjun@gharpayy.com",
    avatar: "AM",
    active: true,
    role: "agent",
  },
  {
    _id: "a4",
    name: "Sneha Rao",
    email: "sneha@gharpayy.com",
    avatar: "SR",
    active: true,
    role: "agent",
  },
  {
    _id: "admin",
    name: "Gharpayy Admin",
    email: "admin@gharpayy.com",
    avatar: "GA",
    active: true,
    role: "admin",
  },
];

const LEADS = [
  {
    name: "Aarav Singh",
    phone: "9876543210",
    source: "WhatsApp",
    stage: "new",
    agentId: "a1",
    lastActivity: new Date(Date.now() - 2 * 60 * 1000).toISOString(), // 2m ago (Active)
    createdAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    timeline: [
      {
        text: "Lead captured via WhatsApp",
        type: "system",
        createdAt: new Date().toISOString(),
      },
    ],
  },
  {
    name: "Meera Iyer",
    phone: "9123456789",
    source: "Website Form",
    stage: "new",
    agentId: "a2",
    lastActivity: new Date(Date.now() - 10 * 60 * 1000).toISOString(), // 10m ago (STALE - SLA breached)
    createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    timeline: [
      {
        text: "Lead captured via Website Form",
        type: "system",
        createdAt: new Date().toISOString(),
      },
    ],
  },
  {
    name: "Rohan Gupta",
    phone: "9888877777",
    source: "Phone Call",
    stage: "contacted",
    agentId: "a1",
    lastActivity: new Date().toISOString(),
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    timeline: [
      {
        text: "Lead captured via Phone Call",
        type: "system",
        createdAt: new Date().toISOString(),
      },
    ],
  },
  {
    name: "Divya Krishnan",
    phone: "9555544444",
    source: "Social Media",
    stage: "visit_scheduled",
    agentId: "a3",
    visitDetails: {
      property: "PG Koramangala - Premium",
      date: "2026-03-10",
      time: "11:00",
    },
    lastActivity: new Date().toISOString(),
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    timeline: [
      {
        text: "Visit scheduled for PG Koramangala",
        type: "visit",
        createdAt: new Date().toISOString(),
      },
    ],
  },
];

export async function GET() {
  db.write("agents", AGENTS);
  db.write("leads", LEADS);
  return NextResponse.json({
    success: true,
    message: "Professional demo data seeded",
  });
}
