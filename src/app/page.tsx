"use client"

import { useState, useRef, useEffect } from "react";
import { Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
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
    } catch {
      setMessages(prev => [...prev, { role: "assistant", text: "Sorry, we cannot respond to your query right now. Please try again later." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-screen px-16 pb-16">
      <div className="flex justify-center sticky top-0 z-10 py-4 bg-black">
        <div>
          <h1 className="text-2xl font-bold text-white-900">Football Fixture Tracker</h1>
          <h1  className="pt-4">Tips:</h1>
          <ul className="mt-2 list-disc list-inside text-sm text-white-600 space-y-1">
            <li>Search for currently ongoing matches in the world.</li>
            <li>Search for past fixtures of the English Premier League, La Liga and Bundesliga from the year 2024.</li>
          </ul>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-8 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-2xl px-4 py-3 rounded-lg ${
              msg.role === "user"
                ? "bg-blue-600 text-white whitespace-pre-wrap"
                : "bg-gray-100 text-gray-900 prose prose-sm max-w-none"
            }`}>
              {msg.role === "user" ? msg.text : (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
              )}
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
