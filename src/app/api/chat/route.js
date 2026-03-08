import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req) {
  try {
    const { message } = await req.json();
    const apiKey = process.env.GROQ_API;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Groq API key not configured" },
        { status: 500 },
      );
    }

    // Get current CRM state for context
    const leads = db.read("leads");
    const agents = db.read("agents");

    const context = {
      total_leads: leads.length,
      stages: leads.reduce((acc, lead) => {
        acc[lead.stage] = (acc[lead.stage] || 0) + 1;
        return acc;
      }, {}),
      recent_leads: leads.slice(-5).map((l) => ({
        name: l.name,
        stage: l.stage,
        agent: agents.find((a) => a._id === l.agentId)?.name,
      })),
      agents_performance: agents.map((a) => ({
        name: a.name,
        performance: a.performance,
      })),
    };

    const systemPrompt = `
      You are the Gharpayy CRM AI Assistant. You have access to the current CRM data.
      Context: ${JSON.stringify(context)}
      
      Guidelines:
      1. Be professional, concise, and helpful.
      2. Answer questions about lead status, agent performance, and general CRM metrics.
      3. Do not use emojis.
      4. If you don't know the answer, say "I don't have that information in my database."
    `;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: message },
          ],
          temperature: 0.7,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Groq API Error:", data);
      const errorMsg =
        data.error?.message ||
        "I'm having trouble connecting to my brain right now.";
      return NextResponse.json({ reply: errorMsg });
    }

    if (!data.choices?.[0]?.message?.content) {
      console.error("Unexpected Groq Response:", data);
      return NextResponse.json({
        reply:
          "I received an empty response. Let me try that again if you ask once more.",
      });
    }

    return NextResponse.json({ reply: data.choices[0].message.content });
  } catch (error) {
    console.error("Chat Error:", error);
    return NextResponse.json(
      {
        reply:
          "I'm experiencing a system hiccup. Please try asking again in a moment.",
      },
      { status: 500 },
    );
  }
}
