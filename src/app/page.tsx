"use client"

import { useState, useRef, useEffect } from "react";
import { Send } from 'lucide-react';
import { sendUserQuery } from "../services/userChatService";
import type { Message, UserQueryResponse } from "../types/user-chat/userChat";



export default function Home() {
  const queryRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function handleSend() {
    const query = queryRef.current?.value?.trim() ?? "";
    if (!query || loading) return;

    if (queryRef.current) queryRef.current.value = "";
    setMessages(prev => [...prev, { role: "user", text: query }]);
    setLoading(true);

    try {
      const response: UserQueryResponse = await sendUserQuery(query);
      const text = response.answer.map(b => b.text).join("\n\n");
      setMessages(prev => [...prev, { role: "assistant", text }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-screen px-16 pb-16">
      <div className="flex-1 overflow-y-auto py-8 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-2xl px-4 py-3 rounded-lg whitespace-pre-wrap ${
              msg.role === "user"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-900"
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="px-4 py-3 rounded-lg bg-gray-100 text-gray-500 animate-pulse">...</div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div className="relative">
        <input
          type="text"
          ref={queryRef}
          placeholder="Ask something..."
          className="px-4 py-4 pr-12 w-full"
          onKeyDown={e => e.key === "Enter" && handleSend()}
        />
        <button
          className="absolute right-3 top-1/2 -translate-y-1/2 disabled:opacity-40"
          onClick={handleSend}
          disabled={loading}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
