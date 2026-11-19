import React, { useState } from 'react';
import { Menu, X, Edit3, ExternalLink } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenEditor }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'cfp', label: 'Call for Papers' },
    { id: 'dates', label: 'Important Dates' },
    { id: 'committees', label: 'Committees' },
    { id: 'registration', label: 'Registration' },
    { id: 'about', label: 'About Us' },
    { id: 'sponsors', label: 'Sponsors' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleTabClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Conference Name */}
          <div 
            onClick={() => handleTabClick('home')}
            className="flex items-center gap-3 cursor-pointer group py-1"
          >
            <div className="h-14 w-auto flex items-center">
              <img 
                src="/logo.png" 
                alt="RAMSITA 2028 Logo" 
                className="h-14 w-auto object-contain transition-transform group-hover:scale-105"
                onError={(e) => {
                  e.target.src = '/image.png';
                }}
              />
            </div>
            <div className="border-l border-slate-300 pl-3">
              <span className="block text-base font-extrabold tracking-tight text-brand-navy">
                RAMSITA 2028
              </span>
              <span className="block text-[11px] font-semibold text-brand-green uppercase tracking-wide">
                AITR Indore • Springer Nature AISR
              </span>
            </div>
          </div>

          {/* Desktop Navigation Tabs - Exactly like IJAITR, clean sans-serif */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`px-3 py-2 text-xs font-bold uppercase tracking-wider transition-all relative ${
                    isActive
                      ? 'text-brand-blue bg-blue-50/80 border-b-2 border-brand-blue'
                      : 'text-slate-700 hover:text-brand-navy hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop Right Action Buttons */}
          <div className="hidden md:flex items-center gap-2">
            {/* Live In-Website Content Editor Button */}
            <button
              onClick={onOpenEditor}
              title="Edit Page Content"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-all cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5 text-brand-green" />
              <span>Edit Page</span>
            </button>

            {/* Quick Submit CTA - High-contrast Orange CTA like IJAITR */}
            <a
              href="https://cmt3.research.microsoft.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#FF6600] hover:bg-[#E65C00] transition-all shadow-xs"
            >
              <span>Submit [CMT]</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={onOpenEditor}
              className="p-2 text-xs font-bold text-slate-700 bg-slate-100 border border-slate-300"
              title="Edit Page Content"
            >
              <Edit3 className="w-4 h-4 text-brand-green" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-brand-navy hover:bg-slate-100 border border-slate-200 focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`block w-full text-left px-3 py-2.5 text-xs font-bold uppercase tracking-wider transition-all ${
                  isActive
                    ? 'text-brand-blue bg-blue-50 border-l-4 border-brand-blue font-black'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <div className="pt-3 border-t border-slate-200">
            <a
              href="https://cmt3.research.microsoft.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#FF6600] hover:bg-[#E65C00]"
            >
              Submit Paper via CMT
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
