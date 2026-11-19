import React, { useState } from 'react';
import { Search, UserCheck, Globe, Building2, Award } from 'lucide-react';

export default function CommitteesTab({ content }) {
  const { committees } = content;
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Committees' },
    { id: 'leadership', label: 'Patrons & Chairs' },
    { id: 'steering', label: 'Steering Committee' },
    { id: 'advisory', label: 'International & National Advisory' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-extrabold uppercase tracking-wider text-brand-green bg-brand-mint px-3 py-1 rounded-full border border-emerald-200">
          Academic Leadership
        </span>
        <h1 className="text-3xl sm:text-4xl font-black font-heading text-brand-navy">
          Organizing & Advisory Committees
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Distinguished researchers, academic leaders, and IEEE MP section office-bearers guiding RAMSITA 2028.
        </p>
      </div>

      {/* Search & Category Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                activeCategory === c.id
                  ? 'bg-brand-navy text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by name / institute..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue outline-none"
          />
        </div>
      </div>

      {/* Leadership: Chief Patron & Patrons */}
      {(activeCategory === 'all' || activeCategory === 'leadership') && (
        <div className="space-y-4">
          <h2 className="text-lg font-black font-heading text-brand-navy border-b border-slate-200 pb-2">
            Chief Patron & Patrons
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {committees.chiefPatron.map((p, idx) => (
              <div key={idx} className="bg-gradient-to-br from-brand-navy to-brand-blue text-white p-5 rounded-2xl shadow-md space-y-1">
                <span className="text-[10px] uppercase font-bold text-emerald-400 block tracking-wider">
                  {p.role}
                </span>
                <h3 className="text-base font-bold">{p.name}</h3>
                <p className="text-xs text-slate-300">{p.affiliation}</p>
              </div>
            ))}
            {committees.patrons.map((p, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                <span className="text-[10px] uppercase font-bold text-brand-blue block tracking-wider">
                  {p.role}
                </span>
                <h3 className="text-base font-bold text-brand-navy">{p.name}</h3>
                <p className="text-xs text-slate-600">{p.affiliation}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* General Chairs */}
      {(activeCategory === 'all' || activeCategory === 'leadership') && (
        <div className="space-y-4">
          <h2 className="text-lg font-black font-heading text-brand-navy border-b border-slate-200 pb-2">
            Conference Chairs & Co-Chairs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {committees.chairs.map((c, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-emerald-200 bg-brand-mint/30 shadow-xs space-y-1">
                <span className="text-[10px] uppercase font-extrabold text-brand-green block tracking-wider">
                  {c.role}
                </span>
                <h3 className="text-base font-bold text-brand-navy">{c.name}</h3>
                <p className="text-xs text-slate-600">{c.affiliation}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Steering Committee */}
      {(activeCategory === 'all' || activeCategory === 'steering') && (
        <div className="space-y-4">
          <h2 className="text-lg font-black font-heading text-brand-navy border-b border-slate-200 pb-2">
            Steering Committee
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {committees.steering
              .filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((m, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-0.5">
                  <h4 className="text-xs font-bold text-brand-navy">{m.name}</h4>
                  <p className="text-[11px] text-slate-500">{m.role}</p>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* International & National Advisory */}
      {(activeCategory === 'all' || activeCategory === 'advisory') && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* International Advisory */}
          <div className="space-y-3">
            <h3 className="text-base font-black font-heading text-brand-navy flex items-center gap-2 border-b border-slate-200 pb-2">
              <Globe className="w-4 h-4 text-brand-blue" />
              <span>International Advisory Committee</span>
            </h3>
            <div className="space-y-2">
              {committees.advisoryInternational
                .filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.affiliation.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((m, idx) => (
                  <div key={idx} className="bg-white p-3 rounded-lg border border-slate-200 flex justify-between items-center text-xs">
                    <span className="font-bold text-brand-navy">{m.name}</span>
                    <span className="text-slate-500 font-medium text-right">{m.affiliation}</span>
                  </div>
                ))}
            </div>
          </div>

          {/* National Advisory */}
          <div className="space-y-3">
            <h3 className="text-base font-black font-heading text-brand-navy flex items-center gap-2 border-b border-slate-200 pb-2">
              <Building2 className="w-4 h-4 text-brand-green" />
              <span>National Advisory Committee</span>
            </h3>
            <div className="space-y-2">
              {committees.advisoryNational
                .filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.affiliation.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((m, idx) => (
                  <div key={idx} className="bg-white p-3 rounded-lg border border-slate-200 flex justify-between items-center text-xs">
                    <span className="font-bold text-brand-navy">{m.name}</span>
                    <span className="text-slate-500 font-medium text-right">{m.affiliation}</span>
                  </div>
                ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
