import React from 'react';
import { BellRing } from 'lucide-react';

export default function MarqueeTicker({ items = [] }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="bg-[#0A2540] text-white text-xs md:text-sm py-2 px-4 overflow-hidden border-b border-slate-700 flex items-center">
      <div className="flex items-center gap-1.5 px-3 py-1 bg-brand-green font-bold uppercase tracking-wider text-[11px] shrink-0 mr-4 text-white">
        <BellRing className="w-3.5 h-3.5 animate-pulse text-amber-200" />
        <span>Announcements</span>
      </div>
      <div className="overflow-hidden relative w-full">
        <div className="animate-marquee whitespace-nowrap flex gap-12 font-medium">
          {items.map((item, idx) => (
            <span key={idx} className="inline-flex items-center gap-2">
              <span>{item}</span>
              <span className="text-emerald-400 font-bold">•</span>
            </span>
          ))}
          {/* Duplicate for infinite loop */}
          {items.map((item, idx) => (
            <span key={`dup-${idx}`} className="inline-flex items-center gap-2">
              <span>{item}</span>
              <span className="text-emerald-400 font-bold">•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
