import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, BookOpen, Calendar, MapPin, Sparkles, ExternalLink, 
  ChevronLeft, ChevronRight, Award, FileText, CheckCircle2, 
  ShieldCheck, ArrowUpRight, Clock, Users, Building, Globe
} from 'lucide-react';
import CountdownTimer from '../CountdownTimer.jsx';

export default function HomeTab({ content, setActiveTab }) {
  const { meta, hero, intro_scope, latest_news = [], previous_events = [], sponsor_logos = [], speakers = [] } = content;

  // Keynote Speakers Carousel State (Fade transition + split left/right click + hover arrows)
  const [currentSpeakerIdx, setCurrentSpeakerIdx] = useState(0);
  const [speakerAnimKey, setSpeakerAnimKey] = useState(0);

  const handlePrevSpeaker = (e) => {
    if (e) e.stopPropagation();
    setCurrentSpeakerIdx((prev) => (prev === 0 ? speakers.length - 1 : prev - 1));
    setSpeakerAnimKey((k) => k + 1);
  };

  const handleNextSpeaker = (e) => {
    if (e) e.stopPropagation();
    setCurrentSpeakerIdx((prev) => (prev === speakers.length - 1 ? 0 : prev + 1));
    setSpeakerAnimKey((k) => k + 1);
  };

  // Previous Events State
  const [selectedEventIdx, setSelectedEventIdx] = useState(0);

  const activeSpeaker = speakers[currentSpeakerIdx] || speakers[0];
  const activeEvent = previous_events[selectedEventIdx] || previous_events[0];

  return (
    <div className="space-y-16 pb-16 bg-white">
      
      {/* 1. HERO SECTION (Redesigned per Image 1 feedback) */}
      <section className="relative bg-[#0A2540] text-white pt-12 pb-16 border-b-4 border-brand-green overflow-hidden">
        {/* Subtle geometric grid backdrop - clean & academic, NOT a generic circuit board */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-green/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          
          {/* Logo Emblem (Image 1 fix: high clarity logo) */}
          <div className="inline-block p-1 bg-white border-2 border-white/80 shadow-lg">
            <img 
              src="/logo.png" 
              alt="RAMSITA 2028 Official Logo" 
              className="h-24 sm:h-28 w-auto object-contain"
              onError={(e) => { e.target.src = '/image.png'; }}
            />
          </div>

          {/* Springer Nature AISR Badge */}
          <div>
            <span className="inline-block px-4 py-1 text-xs font-bold uppercase tracking-wider bg-white/10 text-emerald-300 border border-emerald-400/40">
              Proceedings to be published in Atlantis Press (Springer Nature) AISR Series
            </span>
          </div>

          {/* Conference Title Hierarchy */}
          <div className="space-y-2 max-w-4xl mx-auto">
            <p className="text-sm sm:text-base font-bold tracking-widest text-slate-300 uppercase">
              3rd International Conference on
            </p>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-heading text-white tracking-tight leading-tight">
              Recent Advancement and Modernization in Sustainable Intelligent Technologies & Applications
            </h1>
            <p className="text-lg sm:text-xl font-extrabold text-brand-green pt-1 tracking-wider">
              (RAMSITA - 2028)
            </p>
          </div>

          {/* Metadata: Mode, Organizer, Dates */}
          <div className="max-w-2xl mx-auto text-slate-200 text-xs sm:text-sm font-medium space-y-1 pt-1">
            <p className="font-semibold text-white">Organized in Hybrid Mode</p>
            <p className="text-slate-300">by <span className="font-bold text-white">Acropolis Institute of Technology and Research</span>, Indore, MP, India</p>
            <div className="flex items-center justify-center gap-2 pt-2 text-sm sm:text-base font-bold text-amber-300">
              <Calendar className="w-4 h-4 text-amber-300" />
              <span>February 11–12, 2028</span>
            </div>
          </div>

          {/* Countdown Clock (Sharp, non-curved) */}
          <div className="pt-2">
            <CountdownTimer targetDate={hero?.countdownTarget || '2028-02-11T09:00:00'} />
          </div>

          {/* CTA Buttons (Sharp, non-curved boxes per user request) */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            {/* Orange Button like IJAITR */}
            <button
              onClick={() => {
                setActiveTab('cfp');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white bg-[#FF6600] hover:bg-[#E65C00] transition-all shadow-md cursor-pointer border-0"
            >
              Call For Papers
            </button>

            {/* Microsoft CMT Submit */}
            <a
              href={hero?.cmtLink || 'https://cmt3.research.microsoft.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-brand-navy bg-white hover:bg-slate-100 transition-all shadow-md border-0"
            >
              <span>Submit via CMT</span>
              <ExternalLink className="w-4 h-4 text-brand-navy" />
            </a>

            {/* Important Dates Quick Jump */}
            <button
              onClick={() => {
                setActiveTab('dates');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white bg-slate-800 hover:bg-slate-700 border border-slate-600 transition-all cursor-pointer"
            >
              Important Dates
            </button>
          </div>

        </div>
      </section>

      {/* 2. INTRO & SCOPE SECTION (IJAITR Format, fully modifiable) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Welcome Box */}
          <div className="bg-slate-50 border-l-4 border-brand-navy p-6 sm:p-8 space-y-4 border-y border-r border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 text-brand-navy">
              <Building className="w-5 h-5 text-brand-blue" />
              <h2 className="text-xl sm:text-2xl font-bold font-heading uppercase tracking-wide">
                {intro_scope?.intro_heading || 'Welcome to RAMSITA 2028'}
              </h2>
            </div>
            <p className="text-slate-700 text-sm leading-relaxed text-justify">
              {intro_scope?.intro_text || 'The 3rd International Conference on Recent Advancement and Modernization in Sustainable Intelligent Technologies & Applications (RAMSITA - 2028) is being organized in Hybrid Mode by Acropolis Institute of Technology and Research, Indore, MP, India on February 11-12, 2028.'}
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setActiveTab('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:text-brand-navy uppercase tracking-wider"
              >
                <span>Read More About Acropolis AITR</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Scope Box */}
          <div className="bg-slate-50 border-l-4 border-brand-green p-6 sm:p-8 space-y-4 border-y border-r border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 text-brand-navy">
              <BookOpen className="w-5 h-5 text-brand-green" />
              <h2 className="text-xl sm:text-2xl font-bold font-heading uppercase tracking-wide">
                {intro_scope?.scope_heading || 'Scope & Core Objectives'}
              </h2>
            </div>
            <p className="text-slate-700 text-sm leading-relaxed text-justify">
              {intro_scope?.scope_text || 'The primary objective of RAMSITA 2028 is to bring together dynamic researchers, academicians, and industry specialists to explore innovative solutions in cutting-edge intelligent algorithms, green computing, cyber-physical systems, and next-generation networks.'}
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setActiveTab('cfp');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-green hover:text-emerald-700 uppercase tracking-wider"
              >
                <span>Explore 7 Thematic Tracks</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 3. KEYNOTE SPEAKERS (Redesigned per exact user instructions) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b-2 border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-green">
              Distinguished Keynotes
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-brand-navy">
              Keynote Speakers
            </h2>
          </div>
          <div className="text-xs text-slate-500 font-medium">
            Hover & click left/right half or use arrows to change speaker
          </div>
        </div>

        {/* Interactive Keynote Showcase with Fade animation & Split Left/Right Click */}
        {speakers && speakers.length > 0 && (
          <div className="relative group bg-white border border-slate-300 shadow-sm overflow-hidden select-none">
            
            {/* Split Left Click Zone (Click anywhere on left half for previous) */}
            <div 
              onClick={handlePrevSpeaker}
              title="Click left half for Previous Speaker"
              className="absolute left-0 top-0 bottom-0 w-1/2 z-20 cursor-w-resize"
            ></div>

            {/* Split Right Click Zone (Click anywhere on right half for next) */}
            <div 
              onClick={handleNextSpeaker}
              title="Click right half for Next Speaker"
              className="absolute right-0 top-0 bottom-0 w-1/2 z-20 cursor-e-resize"
            ></div>

            {/* Left Hover Arrow Button */}
            <button
              onClick={handlePrevSpeaker}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2.5 bg-black/75 hover:bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity border border-white/20 shadow-md cursor-pointer"
              aria-label="Previous Speaker"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Hover Arrow Button */}
            <button
              onClick={handleNextSpeaker}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2.5 bg-black/75 hover:bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity border border-white/20 shadow-md cursor-pointer"
              aria-label="Next Speaker"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Speaker Content with Smooth Fade In/Out */}
            <div key={speakerAnimKey} className="fade-in-speaker p-6 sm:p-10">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                
                {/* Speaker Photo (Square, sharp non-curved border) */}
                <div className="md:col-span-4 flex justify-center">
                  <div className="w-56 h-64 sm:w-64 sm:h-72 bg-slate-100 border-2 border-slate-300 overflow-hidden relative shadow-md">
                    <img 
                      src={activeSpeaker.avatar} 
                      alt={activeSpeaker.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-[#0A2540] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5">
                      Keynote {currentSpeakerIdx + 1} of {speakers.length}
                    </div>
                  </div>
                </div>

                {/* Speaker Details */}
                <div className="md:col-span-8 space-y-4 text-left">
                  <div>
                    <span className="text-xs font-bold text-brand-green uppercase tracking-wider block">
                      {activeSpeaker.title || 'Distinguished Speaker'}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black font-heading text-brand-navy">
                      {activeSpeaker.name}
                    </h3>
                    <p className="text-sm font-semibold text-slate-700 mt-1">
                      {activeSpeaker.institution}
                    </p>
                  </div>

                  <div className="border-t border-slate-200 pt-3">
                    <span className="text-xs uppercase font-extrabold text-slate-400 block tracking-wider">
                      Keynote Session Focus:
                    </span>
                    <p className="text-base sm:text-lg font-bold text-brand-blue italic mt-1">
                      "{activeSpeaker.topic}"
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Eminent scholar delivering a specialized invited talk during the plenary sessions at RAMSITA 2028, focusing on state-of-the-art developments, research directions, and real-world implementations.
                  </p>

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={() => {
                        setActiveTab('committees');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-xs font-bold text-brand-navy hover:text-brand-green uppercase tracking-wider inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>View Full Advisory Board</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Indicator Dots / Selector */}
            <div className="bg-slate-100 border-t border-slate-200 px-6 py-3 flex items-center justify-between text-xs text-slate-500 z-30 relative">
              <span className="font-semibold text-slate-700">
                Speaker {currentSpeakerIdx + 1} of {speakers.length}: {activeSpeaker.name}
              </span>
              <div className="flex items-center gap-2">
                {speakers.map((sp, idx) => (
                  <button
                    key={sp.id || idx}
                    onClick={() => {
                      setCurrentSpeakerIdx(idx);
                      setSpeakerAnimKey((k) => k + 1);
                    }}
                    className={`w-3 h-3 transition-all cursor-pointer ${
                      idx === currentSpeakerIdx 
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
      </section>

      {/* 4. LATEST NEWS & ANNOUNCEMENTS (Formatted clean grid replacing 4 awkward boxes) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b-2 border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">
              Official Dispatches
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-brand-navy">
              Latest News & Announcements
            </h2>
          </div>
          <button
            onClick={() => {
              setActiveTab('cfp');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-bold text-brand-navy hover:text-brand-green uppercase tracking-wider inline-flex items-center gap-1"
          >
            <span>Author Guidelines</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {latest_news.map((item) => (
            <div 
              key={item.id}
              className="bg-white border border-slate-200 p-6 flex flex-col justify-between hover:border-brand-blue transition-all shadow-xs group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 bg-blue-50 text-brand-blue font-bold uppercase tracking-wider border border-blue-200">
                    {item.category}
                  </span>
                  <span className="text-slate-400 font-medium">
                    {item.date}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-brand-navy group-hover:text-brand-blue transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.text}
                </p>
              </div>

              {item.image && (
                <div className="mt-4 h-36 bg-slate-100 overflow-hidden border border-slate-200">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-500">
                  RAMSITA 2028 Secretariat
                </span>
                {item.link && item.link !== '#' ? (
                  <a 
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-green hover:underline"
                  >
                    <span>View Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-xs font-bold text-brand-blue">Active Notice</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. PREVIOUS EVENTS (NEW SECTION - RAMSITA 2026 & MPCON 2027) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b-2 border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-green">
              Legacy of Excellence
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-brand-navy">
              Previous Event Editions
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {previous_events.map((ev, idx) => (
              <button
                key={ev.id || idx}
                onClick={() => setSelectedEventIdx(idx)}
                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                  idx === selectedEventIdx
                    ? 'bg-brand-navy text-white border-brand-navy'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                }`}
              >
                {ev.year} Edition
              </button>
            ))}
          </div>
        </div>

        {activeEvent && (
          <div className="bg-slate-50 border border-slate-300 p-6 sm:p-8 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Event Image */}
              <div className="lg:col-span-5">
                <div className="h-64 sm:h-72 bg-slate-200 border border-slate-300 overflow-hidden relative shadow-sm">
                  <img 
                    src={activeEvent.image} 
                    alt={activeEvent.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block">
                      {activeEvent.year} Conference Snapshot
                    </span>
                    <span className="text-xs text-slate-200">
                      {activeEvent.stats}
                    </span>
                  </div>
                </div>
              </div>

              {/* Event Details */}
              <div className="lg:col-span-7 space-y-4">
                <div>
                  <span className="text-xs font-bold text-brand-green uppercase tracking-wider block">
                    Conference Archive
                  </span>
                  <h3 className="text-2xl font-black font-heading text-brand-navy">
                    {activeEvent.title}
                  </h3>
                  <p className="text-sm font-semibold text-slate-700 mt-1">
                    {activeEvent.subtitle}
                  </p>
                </div>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed text-justify">
                  {activeEvent.desc}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  {activeEvent.link && (
                    <a
                      href={activeEvent.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-brand-navy hover:bg-slate-800 transition-all shadow-xs"
                    >
                      <span>Explore {activeEvent.year} Website</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <button
                    onClick={() => {
                      setActiveTab('gallery');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 transition-all cursor-pointer"
                  >
                    <span>View Conference Gallery</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}
      </section>

      {/* 6. SPONSORS & PARTNERS (Image-only, modifiable in CMS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b-2 border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-green">
              Technical & Professional Associations
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-brand-navy">
              Collaborators & Sponsors
            </h2>
          </div>
          <button
            onClick={() => {
              setActiveTab('sponsors');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-bold text-brand-navy hover:text-brand-green uppercase tracking-wider inline-flex items-center gap-1"
          >
            <span>Sponsorship Packages</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Clean Logo Grid (Image Only, non-curved per user request) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {sponsor_logos.map((sp) => (
            <div 
              key={sp.id}
              className="bg-white border border-slate-200 p-4 h-24 flex items-center justify-center hover:border-brand-blue hover:shadow-xs transition-all group"
              title={sp.name}
            >
              <img 
                src={sp.logo} 
                alt={sp.name} 
                className="max-h-14 max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all group-hover:scale-105"
                onError={(e) => {
                  e.target.src = '/logo.png';
                }}
              />
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
