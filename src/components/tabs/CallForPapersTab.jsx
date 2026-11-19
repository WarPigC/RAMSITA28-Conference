import React, { useState } from 'react';
import { Download, ExternalLink, CheckCircle2, FileCode, FileText, AlertCircle, Award, Sparkles, Layers, ShieldCheck, ChevronRight } from 'lucide-react';

export default function CallForPapersTab({ content }) {
  const { tracks = [], hero = {}, call_for_papers = {} } = content;
  const [activeTrackId, setActiveTrackId] = useState(tracks[0]?.id || 'track-1');

  const activeTrack = tracks.find((t) => t.id === activeTrackId) || tracks[0];

  const defaultLinks = [
    {
      name: 'Springer Nature AISR LaTeX Kit',
      desc: 'Official Atlantis Press LaTeX formatting kit (.zip) with sample paper and bibtex.',
      url: 'https://www.atlantis-press.com/proceedings/series/aisr/publishing',
      type: 'LaTeX (.zip)',
      badge: 'Recommended'
    },
    {
      name: 'Microsoft Word Template (.docx)',
      desc: 'Standard Springer Nature AISR MS Word formatting template document.',
      url: 'https://www.atlantis-press.com/proceedings/series/aisr/publishing',
      type: 'Word (.docx)',
      badge: 'Standard'
    },
    {
      name: 'Microsoft CMT Submission Portal',
      desc: 'Official peer-review portal for submitting research manuscripts to RAMSITA 2028.',
      url: hero.cmtLink || 'https://cmt3.research.microsoft.com',
      type: 'Web Portal',
      badge: 'Portal'
    },
    {
      name: 'Ethics & Plagiarism Policy (<15%)',
      desc: 'COPE-compliant ethical principles, plagiarism threshold (<15%), and authorship rules.',
      url: 'https://www.springernature.com/gp/policies/editorial-policies',
      type: 'Guidelines',
      badge: 'Mandatory'
    }
  ];

  const resourceLinks = call_for_papers?.links || defaultLinks;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 bg-white">
      
      {/* Header Banner */}
      <div className="bg-[#0A2540] text-white p-8 sm:p-10 border-b-4 border-brand-green shadow-xs">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
            Official Call for Research Papers
          </span>
          <h1 className="text-2xl sm:text-4xl font-black font-heading tracking-tight">
            Call for Papers — RAMSITA 2028
          </h1>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            {call_for_papers?.scope_intro || 
              'Inviting high-quality, original, and unpublished research contributions exploring sustainable intelligent systems, machine learning, quantum paradigms, and cyber-physical security.'}
          </p>
          <div className="pt-2 flex flex-wrap gap-2 text-xs font-semibold">
            <span className="bg-white/10 px-3 py-1 border border-white/20">Atlantis Press (Springer Nature) AISR</span>
            <span className="bg-white/10 px-3 py-1 border border-white/20">Double-Blind Peer Review</span>
            <span className="bg-white/10 px-3 py-1 border border-white/20">Fast-Track Scopus Journal</span>
          </div>
        </div>
      </div>

      {/* Scope & Submission Guidelines (Modifiable) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Guidelines Left */}
        <div className="lg:col-span-8 bg-slate-50 border border-slate-300 p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold font-heading text-brand-navy border-b border-slate-200 pb-2">
            Author Submission Requirements
          </h2>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
              <span><strong>Paper Length:</strong> Standard manuscripts must be between 4 and 6 pages in Atlantis Press (Springer Nature) AISR format. Maximum 8 pages allowed (extra charges apply beyond 6 pages).</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
              <span><strong>Plagiarism Policy:</strong> Similarity index must be strictly below 15% (with no single source exceeding 3%) verified via Turnitin / iThenticate / SimCheck.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
              <span><strong>Blind Review:</strong> Authors must omit all author names, affiliations, and acknowledgments from the initial PDF for double-blind peer review.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
              <span><strong>Hybrid Presentation:</strong> Accepted papers must be presented by at least one registered author either in-person at AITR Indore or virtually via online symposium.</span>
            </li>
          </ul>
        </div>

        {/* Quick Submit Right */}
        <div className="lg:col-span-4 bg-brand-navy text-white p-6 sm:p-8 space-y-4 border-t-4 border-amber-400">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block">
            Submission Gateway
          </span>
          <h3 className="text-xl font-bold font-heading">
            Submit Paper via CMT
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            All submissions must be uploaded through Microsoft CMT conference portal by the submission deadline.
          </p>
          <a
            href={hero.cmtLink || 'https://cmt3.research.microsoft.com'}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center py-3 px-4 text-xs font-bold uppercase tracking-wider text-white bg-[#FF6600] hover:bg-[#E65C00] transition-all shadow-md"
          >
            Launch Microsoft CMT Portal
          </a>
        </div>

      </div>

      {/* Revamped Tracks Section (Matrix with interactive drawer & no rounded boxes) */}
      <div className="space-y-6">
        <div className="border-b-2 border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">
              Thematic Research Framework
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-brand-navy">
              Conference Tracks & Scope
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Select a track to view scope details and topic areas
          </span>
        </div>

        {/* Two-Column Track Selector (Left list, Right inspection) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border border-slate-300 bg-white shadow-xs">
          
          {/* Left Track List */}
          <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-slate-300 divide-y divide-slate-200 bg-slate-50">
            {tracks.map((track) => {
              const isSelected = track.id === activeTrackId;
              return (
                <button
                  key={track.id}
                  onClick={() => setActiveTrackId(track.id)}
                  className={`w-full text-left p-4 sm:p-5 transition-all flex items-start justify-between gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-white border-l-4 border-brand-navy shadow-xs text-brand-navy font-bold'
                      : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <div className="space-y-1">
                    <span className={`text-[10px] font-extrabold uppercase tracking-wider block ${
                      isSelected ? 'text-brand-green' : 'text-slate-400'
                    }`}>
                      Track {track.number}
                    </span>
                    <h4 className="text-sm font-bold leading-snug">
                      {track.name}
                    </h4>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                    isSelected ? 'text-brand-navy translate-x-1' : 'text-slate-400'
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Right Track Deep Dive */}
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 bg-white">
            {activeTrack && (
              <div className="space-y-6 fade-in-speaker">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 text-xs font-bold uppercase bg-brand-navy text-white">
                      Track {activeTrack.number}
                    </span>
                    <span className="text-xs font-semibold text-brand-green">
                      RAMSITA 2028 Core Theme
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black font-heading text-brand-navy">
                    {activeTrack.name}
                  </h3>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Topics of Interest & Coverage
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 border border-slate-200 text-justify">
                    {activeTrack.scope}
                  </p>
                </div>

                <div className="border-t border-slate-200 pt-4 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                    Publication & Review Stream
                  </span>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="bg-slate-100 text-slate-800 px-3 py-1 font-semibold border border-slate-200">
                      Atlantis Press AISR Series
                    </span>
                    <span className="bg-slate-100 text-slate-800 px-3 py-1 font-semibold border border-slate-200">
                      Eligible for Best Paper Award
                    </span>
                    <span className="bg-slate-100 text-slate-800 px-3 py-1 font-semibold border border-slate-200">
                      Fast-Track BJIT Consideration
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={hero.cmtLink || 'https://cmt3.research.microsoft.com'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-brand-navy hover:bg-slate-800 transition-all shadow-xs"
                  >
                    <span>Submit Paper to Track {activeTrack.number}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Formatted Important Links Dock (No curved boxes per user instruction) */}
      <div className="space-y-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-green">
            Author Resource Dock
          </span>
          <h2 className="text-2xl font-extrabold font-heading text-brand-navy">
            Templates, Submission & Policy Links
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {resourceLinks.map((link, idx) => (
            <div 
              key={idx}
              className="bg-white border border-slate-300 p-5 flex flex-col justify-between hover:border-brand-navy transition-all shadow-xs"
            >
              <div className="space-y-2">
                <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-brand-navy border border-slate-200">
                  {link.badge || link.type}
                </span>
                <h4 className="text-sm font-bold text-brand-navy">
                  {link.name}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {link.desc}
                </p>
              </div>

              <div className="pt-4 mt-2 border-t border-slate-100">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:text-brand-navy uppercase tracking-wider"
                >
                  <span>Access / Download</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
