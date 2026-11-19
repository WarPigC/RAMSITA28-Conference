import React, { useState } from 'react';
import { Check, Copy, ExternalLink, QrCode, Building, CreditCard, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function RegistrationTab({ content }) {
  const { registration = {}, hero = {} } = content;
  const [currency, setCurrency] = useState('inr');
  const [copiedField, setCopiedField] = useState(null);

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const defaultNotes = [
    'Registration fee covers publication in Atlantis Press (Springer Nature) AISR series (ISSN: 1951-6851).',
    'Up to 6 pages allowed per paper under standard fee. Extra pages charged at ₹1,000 (INR) or $25 (USD) per page (maximum 2 extra pages).',
    'At least one author of each accepted paper must register with a Full Author Registration fee and present the paper during the conference.',
    'Hybrid Mode available: Authors may present in-person at AITR Indore campus or virtually via video conference.',
    'Registration includes presentation certificate, delegate conference kit, proceedings download, and conference banquet for physical attendees.'
  ];

  const bulletNotes = registration?.notes || defaultNotes;

  // Distinct color palettes per card tier: no border, no curved boxes
  const tierColors = [
    { bg: 'bg-[#0A2540]', text: 'text-white', badge: 'bg-emerald-500 text-white', accent: 'text-emerald-300' }, // Academic Author
    { bg: 'bg-[#065F46]', text: 'text-white', badge: 'bg-amber-400 text-slate-900', accent: 'text-amber-300' }, // Industry
    { bg: 'bg-[#1E40AF]', text: 'text-white', badge: 'bg-cyan-400 text-slate-900', accent: 'text-cyan-300' },    // Attendee / Foreign
    { bg: 'bg-[#1E293B]', text: 'text-white', badge: 'bg-purple-400 text-slate-900', accent: 'text-purple-300' } // Poster / Special
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 bg-white">
      
      {/* Header Banner */}
      <div className="bg-[#0A2540] text-white p-8 sm:p-10 border-b-4 border-brand-green shadow-xs">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
            Author & Delegate Registration
          </span>
          <h1 className="text-2xl sm:text-4xl font-black font-heading tracking-tight">
            Conference Registration & Fees
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            All accepted and presented papers fulfilling Springer Nature standards will be published in the Atlantis Press AISR series. Select your registration category below.
          </p>
        </div>
      </div>

      {/* 1. CRITICAL NOTES PLACED AT THE TOP IN BULLET POINTS (User requirement) */}
      <div className="bg-amber-50/80 border-l-4 border-[#FF6600] p-6 sm:p-8 space-y-3">
        <div className="flex items-center gap-2 text-brand-navy">
          <AlertCircle className="w-5 h-5 text-[#FF6600] shrink-0" />
          <h3 className="text-base font-bold font-heading uppercase tracking-wide">
            Important Author Registration Guidelines & Policy Notes
          </h3>
        </div>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-800 leading-relaxed">
          {bulletNotes.map((note, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="text-[#FF6600] font-black text-base leading-none">•</span>
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Currency Toggle */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
            Select Currency View
          </span>
          <h3 className="text-lg font-bold text-brand-navy">
            Registration Fee Categories
          </h3>
        </div>
        <div className="inline-flex border border-slate-300 bg-slate-100 p-0.5">
          <button
            onClick={() => setCurrency('inr')}
            className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              currency === 'inr'
                ? 'bg-brand-navy text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Indian Authors (₹ INR)
          </button>
          <button
            onClick={() => setCurrency('usd')}
            className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              currency === 'usd'
                ? 'bg-brand-navy text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Foreign Authors ($ USD)
          </button>
        </div>
      </div>

      {/* 2. CARDS WITH NO BORDER, NO CURVED BOXES, CLEAR COLOURS & PRICES (User requirement) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {(registration?.fees || []).map((tier, idx) => {
          const colorTheme = tierColors[idx % tierColors.length];
          return (
            <div
              key={idx}
              className={`${colorTheme.bg} ${colorTheme.text} border-0 rounded-none p-6 sm:p-7 flex flex-col justify-between shadow-md space-y-6`}
            >
              <div className="space-y-4">
                <span className={`inline-block px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-none ${colorTheme.badge}`}>
                  Category 0{idx + 1}
                </span>

                <h3 className="text-lg font-bold leading-snug min-h-[50px]">
                  {tier.category}
                </h3>

                <div className="pt-3 border-t border-white/20">
                  <div className="text-3xl sm:text-4xl font-black font-heading tracking-tight">
                    {currency === 'inr' ? `₹ ${tier.inr.toLocaleString()}` : `$ ${tier.usd}`}
                  </div>
                  <span className={`text-[11px] block mt-1 uppercase font-semibold ${colorTheme.accent}`}>
                    {currency === 'inr' ? 'GST included • Per paper' : 'International delegate fee'}
                  </span>
                </div>

                <ul className="space-y-2 pt-3 border-t border-white/10 text-xs text-slate-200">
                  {tier.perks.map((perk, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4">
                <a
                  href={hero.registrationLink || 'https://forms.gle/ramsita2028'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-3 text-xs font-bold uppercase tracking-wider text-slate-900 bg-white hover:bg-slate-100 transition-all shadow-sm rounded-none"
                >
                  Register Now
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Bank Account & Wire Details */}
      <div className="border border-slate-300 bg-slate-50 p-6 sm:p-8 space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-green block">
            Payment Methods
          </span>
          <h3 className="text-xl font-bold font-heading text-brand-navy">
            Bank Account Transfer & Domestic UPI Details
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Bank Wire Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Direct NEFT / RTGS / IMPS Transfer
            </h4>
            
            <div className="bg-white border border-slate-200 divide-y divide-slate-200 text-xs">
              <div className="p-3 flex items-center justify-between">
                <span className="text-slate-500 font-medium">Beneficiary Name</span>
                <span className="font-bold text-brand-navy">{registration?.bank?.accountName || 'Acropolis Institute of Technology & Research'}</span>
              </div>
              <div className="p-3 flex items-center justify-between">
                <span className="text-slate-500 font-medium">Bank Name & Branch</span>
                <span className="font-bold text-brand-navy">{registration?.bank?.bankName || 'HDFC Bank'}, {registration?.bank?.branch || 'Indore'}</span>
              </div>
              <div className="p-3 flex items-center justify-between">
                <span className="text-slate-500 font-medium">Account Number</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-brand-blue">{registration?.bank?.accountNumber || '50200052357130'}</span>
                  <button
                    onClick={() => copyToClipboard(registration?.bank?.accountNumber || '50200052357130', 'acc')}
                    className="p-1 text-slate-400 hover:text-brand-navy cursor-pointer"
                    title="Copy Account Number"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="p-3 flex items-center justify-between">
                <span className="text-slate-500 font-medium">IFSC Code</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-brand-navy">{registration?.bank?.ifsc || 'HDFC0000036'}</span>
                  <button
                    onClick={() => copyToClipboard(registration?.bank?.ifsc || 'HDFC0000036', 'ifsc')}
                    className="p-1 text-slate-400 hover:text-brand-navy cursor-pointer"
                    title="Copy IFSC Code"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {copiedField && (
              <p className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Copied to clipboard!</span>
              </p>
            )}
          </div>

          {/* UPI ID & Domestic Payment */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Domestic UPI & QR Payment
            </h4>
            <div className="bg-white border border-slate-200 p-4 space-y-3 text-xs">
              <p className="text-slate-600">
                Authors within India may make registration payments via Google Pay, PhonePe, Paytm, or BHIM using the official institute UPI ID:
              </p>
              <div className="flex items-center justify-between p-3 bg-slate-100 font-mono font-bold text-brand-navy border border-slate-300">
                <span>{registration?.bank?.upiId || 'acropolis@hdfcbank'}</span>
                <button
                  onClick={() => copyToClipboard(registration?.bank?.upiId || 'acropolis@hdfcbank', 'upi')}
                  className="text-brand-blue hover:text-brand-navy font-sans text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy UPI ID</span>
                </button>
              </div>
              <p className="text-[11px] text-slate-500 italic">
                * Note: Please retain the 12-digit UPI Transaction ID (UTR) or NEFT reference receipt to upload into the Google registration form.
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
