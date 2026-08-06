"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "bot";
  text: string;
}

interface ApiStatus {
  configured: boolean;
  model: string;
}

/* ─────────────────────────────────────────────────────────────
   ASSISTANT BACKEND — Google Gemini
   The widget talks to the server route POST /api/chat, which
   calls the Gemini API with your private GEMINI_API_KEY
   (never exposed to the browser). To enable live answers:
     1. Get a free key:  https://aistudio.google.com/app/apikey
     2. In portfolio/, create .env.local with:
          GEMINI_API_KEY=your_key_here
     3. Restart `npm run dev` / `npm run start`.
   Until a key is present, the widget gracefully falls back to
   the local knowledge base below so it still answers.
   ───────────────────────────────────────────────────────────── */

async function askAssistant(history: Message[]): Promise<string> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: history.slice(-12) }),
  });
  const data = (await res.json().catch(() => null)) as { error?: string; message?: string; reply?: string } | null;

  if (!res.ok) {
    if (data?.error === "no_key") {
      // No key configured on the server — answer from the local knowledge base.
      return localReply(history[history.length - 1]?.text ?? "");
    }
    throw new Error(data?.message ?? "Assistant API error");
  }
  if (!data?.reply) throw new Error("Empty reply from the assistant");
  return data.reply;
}

/* ── Local knowledge base (offline fallback until a Gemini key is added) ── */
function localReply(text: string): string {
  const q = text.toLowerCase();
  if (/(keys|keys\.ai|projects|project)/.test(q))
    return "Keys.AI is Harman's flagship AI desktop assistant — one elegant workspace for OpenAI, Anthropic, Gemini, OpenRouter and more. You can browse releases at github.com/Harman5912/KEYS.AI, or scroll to the Projects section to see it in motion.";
  if (/(reviewbot|review bot|review)/.test(q))
    return "ReviewBOT is an AI-powered code review platform that gives intelligent feedback, spots issues and enforces best practices. It's live at reviewbot-web.onrender.com — check it out!";
  if (/(true blade|blade)/.test(q))
    return "True Blade is a premium Crown Pierce product — a cinematic, futuristic software showcase. It's still in the forge, so it ships with a 'Coming Soon' badge on the portfolio.";
  if (/(crown pierce|studio|company)/.test(q))
    return "Crown Pierce is Harman's independent software studio — intelligent software, AI apps, developer tools and automation, built with premium design. Visit crown-pierce-co.netlify.app.";
  if (/(resume|hire|job|cv|download)/.test(q))
    return "You can download Harman's resume from the Resume section on this page — or tap the 'Download Resume' button in the hero. He's open to internships, collaborations and freelance work.";
  if (/(contact|email|reach|talk|mail)/.test(q))
    return "The fastest ways to reach Harman: sadhwaniharman@gmail.com, LinkedIn, Instagram or WhatsApp — all linked in the Contact section below.";
  if (/(achievement|award|hackathon|conference|medal|trophy|certificate)/.test(q))
    return "Harman's trophy case includes Exuberance'26 (1st Runner-Up), ICHIS-2026 (2nd Runner-Up + poster presentation), internal SIH 2025, a national conference paper, and hackathons like Hackofiesta 6.0 (Microsoft & Deloitte).";
  if (/(skill|stack|tech|language|know)/.test(q))
    return "His focus areas: AI/ML, full-stack development, software architecture, UI/UX engineering, developer tools and automation — powered by Python, C++, JavaScript, React, Node.js and more.";
  if (/(hi|hello|hey|namaste)/.test(q))
    return "Namaste! 👋 I can tell you about Harman's projects, achievements, resume, or how to reach him. What would you like to know?";
  return "Great question! I'm answering from the offline knowledge base right now — add a Gemini API key to .env.local to unlock full AI answers. Meanwhile, try asking about Keys.AI, ReviewBOT, True Blade, Crown Pierce, his achievements, or how to contact him.";
}

const SUGGESTIONS = [
  "Show me your projects",
  "About Crown Pierce",
  "How can I contact you?",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [apiStatus, setApiStatus] = useState<ApiStatus | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open]);

  // Ask the server once (on first open) whether Gemini is configured.
  useEffect(() => {
    if (!open || apiStatus) return;
    fetch("/api/chat")
      .then((r) => r.json())
      .then((d) => setApiStatus({ configured: Boolean(d?.configured), model: d?.model ?? "" }))
      .catch(() => setApiStatus({ configured: false, model: "" }));
  }, [open, apiStatus]);

  const send = async (raw?: string) => {
    const text = (raw ?? input).trim();
    if (!text || typing) return;
    setInput("");
    const history: Message[] = [...messages, { role: "user", text }];
    setMessages(history);
    setTyping(true);
    try {
      const reply = await askAssistant(history);
      setMessages((m) => [...m, { role: "bot", text: reply }]);
    } catch {
      // Last-resort fallback so the conversation never dead-ends.
      setMessages((m) => [...m, { role: "bot", text: localReply(text) }]);
    } finally {
      setTyping(false);
    }
  };

  const live = apiStatus?.configured ?? false;

  return (
    <>
      {/* Launcher */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close assistant" : "Open assistant"}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        data-fullpage-ignore
        className="fixed bottom-6 right-6 z-[70] flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,#d4af37,#b8860b)] text-white shadow-[0_10px_36px_rgba(212,175,55,0.5)]"
      >
        <span className="animate-pulse-glow absolute inset-0 rounded-full" aria-hidden="true" />
        <AnimatePresence mode="wait" initial={false}>
          <motion.svg
            key={open ? "close" : "chat"}
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.25 }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="relative z-10 h-6 w-6"
            aria-hidden="true"
          >
            {open ? (
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            ) : (
              <path
                d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.6 8.6 0 0 1-3.5-.7L3 21l1.8-5.5A8.4 8.4 0 1 1 21 11.5Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </motion.svg>
        </AnimatePresence>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.94 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="fixed bottom-24 right-4 z-[70] flex h-[540px] w-[min(92vw,380px)] flex-col overflow-hidden rounded-2xl border border-gold/45 bg-white/90 shadow-[0_30px_90px_rgba(26,26,26,0.25)] backdrop-blur-xl md:right-6"
            role="dialog"
            aria-label="Crown Pierce assistant"
            data-fullpage-ignore
          >
            {/* Header */}
            <div
              className="relative flex items-center gap-3 px-5 py-4 text-white"
              style={{ background: "linear-gradient(135deg,#d4af37,#a97a0f)" }}
            >
              <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                <span className="text-base">👑</span>
                <span
                  className={`absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white ${
                    live ? "bg-emerald-400" : "bg-amber-300"
                  }`}
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold tracking-wide">Crown Pierce Assistant</p>
                <p className="text-[11px] text-white/75">
                  {live
                    ? `Powered by Gemini ${apiStatus?.model ?? ""}`
                    : "Local demo · add a Gemini API key"}
                </p>
              </div>
              <span className="rounded-full border border-white/30 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-white/85">
                {live ? "Gemini AI" : "Demo"}
              </span>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.length === 0 && !typing && (
                <>
                  <BotBubble text="Namaste! 👋 I'm Harman's digital assistant. Ask me about his projects, achievements, resume, or how to reach him." />
                  <div className="flex flex-wrap gap-2 pt-1">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => send(s)}
                        className="rounded-full border border-gold/45 bg-gold/10 px-3.5 py-1.5 text-[12px] font-medium text-gold-deep transition-all hover:bg-gold/20"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </>
              )}
              {messages.map((m, i) =>
                m.role === "bot" ? (
                  <BotBubble key={i} text={m.text} />
                ) : (
                  <div key={i} className="flex justify-end">
                    <div
                      className="max-w-[82%] rounded-2xl rounded-br-md px-4 py-2.5 text-[13px] leading-relaxed text-white shadow-sm"
                      style={{ background: "linear-gradient(135deg,#d4af37,#b8860b)" }}
                    >
                      {m.text}
                    </div>
                  </div>
                )
              )}
              {typing && (
                <div className="flex w-fit items-center gap-1.5 rounded-2xl rounded-bl-md border border-gold/30 bg-white px-4 py-3 shadow-sm">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                      className="h-1.5 w-1.5 rounded-full bg-gold-deep"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex items-center gap-2 border-t border-gold/25 bg-white/80 px-3 py-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Harman…"
                className="flex-1 rounded-full border border-gold/30 bg-off-white px-4 py-2.5 text-[13px] text-ink placeholder:text-ink/40 focus:border-gold focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Send message"
                disabled={!input.trim() || typing}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#d4af37,#b8860b)] text-white shadow-[0_6px_18px_rgba(212,175,55,0.4)] transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                  <path d="M3.4 20.4 21.85 12 3.4 3.6l.01 6.53L15 12 3.41 13.87l-.01 6.53Z" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function BotBubble({ text }: { text: string }) {
  return (
    <div className="flex justify-start">
      <div className="max-w-[85%] rounded-2xl rounded-bl-md border border-gold/30 bg-white px-4 py-2.5 text-[13px] leading-relaxed text-ink/80 shadow-sm">
        {text}
      </div>
    </div>
  );
}
