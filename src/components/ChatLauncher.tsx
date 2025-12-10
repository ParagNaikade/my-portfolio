"use client";

import Image from "next/image";

export default function ChatLauncher({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      aria-label="Open chat"
      title="Chat with Virtual Parag"
      className="
        fixed bottom-6 right-6 z-50
        w-16 h-16 rounded-full overflow-hidden
        shadow-xl border border-white/40
        backdrop-blur-xl bg-white/30
        hover:scale-105 active:scale-95
        transition-all duration-300
        ring-2 ring-pink-400/60
        animate-[pulse_3s_ease-in-out_infinite]
      "
    >
      <Image
        src="/profile.jpg"
        alt="Virtual Parag"
        width={64}
        height={64}
        className="w-full h-full object-cover rounded-full"
      />
    </button>
  );
}
