"use client"

import {useRef} from "react";
import {Send} from 'lucide-react';
import { sendUserQuery } from "../services/userChatService";

export default function Home() {
  const queryRef = useRef<HTMLInputElement>(null);
  
  return (
    <>
    <div className="flex flex-col justify-end h-screen pb-16 px-16">
      <div className='relative'>
      <input type="text" ref={queryRef} placeholder="Ask something..." className="px-4 py-4 pr-12 w-full"/>
      <button className='absolute right-3 top-1/2 -translate-y-1/2' onClick={() => sendUserQuery(queryRef.current?.value ?? "")}>
      <Send size={18}/>
      </button>
      </div>
    </div>
    </>
  );
}
