import React, { useState } from 'react';
import { Search, UserCheck, Globe, Building2, Award, Users } from 'lucide-react';

export default function CommitteesTab({ content }) {
  const { committees = {} } = content;
  const [searchTerm, setSearchTerm] = useState('');

  const sections = [
    {
      id: 'chiefPatron',
      title: 'Chief Patron',
      badge: 'Patronage',
      items: committees.chiefPatron || []
    },
    {
      id: 'patrons',
      title: 'Patrons',
      badge: 'Patronage',
      items: committees.patrons || []
    },
    {
      id: 'chairs',
      title: 'General Conference Chairs & Co-Chairs',
      badge: 'Executive Leadership',
      items: committees.chairs || []
    },
    {
      id: 'steering',
      title: 'Steering Committee',
      badge: 'Governance',
      items: committees.steering || []
    },
    {
      id: 'advisoryInternational',
      title: 'International Advisory Board',
      badge: 'Global Advisory',
      items: committees.advisoryInternational || []
    },
    {
      id: 'advisoryNational',
      title: 'National Advisory Board',
      badge: 'National Advisory',
      items: committees.advisoryNational || []
    }
  ];

  const filterItem = (item) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      item.name?.toLowerCase().includes(term) ||
      item.role?.toLowerCase().includes(term) ||
      item.affiliation?.toLowerCase().includes(term)
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 bg-white">
      
      {/* Header Banner */}
      <div className="bg-[#0A2540] text-white p-8 sm:p-10 border-b-4 border-brand-green shadow-xs">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
            Academic Governance
          </span>
          <h1 className="text-2xl sm:text-4xl font-black font-heading tracking-tight">
            Committees & Advisory Board
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Distinguished academicians, international professors, and institutional leaders steering the peer review, program structure, and publication excellence of RAMSITA 2028.
          </p>
        </div>
      </div>

      {/* Search Bar (Sharp border, no curved boxes) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-300 bg-slate-50 p-4">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-2">
          <Users className="w-4 h-4 text-brand-navy" />
          <span>Academic Directory Index</span>
        </div>
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by name, role, or institution..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 bg-white focus:outline-none focus:border-brand-navy"
          />
        </div>
      </div>

      {/* Directory Sections (Replacing cards with a clean list format that fades in) */}
      <div className="space-y-10">
        {sections.map((section) => {
          const filteredItems = section.items.filter(filterItem);
          if (filteredItems.length === 0) return null;

          return (
            <div key={section.id} className="scroll-fade space-y-3">
              
              {/* Category Header Ribbon (Visually Well-Separated) */}
              <div className="bg-[#0A2540] text-white px-5 py-3 flex items-center justify-between border-l-4 border-amber-400">
                <h2 className="text-sm sm:text-base font-extrabold uppercase tracking-wider">
                  {section.title}
                </h2>
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-300 bg-white/10 px-2.5 py-0.5">
                  {section.badge} ({filteredItems.length})
                </span>
              </div>

              {/* List Format Table/Roster (No curved boxes, sharp border) */}
              <div className="border border-slate-300 bg-white divide-y divide-slate-200">
                {filteredItems.map((member, idx) => (
                  <div 
                    key={idx}
                    className="p-4 sm:px-6 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50 transition-colors"
                  >
                    <div className="space-y-0.5">
                      <h3 className="text-sm sm:text-base font-bold text-brand-navy">
                        {member.name}
                      </h3>
                      {member.role && (
                        <span className="text-xs font-semibold text-brand-green block">
                          {member.role}
                        </span>
                      )}
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="text-xs text-slate-600 font-medium block">
                        {member.affiliation}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
