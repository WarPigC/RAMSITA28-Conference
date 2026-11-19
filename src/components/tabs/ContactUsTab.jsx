import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Building, ExternalLink } from 'lucide-react';

export default function ContactUsTab({ content }) {
  const { contact = {}, meta = {} } = content;
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    track: 'Track 01: Generative AI and Intelligent Systems',
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
        track: 'Track 01: Generative AI and Intelligent Systems',
        message: ''
      });
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 bg-white">
      
      {/* Header Banner */}
      <div className="bg-[#0A2540] text-white p-8 sm:p-10 border-b-4 border-brand-green shadow-xs">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
            Direct Assistance
          </span>
          <h1 className="text-2xl sm:text-4xl font-black font-heading tracking-tight">
            Contact Secretariat & Location
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Have questions regarding paper submissions, publication status, or venue travel? Reach out to the organizing chairs at AITR Indore.
          </p>
        </div>
      </div>

      {/* Side-by-Side Grid: Left Form/Details, Right Big Square Map (Fixing Image 2) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Contact Cards & Inquiry Form */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Contact Details List */}
          <div className="border border-slate-300 bg-slate-50 p-6 space-y-4">
            <h3 className="text-base font-bold font-heading text-brand-navy border-b border-slate-200 pb-2">
              Conference Secretariat Details
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-brand-navy text-white shrink-0">
                  <Mail className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Official Conference Email</span>
                  <a href={`mailto:${meta.email}`} className="text-brand-blue font-bold text-sm hover:underline">
                    {meta.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-brand-navy text-white shrink-0">
                  <Phone className="w-4 h-4 text-amber-300" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Helpline Numbers</span>
                  <span className="font-bold text-slate-800 text-sm">{meta.phone}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-brand-navy text-white shrink-0">
                  <Building className="w-4 h-4 text-cyan-300" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Organizing Host Departments</span>
                  <span className="font-semibold text-slate-800">Department of CSIT & Department of CSE (CY)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-brand-navy text-white shrink-0">
                  <MapPin className="w-4 h-4 text-red-400" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Campus Address</span>
                  <span className="text-slate-700 leading-relaxed block">{meta.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="border border-slate-300 bg-white p-6 space-y-4 shadow-xs">
            <h3 className="text-base font-bold font-heading text-brand-navy border-b border-slate-200 pb-2">
              Send an Author Inquiry
            </h3>

            {submitted ? (
              <div className="p-5 bg-emerald-50 border border-emerald-300 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="text-sm font-bold text-brand-navy">Message Dispatched!</h4>
                <p className="text-xs text-emerald-800">
                  Thank you for reaching out. A committee member will reply to your registered email shortly.
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
                      className="w-full px-3 py-2 border border-slate-300 focus:outline-none focus:border-brand-navy"
                      placeholder="Prof. / Dr. / Author Name"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 focus:outline-none focus:border-brand-navy"
                      placeholder="author@university.edu"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                    Subject / Concern *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 focus:outline-none focus:border-brand-navy"
                    placeholder="e.g. Paper Submission or Registration Query"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                    Message Description *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 focus:outline-none focus:border-brand-navy resize-none"
                    placeholder="Provide details about your query..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#0A2540] hover:bg-slate-800 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Send Message to Secretariat</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Right Column: BIG SQUARE GOOGLE MAP (Fixing Image 2 per user instruction) */}
        <div className="lg:col-span-6 space-y-3">
          <div className="border border-slate-300 bg-white p-4 space-y-3 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-navy">
                Venue Location Map
              </span>
              <a
                href="https://maps.google.com/?q=Acropolis+Institute+of+Technology+and+Research+Indore"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-brand-blue hover:text-brand-navy uppercase tracking-wider inline-flex items-center gap-1"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Square, Big Framed Map: aspect-square, NOT thin edge-to-edge ribbon */}
            <div className="w-full aspect-square border border-slate-300 bg-slate-100 overflow-hidden relative">
              <iframe
                title="Acropolis Institute Indore Campus Location"
                src={contact.mapEmbedUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3678.016335198424!2d75.9405672753282!3d22.79975767933166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39631d37446540b9%3A0xc391122a8432b4b4!2sAcropolis%20Institute%20of%20Technology%20and%20Research!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div className="p-2 text-center text-[11px] text-slate-500">
              Acropolis Institute of Technology and Research • Bypass Road, Manglia Square, Indore, MP
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
