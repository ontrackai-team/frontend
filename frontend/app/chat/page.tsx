
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
      <div className="flex h-screen">
     

      <main className="flex-1 p-6">
      
        <h1 className="text-xl font-bold mb-4">
          AI Chat
        </h1>

        <div className="border p-4 h-96 overflow-y-auto">
          {messages.map((m, i) => (
            <p key={i}>
              <b>{m.role}:</b> {m.text}
            </p>
          ))}
        </div>

        {loading && (
          <p className="text-gray-500">
            AI is typing...
          </p>
        )}

        <div className="flex gap-2 mt-3">
          <input
            className="border flex-1 p-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button
            className="bg-blue-500 text-white px-4"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
    
          </main>
    </div>
    </AppLayout>
  </ProtectedRoute>
);
  
}