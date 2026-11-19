import React from 'react';
import { ArrowRight, BookOpen, Calendar, MapPin, Sparkles, ExternalLink, Award, FileText, CheckCircle2, ShieldCheck, Atom, Cpu, Leaf, Globe } from 'lucide-react';
import CountdownTimer from '../CountdownTimer.jsx';

export default function HomeTab({ content, setActiveTab }) {
  const { meta, hero, usps, speakers, tracks, important_dates } = content;

  // Map icon names to lucide icons
  const iconMap = {
    Cpu: Cpu,
    Atom: Atom,
    ShieldCheck: ShieldCheck,
    Leaf: Leaf,
    Sparkles: Sparkles,
    Globe: Globe
  };

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 pb-16 bg-gradient-to-b from-white via-slate-50 to-slate-100/60 border-b border-slate-200/60">
        <div className="absolute inset-0 bg-[radial-gradient(#0D6BA1_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-mint border border-emerald-200 text-xs font-bold text-brand-green shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{hero.badge}</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-brand-navy tracking-tight leading-tight">
              3rd International Conference on{' '}
              <span className="bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-green bg-clip-text text-transparent">
                Sustainable Intelligent Technologies & Applications
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
              {hero.subheading}
            </p>

            {/* Key Meta Details (Dates, Venue, Mode) */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-semibold text-slate-700 pt-2">
              <div className="inline-flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-xl shadow-xs border border-slate-200">
                <Calendar className="w-4 h-4 text-brand-blue" />
                <span>{meta.dates}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-xl shadow-xs border border-slate-200">
                <MapPin className="w-4 h-4 text-brand-green" />
                <span>Indore, MP, India (Hybrid Mode)</span>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-xl shadow-xs border border-slate-200">
                <BookOpen className="w-4 h-4 text-purple-600" />
                <span>Springer Nature AISR Series</span>
              </div>
            </div>

            {/* Countdown Clock */}
            <div className="pt-4">
              <CountdownTimer targetDate={hero.countdownTarget} />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <a
                href={hero.cmtLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-brand-blue to-brand-green hover:from-brand-navy hover:to-brand-green rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                <span>Submit Paper via CMT</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={() => setActiveTab('cfp')}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-brand-navy bg-white hover:bg-slate-50 border border-slate-300 rounded-xl shadow-xs hover:shadow transition-all"
              >
                <span>Explore 7 Tracks</span>
                <ArrowRight className="w-4 h-4 text-brand-blue" />
              </button>

              <button
                onClick={() => setActiveTab('registration')}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-emerald-800 bg-brand-mint hover:bg-emerald-100 border border-emerald-300 rounded-xl transition-all"
              >
                <span>Registration Fees</span>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Publications & Academic Credibility Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 to-brand-navy text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-emerald-500/10 to-transparent pointer-events-none"></div>
          
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Proceedings & Journal Indexing
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-heading tracking-tight">
              Published in Atlantis Press (Springer Nature) & Fast-Track Scopus Journal
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Accepted, registered, and presented papers that fulfill Springer Nature guidelines will be published in{' '}
              <strong className="text-white">Atlantis Press AISR (Advances in Intelligent Systems Research)</strong>, indexed in Google Scholar, INSPEC, CNKI, Dimensions, and evaluated for Web of Science CPCI.
            </p>
            <div className="flex flex-wrap gap-3 pt-2 text-xs font-semibold">
              <span className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/20">Atlantis Press AISR (ISSN: 1951-6851)</span>
              <span className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/20">BJIT Journal (Scopus Indexed)</span>
              <span className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/20">Double-Blind Peer Review</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Value Pillars (USPs) from Proposal Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-brand-green">
            Conference Pillars
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-heading text-brand-navy">
            Why Authors & Scholars Choose RAMSITA 2028
          </h2>
          <p className="text-sm text-slate-600">
            Fostering ethical, high-impact innovations across the spectrum of intelligent and sustainable technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {usps.map((usp) => {
            const IconComponent = iconMap[usp.icon] || Sparkles;
            return (
              <div 
                key={usp.id}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-brand-blue/40 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-mint text-brand-green flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-brand-navy mb-2 group-hover:text-brand-blue transition-colors">
                  {usp.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {usp.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Keynote Speakers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-brand-blue">
              Eminent Academicians
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-heading text-brand-navy">
              Keynote & Distinguished Speakers
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('committees')}
            className="text-xs font-bold text-brand-blue hover:text-brand-green inline-flex items-center gap-1"
          >
            <span>View All Committee Members</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {speakers.map((sp) => (
            <div 
              key={sp.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-lg transition-all group"
            >
              <div className="h-44 overflow-hidden relative bg-slate-100">
                <img 
                  src={sp.avatar} 
                  alt={sp.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-[11px] font-semibold text-emerald-400 block">{sp.title}</span>
                  <h4 className="text-base font-bold leading-snug">{sp.name}</h4>
                </div>
              </div>
              <div className="p-4 space-y-2">
                <p className="text-xs font-semibold text-brand-navy">{sp.institution}</p>
                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Session Focus:</span>
                  <span className="text-xs text-slate-700 italic">"{sp.topic}"</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Dates Timeline Snippet */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100/80 border border-slate-200 rounded-3xl p-8 sm:p-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-brand-green">
                Chronological Schedule
              </span>
              <h2 className="text-2xl font-black font-heading text-brand-navy">
                Important Milestones & Deadlines
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('dates')}
              className="px-4 py-2 text-xs font-bold bg-white text-brand-navy rounded-xl border border-slate-300 hover:bg-brand-mint hover:text-brand-green transition-all"
            >
              View Full Timeline
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {important_dates.slice(0, 4).map((d) => (
              <div key={d.id} className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs space-y-2">
                <span className="inline-block px-2 py-0.5 text-[10px] font-extrabold uppercase rounded bg-brand-mint text-brand-green">
                  {d.status}
                </span>
                <h4 className="text-xs font-bold text-brand-navy leading-snug">{d.event}</h4>
                <p className="text-xs font-semibold text-brand-blue">{d.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
