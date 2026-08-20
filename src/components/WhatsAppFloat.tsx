"use client";

import { MessageCircle } from "lucide-react";
import { waLink } from "@/lib/site";

export default function WhatsAppFloat() {
  return (
    <a
      href={waLink("Hi! I'd like to know more about your insurance & investment plans.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-0 overflow-hidden rounded-full bg-[#25D366] p-4 text-white shadow-xl shadow-[#25D366]/30 transition-all hover:gap-2 hover:pr-5 active:scale-95 sm:bottom-7 sm:right-7"
    >
      <MessageCircle className="h-6 w-6 shrink-0 fill-white text-[#25D366]" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:max-w-[140px]">
        Chat with us
      </span>
    </a>
  );
}
