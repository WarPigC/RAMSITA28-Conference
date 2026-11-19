import React from 'react';
import { Award, Building, Compass, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';

export default function AboutUsTab({ content }) {
  const { about } = content;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-extrabold uppercase tracking-wider text-brand-blue bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          About the Host Institution
        </span>
        <h1 className="text-3xl sm:text-4xl font-black font-heading text-brand-navy">
          Acropolis Institute of Technology and Research
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Fostering technical innovation and academic excellence in Central India since 2005.
        </p>
      </div>

      {/* Main Overview & Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-2xl font-bold font-heading text-brand-navy">
            A Hub of Sustainable Innovation & Engineering
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            {about.overview}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            {about.rankings.map((r, idx) => (
              <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-brand-green" />
                  <h4 className="text-xs font-bold text-brand-navy">{r.title}</h4>
                </div>
                <p className="text-[11px] text-slate-600">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xl relative">
            <img 
              src="https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop&q=80" 
              alt="Acropolis Campus" 
              className="w-full h-72 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">5 Lakh Sq. Ft. Campus</span>
              <h4 className="text-base font-bold">Manglia Square, Bypass Road, Indore</h4>
            </div>
          </div>
        </div>

      </div>

      {/* Indore Travel & Culture */}
      <div className="bg-gradient-to-br from-brand-mint/60 via-slate-50 to-white rounded-3xl p-8 border border-emerald-200/80 space-y-6">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-brand-green" />
          <h3 className="text-xl font-bold font-heading text-brand-navy">
            {about.city.title}
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-4xl">
          {about.city.desc}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold">
          <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-green" />
            <span>Swachh Survekshan #1 Cleanest City</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-green" />
            <span>Devi Ahilyabai Holkar Airport (IDR)</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-green" />
            <span>Famous Sarafa & Chappan Dukan Food Street</span>
          </div>
        </div>
      </div>

    </div>
  );
}
