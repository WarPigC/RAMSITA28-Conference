import React, { useState } from 'react';
import { Menu, X, Edit3, Send, ExternalLink, Calendar } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenEditor, meta }) {
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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Conference Name */}
          <div 
            onClick={() => handleTabClick('home')}
            className="flex items-center gap-3 cursor-pointer group py-1"
          >
            <div className="relative h-12 w-auto flex items-center">
              {/* Uses the new logo */}
              <img 
                src="/logo.png" 
                alt="RAMSITA 2028 Logo" 
                className="h-12 w-auto object-contain transition-transform group-hover:scale-105"
                onError={(e) => {
                  e.target.src = '/logo.svg';
                }}
              />
            </div>
            <div className="hidden sm:block border-l border-slate-200 pl-3">
              <span className="block text-sm font-extrabold tracking-tight text-brand-navy">
                RAMSITA 2028
              </span>
              <span className="block text-[11px] font-semibold text-brand-green uppercase tracking-wider">
                AITR Indore • Springer Nature
              </span>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all relative ${
                    isActive
                      ? 'text-brand-blue bg-brand-mint text-brand-green shadow-xs'
                      : 'text-slate-600 hover:text-brand-navy hover:bg-slate-100/80'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-brand-blue to-brand-green rounded-full"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Live In-Website Content Editor Button */}
            <button
              onClick={onOpenEditor}
              title="Edit Page Content (with Security Validation)"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-brand-navy bg-slate-100 hover:bg-brand-mint hover:text-brand-green border border-slate-300 rounded-lg transition-all shadow-xs"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Page</span>
            </button>

            {/* Quick Submit CTA */}
            <a
              href="https://cmt3.research.microsoft.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-brand-blue to-brand-green hover:from-brand-navy hover:to-brand-green rounded-lg shadow-sm hover:shadow-md transition-all transform hover:-translate-y-0.5"
            >
              <span>Submit via CMT</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenEditor}
              className="p-2 text-slate-600 hover:text-brand-navy rounded-lg hover:bg-slate-100"
              title="Edit Content"
            >
              <Edit3 className="w-5 h-5 text-brand-blue" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-brand-navy hover:bg-slate-100 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-1 shadow-xl">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === item.id
                  ? 'bg-brand-mint text-brand-green font-bold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <a
              href="https://cmt3.research.microsoft.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-2.5 px-4 rounded-lg bg-gradient-to-r from-brand-blue to-brand-green text-white font-bold text-sm shadow-sm"
            >
              Submit Paper via CMT
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
