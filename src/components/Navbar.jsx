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
    { id: 'contact', label: 'Contact Us' },
    { id: 'gallery', label: 'Gallery' },
  ];

  const handleTabClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24 gap-4">
          
          {/* Logo & Conference Name (Enlarged to fit height, no text wrapping) */}
          <div 
            onClick={() => handleTabClick('home')}
            className="flex items-center gap-3.5 cursor-pointer group py-1 shrink-0"
          >
            <div className="h-16 sm:h-20 w-auto flex items-center shrink-0">
              <img 
                src="/logo.png" 
                alt="RAMSITA 2028 Logo" 
                className="h-16 sm:h-20 w-auto object-contain transition-transform group-hover:scale-105"
                onError={(e) => {
                  e.target.src = '/image.png';
                }}
              />
            </div>
            <div className="border-l-2 border-slate-300 pl-3.5 shrink-0 whitespace-nowrap">
              <span className="block text-lg sm:text-xl font-extrabold tracking-tight text-brand-navy leading-tight">
                RAMSITA 2028
              </span>
              <span className="block text-[11px] sm:text-xs font-bold text-brand-green uppercase tracking-wide">
                AITR Indore
              </span>
            </div>
          </div>

          {/* Desktop Navigation Tabs (Nudged slightly to the right, sitting in the middle like IJAITR) */}
          <div className="hidden xl:flex items-center flex-1 ml-6 2xl:ml-12">
            <nav className="flex items-center space-x-1 lg:space-x-1.5">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    className={`px-3.5 py-2.5 text-[13px] 2xl:text-[14px] font-semibold transition-all relative flex items-center whitespace-nowrap ${
                      isActive
                        ? 'text-brand-navy font-bold after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:bg-brand-navy'
                        : 'text-slate-700 hover:text-brand-navy hover:bg-slate-50'
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Desktop Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0 ml-auto xl:ml-0">
            {/* Live In-Website Content Editor Button */}
            <button
              onClick={onOpenEditor}
              title="Edit Page Content"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-all cursor-pointer whitespace-nowrap"
            >
              <Edit3 className="w-3.5 h-3.5 text-brand-green" />
              <span>Edit Page</span>
            </button>

            {/* Quick Submit CTA - High-contrast Orange CTA like IJAITR */}
            <a
              href="https://cmt3.research.microsoft.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#FF6600] hover:bg-[#E65C00] transition-all shadow-xs whitespace-nowrap"
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
                className={`block w-full text-left px-3 py-2.5 text-xs font-bold tracking-wide transition-all ${
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
