"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Send, X } from "lucide-react";
import Image from "next/image";

type Message = { id: string; sender: "user" | "bot"; text: string; time: number };

const STORAGE_KEY = "chatbot.messages.v1";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // load + persist chat history
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Message[];
      if (Array.isArray(parsed)) setMessages(parsed);
    } catch {
      // ignore corrupted local storage
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // ignore write failures (private mode etc)
    }
  }, [messages]);

  // smooth scroll behavior ---
  useEffect(() => {
    // scroll to bottom on any message change (safe default)
    scrollAreaRef.current?.scrollTo({
      top: scrollAreaRef.current.scrollHeight,
      behavior: "smooth",
    });

    // if the newest message is from the bot, also scroll it into view at the top (what you asked)
    // (we do this after a tiny tick so layout is settled)
    const t = window.setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);

    return () => window.clearTimeout(t);
  }, [messages, loading]);

  const canSend = useMemo(() => text.trim().length > 0 && !loading, [text, loading]);

  async function sendMessage(e?: React.FormEvent) {
    e?.preventDefault();

    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setError(null);

    const userMsg: Message = {
      id: `${Date.now()}-u`,
      sender: "user",
      text: trimmed,
      time: Date.now(),
    };

    setMessages((m) => [...m, userMsg]);
    setText("");
    setLoading(true);

    try {
      // IMPORTANT: send the already-trimmed value (not the cleared state)
      const res = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      const data = await res.json();

      const botMsg: Message = {
        id: `${Date.now()}-b`,
        sender: "bot",
        text:
          typeof data?.reply === "string" ? data.reply : "Sorry — I couldn't generate a response.",
        time: Date.now(),
      };

      setMessages((m) => [...m, botMsg]);
    } catch (err: any) {
      setError(err?.message || "Network error — please try again.");
      const failMsg: Message = {
        id: `${Date.now()}-b`,
        sender: "bot",
        text: "I'm having trouble reaching the server right now. Please try again in a moment.",
        time: Date.now(),
      };
      setMessages((m) => [...m, failMsg]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* backdrop */}
      <div
        aria-hidden={!open}
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 transition-opacity duration-200 ${
          open
            ? "pointer-events-auto opacity-100 bg-black/20 backdrop-blur-sm md:backdrop-blur-none"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* widget */}
      <div className="fixed bottom-6 right-6 z-50">
        <div
          className={`flex flex-col transition-all duration-200 ${
            open ? "w-[calc(100%-2rem)] sm:w-[22rem] md:w-[26rem]" : "w-14"
          }`}
          aria-live="polite"
        >
          {/* launcher / header */}
          <div
            className={`flex items-center justify-between rounded-full shadow-lg p-2 space-x-2 ${
              open ? "bg-white dark:bg-gray-900 border dark:border-gray-700" : "bg-indigo-600"
            }`}
          >
            <button
              aria-label={open ? "Close chat" : "Open chat"}
              onClick={() => setOpen((s) => !s)}
              className={`flex items-center gap-2 px-3 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                open ? "bg-transparent text-gray-900 dark:text-gray-100" : "text-white"
              }`}
              title={open ? "Close" : "Chat"}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {open && <span className="font-medium">Virtual Parag</span>}
            </button>

            <button
              aria-label="Close"
              onClick={() => setOpen(false)}
              className={`p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none ${
                open ? "" : "hidden"
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* panel */}
          {open && (
            <div className="mt-3">
              {/* top strip */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-gray-900 border dark:border-gray-700">
                <Image
                  width={120}
                  height={120}
                  src="/profile.jpg"
                  alt="Virtual Parag"
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-200 dark:ring-indigo-900"
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    Virtual Parag
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Powered by AWS (Lambda, API Gateway) + Nova
                  </div>
                </div>
              </div>

              {/* messages */}
              <div
                ref={scrollAreaRef}
                className="mt-3 flex flex-col gap-3 max-h-[60vh] overflow-auto p-3 rounded-lg bg-white dark:bg-gray-900 border dark:border-gray-700 shadow-sm"
              >
                {messages.length === 0 && (
                  <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                    Say hi — I am virtual Parag ready to answer questions about me.
                  </div>
                )}

                {messages.map((m, idx) => {
                  const isLast = idx === messages.length - 1;
                  const isBot = m.sender === "bot";

                  return (
                    <div
                      key={m.id}
                      ref={isLast ? lastMessageRef : null}
                      className={`flex ${isBot ? "justify-start" : "justify-end"}`}
                    >
                      {isBot && (
                        <Image
                          width={120}
                          height={120}
                          src="/profile.jpg"
                          alt="Virtual Parag"
                          className="mr-2 w-8 h-8 rounded-full object-cover flex-shrink-0"
                          referrerPolicy="no-referrer"
                        />
                      )}

                      <div
                        className={`px-3 py-2 rounded-lg max-w-[84%] break-words text-sm leading-relaxed ${
                          isBot
                            ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            : "bg-indigo-600 text-white"
                        }`}
                        role="article"
                        aria-label={`${m.sender} message`}
                      >
                        {m.text}
                      </div>
                    </div>
                  );
                })}

                {/* loading row (bot is "typing") */}
                {loading && (
                  <div className="flex justify-start items-center gap-2">
                    <Image
                      width={120}
                      height={120}
                      src="/profile.jpg"
                      alt="Virtual Parag"
                      className="w-8 h-8 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                      <div className="flex gap-1 items-center" aria-label="Bot is typing">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500 animate-[bounce_1s_infinite]"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500 animate-[bounce_1s_0.15s_infinite]"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500 animate-[bounce_1s_0.3s_infinite]"></span>
                      </div>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-md p-2">
                    {error}
                  </div>
                )}
              </div>

              {/* composer */}
              <form onSubmit={sendMessage} className="mt-2 flex gap-2 items-center">
                <input
                  aria-label="Type a message"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="Ask anything (architecture, career, AWS, etc.)…"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) sendMessage(e as any);
                  }}
                />
                <button
                  type="submit"
                  aria-label="Send message"
                  disabled={!canSend}
                  className="p-2 rounded-md bg-indigo-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Send"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
