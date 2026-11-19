import React, { useState } from 'react';
import { Check, Copy, ExternalLink, QrCode, Building, CreditCard, AlertCircle } from 'lucide-react';

export default function RegistrationTab({ content }) {
  const { registration } = content;
  const [currency, setCurrency] = useState('inr'); // 'inr' or 'usd'
  const [copiedField, setCopiedField] = useState(null);

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-extrabold uppercase tracking-wider text-brand-green bg-brand-mint px-3 py-1 rounded-full border border-emerald-200">
          Author & Delegate Passes
        </span>
        <h1 className="text-3xl sm:text-4xl font-black font-heading text-brand-navy">
          Conference Registration & Fees
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          All registration packages include paper presentation, Springer Nature publication eligibility, certificates, and access to all keynote sessions.
        </p>

        {/* Currency Switcher */}
        <div className="inline-flex items-center p-1 bg-slate-200 rounded-xl text-xs font-bold">
          <button
            onClick={() => setCurrency('inr')}
            className={`px-4 py-1.5 rounded-lg transition-all ${
              currency === 'inr'
                ? 'bg-brand-navy text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Indian Delegates (INR ₹)
          </button>
          <button
            onClick={() => setCurrency('usd')}
            className={`px-4 py-1.5 rounded-lg transition-all ${
              currency === 'usd'
                ? 'bg-brand-navy text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Foreign Delegates (USD $)
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {registration.fees.map((tier, idx) => {
          const isFeatured = idx === 0;
          return (
            <div
              key={idx}
              className={`rounded-2xl p-6 flex flex-col justify-between transition-all ${
                isFeatured
                  ? 'bg-gradient-to-b from-brand-navy to-brand-blue text-white shadow-xl ring-2 ring-emerald-400'
                  : 'bg-white border border-slate-200 text-slate-800 shadow-xs hover:shadow-md'
              }`}
            >
              <div className="space-y-4">
                {isFeatured && (
                  <span className="text-[10px] font-black uppercase tracking-wider bg-brand-green text-white px-2.5 py-0.5 rounded-full inline-block">
                    Most Popular
                  </span>
                )}
                <h3 className={`text-base font-bold leading-snug ${isFeatured ? 'text-white' : 'text-brand-navy'}`}>
                  {tier.category}
                </h3>

                <div className="pt-2 border-t border-slate-100/20">
                  <span className="text-3xl font-black font-heading">
                    {currency === 'inr' ? `₹ ${tier.inr.toLocaleString()}` : `$ ${tier.usd}`}
                  </span>
                  <span className={`text-[11px] block ${isFeatured ? 'text-slate-300' : 'text-slate-500'}`}>
                    Inclusive of 18% GST
                  </span>
                </div>

                <ul className="space-y-2 pt-2 text-xs">
                  {tier.perks.map((perk, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2">
                      <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${isFeatured ? 'text-emerald-400' : 'text-brand-green'}`} />
                      <span className={isFeatured ? 'text-slate-200' : 'text-slate-600'}>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6">
                <a
                  href="https://forms.gle/ramsita2028"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold text-center block transition-all ${
                    isFeatured
                      ? 'bg-brand-green text-white hover:brightness-110 shadow-md'
                      : 'bg-slate-100 hover:bg-brand-mint text-brand-navy hover:text-brand-green border border-slate-200'
                  }`}
                >
                  Register in this Category
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Payment Information & Bank Account Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Bank Wire Details */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-2">
            <Building className="w-5 h-5 text-brand-blue" />
            <h3 className="text-lg font-bold font-heading text-brand-navy">
              Direct Bank Transfer / NEFT / IMPS / Wire
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Account Name</span>
                <span className="font-bold text-slate-800">{registration.bank.accountName}</span>
              </div>
              <button 
                onClick={() => copyToClipboard(registration.bank.accountName, 'accName')}
                className="p-1 text-slate-400 hover:text-brand-blue"
              >
                {copiedField === 'accName' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Account Number</span>
                <span className="font-bold text-slate-800 font-mono text-sm">{registration.bank.accountNumber}</span>
              </div>
              <button 
                onClick={() => copyToClipboard(registration.bank.accountNumber, 'accNo')}
                className="p-1 text-slate-400 hover:text-brand-blue"
              >
                {copiedField === 'accNo' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Bank Name & Branch</span>
                <span className="font-bold text-slate-800">{registration.bank.bankName} ({registration.bank.branch})</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">IFSC Code</span>
                <span className="font-bold text-slate-800 font-mono text-sm">{registration.bank.ifsc}</span>
              </div>
              <button 
                onClick={() => copyToClipboard(registration.bank.ifsc, 'ifsc')}
                className="p-1 text-slate-400 hover:text-brand-blue"
              >
                {copiedField === 'ifsc' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

          </div>

          <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>Crucial Step:</strong> After initiating payment via Net Banking or UPI, please note down the <strong>UTR / Transaction Reference Number</strong> and take a screenshot of the receipt. You will be required to upload it in the conference registration form.
            </span>
          </div>
        </div>

        {/* UPI QR Code Block */}
        <div className="lg:col-span-4 bg-gradient-to-b from-brand-navy to-slate-900 text-white rounded-2xl p-6 shadow-md text-center space-y-4">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400">
            <QrCode className="w-4 h-4" />
            <span>UPI Instant Payment</span>
          </div>

          <div className="bg-white p-4 rounded-xl inline-block shadow-inner mx-auto">
            {/* Visual SVG QR representation */}
            <svg className="w-36 h-36 mx-auto text-slate-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
              <circle cx="6.5" cy="6.5" r="1.5" fill="currentColor"></circle>
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"></circle>
              <circle cx="17.5" cy="17.5" r="1.5" fill="currentColor"></circle>
              <circle cx="6.5" cy="17.5" r="1.5" fill="currentColor"></circle>
            </svg>
          </div>

          <div className="text-xs space-y-1">
            <span className="text-slate-400 block text-[11px]">UPI VPA ID:</span>
            <span className="font-mono font-bold text-white bg-white/10 px-3 py-1 rounded-lg inline-block">
              {registration.bank.upiId}
            </span>
          </div>

          <a
            href="https://forms.gle/ramsita2028"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 bg-brand-green hover:brightness-110 text-white font-bold text-xs rounded-xl block shadow transition-all"
          >
            Fill Registration Form →
          </a>
        </div>

      </div>

    </div>
  );
}
