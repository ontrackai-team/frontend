"use client";

import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { sendMessage } from "@/services/chatService";

export default function ChatPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setError("");

    try {
      const res = await sendMessage(input);

      const aiMessage = {
        role: "ai",
        text: res.reply,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        "Daily free-tier request limit reached. Please try again tomorrow."
      );
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  return (
    <AppLayout>
      <div className="p-6">

        <h1 className="text-3xl font-bold mb-6">
          AI Assistant
        </h1>

        {/* ERROR BOX */}
        {error && (
          <div className="mb-4 rounded-lg border border-gray-300 bg-gray-100 p-4 shadow-sm">
            <h3 className="font-semibold text-black">
              AI Assistant Error
            </h3>
            <p className="mt-2 text-black">
              {error}
            </p>
          </div>
        )}

        {/* CHAT BOX */}
        <div className="bg-white rounded-xl shadow p-4 h-[500px] overflow-y-auto space-y-3">

          {messages.length === 0 && (
            <p className="text-gray-500">
              Ask anything about studying, assessments or schedules.
            </p>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={
                message.role === "user"
                  ? "text-right"
                  : "text-left"
              }
            >
              <div
                className={
                  message.role === "user"
                    ? "inline-block bg-blue-500 text-white px-4 py-2 rounded-lg"
                    : "inline-block bg-gray-100 px-4 py-2 rounded-lg"
                }
              >
                {message.text}
              </div>
            </div>
          ))}

          {loading && (
            <p className="text-gray-500">
              AI is typing...
            </p>
          )}

        </div>

        {/* INPUT */}
        <div className="flex gap-3 mt-4">

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AI..."
            className="border rounded-lg p-3 flex-1"
          />

          <button
            onClick={handleSend}
            className="bg-black text-white px-6 rounded-lg"
          >
            Send
          </button>

        </div>

      </div>
    </AppLayout>
  );
}