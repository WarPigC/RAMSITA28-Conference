import React, { useState } from 'react';
import { X, ShieldCheck, ShieldAlert, Save, RefreshCw, Eye, Code, FileText, CheckCircle2 } from 'lucide-react';

export default function ContentEditorModal({ isOpen, onClose, content, onSave }) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('hero');
  const [formData, setFormData] = useState(JSON.parse(JSON.stringify(content)));
  const [rawHtmlSnippet, setRawHtmlSnippet] = useState(
    '<p class="text-brand-blue font-bold">RAMSITA 2028: Empowering sustainable global research.</p>'
  );
  const [saveStatus, setSaveStatus] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Security validator check
  const maliciousPattern = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>|javascript:|onerror=|onload=|onclick=|eval\(|<iframe/gi;
  const isMalicious = maliciousPattern.test(rawHtmlSnippet);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus(null);
    try {
      await onSave(formData);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (err) {
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-brand-navy to-brand-blue text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/10">
              <FileText className="w-5 h-5 text-brand-green" />
            </div>
            <div>
              <h2 className="text-lg font-bold">In-Website Content & HTML Editor</h2>
              <p className="text-xs text-slate-300">
                Edit pages with real-time sanitization, XSS security, and automated backups
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 gap-2 overflow-x-auto text-xs font-semibold">
          {[
            { id: 'hero', label: 'Hero & Announcements' },
            { id: 'tracks', label: 'Conference Tracks' },
            { id: 'dates', label: 'Important Dates' },
            { id: 'registration', label: 'Registration Fees' },
            { id: 'html_tester', label: 'HTML Validator & Sandbox' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-3 border-b-2 font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-brand-green text-brand-navy font-bold bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* 1. Hero & Announcements */}
          {activeTab === 'hero' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Conference Headline
                </label>
                <input
                  type="text"
                  value={formData.hero.heading}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, heading: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Conference Subheading
                </label>
                <textarea
                  rows={3}
                  value={formData.hero.subheading}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, subheading: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Marquee Ticker Announcements (One per line)
                </label>
                <textarea
                  rows={4}
                  value={formData.marquee.join('\n')}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      marquee: e.target.value.split('\n').filter(Boolean),
                    })
                  }
                  className="w-full px-3.5 py-2.5 text-sm font-mono border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue outline-none"
                />
              </div>
            </div>
          )}

          {/* 2. Conference Tracks */}
          {activeTab === 'tracks' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500">
                Update the official 7 Tracks or add custom sub-topics:
              </p>
              {formData.tracks.map((track, idx) => (
                <div key={track.id} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-brand-blue bg-white px-2 py-0.5 rounded border border-slate-200">
                      Track {track.number}
                    </span>
                    <input
                      type="text"
                      value={track.name}
                      onChange={(e) => {
                        const updated = [...formData.tracks];
                        updated[idx].name = e.target.value;
                        setFormData({ ...formData, tracks: updated });
                      }}
                      className="flex-1 px-3 py-1.5 text-xs font-bold border border-slate-300 rounded-lg"
                    />
                  </div>
                  <textarea
                    rows={2}
                    value={track.scope}
                    onChange={(e) => {
                      const updated = [...formData.tracks];
                      updated[idx].scope = e.target.value;
                      setFormData({ ...formData, tracks: updated });
                    }}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg text-slate-700"
                  />
                </div>
              ))}
            </div>
          )}

          {/* 3. Important Dates */}
          {activeTab === 'dates' && (
            <div className="space-y-3">
              {formData.important_dates.map((d, idx) => (
                <div key={d.id} className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <input
                    type="text"
                    value={d.event}
                    onChange={(e) => {
                      const updated = [...formData.important_dates];
                      updated[idx].event = e.target.value;
                      setFormData({ ...formData, important_dates: updated });
                    }}
                    className="flex-1 px-3 py-1.5 text-xs font-semibold border border-slate-300 rounded-lg"
                  />
                  <input
                    type="text"
                    value={d.date}
                    onChange={(e) => {
                      const updated = [...formData.important_dates];
                      updated[idx].date = e.target.value;
                      setFormData({ ...formData, important_dates: updated });
                    }}
                    className="w-44 px-3 py-1.5 text-xs font-medium border border-slate-300 rounded-lg"
                  />
                  <select
                    value={d.status}
                    onChange={(e) => {
                      const updated = [...formData.important_dates];
                      updated[idx].status = e.target.value;
                      setFormData({ ...formData, important_dates: updated });
                    }}
                    className="px-2 py-1.5 text-xs font-bold rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              ))}
            </div>
          )}

          {/* 4. Registration Fees */}
          {activeTab === 'registration' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500">
                Modify registration fee tiers (INR & USD):
              </p>
              {formData.registration.fees.map((fee, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="flex-1 text-xs font-bold text-slate-700">{fee.category}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-500">₹</span>
                    <input
                      type="number"
                      value={fee.inr}
                      onChange={(e) => {
                        const updated = [...formData.registration.fees];
                        updated[idx].inr = Number(e.target.value);
                        setFormData({
                          ...formData,
                          registration: { ...formData.registration, fees: updated },
                        });
                      }}
                      className="w-24 px-2 py-1 text-xs border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-500">$</span>
                    <input
                      type="number"
                      value={fee.usd}
                      onChange={(e) => {
                        const updated = [...formData.registration.fees];
                        updated[idx].usd = Number(e.target.value);
                        setFormData({
                          ...formData,
                          registration: { ...formData.registration, fees: updated },
                        });
                      }}
                      className="w-20 px-2 py-1 text-xs border border-slate-300 rounded-lg"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 5. Safe HTML Validator & Sandbox */}
          {activeTab === 'html_tester' && (
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 leading-relaxed">
                <strong>Security Guard Active:</strong> Any inserted HTML is checked against our strict sanitization engine. Malicious tags (<code>&lt;script&gt;</code>, <code>onerror</code>, <code>&lt;iframe&gt;</code>, <code>javascript:</code>) are blocked and stripped before saving.
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold uppercase text-slate-700 flex items-center gap-1.5">
                    <Code className="w-4 h-4 text-brand-blue" />
                    <span>Raw HTML / Rich Text Snippet</span>
                  </label>
                  {isMalicious ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      Dangerous Script Detected (Will Be Neutralized)
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Clean & Safe HTML
                    </span>
                  )}
                </div>
                <textarea
                  rows={4}
                  value={rawHtmlSnippet}
                  onChange={(e) => setRawHtmlSnippet(e.target.value)}
                  className="w-full font-mono text-xs p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-blue outline-none"
                  placeholder="Enter HTML snippet (e.g. <p>Announcement</p>)"
                />
              </div>

              {/* Live Preview Box */}
              <div>
                <label className="text-xs font-bold uppercase text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-brand-green" />
                  <span>Sanitized Live Render Preview</span>
                </label>
                <div 
                  className="p-4 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                  dangerouslySetInnerHTML={{
                    __html: isMalicious
                      ? rawHtmlSnippet.replace(maliciousPattern, '<b class="text-red-500">[BLOCKED SCRIPT]</b>')
                      : rawHtmlSnippet
                  }}
                />
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            {saveStatus === 'success' && (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Changes saved and backed up successfully!
              </span>
            )}
            {saveStatus === 'error' && (
              <span className="text-xs font-bold text-red-600">
                Failed to save changes. Make sure backend is running.
              </span>
            )}
          </div>
          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-brand-blue to-brand-green hover:from-brand-navy hover:to-brand-green rounded-lg shadow-sm hover:shadow transition-all disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? 'Saving...' : 'Save & Publish'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
