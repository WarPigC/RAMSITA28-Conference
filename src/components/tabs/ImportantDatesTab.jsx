import React from 'react';
import { Calendar, Clock, CheckCircle, AlertCircle, ArrowRight, ExternalLink } from 'lucide-react';

export default function ImportantDatesTab({ content }) {
  const { important_dates = [], hero = {} } = content;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 bg-white">
      
      {/* Header Banner */}
      <div className="bg-[#0A2540] text-white p-8 sm:p-10 border-b-4 border-brand-green shadow-xs">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
            Milestone Schedule
          </span>
          <h1 className="text-2xl sm:text-4xl font-black font-heading tracking-tight">
            Important Dates & Deadlines
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            All deadlines are set to 23:59 Indian Standard Time (IST) / GMT+5:30. Authors are advised to complete their Microsoft CMT submissions well in advance of the deadline.
          </p>
        </div>
      </div>

      {/* Phase Horizon Progress Strip (Better alternative to graph/tree) */}
      <div className="border border-slate-300 bg-slate-50 p-6 space-y-4">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
          <span>Conference Lifecyle Progression</span>
          <span className="text-brand-green">Phase 1 Active</span>
        </div>
        
        {/* 4 Steps Horizon */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
          <div className="p-3 bg-brand-navy text-white border-l-4 border-amber-400">
            <span className="text-[10px] uppercase font-bold text-amber-300 block">Phase 01</span>
            <span className="text-xs font-bold">Paper Submission</span>
            <span className="text-[10px] text-slate-300 block mt-0.5">Through Dec 15, 2027</span>
          </div>

          <div className="p-3 bg-white text-slate-700 border border-slate-300">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Phase 02</span>
            <span className="text-xs font-bold">Peer Review</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">Double-Blind Evaluation</span>
          </div>

          <div className="p-3 bg-white text-slate-700 border border-slate-300">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Phase 03</span>
            <span className="text-xs font-bold">Author Registration</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">Camera-Ready Submissions</span>
          </div>

          <div className="p-3 bg-white text-slate-700 border border-slate-300">
            <span className="text-[10px] uppercase font-bold text-brand-green block">Phase 04</span>
            <span className="text-xs font-bold">RAMSITA 2028 Event</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">February 11–12, 2028</span>
          </div>
        </div>
      </div>

      {/* Structured Milestone Ledger (No curved boxes, sharp table) */}
      <div className="border border-slate-300 bg-white shadow-xs overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#0A2540] text-white text-xs font-bold uppercase tracking-wider">
              <th className="py-4 px-6 border-b border-slate-700">Milestone Event</th>
              <th className="py-4 px-6 border-b border-slate-700">Scheduled Date</th>
              <th className="py-4 px-6 border-b border-slate-700 text-center">Status</th>
              <th className="py-4 px-6 border-b border-slate-700">Details / Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-xs sm:text-sm">
            {important_dates.map((item, idx) => {
              const isHighlight = item.highlight;
              return (
                <tr 
                  key={item.id || idx}
                  className={isHighlight ? 'bg-amber-50/60 font-semibold' : 'hover:bg-slate-50'}
                >
                  <td className="py-4 px-6 font-bold text-brand-navy">
                    <div className="flex items-center gap-2">
                      {isHighlight && <Clock className="w-4 h-4 text-[#FF6600] shrink-0" />}
                      <span>{item.event}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-bold text-brand-blue whitespace-nowrap">
                    {item.date}
                  </td>
                  <td className="py-4 px-6 text-center whitespace-nowrap">
                    <span className={`inline-block px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${
                      item.status === 'Active'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : item.status === 'Closed'
                        ? 'bg-slate-200 text-slate-600'
                        : 'bg-blue-100 text-blue-800 border border-blue-200'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-600 text-xs">
                    {isHighlight ? (
                      <span className="text-[#FF6600] font-bold">Crucial Deadline • No Extension</span>
                    ) : (
                      <span>Via Microsoft CMT Portal (23:59 IST)</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Submission CTA Box */}
      <div className="bg-slate-50 border border-slate-300 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-base font-bold text-brand-navy">Ready to submit your manuscript?</h4>
          <p className="text-xs text-slate-600">Ensure your paper complies with Atlantis Press AISR author guidelines before submitting.</p>
        </div>
        <a
          href={hero.cmtLink || 'https://cmt3.research.microsoft.com'}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#FF6600] hover:bg-[#E65C00] transition-all shadow-xs inline-flex items-center gap-2 shrink-0"
        >
          <span>Submit via Microsoft CMT</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

    </div>
  );
}
