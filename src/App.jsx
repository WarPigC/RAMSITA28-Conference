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

// Default initial content fallback
import initialData from '../data/content.json';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [content, setContent] = useState(initialData);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch updated content from Express API on mount
  useEffect(() => {
    async function loadContent() {
      try {
        const res = await fetch('/api/content');
        if (res.ok) {
          const data = await res.json();
          setContent(data);
        }
      } catch (err) {
        console.warn('Backend API not reachable; running with local static content:', err);
      }
    }
    loadContent();
  }, []);

  // Save changes from Content Editor Modal
  const handleSaveContent = async (updatedData) => {
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (res.ok) {
        const result = await res.json();
        setContent(result.data);
        return result;
      } else {
        throw new Error('Save failed on server');
      }
    } catch (err) {
      console.warn('Saving to local React state only (backend server may be offline):', err);
      setContent(updatedData);
    }
  };

  const renderActiveTab = () => {
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
