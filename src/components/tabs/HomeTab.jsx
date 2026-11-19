import React, { useState, useEffect } from 'react';
import {
  ArrowRight, BookOpen, Calendar, MapPin, Sparkles, ExternalLink,
  ChevronLeft, ChevronRight, Award, FileText, CheckCircle2,
  ShieldCheck, ArrowUpRight, Clock, Users, Building, Globe
} from 'lucide-react';
import CountdownTimer from '../CountdownTimer.jsx';

export default function HomeTab({ content, setActiveTab }) {
  const { meta, hero, intro_scope, latest_news = [], previous_events = [], sponsor_logos = [], speakers = [] } = content;

  // Keynote Speakers Carousel State (Auto-slide + hover pause + fade transition)
  const [currentSpeakerIdx, setCurrentSpeakerIdx] = useState(0);
  const [speakerAnimKey, setSpeakerAnimKey] = useState(0);
  const [isSpeakerHovered, setIsSpeakerHovered] = useState(false);

  useEffect(() => {
    if (!speakers || speakers.length <= 1 || isSpeakerHovered) return;
    const interval = setInterval(() => {
      setCurrentSpeakerIdx((prev) => (prev === speakers.length - 1 ? 0 : prev + 1));
      setSpeakerAnimKey((k) => k + 1);
    }, 2500); // Transitions every 2.5 seconds (pauses on hover)
    return () => clearInterval(interval);
  }, [speakers, isSpeakerHovered]);

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

  // Previous Events State (Auto-sliding + hover pause + fade transition)
  const [selectedEventIdx, setSelectedEventIdx] = useState(0);
  const [eventAnimKey, setEventAnimKey] = useState(0);
  const [isEventHovered, setIsEventHovered] = useState(false);

  useEffect(() => {
    if (!previous_events || previous_events.length <= 1 || isEventHovered) return;
    const interval = setInterval(() => {
      setSelectedEventIdx((prev) => (prev === previous_events.length - 1 ? 0 : prev + 1));
      setEventAnimKey((k) => k + 1);
    }, 4000); // Transitions every 4 seconds (pauses on hover)
    return () => clearInterval(interval);
  }, [previous_events, isEventHovered]);

  // Randomized Initial Starting Positions on every refresh (Negative animation delays)
  const [dvdDelays] = useState(() => ({
    spot1: `${-(Math.random() * 13.7).toFixed(2)}s, ${-(Math.random() * 8.3).toFixed(2)}s`,
    spot2: `${-(Math.random() * 16.9).toFixed(2)}s, ${-(Math.random() * 10.7).toFixed(2)}s`,
    spot3: `${-(Math.random() * 11.3).toFixed(2)}s, ${-(Math.random() * 14.1).toFixed(2)}s`,
  }));

  const activeSpeaker = speakers[currentSpeakerIdx] || speakers[0];
  const activeEvent = previous_events[selectedEventIdx] || previous_events[0];

  return (
    <div className="space-y-16 pb-16 bg-white">

      {/* TOP VIEWPORT FOLD: Dynamic Auto-Scaling (Logo + Hero fits in viewport on desktop, scrolls on mobile) */}
      <div className="flex flex-col md:min-h-[calc(100vh-6rem)]">

        {/* 1. LOGO SECTION (Scales dynamically with viewport) */}
        <div className="bg-white flex items-center justify-center py-2 sm:py-3 lg:py-4 shrink-0">
          <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex items-center justify-center">
            <img
              src="/logo.png"
              alt="RAMSITA 2028 Official Logo"
              className="h-[12vh] sm:h-[15vh] md:h-[17vh] lg:h-[19vh] max-h-[190px] min-h-[70px] w-auto max-w-[90vw] md:max-w-3xl lg:max-w-4xl object-contain mx-auto block transition-transform hover:scale-[1.01]"
              onError={(e) => { e.target.src = '/image.png'; }}
            />
          </div>
        </div>

        {/* 2. HERO SECTION (Fills remainder of viewport on desktop, vertically centered, fits all buttons in view) */}
        <section className="relative bg-[#0A2540] text-white flex-1 flex flex-col justify-center py-8 sm:py-10 lg:py-12 border-b-4 border-[#77B232] overflow-hidden !mt-0">
          {/* Animated DVD Screensaver Bouncing Spots (Matching Logo Palette: #77B232 Green & #0C5B94 Blue) */}
          <div
            style={{ animationDelay: dvdDelays.spot1 }}
            className="absolute dvd-orb bg-[#77B232]/35 rounded-full blur-[65px] sm:blur-[80px] pointer-events-none animate-dvd-1 mix-blend-screen"
          />
          <div
            style={{ animationDelay: dvdDelays.spot2 }}
            className="absolute dvd-orb bg-[#0C5B94]/45 rounded-full blur-[70px] sm:blur-[85px] pointer-events-none animate-dvd-2 mix-blend-screen"
          />
          <div
            style={{ animationDelay: dvdDelays.spot3 }}
            className="absolute dvd-orb bg-[#0C5B94]/30 rounded-full blur-[60px] sm:blur-[75px] pointer-events-none animate-dvd-3 mix-blend-screen"
          />

          {/* Subtle geometric grid backdrop positioned over the drifting glow */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4 sm:space-y-6">

            {/* Conference Title Hierarchy */}
            <div className="space-y-1.5 sm:space-y-2 max-w-4xl mx-auto">
              <p className="text-xs sm:text-sm font-bold tracking-widest text-slate-300 uppercase">
                {hero?.edition_label || '3rd International Conference on'}
              </p>
              <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-white tracking-normal leading-[1.25]">
                {hero?.title || meta?.conferenceTitle || 'Recent Advancement and Modernization in Sustainable Intelligent Technologies & Applications'}
              </h1>
              <p className="text-base sm:text-lg md:text-xl font-extrabold text-[#77B232] pt-0.5 tracking-wider">
                {hero?.short_name || (meta?.shortName ? `(${meta.shortName})` : '(RAMSITA - 2028)')}
              </p>
            </div>

            {/* Metadata: Mode, Organizer, Dates */}
            <div className="max-w-2xl mx-auto text-slate-200 text-xs sm:text-sm font-medium space-y-1 pt-1">
              <p className="font-semibold text-white">
                {hero?.mode || meta?.mode || 'Organized in Hybrid Mode'}
              </p>
              <p className="text-slate-300">
                by <span className="font-bold text-white">{hero?.organizer_name || 'Acropolis Institute of Technology and Research'}</span>
                {hero?.organizer_location || ', Indore, MP, India'}
              </p>
              <div className="flex items-center justify-center gap-2 pt-1.5 text-sm sm:text-base font-bold text-amber-300">
                <Calendar className="w-4 h-4 text-amber-300" />
                <span>{hero?.dates || meta?.dates || 'February 11–12, 2028'}</span>
              </div>
            </div>

            {/* CTA Buttons (Spaced comfortably from dates and title) */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-4 sm:pt-6 lg:pt-8">
              {/* Call For Papers Button */}
              <button
                onClick={() => {
                  setActiveTab('cfp');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#FF6600] hover:bg-[#E65C00] transition-all shadow-md cursor-pointer border-0"
              >
                Call For Papers
              </button>

              {/* Microsoft CMT Submit */}
              <a
                href={hero?.cmtLink || 'https://cmt3.research.microsoft.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-navy bg-white hover:bg-slate-100 transition-all shadow-md border-0"
              >
                <span>Submit via CMT</span>
                <ExternalLink className="w-4 h-4 text-brand-navy" />
              </a>

              {/* Important Dates Button */}
              <button
                onClick={() => {
                  setActiveTab('dates');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-5 sm:px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-slate-800 hover:bg-slate-700 border border-slate-600 transition-all cursor-pointer"
              >
                Important Dates
              </button>
            </div>

          </div>
        </section>
      </div>

      {/* 3. INTRO & SCOPE SECTION (IJAITR Format, fully modifiable) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

          {/* Welcome Box */}
          <div className="border-l-4 border-[#0C5B94] pl-6 sm:pl-8 py-2 space-y-4">
            <div className="flex items-center gap-2 text-brand-navy">
              <Building className="w-5 h-5 text-[#0C5B94]" />
              <h2 className="text-xl sm:text-2xl font-bold font-heading uppercase tracking-wide">
                {intro_scope?.intro_heading || 'Welcome to RAMSITA 2028'}
              </h2>
            </div>
            <p className="text-slate-700 text-sm leading-relaxed text-justify">
              {intro_scope?.intro_text || 'The 3rd International Conference on Recent Advancement and Modernization in Sustainable Intelligent Technologies & Applications (RAMSITA - 2028) is being organized in Hybrid Mode by  Acropolis Institute of Technology and Research, Indore, MP, India on February 11-12, 2028.'}
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setActiveTab('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0C5B94] hover:text-brand-navy uppercase tracking-wider"
              >
                <span>Read More About Acropolis AITR</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Scope Box */}
          <div className="border-l-4 border-[#77B232] pl-6 sm:pl-8 py-2 space-y-4">
            <div className="flex items-center gap-2 text-brand-navy">
              <BookOpen className="w-5 h-5 text-[#77B232]" />
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
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#77B232] hover:text-[#5d8d26] uppercase tracking-wider"
              >
                <span>Explore 7 Thematic Tracks</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 3. KEYNOTE SPEAKERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-brand-navy">
            Keynote Speakers
          </h2>
        </div>

        {/* Interactive Keynote Showcase with Fade animation, Auto-Slide & Split Left/Right Click */}
        {speakers && speakers.length > 0 && (
          <div
            onMouseEnter={() => setIsSpeakerHovered(true)}
            onMouseLeave={() => setIsSpeakerHovered(false)}
            className="relative group bg-white border border-slate-300 shadow-sm overflow-hidden select-none"
          >

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

            {/* Bottom Indicator Dots */}
            <div className="bg-slate-100 border-t border-slate-200 px-6 py-3 flex items-center justify-center gap-2.5 z-30 relative">
              {speakers.map((sp, idx) => (
                <button
                  key={sp.id || idx}
                  onClick={() => {
                    setCurrentSpeakerIdx(idx);
                    setSpeakerAnimKey((k) => k + 1);
                  }}
                  className={`w-3 h-3 transition-all cursor-pointer ${idx === currentSpeakerIdx
                    ? 'bg-[#0C5B94] scale-125'
                    : 'bg-slate-300 hover:bg-slate-400'
                    }`}
                  aria-label={`Go to speaker ${idx + 1}`}
                  title={sp.name}
                />
              ))}
            </div>

          </div>
        )}
      </section>

      {/* 4. LATEST NEWS & ANNOUNCEMENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-brand-navy">
            Latest News & Announcements
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {latest_news.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 p-6 flex flex-col hover:border-[#0C5B94] transition-all shadow-xs group h-full"
            >
              {/* Category & Date Header */}
              <div className="flex items-center justify-between text-xs pb-3 shrink-0">
                <span className="px-2.5 py-0.5 bg-blue-50 text-[#0C5B94] font-bold uppercase tracking-wider border border-blue-200">
                  {item.category}
                </span>
                <span className="text-slate-400 font-medium">
                  {item.date}
                </span>
              </div>

              {/* Title & Body Text (Expands dynamically with any amount of text) */}
              <div className="space-y-2.5 shrink-0">
                <h3 className="text-base sm:text-lg font-bold text-brand-navy group-hover:text-[#0C5B94] transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.text}
                </p>
              </div>

              {/* Image Container: Flexibly expands to equalize height across cards without empty dead gaps */}
              {item.image && (
                <div className="mt-4 flex-1 min-h-[160px] bg-slate-100 overflow-hidden border border-slate-200 relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover block"
                  />
                </div>
              )}

              {/* Action Link Footer (Only when link exists, Secretariat label removed) */}
              {item.link && item.link !== '#' && (
                <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-end shrink-0">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#77B232] hover:text-[#5d8d26] uppercase tracking-wider"
                  >
                    <span>View Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 5. OTHER EVENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-brand-navy">
            Other Events
          </h2>
        </div>

        {activeEvent && (
          <div
            onMouseEnter={() => setIsEventHovered(true)}
            onMouseLeave={() => setIsEventHovered(false)}
            className="bg-slate-50 border border-slate-300 p-6 sm:p-8 shadow-xs relative overflow-hidden"
          >
            <div key={eventAnimKey} className="fade-in-speaker grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

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
                  <span className="text-xs font-bold text-[#77B232] uppercase tracking-wider block">
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
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#0C5B94] hover:bg-[#094775] transition-all shadow-xs"
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

            {/* Bottom Indicator Dots */}
            <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-center gap-2.5">
              {previous_events.map((ev, idx) => (
                <button
                  key={ev.id || idx}
                  onClick={() => {
                    setSelectedEventIdx(idx);
                    setEventAnimKey((k) => k + 1);
                  }}
                  className={`w-3 h-3 transition-all cursor-pointer ${idx === selectedEventIdx
                    ? 'bg-[#0C5B94] scale-125'
                    : 'bg-slate-300 hover:bg-slate-400'
                    }`}
                  aria-label={`Go to ${ev.year} Edition`}
                  title={`${ev.year} Edition`}
                />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 6. SPONSORS & PARTNERS (Continuous Smooth Sliding Marquee) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-brand-navy">
            Sponsors
          </h2>
        </div>

        {/* Continuous 100% Seamless Gliding Marquee (No Jump / Reset) */}
        <div className="relative overflow-hidden w-full py-2 group">
          {/* Subtle Left & Right Gradient Fade Edges */}
          <div className="absolute left-0 inset-y-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 inset-y-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          {/* Dual Track Marquee: Two identical tracks gliding synchronously */}
          <div className="flex w-max group-hover:[&_.animate-marquee-track]:[animation-play-state:paused]">
            {/* Track 1 */}
            <div className="animate-marquee-track flex items-center pr-6 gap-6 shrink-0">
              {sponsor_logos.map((sp, idx) => (
                <div
                  key={`track1-${sp.id || idx}`}
                  className="w-56 sm:w-64 h-28 sm:h-32 bg-white border border-slate-200 p-4 sm:p-5 flex items-center justify-center shrink-0 hover:border-[#0C5B94] hover:shadow-xs transition-all"
                  title={sp.name}
                >
                  <img
                    src={sp.logo}
                    alt={sp.name}
                    className="max-h-16 sm:max-h-20 max-w-[85%] object-contain block"
                    onError={(e) => {
                      e.target.src = '/logo.png';
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Track 2 (Exact duplicate for seamless infinite loop) */}
            <div className="animate-marquee-track flex items-center pr-6 gap-6 shrink-0" aria-hidden="true">
              {sponsor_logos.map((sp, idx) => (
                <div
                  key={`track2-${sp.id || idx}`}
                  className="w-56 sm:w-64 h-28 sm:h-32 bg-white border border-slate-200 p-4 sm:p-5 flex items-center justify-center shrink-0 hover:border-[#0C5B94] hover:shadow-xs transition-all"
                  title={sp.name}
                >
                  <img
                    src={sp.logo}
                    alt={sp.name}
                    className="max-h-16 sm:max-h-20 max-w-[85%] object-contain block"
                    onError={(e) => {
                      e.target.src = '/logo.png';
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
