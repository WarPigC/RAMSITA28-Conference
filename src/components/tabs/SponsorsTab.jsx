import React, { useState } from 'react';
import { Award, Check, Mail, Sparkles, ChevronLeft, ChevronRight, Building, ExternalLink } from 'lucide-react';

export default function SponsorsTab({ content }) {
  const { sponsors = {}, sponsor_logos = [], meta = {} } = content;

  // Keynote-style showcase state for sponsor logos
  const [activeSponsorIdx, setActiveSponsorIdx] = useState(0);
  const [sponsorAnimKey, setSponsorAnimKey] = useState(0);

  const handlePrevSponsor = (e) => {
    if (e) e.stopPropagation();
    setActiveSponsorIdx((prev) => (prev === 0 ? sponsor_logos.length - 1 : prev - 1));
    setSponsorAnimKey((k) => k + 1);
  };

  const handleNextSponsor = (e) => {
    if (e) e.stopPropagation();
    setActiveSponsorIdx((prev) => (prev === sponsor_logos.length - 1 ? 0 : prev + 1));
    setSponsorAnimKey((k) => k + 1);
  };

  const activeSponsor = sponsor_logos[activeSponsorIdx] || sponsor_logos[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 bg-white">
      
      {/* Header Banner */}
      <div className="bg-[#0A2540] text-white p-8 sm:p-10 border-b-4 border-brand-green shadow-xs">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
            Industry Collaboration
          </span>
          <h1 className="text-2xl sm:text-4xl font-black font-heading tracking-tight">
            {sponsors.title || 'Partner with RAMSITA 2028'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {sponsors.pitch || 
              'Showcase your organization’s leadership in sustainability, intelligent technologies, and engineering innovation to an audience of 1,500+ researchers, academic heads, and industry innovators.'}
          </p>
        </div>
      </div>

      {/* Metrics Bar (Sharp rectangular cards, rounded-none) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {(sponsors.stats || []).map((stat, idx) => (
          <div key={idx} className="bg-slate-50 p-5 border border-slate-300 text-center space-y-1">
            <span className="text-2xl sm:text-3xl font-black font-heading text-brand-navy block">
              {stat.value}
            </span>
            <span className="text-xs font-bold text-brand-green uppercase tracking-wider">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Sponsorship Tier Packages (Sharp, non-curved boxes) */}
      <div className="space-y-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">
            Engagement Tiers
          </span>
          <h2 className="text-2xl font-extrabold font-heading text-brand-navy">
            Sponsorship Packages & Benefits
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(sponsors.packages || []).map((pkg, idx) => {
            const isPlatinum = idx === 0;
            return (
              <div
                key={idx}
                className={`p-6 sm:p-8 flex flex-col justify-between border ${
                  isPlatinum
                    ? 'bg-[#0A2540] text-white border-brand-navy shadow-md'
                    : 'bg-white border-slate-300 text-slate-800 shadow-xs'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className={`text-lg font-bold font-heading ${isPlatinum ? 'text-white' : 'text-brand-navy'}`}>
                      {pkg.name}
                    </h3>
                    {isPlatinum && (
                      <span className="text-[10px] uppercase font-bold text-slate-900 bg-amber-400 px-2 py-0.5">
                        Premier
                      </span>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-200/20">
                    <span className="text-3xl font-black font-heading">
                      {pkg.amount}
                    </span>
                  </div>

                  <ul className="space-y-2 pt-3 text-xs leading-relaxed">
                    {pkg.perks.map((perk, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${isPlatinum ? 'text-emerald-400' : 'text-brand-green'}`} />
                        <span className={isPlatinum ? 'text-slate-200' : 'text-slate-600'}>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6">
                  <a
                    href={`mailto:${meta.email}?subject=RAMSITA 2028 Sponsorship Inquiry - ${pkg.name}`}
                    className={`block w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-center transition-all ${
                      isPlatinum
                        ? 'bg-[#FF6600] text-white hover:bg-[#E65C00]'
                        : 'bg-brand-navy text-white hover:bg-slate-800'
                    }`}
                  >
                    Apply for {pkg.name}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* INTERACTIVE SPONSOR SHOWCASE (Replacing bottom slider with keynote-style UI per user instruction) */}
      <div className="space-y-6 pt-4">
        <div className="border-b-2 border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-green">
              Featured Partners Showcase
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-brand-navy">
              Collaborators & Sponsoring Organizations
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Hover & click left/right half to browse partner organizations
          </span>
        </div>

        {sponsor_logos && sponsor_logos.length > 0 && (
          <div className="relative group bg-slate-50 border border-slate-300 shadow-sm overflow-hidden select-none">
            
            {/* Split Left Click Zone */}
            <div 
              onClick={handlePrevSponsor}
              title="Click left half for Previous Partner"
              className="absolute left-0 top-0 bottom-0 w-1/2 z-20 cursor-w-resize"
            ></div>

            {/* Split Right Click Zone */}
            <div 
              onClick={handleNextSponsor}
              title="Click right half for Next Partner"
              className="absolute right-0 top-0 bottom-0 w-1/2 z-20 cursor-e-resize"
            ></div>

            {/* Left Hover Arrow */}
            <button
              onClick={handlePrevSponsor}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2.5 bg-black/75 hover:bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity border border-white/20 cursor-pointer"
              aria-label="Previous Partner"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Hover Arrow */}
            <button
              onClick={handleNextSponsor}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2.5 bg-black/75 hover:bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity border border-white/20 cursor-pointer"
              aria-label="Next Partner"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Sponsor Showcase Content with Fade Animation */}
            <div key={sponsorAnimKey} className="fade-in-speaker p-8 sm:p-12 text-center space-y-4">
              <div className="h-32 flex items-center justify-center">
                <img 
                  src={activeSponsor.logo} 
                  alt={activeSponsor.name} 
                  className="max-h-24 max-w-xs object-contain"
                  onError={(e) => { e.target.src = '/logo.png'; }}
                />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-green block">
                  {activeSponsor.tier || 'Collaborating Partner'}
                </span>
                <h3 className="text-xl sm:text-2xl font-black font-heading text-brand-navy mt-1">
                  {activeSponsor.name}
                </h3>
              </div>
            </div>

            {/* Bottom Indicator Selector */}
            <div className="bg-white border-t border-slate-200 px-6 py-3 flex items-center justify-between text-xs text-slate-600 z-30 relative">
              <span className="font-semibold">
                Partner {activeSponsorIdx + 1} of {sponsor_logos.length}: {activeSponsor.name}
              </span>
              <div className="flex items-center gap-2">
                {sponsor_logos.map((sp, idx) => (
                  <button
                    key={sp.id || idx}
                    onClick={() => {
                      setActiveSponsorIdx(idx);
                      setSponsorAnimKey((k) => k + 1);
                    }}
                    className={`w-3 h-3 transition-all cursor-pointer ${
                      idx === activeSponsorIdx 
                        ? 'bg-brand-navy scale-125' 
                        : 'bg-slate-300 hover:bg-slate-400'
                    }`}
                    title={sp.name}
                  />
                ))}
              </div>
            </div>

          </div>
        )}
      </div>

    </div>
  );
}
