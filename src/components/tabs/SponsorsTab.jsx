import React from 'react';
import { Award, Check, Mail, Sparkles, TrendingUp, Users, Building, ShieldCheck } from 'lucide-react';

export default function SponsorsTab({ content }) {
  const { sponsors, meta } = content;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-extrabold uppercase tracking-wider text-brand-green bg-brand-mint px-3 py-1 rounded-full border border-emerald-200">
          Corporate & Industry Partnerships
        </span>
        <h1 className="text-3xl sm:text-4xl font-black font-heading text-brand-navy">
          {sponsors.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {sponsors.pitch}
        </p>
      </div>

      {/* Metrics & Delegate Reach Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {sponsors.stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs text-center space-y-1">
            <span className="text-2xl sm:text-3xl font-black font-heading text-brand-navy block">
              {stat.value}
            </span>
            <span className="text-xs font-semibold text-brand-blue uppercase tracking-wider">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Sponsorship Tier Packages */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sponsors.packages.map((pkg, idx) => {
          const isPlatinum = idx === 0;
          return (
            <div
              key={idx}
              className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all ${
                isPlatinum
                  ? 'bg-gradient-to-b from-brand-navy via-slate-900 to-brand-navy text-white shadow-xl ring-2 ring-emerald-400'
                  : 'bg-white border border-slate-200 text-slate-800 shadow-xs'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className={`text-lg font-bold font-heading ${isPlatinum ? 'text-white' : 'text-brand-navy'}`}>
                    {pkg.name}
                  </h3>
                  {isPlatinum && (
                    <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full">
                      Premier
                    </span>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-100/20">
                  <span className="text-3xl font-black font-heading">
                    {pkg.amount}
                  </span>
                </div>

                <ul className="space-y-2.5 pt-4 text-xs">
                  {pkg.perks.map((perk, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2">
                      <Check className={`w-4 h-4 shrink-0 mt-0.5 ${isPlatinum ? 'text-emerald-400' : 'text-brand-green'}`} />
                      <span className={isPlatinum ? 'text-slate-300' : 'text-slate-600'}>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6">
                <a
                  href={`mailto:${meta.email}?subject=RAMSITA 2028 Sponsorship Inquiry - ${pkg.name}`}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold text-center block transition-all ${
                    isPlatinum
                      ? 'bg-brand-green text-white hover:brightness-110 shadow-md'
                      : 'bg-slate-100 hover:bg-slate-200 text-brand-navy'
                  }`}
                >
                  Apply for {pkg.name}
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Custom Sponsorship Contact CTA */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center space-y-3">
        <h4 className="text-base font-bold text-brand-navy">Need a Customized Sponsorship Kit?</h4>
        <p className="text-xs text-slate-600 max-w-xl mx-auto">
          We offer bespoke arrangements including sponsored hackathons, specific keynote session naming rights, and institutional student grants.
        </p>
        <a
          href={`mailto:${meta.email}?subject=Custom Sponsorship Inquiry - RAMSITA 2028`}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-brand-navy text-white text-xs font-bold rounded-xl hover:bg-brand-blue transition-colors"
        >
          <Mail className="w-4 h-4" />
          <span>Contact Sponsorship Committee ({meta.email})</span>
        </a>
      </div>

    </div>
  );
}
