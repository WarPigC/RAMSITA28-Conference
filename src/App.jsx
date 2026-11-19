import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import MarqueeTicker from './components/MarqueeTicker.jsx';
import Footer from './components/Footer.jsx';
import ContentEditorModal from './components/ContentEditorModal.jsx';

// Tab Components
import HomeTab from './components/tabs/HomeTab.jsx';
import CallForPapersTab from './components/tabs/CallForPapersTab.jsx';
import ImportantDatesTab from './components/tabs/ImportantDatesTab.jsx';
import CommitteesTab from './components/tabs/CommitteesTab.jsx';
import RegistrationTab from './components/tabs/RegistrationTab.jsx';
import AboutUsTab from './components/tabs/AboutUsTab.jsx';
import SponsorsTab from './components/tabs/SponsorsTab.jsx';
import GalleryTab from './components/tabs/GalleryTab.jsx';
import ContactUsTab from './components/tabs/ContactUsTab.jsx';

// Supabase Client with SWR (Stale-While-Revalidate) Instant Cache
import { 
  fetchConferenceContent, 
  saveConferenceContent, 
  getCachedConferenceContent, 
  isSupabaseConfigured 
} from './lib/supabaseClient.js';
import { initialContent } from './data/initialContent.js';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  // 1. Instant 0ms Paint: Seed data bundled statically + synced with localStorage cache
  const [content, setContent] = useState(() => getCachedConferenceContent() || initialContent);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 2. Background Revalidation: Silently fetch fresh data from Supabase in the background
  useEffect(() => {
    let isMounted = true;

    async function syncData() {
      try {
        const freshData = await fetchConferenceContent();
        if (isMounted && freshData) {
          setContent(freshData);
          setError(null);
        }
      } catch (err) {
        console.warn('Background Supabase sync notice:', err);
        if (isMounted && !content) {
          setError(err.message || 'Failed to connect to Supabase.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    syncData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Save changes from Content Editor Modal directly to Supabase and cache
  const handleSaveContent = async (updatedData) => {
    try {
      const result = await saveConferenceContent(updatedData);
      setContent(updatedData);
      return result;
    } catch (err) {
      console.error('Failed to save to Supabase:', err);
      throw err;
    }
  };

  const renderActiveTab = () => {
    if (!content) return null;
    switch (activeTab) {
      case 'home':
        return <HomeTab content={content} setActiveTab={setActiveTab} />;
      case 'cfp':
        return <CallForPapersTab content={content} />;
      case 'dates':
        return <ImportantDatesTab content={content} />;
      case 'committees':
        return <CommitteesTab content={content} />;
      case 'registration':
        return <RegistrationTab content={content} />;
      case 'about':
        return <AboutUsTab content={content} />;
      case 'sponsors':
        return <SponsorsTab content={content} />;
      case 'gallery':
        return <GalleryTab content={content} />;
      case 'contact':
        return <ContactUsTab content={content} />;
      default:
        return <HomeTab content={content} setActiveTab={setActiveTab} />;
    }
  };

  // Only shown on cold start when cache is empty
  if (loading && !content) {
    return (
      <div className="min-h-screen bg-[#0A2540] flex flex-col items-center justify-center text-white space-y-4 font-sans">
        <div className="w-12 h-12 border-4 border-emerald-400 border-t-transparent animate-spin"></div>
        <div className="text-center space-y-1">
          <h2 className="text-lg font-bold font-heading uppercase tracking-wider">RAMSITA 2028</h2>
          <p className="text-xs text-slate-300">Loading conference data from Supabase...</p>
        </div>
      </div>
    );
  }

  // Error screen only if both cache and Supabase are unavailable
  if (error && !content) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-6 text-slate-800 space-y-4 font-sans">
        <div className="bg-white p-8 max-w-md w-full border border-slate-300 shadow-md space-y-4 text-center">
          <div className="w-12 h-12 bg-red-100 text-red-600 mx-auto flex items-center justify-center font-bold text-xl">
            !
          </div>
          <h2 className="text-lg font-bold text-brand-navy">Database Connection Error</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            {error || 'Unable to retrieve conference data from Supabase. Please ensure your Supabase project is active and environment variables are properly set.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 bg-[#0A2540] hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-brand-green selection:text-white">
      {/* 1. Breaking News Marquee */}
      <MarqueeTicker items={content.marquee} />

      {/* 2. Sticky Header Navbar with Logo and 9 Tabs */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenEditor={() => setIsEditorOpen(true)}
        meta={content.meta}
      />

      {/* 3. Main Dynamic Content Body */}
      <main className="flex-1">
        {renderActiveTab()}
      </main>

      {/* 4. Comprehensive Academic Footer */}
      <Footer meta={content.meta} setActiveTab={setActiveTab} />

      {/* 5. In-Website Content & HTML Editor Modal */}
      <ContentEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        content={content}
        onSave={handleSaveContent}
      />
    </div>
  );
}
