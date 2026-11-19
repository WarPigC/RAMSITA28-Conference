import React from 'react';
import { Mail, MapPin, ExternalLink, ChevronRight } from 'lucide-react';

export default function Footer({ meta = {}, setActiveTab }) {
  const quickLinks = [
    { id: 'cfp', label: 'Call For Papers' },
    { id: 'dates', label: 'Important Dates' },
    { id: 'committees', label: 'Our Committee' },
    { id: 'registration', label: 'Registration' },
    { id: 'about', label: 'About Us' },
    { id: 'sponsors', label: 'Sponsors' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNav = (tabId) => {
    if (setActiveTab) {
      setActiveTab(tabId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#0A2540] text-slate-300 border-t-4 border-[#77B232] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          
          {/* Column 1: About Us & Socials */}
          <div className="space-y-4">
            <h4 className="text-base font-bold font-heading text-white uppercase tracking-wider border-b border-slate-700/60 pb-2">
              About Us
            </h4>
            <p className="text-slate-300 text-xs leading-relaxed text-justify">
              The 3rd International Conference on Recent Advancement and Modernization in Sustainable Intelligent Technologies & Applications (RAMSITA - 2028) is being organized in Hybrid Mode by Acropolis Institute of Technology and Research, Indore, MP, India.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-2">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/acropolis_aitr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-none bg-slate-800 hover:bg-[#0C5B94] text-white flex items-center justify-center transition-colors border border-slate-700"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              {/* Facebook */}
              <a
                href="https://www.facebook.com/acropolisinstitute"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-none bg-slate-800 hover:bg-[#0C5B94] text-white flex items-center justify-center transition-colors border border-slate-700"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.595 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/school/acropolis-institute-of-technology-&-research-indore"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-none bg-slate-800 hover:bg-[#0C5B94] text-white flex items-center justify-center transition-colors border border-slate-700"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                </svg>
              </a>
              {/* X / Twitter */}
              <a
                href="https://twitter.com/acropolisindore"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-none bg-slate-800 hover:bg-[#0C5B94] text-white flex items-center justify-center transition-colors border border-slate-700"
                aria-label="X (Twitter)"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-base font-bold font-heading text-white uppercase tracking-wider border-b border-slate-700/60 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNav(item.id)}
                    className="hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-1.5 text-slate-300 cursor-pointer"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#77B232]" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Us */}
          <div className="space-y-4">
            <h4 className="text-base font-bold font-heading text-white uppercase tracking-wider border-b border-slate-700/60 pb-2">
              Contact Us
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-slate-300">
                <div className="w-8 h-8 bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
                  <Mail className="w-4 h-4 text-[#77B232]" />
                </div>
                <a 
                  href={`mailto:${meta.email || 'ramsita@acropolis.in'}`} 
                  className="text-white hover:text-[#77B232] transition-colors break-all font-semibold"
                >
                  {meta.email || 'ramsita@acropolis.in'}
                </a>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                For conference inquiries, paper submissions, and registration queries, please write to the secretariat.
              </p>
            </div>
          </div>

          {/* Column 4: Campus Address */}
          <div className="space-y-4">
            <h4 className="text-base font-bold font-heading text-white uppercase tracking-wider border-b border-slate-700/60 pb-2">
              Campus Address
            </h4>
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700 mt-0.5">
                <MapPin className="w-4 h-4 text-[#77B232]" />
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                Acropolis Institute of Technology and Research, Bypass Road, Manglia Square, Manglia, Indore, Madhya Pradesh - 453771, India
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© All Rights Reserved to RAMSITA Conference 2028</p>
          <p className="text-slate-500">
            Acropolis Institute of Technology and Research, Indore
          </p>
        </div>
      </div>
    </footer>
  );
}
