"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { sendMessage } from "@/services/chatService";
import AppLayout from "@/components/layout/AppLayout";

export default function ChatPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input) return;

    const userMsg = input;

    setMessages((prev) => [
      ...prev,
      { role: "user", text: userMsg },
    ]);

    setInput("");
    setLoading(true);

    const res = await sendMessage(userMsg);

    setMessages((prev) => [
      ...prev,
      { role: "assistant", text: (res as any).reply },
    ]);

    setLoading(false);
  };

  return (
    <ProtectedRoute>
      <AppLayout>
        <div className="h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">

          {/* Header */}
          <div className="px-6 py-4 border-b border-white/10 backdrop-blur-xl bg-white/5">
            <h1 className="text-2xl font-bold">AI Chat</h1>
            <p className="text-sm text-slate-400">
              Ask anything. Get instant AI-powered answers.
            </p>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">

            {messages.length === 0 && (
              <div className="h-full flex items-center justify-center">
                <div className="text-center max-w-md">
                  <div className="text-4xl mb-3">🤖</div>
                  <h2 className="text-xl font-semibold">
                    Start a conversation
                  </h2>
                  <p className="text-slate-400 text-sm mt-2">
                    Ask your AI study assistant anything about your courses, deadlines, or concepts.
                  </p>
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-lg ${
                    m.role === "user"
                      ? "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-br-sm"
                      : "bg-white/10 border border-white/10 text-slate-200 rounded-bl-sm backdrop-blur-xl"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="px-4 py-3 rounded-2xl bg-white/10 border border-white/10 text-slate-300 text-sm animate-pulse">
                  AI is typing...
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-white/10 bg-white/5 backdrop-blur-xl p-4">
            <div className="flex gap-3 items-center">

              <input
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
              />

              <button
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 font-medium hover:opacity-90 transition disabled:opacity-50"
                onClick={handleSend}
              >
                Send
              </button>

            </div>

            <p className="text-xs text-slate-500 mt-2 text-center">
              Press Enter to send • Powered by OnTrackAI
            </p>
          </div>

        </div>
      </AppLayout>
    </ProtectedRoute>
  );
}