import React, { useState } from 'react';
import { 
  X, ShieldCheck, ShieldAlert, Save, RefreshCw, Eye, Code, FileText, 
  CheckCircle2, Plus, Trash2, Image as ImageIcon, Users, Calendar, 
  Sparkles, Layers, DollarSign 
} from 'lucide-react';

export default function ContentEditorModal({ isOpen, onClose, content, onSave }) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('hero_intro');
  const [formData, setFormData] = useState(JSON.parse(JSON.stringify(content)));
  const [rawHtmlSnippet, setRawHtmlSnippet] = useState(
    '<p class="text-brand-blue font-bold">RAMSITA 2028: Empowering sustainable global research.</p>'
  );
  const [adminPasskey, setAdminPasskey] = useState('');
  const [saveStatus, setSaveStatus] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Security validator check
  const maliciousPattern = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>|javascript:|onerror=|onload=|onclick=|eval\(|<iframe/gi;
  const isMalicious = maliciousPattern.test(rawHtmlSnippet);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus(null);
    try {
      await onSave(formData, adminPasskey);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (err) {
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownloadJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(formData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `content_backup_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Helper functions for adding items
  const addSpeaker = () => {
    const newSp = {
      id: `sp-${Date.now()}`,
      name: 'Dr. New Speaker',
      title: 'Distinguished Professor',
      institution: 'University / Institute Name',
      topic: 'Recent Advances in Intelligent Systems',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'
    };
    setFormData({
      ...formData,
      speakers: [...(formData.speakers || []), newSp]
    });
  };

  const deleteSpeaker = (idx) => {
    const updated = [...(formData.speakers || [])];
    updated.splice(idx, 1);
    setFormData({ ...formData, speakers: updated });
  };

  const addNews = () => {
    const newNews = {
      id: `news-${Date.now()}`,
      date: 'New Announcement Date',
      category: 'General',
      title: 'New Conference Announcement',
      text: 'Description of the latest conference update or milestone.',
      image: '',
      link: '#'
    };
    setFormData({
      ...formData,
      latest_news: [...(formData.latest_news || []), newNews]
    });
  };

  const deleteNews = (idx) => {
    const updated = [...(formData.latest_news || [])];
    updated.splice(idx, 1);
    setFormData({ ...formData, latest_news: updated });
  };

  const addPreviousEvent = () => {
    const newEvent = {
      id: `pe-${Date.now()}`,
      year: '2025',
      title: 'RAMSITA 2025 Edition',
      subtitle: 'Conference Subtitle',
      desc: 'Conference description and summary of presentations.',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80',
      link: '#',
      stats: '150+ Papers • 10 Countries'
    };
    setFormData({
      ...formData,
      previous_events: [...(formData.previous_events || []), newEvent]
    });
  };

  const deletePreviousEvent = (idx) => {
    const updated = [...(formData.previous_events || [])];
    updated.splice(idx, 1);
    setFormData({ ...formData, previous_events: updated });
  };

  const addSponsorLogo = () => {
    const newSponsor = {
      id: `sl-${Date.now()}`,
      name: 'New Collaborator',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Springer_Nature_Logo.svg/512px-Springer_Nature_Logo.svg.png',
      tier: 'Technical Partner'
    };
    setFormData({
      ...formData,
      sponsor_logos: [...(formData.sponsor_logos || []), newSponsor]
    });
  };

  const deleteSponsorLogo = (idx) => {
    const updated = [...(formData.sponsor_logos || [])];
    updated.splice(idx, 1);
    setFormData({ ...formData, sponsor_logos: updated });
  };

  const addGalleryImage = () => {
    const newPhoto = {
      id: `g-${Date.now()}`,
      title: 'New Gallery Photo',
      category: 'Sessions',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80',
      caption: 'Photograph from the conference symposium.'
    };
    setFormData({
      ...formData,
      gallery: [...(formData.gallery || []), newPhoto]
    });
  };

  const deleteGalleryImage = (idx) => {
    const updated = [...(formData.gallery || [])];
    updated.splice(idx, 1);
    setFormData({ ...formData, gallery: updated });
  };

  const tabs = [
    { id: 'hero_intro', label: 'Hero, Intro & Scope' },
    { id: 'speakers', label: 'Keynote Speakers' },
    { id: 'news', label: 'Latest News' },
    { id: 'prev_events', label: 'Previous Events' },
    { id: 'sponsors', label: 'Sponsors (Image Only)' },
    { id: 'tracks', label: 'Conference Tracks' },
    { id: 'dates', label: 'Important Dates' },
    { id: 'registration', label: 'Registration & Fees' },
    { id: 'gallery', label: 'Gallery Photos' },
    { id: 'html_tester', label: 'HTML Validator & Sandbox' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white max-w-5xl w-full max-h-[92vh] flex flex-col border border-slate-300 shadow-2xl">
        
        {/* Modal Header (Sharp, academic deep navy) */}
        <div className="px-6 py-4 border-b border-slate-700 flex items-center justify-between bg-[#0A2540] text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-green text-white">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold font-heading">
                In-Website Content & Section Editor
              </h2>
              <p className="text-xs text-slate-300">
                Live modification of conference content with XSS validation & backend persistence
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Close Editor"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section Navigation Tabs (No rounded boxes, clean horizontal bar) */}
        <div className="flex border-b border-slate-200 bg-slate-100 px-4 gap-1 overflow-x-auto text-xs font-bold uppercase tracking-wider">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-3 transition-colors whitespace-nowrap cursor-pointer border-b-2 ${
                activeTab === tab.id
                  ? 'border-brand-navy text-brand-navy bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50 text-xs">
          
          {/* 1. Hero, Intro & Scope */}
          {activeTab === 'hero_intro' && (
            <div className="space-y-5 bg-white p-6 border border-slate-300">
              <h3 className="text-sm font-bold uppercase tracking-wider text-brand-navy border-b border-slate-200 pb-2">
                Hero Section & Welcome/Scope Texts
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                    Conference Dates
                  </label>
                  <input
                    type="text"
                    value={formData.meta?.dates || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        meta: { ...formData.meta, dates: e.target.value }
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-300 focus:outline-none focus:border-brand-navy"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                    Microsoft CMT Link
                  </label>
                  <input
                    type="text"
                    value={formData.hero?.cmtLink || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        hero: { ...formData.hero, cmtLink: e.target.value }
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-300 focus:outline-none focus:border-brand-navy"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                  Intro Heading
                </label>
                <input
                  type="text"
                  value={formData.intro_scope?.intro_heading || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      intro_scope: { ...formData.intro_scope, intro_heading: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 focus:outline-none focus:border-brand-navy"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                  Intro Description
                </label>
                <textarea
                  rows={3}
                  value={formData.intro_scope?.intro_text || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      intro_scope: { ...formData.intro_scope, intro_text: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 focus:outline-none focus:border-brand-navy resize-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                  Scope Heading
                </label>
                <input
                  type="text"
                  value={formData.intro_scope?.scope_heading || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      intro_scope: { ...formData.intro_scope, scope_heading: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 focus:outline-none focus:border-brand-navy"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                  Scope Description
                </label>
                <textarea
                  rows={3}
                  value={formData.intro_scope?.scope_text || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      intro_scope: { ...formData.intro_scope, scope_text: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 focus:outline-none focus:border-brand-navy resize-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                  Marquee Announcements (One per line)
                </label>
                <textarea
                  rows={4}
                  value={(formData.marquee || []).join('\n')}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      marquee: e.target.value.split('\n').filter(Boolean),
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 font-mono text-xs focus:outline-none focus:border-brand-navy"
                />
              </div>
            </div>
          )}

          {/* 2. Keynote Speakers */}
          {activeTab === 'speakers' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-600 font-medium">
                  Manage eminent keynote speakers (appears on Home tab with fade transition):
                </p>
                <button
                  onClick={addSpeaker}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-green text-white font-bold uppercase tracking-wider text-[11px] hover:bg-emerald-700 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Speaker</span>
                </button>
              </div>

              <div className="space-y-3">
                {(formData.speakers || []).map((sp, idx) => (
                  <div key={sp.id || idx} className="bg-white p-4 border border-slate-300 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-brand-navy">Speaker #{idx + 1}</span>
                      <button
                        onClick={() => deleteSpeaker(idx)}
                        className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                        title="Delete Speaker"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-slate-500 mb-0.5">Name</label>
                        <input
                          type="text"
                          value={sp.name}
                          onChange={(e) => {
                            const updated = [...formData.speakers];
                            updated[idx].name = e.target.value;
                            setFormData({ ...formData, speakers: updated });
                          }}
                          className="w-full px-2.5 py-1.5 border border-slate-300 font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-slate-500 mb-0.5">Title / Designation</label>
                        <input
                          type="text"
                          value={sp.title}
                          onChange={(e) => {
                            const updated = [...formData.speakers];
                            updated[idx].title = e.target.value;
                            setFormData({ ...formData, speakers: updated });
                          }}
                          className="w-full px-2.5 py-1.5 border border-slate-300"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-slate-500 mb-0.5">Institution / Country</label>
                        <input
                          type="text"
                          value={sp.institution}
                          onChange={(e) => {
                            const updated = [...formData.speakers];
                            updated[idx].institution = e.target.value;
                            setFormData({ ...formData, speakers: updated });
                          }}
                          className="w-full px-2.5 py-1.5 border border-slate-300"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-slate-500 mb-0.5">Session Topic Focus</label>
                        <input
                          type="text"
                          value={sp.topic}
                          onChange={(e) => {
                            const updated = [...formData.speakers];
                            updated[idx].topic = e.target.value;
                            setFormData({ ...formData, speakers: updated });
                          }}
                          className="w-full px-2.5 py-1.5 border border-slate-300 font-medium text-brand-blue"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500 mb-0.5">Avatar Image URL</label>
                      <input
                        type="text"
                        value={sp.avatar}
                        onChange={(e) => {
                          const updated = [...formData.speakers];
                          updated[idx].avatar = e.target.value;
                          setFormData({ ...formData, speakers: updated });
                        }}
                        className="w-full px-2.5 py-1.5 border border-slate-300 font-mono text-[11px]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. Latest News */}
          {activeTab === 'news' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-600 font-medium">
                  Manage dispatches and announcements (formatted clean grid):
                </p>
                <button
                  onClick={addNews}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-green text-white font-bold uppercase tracking-wider text-[11px] hover:bg-emerald-700 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add News Item</span>
                </button>
              </div>

              <div className="space-y-3">
                {(formData.latest_news || []).map((news, idx) => (
                  <div key={news.id || idx} className="bg-white p-4 border border-slate-300 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-brand-navy">Dispatch #{idx + 1}</span>
                      <button
                        onClick={() => deleteNews(idx)}
                        className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                        title="Delete News"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-slate-500 mb-0.5">Category</label>
                        <input
                          type="text"
                          value={news.category}
                          onChange={(e) => {
                            const updated = [...formData.latest_news];
                            updated[idx].category = e.target.value;
                            setFormData({ ...formData, latest_news: updated });
                          }}
                          className="w-full px-2.5 py-1.5 border border-slate-300"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-slate-500 mb-0.5">Date</label>
                        <input
                          type="text"
                          value={news.date}
                          onChange={(e) => {
                            const updated = [...formData.latest_news];
                            updated[idx].date = e.target.value;
                            setFormData({ ...formData, latest_news: updated });
                          }}
                          className="w-full px-2.5 py-1.5 border border-slate-300"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500 mb-0.5">Title</label>
                      <input
                        type="text"
                        value={news.title}
                        onChange={(e) => {
                          const updated = [...formData.latest_news];
                          updated[idx].title = e.target.value;
                          setFormData({ ...formData, latest_news: updated });
                        }}
                        className="w-full px-2.5 py-1.5 border border-slate-300 font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500 mb-0.5">Content Text</label>
                      <textarea
                        rows={2}
                        value={news.text}
                        onChange={(e) => {
                          const updated = [...formData.latest_news];
                          updated[idx].text = e.target.value;
                          setFormData({ ...formData, latest_news: updated });
                        }}
                        className="w-full px-2.5 py-1.5 border border-slate-300 resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-slate-500 mb-0.5">Optional Image URL</label>
                        <input
                          type="text"
                          value={news.image || ''}
                          onChange={(e) => {
                            const updated = [...formData.latest_news];
                            updated[idx].image = e.target.value;
                            setFormData({ ...formData, latest_news: updated });
                          }}
                          className="w-full px-2.5 py-1.5 border border-slate-300 font-mono text-[11px]"
                          placeholder="https://..."
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-slate-500 mb-0.5">Portal Link URL</label>
                        <input
                          type="text"
                          value={news.link || ''}
                          onChange={(e) => {
                            const updated = [...formData.latest_news];
                            updated[idx].link = e.target.value;
                            setFormData({ ...formData, latest_news: updated });
                          }}
                          className="w-full px-2.5 py-1.5 border border-slate-300 font-mono text-[11px]"
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. Previous Events */}
          {activeTab === 'prev_events' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-600 font-medium">
                  Manage past editions (e.g. RAMSITA 2026, MPCON 2027):
                </p>
                <button
                  onClick={addPreviousEvent}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-green text-white font-bold uppercase tracking-wider text-[11px] hover:bg-emerald-700 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Past Event</span>
                </button>
              </div>

              <div className="space-y-3">
                {(formData.previous_events || []).map((ev, idx) => (
                  <div key={ev.id || idx} className="bg-white p-4 border border-slate-300 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-brand-navy">{ev.year} Edition</span>
                      <button
                        onClick={() => deletePreviousEvent(idx)}
                        className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                        title="Delete Event"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-slate-500 mb-0.5">Year</label>
                        <input
                          type="text"
                          value={ev.year}
                          onChange={(e) => {
                            const updated = [...formData.previous_events];
                            updated[idx].year = e.target.value;
                            setFormData({ ...formData, previous_events: updated });
                          }}
                          className="w-full px-2.5 py-1.5 border border-slate-300 font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-slate-500 mb-0.5">Title</label>
                        <input
                          type="text"
                          value={ev.title}
                          onChange={(e) => {
                            const updated = [...formData.previous_events];
                            updated[idx].title = e.target.value;
                            setFormData({ ...formData, previous_events: updated });
                          }}
                          className="w-full px-2.5 py-1.5 border border-slate-300 font-bold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500 mb-0.5">Subtitle</label>
                      <input
                        type="text"
                        value={ev.subtitle}
                        onChange={(e) => {
                          const updated = [...formData.previous_events];
                          updated[idx].subtitle = e.target.value;
                          setFormData({ ...formData, previous_events: updated });
                        }}
                        className="w-full px-2.5 py-1.5 border border-slate-300"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500 mb-0.5">Description</label>
                      <textarea
                        rows={2}
                        value={ev.desc}
                        onChange={(e) => {
                          const updated = [...formData.previous_events];
                          updated[idx].desc = e.target.value;
                          setFormData({ ...formData, previous_events: updated });
                        }}
                        className="w-full px-2.5 py-1.5 border border-slate-300 resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-slate-500 mb-0.5">Stats Badge</label>
                        <input
                          type="text"
                          value={ev.stats}
                          onChange={(e) => {
                            const updated = [...formData.previous_events];
                            updated[idx].stats = e.target.value;
                            setFormData({ ...formData, previous_events: updated });
                          }}
                          className="w-full px-2.5 py-1.5 border border-slate-300"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-slate-500 mb-0.5">Image URL</label>
                        <input
                          type="text"
                          value={ev.image}
                          onChange={(e) => {
                            const updated = [...formData.previous_events];
                            updated[idx].image = e.target.value;
                            setFormData({ ...formData, previous_events: updated });
                          }}
                          className="w-full px-2.5 py-1.5 border border-slate-300 font-mono text-[11px]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-slate-500 mb-0.5">Optional Link (href)</label>
                        <input
                          type="text"
                          value={ev.link}
                          onChange={(e) => {
                            const updated = [...formData.previous_events];
                            updated[idx].link = e.target.value;
                            setFormData({ ...formData, previous_events: updated });
                          }}
                          className="w-full px-2.5 py-1.5 border border-slate-300 font-mono text-[11px]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. Sponsors (Image Only) */}
          {activeTab === 'sponsors' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-600 font-medium">
                  Manage sponsor/collaborator logos (image-only per user instruction):
                </p>
                <button
                  onClick={addSponsorLogo}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-green text-white font-bold uppercase tracking-wider text-[11px] hover:bg-emerald-700 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Sponsor Logo</span>
                </button>
              </div>

              <div className="space-y-3">
                {(formData.sponsor_logos || []).map((sp, idx) => (
                  <div key={sp.id || idx} className="bg-white p-4 border border-slate-300 flex items-center justify-between gap-4">
                    <div className="h-12 w-20 bg-slate-100 border border-slate-200 flex items-center justify-center p-1 shrink-0">
                      <img src={sp.logo} alt={sp.name} className="max-h-full max-w-full object-contain" onError={(e) => { e.target.src = '/logo.png'; }} />
                    </div>

                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-slate-500 mb-0.5">Name</label>
                        <input
                          type="text"
                          value={sp.name}
                          onChange={(e) => {
                            const updated = [...formData.sponsor_logos];
                            updated[idx].name = e.target.value;
                            setFormData({ ...formData, sponsor_logos: updated });
                          }}
                          className="w-full px-2 py-1 border border-slate-300"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-slate-500 mb-0.5">Tier / Role</label>
                        <input
                          type="text"
                          value={sp.tier}
                          onChange={(e) => {
                            const updated = [...formData.sponsor_logos];
                            updated[idx].tier = e.target.value;
                            setFormData({ ...formData, sponsor_logos: updated });
                          }}
                          className="w-full px-2 py-1 border border-slate-300"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-slate-500 mb-0.5">Logo Image URL</label>
                        <input
                          type="text"
                          value={sp.logo}
                          onChange={(e) => {
                            const updated = [...formData.sponsor_logos];
                            updated[idx].logo = e.target.value;
                            setFormData({ ...formData, sponsor_logos: updated });
                          }}
                          className="w-full px-2 py-1 border border-slate-300 font-mono text-[11px]"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => deleteSponsorLogo(idx)}
                      className="text-red-500 hover:text-red-700 p-1 cursor-pointer shrink-0"
                      title="Delete Sponsor"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. Conference Tracks */}
          {activeTab === 'tracks' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600 font-medium">
                Modify official conference tracks and topical scopes:
              </p>
              {(formData.tracks || []).map((track, idx) => (
                <div key={track.id || idx} className="p-4 bg-white border border-slate-300 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-brand-navy bg-slate-100 px-2 py-0.5 border border-slate-200">
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
                      className="flex-1 px-3 py-1.5 text-xs font-bold border border-slate-300"
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
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 text-slate-700 resize-none"
                  />
                </div>
              ))}
            </div>
          )}

          {/* 7. Important Dates */}
          {activeTab === 'dates' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-600 font-medium">
                Update deadline ledger events and status tags:
              </p>
              {(formData.important_dates || []).map((d, idx) => (
                <div key={d.id || idx} className="flex flex-col sm:flex-row items-center gap-3 p-3 bg-white border border-slate-300">
                  <input
                    type="text"
                    value={d.event}
                    onChange={(e) => {
                      const updated = [...formData.important_dates];
                      updated[idx].event = e.target.value;
                      setFormData({ ...formData, important_dates: updated });
                    }}
                    className="flex-1 w-full px-3 py-1.5 text-xs font-semibold border border-slate-300"
                  />
                  <input
                    type="text"
                    value={d.date}
                    onChange={(e) => {
                      const updated = [...formData.important_dates];
                      updated[idx].date = e.target.value;
                      setFormData({ ...formData, important_dates: updated });
                    }}
                    className="w-full sm:w-44 px-3 py-1.5 text-xs font-medium border border-slate-300"
                  />
                  <select
                    value={d.status}
                    onChange={(e) => {
                      const updated = [...formData.important_dates];
                      updated[idx].status = e.target.value;
                      setFormData({ ...formData, important_dates: updated });
                    }}
                    className="w-full sm:w-28 px-2 py-1.5 text-xs font-bold border border-slate-300 bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              ))}
            </div>
          )}

          {/* 8. Registration & Fees */}
          {activeTab === 'registration' && (
            <div className="space-y-4">
              <div className="bg-white p-4 border border-slate-300 space-y-2">
                <label className="block text-[11px] font-bold uppercase text-brand-navy">
                  Top Bulleted Notes (One per line)
                </label>
                <textarea
                  rows={4}
                  value={(formData.registration?.notes || []).join('\n')}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      registration: {
                        ...formData.registration,
                        notes: e.target.value.split('\n').filter(Boolean)
                      }
                    });
                  }}
                  className="w-full px-3 py-2 border border-slate-300 text-xs resize-none"
                />
              </div>

              <div className="space-y-3">
                <p className="text-xs text-slate-600 font-medium">
                  Modify fee categories (INR & USD):
                </p>
                {(formData.registration?.fees || []).map((fee, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row items-center gap-3 p-3 bg-white border border-slate-300">
                    <span className="flex-1 text-xs font-bold text-slate-800">{fee.category}</span>
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
                        className="w-24 px-2 py-1 text-xs border border-slate-300"
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
                        className="w-20 px-2 py-1 text-xs border border-slate-300"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 9. Gallery Photos */}
          {activeTab === 'gallery' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-600 font-medium">
                  Manage conference photographs and lightbox titles:
                </p>
                <button
                  onClick={addGalleryImage}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-green text-white font-bold uppercase tracking-wider text-[11px] hover:bg-emerald-700 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Photo</span>
                </button>
              </div>

              <div className="space-y-3">
                {(formData.gallery || []).map((photo, idx) => (
                  <div key={photo.id || idx} className="bg-white p-4 border border-slate-300 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-brand-navy">Photo #{idx + 1}: {photo.title}</span>
                      <button
                        onClick={() => deleteGalleryImage(idx)}
                        className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                        title="Delete Photo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-slate-500 mb-0.5">Title</label>
                        <input
                          type="text"
                          value={photo.title}
                          onChange={(e) => {
                            const updated = [...formData.gallery];
                            updated[idx].title = e.target.value;
                            setFormData({ ...formData, gallery: updated });
                          }}
                          className="w-full px-2.5 py-1.5 border border-slate-300 font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-slate-500 mb-0.5">Category</label>
                        <input
                          type="text"
                          value={photo.category}
                          onChange={(e) => {
                            const updated = [...formData.gallery];
                            updated[idx].category = e.target.value;
                            setFormData({ ...formData, gallery: updated });
                          }}
                          className="w-full px-2.5 py-1.5 border border-slate-300"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500 mb-0.5">Image URL</label>
                      <input
                        type="text"
                        value={photo.image}
                        onChange={(e) => {
                          const updated = [...formData.gallery];
                          updated[idx].image = e.target.value;
                          setFormData({ ...formData, gallery: updated });
                        }}
                        className="w-full px-2.5 py-1.5 border border-slate-300 font-mono text-[11px]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-500 mb-0.5">Caption</label>
                      <input
                        type="text"
                        value={photo.caption}
                        onChange={(e) => {
                          const updated = [...formData.gallery];
                          updated[idx].caption = e.target.value;
                          setFormData({ ...formData, gallery: updated });
                        }}
                        className="w-full px-2.5 py-1.5 border border-slate-300"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 10. Safe HTML Validator & Sandbox */}
          {activeTab === 'html_tester' && (
            <div className="space-y-4 bg-white p-6 border border-slate-300">
              <div className="p-3 bg-blue-50 border border-blue-200 text-xs text-blue-900 leading-relaxed">
                <strong>Real-Time Security Sanitizer:</strong> Inserted HTML is continuously scanned. Harmful tags like <code>&lt;script&gt;</code>, <code>onerror</code>, <code>&lt;iframe&gt;</code>, and <code>javascript:</code> are blocked and neutralized to prevent XSS attacks.
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold uppercase text-slate-700 flex items-center gap-1.5">
                    <Code className="w-4 h-4 text-brand-navy" />
                    <span>Raw HTML / Rich Text Snippet</span>
                  </label>
                  {isMalicious ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      Dangerous Script Blocked
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Clean & Safe HTML
                    </span>
                  )}
                </div>
                <textarea
                  rows={4}
                  value={rawHtmlSnippet}
                  onChange={(e) => setRawHtmlSnippet(e.target.value)}
                  className="w-full font-mono text-xs p-3 border border-slate-300 focus:outline-none focus:border-brand-navy"
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
                  className="p-4 bg-slate-50 border border-slate-300 text-sm"
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

        {/* Modal Footer (Sharp buttons + Passkey + Download) */}
        <div className="px-6 py-4 border-t border-slate-300 bg-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="w-full sm:w-auto flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <div className="flex items-center gap-1.5">
              <label className="text-[11px] font-bold uppercase text-slate-600 whitespace-nowrap">
                Passkey:
              </label>
              <input
                type="password"
                placeholder="Optional Admin Key"
                value={adminPasskey}
                onChange={(e) => setAdminPasskey(e.target.value)}
                className="px-2.5 py-1 text-xs border border-slate-300 bg-white w-36 focus:outline-none focus:border-brand-navy"
                title="If your server is protected with an ADMIN_KEY, enter it here"
              />
            </div>
            {saveStatus === 'success' && (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Published & saved!
              </span>
            )}
            {saveStatus === 'error' && (
              <span className="text-xs font-bold text-red-600">
                Save failed or passkey invalid.
              </span>
            )}
          </div>
          <div className="w-full sm:w-auto flex items-center justify-end gap-2">
            <button
              onClick={handleDownloadJson}
              className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 cursor-pointer"
              title="Export conference backup directly as JSON"
            >
              Export JSON
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 px-6 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#0A2540] hover:bg-slate-800 transition-all shadow-xs disabled:opacity-50 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isSaving ? 'Saving...' : 'Save & Publish'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
