import React from 'react';
import { BellRing } from 'lucide-react';

export default function MarqueeTicker({ items = [] }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-brand-navy via-brand-blue to-brand-green text-white text-xs md:text-sm py-2 px-4 overflow-hidden shadow-inner flex items-center">
      <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 font-bold uppercase tracking-wider text-[11px] shrink-0 mr-4 backdrop-blur-sm">
        <BellRing className="w-3.5 h-3.5 animate-pulse text-amber-300" />
        <span>Updates</span>
      </div>
      <div className="overflow-hidden relative w-full">
        <div className="animate-marquee whitespace-nowrap flex gap-12 font-medium">
          {items.map((item, idx) => (
            <span key={idx} className="inline-flex items-center gap-2">
              <span>{item}</span>
              <span className="text-white/40">•</span>
            </span>
          ))}
          {/* Duplicate for infinite loop */}
          {items.map((item, idx) => (
            <span key={`dup-${idx}`} className="inline-flex items-center gap-2">
              <span>{item}</span>
              <span className="text-white/40">•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
