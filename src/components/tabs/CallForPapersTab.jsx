import React, { useState } from 'react';
import { Download, ExternalLink, CheckCircle2, FileCode, FileText, AlertCircle, Award, Sparkles } from 'lucide-react';

export default function CallForPapersTab({ content }) {
  const { tracks, hero } = content;
  const [selectedTrack, setSelectedTrack] = useState(tracks[0]?.id || 'track-1');

  const currentTrack = tracks.find((t) => t.id === selectedTrack) || tracks[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-extrabold uppercase tracking-wider text-brand-green bg-brand-mint px-3 py-1 rounded-full border border-emerald-200">
          Official Call for Research Papers
        </span>
        <h1 className="text-3xl sm:text-4xl font-black font-heading text-brand-navy">
          Call for Papers — RAMSITA 2028
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Inviting high-quality, original, and unpublished research contributions exploring sustainable intelligent systems, machine learning, quantum paradigms, and cyber-physical security.
        </p>
      </div>

      {/* Author Downloads & CMT Action Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Submit on CMT */}
        <div className="bg-gradient-to-br from-brand-navy to-brand-blue text-white p-6 rounded-2xl shadow-lg flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
              Peer Review Portal
            </span>
            <h3 className="text-xl font-bold font-heading">Submit via Microsoft CMT</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              All manuscripts must be submitted electronically through the Microsoft CMT conference portal.
            </p>
          </div>
          <a
            href={hero.cmtLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-brand-green text-white font-bold text-xs rounded-xl shadow hover:brightness-110 transition-all"
          >
            <span>Open CMT Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Card 2: LaTeX Template */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <FileCode className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-brand-navy">LaTeX Template Package</h3>
            <p className="text-xs text-slate-600">
              Official Springer Nature Atlantis Press LaTeX formatting kit with sample .tex and style files.
            </p>
          </div>
          <a
            href="https://ijaitr.in/conference2028/call-for-papers/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download LaTeX (.zip)</span>
          </a>
        </div>

        {/* Card 3: MS Word Template */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-brand-blue flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-brand-navy">Microsoft Word Template</h3>
            <p className="text-xs text-slate-600">
              Formatted .docx manuscript template complying with publisher headings, references, and margin rules.
            </p>
          </div>
          <a
            href="https://ijaitr.in/conference2028/call-for-papers/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Word (.docx)</span>
          </a>
        </div>

      </div>

      {/* Interactive 7 Tracks Explorer */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-brand-blue">
            Thematic Framework
          </span>
          <h2 className="text-2xl font-black font-heading text-brand-navy">
            Official Conference Tracks (Scope & Topics)
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Track Selector List */}
          <div className="lg:col-span-5 space-y-2">
            {tracks.map((t) => {
              const isSelected = selectedTrack === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setSelectedTrack(t.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'bg-brand-mint border-brand-green shadow-xs'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span className={`text-xs font-black px-2 py-0.5 rounded ${
                    isSelected ? 'bg-brand-green text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {t.number}
                  </span>
                  <div>
                    <h4 className={`text-xs font-bold ${isSelected ? 'text-brand-navy' : 'text-slate-700'}`}>
                      {t.name}
                    </h4>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Track View Card */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-md flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold uppercase px-2.5 py-1 rounded bg-brand-navy text-white">
                  Track {currentTrack.number}
                </span>
                <span className="text-xs font-semibold text-brand-green">Peer-Reviewed Scope</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-brand-navy">
                {currentTrack.name}
              </h3>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
                <strong className="block text-brand-blue font-bold uppercase text-[11px] tracking-wider">
                  Detailed Topics & Areas:
                </strong>
                <p>{currentTrack.scope}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">Ready to submit to this track?</span>
              <a
                href={hero.cmtLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-brand-blue hover:bg-brand-navy rounded-lg transition-colors"
              >
                <span>Submit to Track {currentTrack.number}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Manuscript Guidelines & Policies */}
      <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 space-y-4">
        <h3 className="text-lg font-bold font-heading text-brand-navy flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-brand-blue" />
          <span>Manuscript Submission Guidelines</span>
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
            <span><strong>Length:</strong> Standard paper length is up to 12 pages in publisher format. Extra pages up to 15 pages cost ₹500 ($10 USD) per page.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
            <span><strong>Peer Review:</strong> Double-blind peer review by at least two domain experts. Author names must be removed from the initial review PDF.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
            <span><strong>Originality:</strong> Must be original research not under review elsewhere. Similarity index must be below 15% (including self-citations).</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
            <span><strong>No-Show Policy:</strong> At least one registered author must present the paper (hybrid/virtual mode accepted) for inclusion in proceedings.</span>
          </li>
        </ul>
      </div>

    </div>
  );
}
