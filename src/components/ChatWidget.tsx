import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";
import { apiEndpoints, postJson } from "../lib/api";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const LEAD_TAG_REGEX = /<!--LEAD:(.*?)-->/s;

function extractLeadData(content: string): { cleanContent: string; leadData: Record<string, string> | null } {
  const match = content.match(LEAD_TAG_REGEX);
  if (!match) return { cleanContent: content, leadData: null };

  const cleanContent = content.replace(LEAD_TAG_REGEX, "").trim();
  try {
    const leadData = JSON.parse(match[1]);
    return { cleanContent, leadData };
  } catch {
    return { cleanContent, leadData: null };
  }
}

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content:
    "Hey there! I'm DeanAI — Dean's AI assistant (and a live example of what he builds). Whether you're curious about AI voice agents, automations, or just want to see what's possible for your business — I'm here. What's on your mind?",
};

const QUICK_REPLIES = [
  "Schedule a strategy call",
  "What can Dean build for me?",
  "How does pricing work?",
];

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [nudgeStage, setNudgeStage] = useState(0);
  const [hasOpened, setHasOpened] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const leadCapturedRef = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const submitLead = useCallback(async (leadData: Record<string, string>) => {
    if (leadCapturedRef.current) return;

    // Reject obviously bad emails before we eat our one-shot capture flag.
    const email = (leadData.email || "").trim();
    const name = (leadData.name || "").trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!name || !isValidEmail) {
      console.warn("Chat lead skipped — name or email failed validation", { name, email });
      return;
    }

    leadCapturedRef.current = true;
    const payload = {
      name,
      email,
      business: leadData.business || "",
      phone: leadData.phone || "",
      location: leadData.location || "",
      preferred_date: leadData.preferred_date || "",
      preferred_time: leadData.preferred_time || "",
      message: `[Via AI Chat] ${leadData.message || "No details provided"}`,
    };
    try {
      const res = await postJson(apiEndpoints.contact, payload);
      if (!res.ok) {
        console.error("Chat lead submission rejected", res.status);
        leadCapturedRef.current = false;
      }
    } catch (err) {
      console.error("Chat lead submission failed", err);
      leadCapturedRef.current = false;
    }
  }, []);

  const NUDGE_MESSAGES = [
    "Hey! Curious what AI could do for your business?",
    "I'm a live AI demo — try asking me something!",
  ];

  // Nudge sequence: first at 3s, second at 15s
  useEffect(() => {
    if (hasOpened) return;
    const t1 = setTimeout(() => setNudgeStage(1), 3000);
    const t2 = setTimeout(() => setNudgeStage(2), 15000);
    const tHide = setTimeout(() => setNudgeStage(0), 25000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(tHide); };
  }, [hasOpened]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
      setNudgeStage(0);
      setHasOpened(true);
    }
  }, [isOpen]);

  const sendMessage = async (overrideText?: string) => {
    const text = overrideText || input.trim();
    if (!text || isLoading) return;

    setShowQuickReplies(false);
    const userMessage: Message = { role: "user", content: text };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    if (!overrideText) setInput("");
    setIsLoading(true);

    try {
      const res = await postJson(apiEndpoints.chat, {
        messages: newMessages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      });

      if (!res.ok) throw new Error("Failed");

      const data = await res.json();
      const { cleanContent, leadData } = extractLeadData(data.message);

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: cleanContent },
      ]);

      if (leadData && leadData.name && leadData.email) {
        submitLead(leadData);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I'm having trouble connecting right now. Feel free to reach out directly through the contact form below!",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && isOpen) {
      setIsOpen(false);
      return;
    }
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-label="Chat with DeanAI"
            className="fixed inset-x-0 bottom-0 z-[80] flex flex-col rounded-t-2xl border border-white/[0.08] bg-[#0B0F19] shadow-2xl max-sm:!max-h-[70dvh] sm:bottom-24 sm:left-auto sm:right-6 sm:inset-x-auto sm:w-[380px] sm:rounded-2xl sm:z-[70]"
            style={{ maxHeight: "min(480px, calc(100dvh - 60px))" }}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="relative flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 border-b border-white/[0.06] shrink-0">
              {/* Accent top line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-accent via-accent-light to-accent" />

              <div className="flex items-center gap-3">
                <div className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-accent/15">
                  <Bot size={16} className="text-accent sm:hidden" />
                  <Bot size={18} className="text-accent hidden sm:block" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-hero bg-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">DeanAI</p>
                  <p className="text-[11px] text-white/40">
                    AI Assistant &bull; Online
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-3 text-white/30 hover:text-white/60 hover:bg-white/[0.05] transition-all"
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div
              role="log"
              aria-label="Chat messages"
              aria-live="polite"
              aria-atomic="false"
              className="flex-1 overflow-y-auto px-3 sm:px-5 py-3 sm:py-4 space-y-3 sm:space-y-4 min-h-0"
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  className={`flex gap-2 sm:gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {msg.role === "assistant" && (
                    <div className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-lg bg-accent/10 mt-0.5">
                      <Bot size={12} className="text-accent sm:hidden" />
                      <Bot size={14} className="text-accent hidden sm:block" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] sm:max-w-[75%] rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 text-[12px] sm:text-[13px] leading-relaxed ${
                      msg.role === "user"
                        ? "bg-accent text-white rounded-br-md"
                        : "bg-white/[0.06] text-white/80 rounded-bl-md"
                    }`}
                  >
                    {msg.content.split("\n").map((line, j) => (
                      <span key={j}>
                        {j > 0 && <br />}
                        {line}
                      </span>
                    ))}
                  </div>
                  {msg.role === "user" && (
                    <div className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] mt-0.5">
                      <User size={12} className="text-white/40 sm:hidden" />
                      <User size={14} className="text-white/40 hidden sm:block" />
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Quick reply buttons */}
              {showQuickReplies && messages.length === 1 && !isLoading && (
                <motion.div
                  className="flex flex-wrap gap-1.5 sm:gap-2 pl-8 sm:pl-9"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  {QUICK_REPLIES.map((reply) => (
                    <button
                      key={reply}
                      onClick={() => sendMessage(reply)}
                      className="rounded-full border border-accent/30 bg-accent/[0.08] px-3 sm:px-3.5 py-2.5 text-[12px] font-medium text-accent hover:bg-accent/20 hover:border-accent/50 transition-all"
                    >
                      {reply}
                    </button>
                  ))}
                </motion.div>
              )}

              {/* Typing indicator */}
              {isLoading && (
                <motion.div
                  className="flex gap-2 sm:gap-2.5"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-lg bg-accent/10 mt-0.5">
                    <Bot size={12} className="text-accent sm:hidden" />
                    <Bot size={14} className="text-accent hidden sm:block" />
                  </div>
                  <div className="bg-white/[0.06] rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((dot) => (
                        <motion.div
                          key={dot}
                          className="h-1.5 w-1.5 rounded-full bg-white/40"
                          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                          transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            delay: dot * 0.15,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="border-t border-white/[0.06] px-3 sm:px-4 py-2.5 sm:py-3 pb-[max(0.625rem,env(safe-area-inset-bottom))] sm:pb-3 shrink-0">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  aria-label="Type your message"
                  className="flex-1 rounded-xl bg-white/[0.05] border border-white/[0.08] px-3 sm:px-4 py-2 sm:py-2.5 text-[16px] sm:text-[13px] text-white placeholder-white/25 outline-none focus:border-accent/40 focus:bg-white/[0.07] transition-all"
                  disabled={isLoading}
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || isLoading}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-white hover:bg-accent-hover disabled:opacity-30 disabled:hover:bg-accent transition-all"
                  aria-label="Send message"
                >
                  <Send size={14} className="sm:hidden" />
                  <Send size={15} className="hidden sm:block" />
                </button>
              </div>
              <p className="mt-1.5 sm:mt-2 text-center text-[9px] sm:text-[10px] text-white/40">
                Powered by Claude AI &bull; Built by DevelopedByDean
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nudge bubble */}
      <AnimatePresence mode="wait">
        {nudgeStage > 0 && !isOpen && (
          <motion.button
            key={nudgeStage}
            onClick={() => {
              setIsOpen(true);
              setNudgeStage(0);
              setHasOpened(true);
            }}
            className="fixed bottom-[calc(env(safe-area-inset-bottom)+88px)] right-4 left-auto sm:right-6 z-[70] flex items-start gap-3 rounded-2xl bg-hero border border-white/[0.1] px-4 py-3 shadow-2xl cursor-pointer hover:border-accent/30 transition-colors max-w-[280px]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/15 mt-0.5">
              <Sparkles size={14} className="text-accent" />
            </div>
            <div className="text-left">
              <p className="text-[11px] font-semibold text-accent mb-0.5">DeanAI</p>
              <p className="text-[13px] leading-snug text-white/80">
                {NUDGE_MESSAGES[nudgeStage - 1]}
              </p>
            </div>
            {/* Arrow pointing down to bubble */}
            <div className="absolute -bottom-1.5 right-7 h-3 w-3 rotate-45 bg-hero border-r border-b border-white/[0.1]" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating chat bubble — hidden when chat is open */}
      {!isOpen && (
        <motion.button
          onClick={() => {
            setIsOpen(true);
            setNudgeStage(0);
            setHasOpened(true);
          }}
          className="fixed bottom-[calc(env(safe-area-inset-bottom)+24px)] right-6 z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg hover:bg-accent-hover hover:shadow-glow transition-all"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 200, damping: 15 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open chat"
        >
          <MessageCircle size={22} />
          <span
            className="absolute inset-0 rounded-full bg-accent/20 animate-ping pointer-events-none"
            style={{ animationDuration: "2s" }}
          />
        </motion.button>
      )}
    </>
  );
}
