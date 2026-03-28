import Image from "next/image";

export default function Home() {
  return (
    <>
    <div className="flex flex-col justify-end h-screen pb-16 px-16">
      <input type="text" placeholder="Ask something..." className="px-4 py-4"/>
    </div>
    </>
  );
}
