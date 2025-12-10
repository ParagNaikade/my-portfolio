"use client";

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Send, X } from "lucide-react";
import Image from "next/image";
import ChatLauncher from "./ChatLauncher";

type Message = { id: string; sender: "user" | "bot"; text: string; time: number };

const STORAGE_KEY = "chatbot.messages.v4";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  // ---------- responsive (mobile detection) ----------
  const isMobile = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(max-width: 640px)")?.matches ?? false;
  }, []);

  const [isMobileNow, setIsMobileNow] = useState(isMobile);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(max-width: 640px)");
    const onChange = () => setIsMobileNow(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  // ---------- lock page scroll on mobile when open ----------
  useEffect(() => {
    if (!open || !isMobileNow) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open, isMobileNow]);

  // ---------- history (localStorage) ----------
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Message[];
      if (Array.isArray(parsed)) setMessages(parsed);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // ignore (private mode / quota)
    }
  }, [messages]);

  // ---------- auto scroll when new messages arrive ----------
  useLayoutEffect(() => {
    if (!open) return;
    const el = scrollAreaRef.current;
    if (!el) return;

    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    const t = window.setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);

    return () => window.clearTimeout(t);
  }, [messages, loading, open]);

  // ---------- tiny markdown (no deps) ----------
  const escape = (s: string) =>
    s
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");

  function renderMarkdown(src: string) {
    // Very small feature set: paragraphs, bullet lists, **bold**, *italic*, `code`, [link](https://...)
    const blocks = src.split("\n\n");

    return (
      <>
        {blocks.map((b, i) => {
          const block = b.trimEnd();

          // fenced code: ``` ... ```
          if (block.startsWith("```")) {
            const inner = stripFences(block);
            return (
              <pre
                key={i}
                className="rounded-xl border border-white/30 dark:border-white/10 bg-black/70 dark:bg-black/80 px-3 py-2 text-xs leading-relaxed overflow-x-auto"
              >
                <code className="font-mono text-white">{inner}</code>
              </pre>
            );
          }

          // bullet list
          if (isBulletBlock(block)) {
            return (
              <ul key={i} className="ml-3 space-y-1 list-disc">
                {block.split("\n").map((line, j) => (
                  <li key={j} className="marker:text-indigo-300 dark:marker:text-indigo-200">
                    {renderInline(line.replace(/^\s*[-*]\s+/, ""))}
                  </li>
                ))}
              </ul>
            );
          }

          // paragraph
          return (
            <p key={i} className="leading-relaxed">
              {renderInline(block)}
            </p>
          );
        })}
      </>
    );
  }

  function stripFences(block: string) {
    let inner = block;
    if (inner.startsWith("```")) {
      inner = inner.slice(3);
      const firstNewline = inner.indexOf("\n");
      if (firstNewline >= 0) inner = inner.slice(firstNewline + 1);
    }
    if (inner.endsWith("```")) inner = inner.slice(0, -3);
    return inner.trimEnd();
  }

  function isBulletBlock(block: string) {
    const lines = block
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    if (lines.length === 0) return false;
    return lines.every((l) => l.startsWith("- ") || l.startsWith("* "));
  }

  function renderInline(raw: string) {
    const safe = escape(raw);

    // link parsing without complex regex:
    const nodes: React.ReactNode[] = [];
    let i = 0;

    while (i < safe.length) {
      const start = safe.indexOf("[", i);
      if (start === -1) {
        nodes.push(renderStyles(safe.slice(i)));
        break;
      }

      const mid = safe.indexOf("](", start + 1);
      if (mid === -1) {
        nodes.push(renderStyles(safe.slice(i)));
        break;
      }

      const end = safe.indexOf(")", mid + 2);
      if (end === -1) {
        nodes.push(renderStyles(safe.slice(i)));
        break;
      }

      if (start > i) nodes.push(renderStyles(safe.slice(i, start)));

      const label = safe.slice(start + 1, mid);
      const url = safe.slice(mid + 2, end);

      nodes.push(
        <a
          key={`${start}-${end}-${url}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 decoration-indigo-300 dark:decoration-indigo-200 hover:text-indigo-700 dark:hover:text-indigo-100"
        >
          {label}
          <ArrowUpRight className="inline-block w-3 h-3 ml-0.5" />
        </a>
      );

      i = end + 1;
    }

    return <>{nodes}</>;
  }

  function renderStyles(fragment: string) {
    // Code first, then bold, then italic (simple linear pass)
    const parts: React.ReactNode[] = [];
    let i = 0;

    while (i < fragment.length) {
      const code = fragment.indexOf("`", i);
      if (code === -1) {
        parts.push(renderBoldItalic(fragment.slice(i)));
        break;
      }

      if (code > i) parts.push(renderBoldItalic(fragment.slice(i, code)));

      const end = fragment.indexOf("`", code + 1);
      if (end === -1) {
        parts.push(renderBoldItalic(fragment.slice(code)));
        break;
      }

      parts.push(
        <code
          key={`c-${code}`}
          className="px-1.5 py-0.5 rounded-md bg-black/70 text-white font-mono text-xs"
        >
          {fragment.slice(code + 1, end)}
        </code>
      );

      i = end + 1;
    }

    return <>{parts}</>;
  }

  function renderBoldItalic(fragment: string) {
    const out: React.ReactNode[] = [];
    let i = 0;

    while (i < fragment.length) {
      const b = fragment.indexOf("**", i);
      const it = fragment.indexOf("*", i);

      const next = (() => {
        if (b === -1 && it === -1) return null;
        if (b === -1) return { kind: "i" as const, idx: it };
        if (it === -1) return { kind: "b" as const, idx: b };
        return b <= it ? { kind: "b" as const, idx: b } : { kind: "i" as const, idx: it };
      })();

      if (!next) {
        out.push(fragment.slice(i));
        break;
      }

      if (next.idx > i) out.push(fragment.slice(i, next.idx));

      if (next.kind === "b") {
        const end = fragment.indexOf("**", next.idx + 2);
        if (end === -1) {
          out.push(fragment.slice(next.idx));
          break;
        }
        out.push(
          <strong key={`b-${next.idx}`} className="font-semibold">
            {fragment.slice(next.idx + 2, end)}
          </strong>
        );
        i = end + 2;
      } else {
        const end = fragment.indexOf("*", next.idx + 1);
        if (end === -1) {
          out.push(fragment.slice(next.idx));
          break;
        }
        out.push(
          <em key={`i-${next.idx}`} className="italic">
            {fragment.slice(next.idx + 1, end)}
          </em>
        );
        i = end + 1;
      }
    }

    return <>{out}</>;
  }

  // ---------- composer ----------
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
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });
      const data = await res.json();

      const botMsg: Message = {
        id: `${Date.now()}-b`,
        sender: "bot",
        text:
          typeof data?.reply === "string" ? data.reply : "Sorry — I couldn’t generate a response.",
        time: Date.now(),
      };
      setMessages((m) => [...m, botMsg]);
    } catch (err: any) {
      setError(err?.message || "Network error — please try again.");
      setMessages((m) => [
        ...m,
        {
          id: `${Date.now()}-b`,
          sender: "bot",
          text: "I’m having trouble reaching the server right now. Please try again in a moment.",
          time: Date.now(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  // ---------- UI building blocks ----------
  const glass =
    "bg-white/60 dark:bg-slate-950/60 backdrop-blur-md border border-white/40 dark:border-white/10";
  const botBubble = `rounded-2xl px-4 py-2 text-sm leading-relaxed shadow-sm ${glass} text-gray-900 dark:text-gray-100`;
  const userBubble =
    "rounded-2xl px-4 py-2 text-sm leading-relaxed shadow-sm bg-indigo-600 text-white";

  // A small “welcome” prompt (first time users)
  const showStarter = messages.length === 0;

  return (
    <>
      {/* mobile dim backdrop (click to close) */}
      <div
        aria-hidden={!open}
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 transition-opacity duration-200 md:hidden ${
          open ? "opacity-100 bg-black/30 backdrop-blur-sm" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* floating entry + panel */}
      <div className="fixed bottom-6 right-6 z-50 md:bottom-8 md:right-8">
        <div className="flex flex-col items-end">
          {/* launcher */}
          {!open && <ChatLauncher onOpen={() => setOpen(true)} />}

          {open && (
            <div
              className={
                isMobileNow
                  ? "fixed inset-0 flex flex-col" // mobile full screen
                  : "mt-3 w-[28rem] max-w-[92vw] rounded-3xl shadow-2xl" // desktop floating panel
              }
            >
              <div
                className={`${glass} ${
                  isMobileNow ? "rounded-none h-full" : "rounded-3xl"
                } flex flex-col overflow-hidden`}
                style={{
                  height: isMobileNow ? "100%" : "34rem", // desktop fixed height
                }}
              >
                {/* header */}
                <div
                  className={`${glass} border-b border-white/30 dark:border-white/10 px-4 py-3 flex items-center gap-3`}
                >
                  <button
                    onClick={() => setOpen(false)}
                    className="p-2 rounded-full hover:bg-white/20 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    aria-label="Close chat"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <Image
                    src="/profile.jpg"
                    width={120}
                    height={120}
                    alt="Virtual Parag"
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-white/35 dark:ring-white/10"
                    priority
                  />

                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Virtual Parag
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">
                      Tech lead • .Net • React • AWS • Azure
                    </div>
                  </div>
                </div>

                {/* messages (this is the scrollable region) */}
                <div
                  ref={scrollAreaRef}
                  className="flex-1 overflow-y-auto p-4 touch-pan-y overscroll-contain bg-white/20 dark:bg-black/20"
                  style={{ WebkitOverflowScrolling: "touch" }}
                >
                  {showStarter && (
                    <div className="text-center text-sm text-gray-600 dark:text-gray-300">
                      Ask about me, my skills or leadership experience
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
                            src="/profile.jpg"
                            width={120}
                            height={120}
                            alt="Virtual Parag"
                            className="mr-2 w-8 h-8 rounded-full object-cover flex-shrink-0"
                          />
                        )}

                        <div
                          className={isBot ? botBubble : userBubble}
                          role="article"
                          aria-label={`${m.sender} message`}
                        >
                          {renderMarkdown(m.text)}
                        </div>
                      </div>
                    );
                  })}

                  {loading && (
                    <div className="flex items-center gap-2">
                      <Image
                        src="/profile.jpg"
                        width={120}
                        height={120}
                        alt="Virtual Parag"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className={`${botBubble} flex items-center gap-2`}>
                        <span className="text-xs text-gray-600 dark:text-gray-300">
                          {Math.random() < 0.5 ? "Thinking" : "Typing"}
                        </span>
                        <span className="inline-flex gap-1 items-end" aria-hidden="true">
                          {[0, 1, 2].map((i) => (
                            <span
                              key={i}
                              className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-gray-300 animate-bounce"
                              style={{ animationDelay: `${i * 0.14}s` }}
                            />
                          ))}
                        </span>
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="mt-2 text-xs rounded-xl border border-red-200 dark:border-red-900 bg-red-50/80 dark:bg-red-950/30 text-red-700 dark:text-red-200 p-2">
                      {error}
                    </div>
                  )}
                </div>

                {/* composer */}
                <form
                  onSubmit={sendMessage}
                  className={`${glass} border-t border-white/30 dark:border-white/10 p-3 flex gap-2 items-center`}
                >
                  <input
                    aria-label="Type a message"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="flex-1 rounded-2xl border border-white/30 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 text-gray-900 dark:text-gray-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    placeholder="Type your question here"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) sendMessage(e as any);
                    }}
                  />
                  <button
                    type="submit"
                    aria-label="Send message"
                    disabled={!canSend}
                    className="p-2 rounded-2xl bg-indigo-600 text-white disabled:opacity-50 disabled:cursor-not-allowed shadow"
                    title="Send"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
