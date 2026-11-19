import React from 'react';
import { Calendar, Clock, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

export default function ImportantDatesTab({ content }) {
  const { important_dates, meta } = content;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-extrabold uppercase tracking-wider text-brand-blue bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Chronological Deadlines
        </span>
        <h1 className="text-3xl font-black font-heading text-brand-navy">
          Important Dates & Deadlines
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          All deadlines are 23:59 IST (Indian Standard Time). Authors are encouraged to submit ahead of time.
        </p>
      </div>

      {/* Visual Timeline */}
      <div className="relative border-l-2 border-emerald-500/30 ml-4 sm:ml-8 space-y-8 py-2">
        {important_dates.map((item, idx) => {
          const isHighlight = item.highlight;
          return (
            <div key={item.id} className="relative pl-6 sm:pl-8 group">
              {/* Dot Icon */}
              <div className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 border-white shadow-xs transition-transform group-hover:scale-125 ${
                isHighlight ? 'bg-brand-green ring-4 ring-emerald-100' : 'bg-brand-blue'
              }`}></div>

              {/* Card */}
              <div className={`p-5 rounded-2xl border transition-all ${
                isHighlight 
                  ? 'bg-gradient-to-r from-emerald-50/80 to-white border-emerald-300 shadow-sm'
                  : 'bg-white border-slate-200 shadow-xs hover:border-slate-300'
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
                  <h3 className="text-base font-bold text-brand-navy">
                    {item.event}
                  </h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider self-start sm:self-auto ${
                    item.status === 'Active'
                      ? 'bg-emerald-100 text-emerald-800 animate-pulse'
                      : item.status === 'Closed'
                      ? 'bg-slate-100 text-slate-500'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {item.status}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-brand-blue">
                  <Calendar className="w-4 h-4 text-brand-green" />
                  <span>{item.date}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Note box */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 text-center leading-relaxed">
        <strong>Notice to Authors:</strong> Notifications of acceptance will be dispatched directly to the corresponding author's registered email via Microsoft CMT.
      </div>

    </div>
  );
}
