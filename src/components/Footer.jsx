import React from 'react';
import { Mail, MapPin, Globe, BookOpen, ExternalLink } from 'lucide-react';

export default function Footer({ meta, setActiveTab }) {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: Conference Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/logo.png" 
                alt="RAMSITA 2028 Logo" 
                className="h-10 w-auto object-contain brightness-125"
                onError={(e) => { e.target.src = '/logo.svg'; }}
              />
              <div>
                <span className="block text-sm font-extrabold text-white">RAMSITA 2028</span>
                <span className="text-[10px] text-emerald-400 font-semibold block">AITR Indore</span>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              3rd International Conference on Recent Advancement and Modernization in Sustainable Intelligent Technologies & Applications.
            </p>
            <div className="flex items-center gap-2 text-slate-300">
              <BookOpen className="w-4 h-4 text-brand-green" />
              <span>Springer Nature Proceedings (AISR)</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { id: 'home', label: 'Home' },
                { id: 'cfp', label: 'Call for Papers' },
                { id: 'dates', label: 'Important Dates' },
                { id: 'committees', label: 'Committees' },
                { id: 'registration', label: 'Registration Fees' },
                { id: 'gallery', label: 'Photo Gallery' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveTab(item.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Research Partners & Indexing */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Publication & Indexing</h4>
            <ul className="space-y-1.5 text-[11px] text-slate-400">
              <li>• Atlantis Press (Springer Nature Group)</li>
              <li>• Advances in Intelligent Systems Research</li>
              <li>• Scopus & Clarivate Web of Science CPCI</li>
              <li>• BJIT - Int. Journal of Information Technology</li>
              <li>• Hosted by Dept of CSIT & CSE (CY), AITR</li>
            </ul>
            <div className="pt-2">
              <a
                href="https://cmt3.research.microsoft.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold"
              >
                <span>Microsoft CMT Submission Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Col 4: Campus Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Conference Secretariat</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                <span>Acropolis Institute of Technology and Research, Bypass Road, Manglia Square, Indore, MP - 453771, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-blue shrink-0" />
                <a href={`mailto:${meta.email}`} className="text-white hover:underline">
                  {meta.email}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <p>© 2028 RAMSITA Conference • Acropolis Institute of Technology and Research. All Rights Reserved.</p>
          <p className="text-slate-500">
            Designed & Developed with Modern Single Page Architecture
          </p>
        </div>
      </div>
    </footer>
  );
}
