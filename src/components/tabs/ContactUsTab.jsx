import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Building, Clock } from 'lucide-react';

export default function ContactUsTab({ content }) {
  const { contact, meta } = content;
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    track: 'Track 1: Generative AI',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        track: 'Track 1: Generative AI',
        message: ''
      });
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-extrabold uppercase tracking-wider text-brand-blue bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-black font-heading text-brand-navy">
          Contact Conference Secretariat
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Have queries regarding paper submissions, CMT registration, or sponsorship? Reach out to our team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact Information & Map */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-5">
            <h3 className="text-base font-bold font-heading text-brand-navy">
              Direct Contact Details
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-brand-mint text-brand-green shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Official Conference Email</span>
                  <a href={`mailto:${meta.email}`} className="text-brand-blue font-bold hover:underline">
                    {meta.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-blue-50 text-brand-blue shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Helpline & Secretariat</span>
                  <span className="font-semibold text-slate-800">{meta.phone}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-purple-50 text-purple-700 shrink-0">
                  <Building className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Organizing Host</span>
                  <span className="font-semibold text-slate-800">Department of CSIT & Department of CSE (CY)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-emerald-50 text-brand-green shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Campus Venue</span>
                  <span className="text-slate-700 leading-relaxed block">{meta.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Embedded Google Map */}
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm h-64 bg-slate-100">
            <iframe
              title="AITR Indore Location Map"
              src={contact.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

        </div>

        {/* Interactive Query Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-md">
          <h3 className="text-lg font-bold font-heading text-brand-navy mb-1">
            Send an Inquiry
          </h3>
          <p className="text-xs text-slate-500 mb-6">
            We typically respond within 24–48 hours on business days.
          </p>

          {submitted ? (
            <div className="p-6 bg-brand-mint border border-emerald-300 rounded-xl text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-brand-green mx-auto" />
              <h4 className="text-base font-bold text-brand-navy">Thank You for Reaching Out!</h4>
              <p className="text-xs text-emerald-800">
                Your message has been dispatched to the RAMSITA 2028 secretariat. A committee member will respond shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue outline-none"
                    placeholder="Prof. / Dr. / Researcher Name"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                    Your Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue outline-none"
                    placeholder="author@institution.edu"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                    Relevant Track
                  </label>
                  <select
                    value={formData.track}
                    onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-brand-blue outline-none"
                  >
                    <option value="Track 1: Generative AI">Track 1: Generative AI</option>
                    <option value="Track 2: Quantum Computing">Track 2: Quantum Computing</option>
                    <option value="Track 3: Cybersecurity">Track 3: Cybersecurity</option>
                    <option value="Track 4: Green Computing">Track 4: Green Computing</option>
                    <option value="Track 5: IoT & Smart Systems">Track 5: IoT & Smart Systems</option>
                    <option value="Track 6: Advanced Data Science">Track 6: Advanced Data Science</option>
                    <option value="Track 7: Interdisciplinary AI">Track 7: Interdisciplinary AI</option>
                    <option value="Registration / Fees Inquiry">Registration / Fees Inquiry</option>
                    <option value="Sponsorship Partnership">Sponsorship Partnership</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue outline-none"
                    placeholder="e.g. Inquiring regarding CMT submission"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                  Message *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-blue outline-none"
                  placeholder="Please state your query or details..."
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold text-white bg-gradient-to-r from-brand-blue to-brand-green hover:from-brand-navy hover:to-brand-green rounded-xl shadow-md transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}

        </div>

      </div>

    </div>
  );
}
