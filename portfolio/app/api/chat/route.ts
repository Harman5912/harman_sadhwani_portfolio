import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEFAULT_MODEL = "gemini-3.6-flash";
const MAX_HISTORY = 12;
const MAX_TEXT = 2000;

const SYSTEM_PROMPT = `You are the Crown Pierce assistant — the friendly digital concierge for Harman Sadhwani's portfolio.
Answer ONLY about:
- Harman Sadhwani (AI/ML Full Stack Developer, Founder & Core Developer of Crown Pierce; also researcher, hackathon enthusiast, open source developer)
- His projects: Keys.AI (AI desktop assistant unifying OpenAI/Anthropic/Gemini/OpenRouter providers, releases at github.com/Harman5912/KEYS.AI), ReviewBOT (AI code review platform, live at reviewbot-web.onrender.com), True Blade (premium Crown Pierce product, coming soon)
- Crown Pierce (independent software studio — intelligent software, AI apps, developer tools, automation, premium design; crown-pierce-co.netlify.app)
- His achievements: Exuberance'26 Tech Expo (1st Runner-Up), ICHIS-2026 (2nd Runner-Up + poster presentation), Internal SIH 2025, national conference paper on women's safety, Hackathon 2.0, Hackofiesta 6.0 (Microsoft & Deloitte), and 8+ certificates
- Contact: sadhwaniharman@gmail.com, LinkedIn, Instagram, WhatsApp (+91 83189 52798)
Be warm, concise (2–4 sentences), and helpful. If asked something unrelated, politely steer the conversation back to Harman and Crown Pierce.`;

export async function GET() {
  const configured = Boolean(process.env.GEMINI_API_KEY);
  return NextResponse.json({
    configured,
    model: process.env.GEMINI_MODEL || DEFAULT_MODEL,
  });
}

interface ChatMessage {
  role: "user" | "bot";
  text: string;
}

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "no_key", message: "GEMINI_API_KEY is not configured on the server." },
      { status: 503 }
    );
  }

  let body: { messages?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "bad_request", message: "Invalid JSON body." }, { status: 400 });
  }

  const messages = Array.isArray(body?.messages) ? (body.messages as ChatMessage[]) : [];
  const contents = messages
    .slice(-MAX_HISTORY)
    .filter((m) => m && typeof m.text === "string" && m.text.trim().length > 0)
    .map((m) => ({
      role: m.role === "bot" ? "model" : "user",
      parts: [{ text: m.text.slice(0, MAX_TEXT) }],
    }));

  if (contents.length === 0) {
    return NextResponse.json({ error: "empty", message: "No messages provided." }, { status: 400 });
  }

  const model = process.env.GEMINI_MODEL || DEFAULT_MODEL;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents,
          generationConfig: { temperature: 0.7, maxOutputTokens: 700 },
        }),
      }
    );

    const data = (await res.json().catch(() => null)) as {
      error?: { message?: string };
      candidates?: { content?: { parts?: { text?: string }[] } }[];
    } | null;

    if (!res.ok) {
      const message = data?.error?.message ?? `Gemini API error (${res.status})`;
      return NextResponse.json({ error: "gemini_error", message }, { status: 502 });
    }

    const reply = data?.candidates?.[0]?.content?.parts
      ?.map((p) => p.text ?? "")
      .join("")
      .trim();

    if (!reply) {
      return NextResponse.json({ error: "empty_reply", message: "The model returned no text." }, { status: 502 });
    }

    return NextResponse.json({ reply });
  } catch (err) {
    return NextResponse.json(
      { error: "network", message: err instanceof Error ? err.message : "Network error." },
      { status: 502 }
    );
  }
}
