import {Send} from 'lucide-react';

export default function Home() {
  return (
    <>
    <div className="flex flex-col justify-end h-screen pb-16 px-16">
      <div className='relative'>
      <input type="text" placeholder="Ask something..." className="px-4 py-4 pr-12 w-full"/>
      <button className='absolute right-3 top-1/2 -translate-y-1/2'>
      <Send size={18}/>
      </button>
      
      </div>
    </div>
    </>
  );
}
