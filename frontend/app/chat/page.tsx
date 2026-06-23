"use client";

import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { sendMessage } from "@/services/chatService";

export default function ChatPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    const userMsg = { role: "user", text: input };

    setMessages((prev) => [...prev, userMsg]);

    const res = await sendMessage(input);

    const botMsg = { role: "ai", text: res.reply };

    setMessages((prev) => [...prev, botMsg]);

    setInput("");
  };

  return (
    <AppLayout>
      <div className="p-6 space-y-4">

        <h1 className="text-3xl font-bold">AI Assistant</h1>

        <div className="bg-white p-4 rounded h-[400px] overflow-y-auto space-y-2">
          {messages.map((m, i) => (
            <div
              key={i}
              className={m.role === "user" ? "text-right" : "text-left"}
            >
              <p className="inline-block bg-gray-100 px-3 py-2 rounded">
                {m.text}
              </p>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            className="border p-2 w-full"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AI..."
          />

          <button
            onClick={handleSend}
            className="bg-black text-white px-4 rounded"
          >
            Send
          </button>
        </div>

      </div>
    </AppLayout>
  );
}