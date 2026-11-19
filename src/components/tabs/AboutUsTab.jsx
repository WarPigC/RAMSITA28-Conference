import React from 'react';
import { Award, Building, Compass, Sparkles, MapPin, CheckCircle2, ShieldCheck, Cpu, Users, ArrowUpRight } from 'lucide-react';

export default function AboutUsTab({ content }) {
  const { about = {} } = content;
  const spotlights = about.department_spotlights || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 bg-white">
      
      {/* Header Banner */}
      <div className="bg-[#0A2540] text-white p-8 sm:p-10 border-b-4 border-brand-green shadow-xs">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
            Institutional Legacy
          </span>
          <h1 className="text-2xl sm:text-4xl font-black font-heading tracking-tight">
            About Acropolis Institute (AITR)
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Acropolis Institute of Technology and Research, Indore — A premier institution fostering technical excellence, scientific research, and global academic partnerships since 2005.
          </p>
        </div>
      </div>

      {/* Overview & Accolades Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Overview & Rankings */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-brand-navy">
              A Hub of Sustainable Innovation & Engineering Education
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
              {about.overview || 
                'Acropolis Institute of Technology and Research (AITR), situated in Indore, Madhya Pradesh, commenced its journey of excellence in 2005. Spread across 5 Lakh square feet of lush green eco-friendly campus with globally acknowledged modern infrastructure, the institute is dedicated to high-standard education and interdisciplinary scientific research.'}
            </p>
          </div>

          {/* Accolades (Sharp, non-curved boxes per user request) */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Institutional Accolades & Credentials
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(about.rankings || []).map((r, idx) => (
                <div key={idx} className="p-4 bg-slate-50 border border-slate-300 space-y-1">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-brand-green shrink-0" />
                    <h4 className="text-xs font-bold text-brand-navy">{r.title}</h4>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{r.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Campus Image Frame (Sharp non-curved frame) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="border border-slate-300 overflow-hidden relative shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop&q=80" 
              alt="Acropolis Institute Campus" 
              className="w-full h-72 sm:h-80 object-cover"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">5 Lakh Sq. Ft. Green Campus</span>
              <h4 className="text-sm font-bold">Bypass Road, Manglia Square, Indore</h4>
            </div>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 text-[11px] text-slate-600 text-center">
            Recognized by AICTE New Delhi • Affiliated to RGPV Bhopal • NAAC & NBA Accredited
          </div>
        </div>

      </div>

      {/* DEPARTMENT SPOTLIGHT (Revamped UI Element replacing plain organizers text) */}
      <div className="space-y-6 pt-4">
        <div className="border-b-2 border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-green">
              Organizing Academic Units
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-brand-navy">
              Departmental Spotlight Showcase
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Core host departments driving RAMSITA 2028
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {spotlights.map((dept) => (
            <div 
              key={dept.id}
              className="bg-white border border-slate-300 flex flex-col justify-between shadow-xs hover:border-brand-navy transition-all"
            >
              {dept.image && (
                <div className="h-48 bg-slate-100 overflow-hidden relative border-b border-slate-200">
                  <img 
                    src={dept.image} 
                    alt={dept.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#0A2540] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5">
                    Host Department
                  </div>
                </div>
              )}

              <div className="p-6 space-y-3">
                <div>
                  <h3 className="text-lg font-bold text-brand-navy">
                    {dept.name}
                  </h3>
                  <span className="text-xs font-bold text-brand-green block mt-0.5">
                    {dept.head}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed text-justify">
                  {dept.description}
                </p>

                {dept.highlights && (
                  <div className="pt-2 border-t border-slate-100 space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Key Highlights:
                    </span>
                    <ul className="space-y-1 text-xs text-slate-700">
                      {dept.highlights.map((hl, hIdx) => (
                        <li key={hIdx} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-green shrink-0" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Indore Travel & Culture */}
      <div className="bg-slate-50 border border-slate-300 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-brand-navy">
          <MapPin className="w-5 h-5 text-[#FF6600]" />
          <h3 className="text-xl font-bold font-heading">
            {about?.city?.title || "Welcome to Indore — India's Cleanest City"}
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
          {about?.city?.desc || 
            "Awarded India's cleanest city for 7 consecutive years under Swachh Survekshan, Indore is the cultural and commercial capital of Central India. Famous for its culinary hubs like Sarafa Bazaar and Chappan Dukan, as well as historic Rajwada Palace and Devi Ahilyabai Holkar Airport, Indore warmly welcomes international scholars."}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-semibold">
          <div className="p-3 bg-white border border-slate-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
            <span>#1 Cleanest City (7 Consecutive Years)</span>
          </div>
          <div className="p-3 bg-white border border-slate-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
            <span>Devi Ahilyabai Holkar Airport (IDR)</span>
          </div>
          <div className="p-3 bg-white border border-slate-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
            <span>Historic Sarafa & Chappan Dukan Hub</span>
          </div>
        </div>
      </div>

    </div>
  );
}
