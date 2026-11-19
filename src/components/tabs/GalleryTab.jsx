import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight, Maximize2, Tag } from 'lucide-react';

export default function GalleryTab({ content }) {
  const { gallery = [] } = content;
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeImageIndex, setActiveImageIndex] = useState(null);

  const categories = ['All', 'Inauguration', 'Keynotes', 'Sessions', 'Awards', 'Campus'];

  const filteredPhotos = activeCategory === 'All'
    ? gallery
    : gallery.filter((p) => p.category === activeCategory);

  const openLightbox = (index) => {
    setActiveImageIndex(index);
  };

  const closeLightbox = () => {
    setActiveImageIndex(null);
  };

  const nextImage = (e) => {
    if (e) e.stopPropagation();
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex + 1) % filteredPhotos.length);
    }
  };

  const prevImage = (e) => {
    if (e) e.stopPropagation();
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeImageIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex, filteredPhotos.length]);

  const currentPhoto = activeImageIndex !== null ? filteredPhotos[activeImageIndex] : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 bg-white">
      
      {/* Header Banner */}
      <div className="bg-[#0A2540] text-white p-8 sm:p-10 border-b-4 border-brand-green shadow-xs">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
            Visual Archive
          </span>
          <h1 className="text-2xl sm:text-4xl font-black font-heading tracking-tight">
            Conference Photo Gallery
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Moments captured across inaugural lamp-lighting ceremonies, international keynotes, paper presentation sessions, and award distributions.
          </p>
        </div>
      </div>

      {/* Category Filter Tabs (Sharp, non-curved per user instruction) */}
      <div className="flex items-center gap-2 flex-wrap border-b border-slate-200 pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
              activeCategory === cat
                ? 'bg-[#0A2540] text-white border-brand-navy shadow-xs'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Structured Rectangular Photo Grid (No curved boxes) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhotos.map((photo, idx) => (
          <div
            key={photo.id || idx}
            onClick={() => openLightbox(idx)}
            className="group relative bg-white border border-slate-300 overflow-hidden shadow-xs hover:border-brand-navy transition-all cursor-pointer"
          >
            <div className="h-64 overflow-hidden relative bg-slate-100">
              <img
                src={photo.image}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                <div className="text-white space-y-1">
                  <span className="inline-block text-[10px] font-bold uppercase px-2 py-0.5 bg-brand-green text-white">
                    {photo.category}
                  </span>
                  <h4 className="text-sm font-bold">{photo.title}</h4>
                  <p className="text-xs text-slate-300 line-clamp-2">{photo.caption}</p>
                </div>
              </div>
              <div className="absolute top-3 right-3 p-2 bg-black/75 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>

            <div className="p-4 flex items-center justify-between bg-white border-t border-slate-200">
              <span className="text-xs font-bold text-brand-navy truncate">{photo.title}</span>
              <span className="text-[10px] font-bold uppercase text-slate-500 bg-slate-100 px-2 py-0.5 border border-slate-200">
                {photo.category}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL WITH BLACK TINT & BLURRED BG (Per user instruction) */}
      {currentPhoto && (
        <div 
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-8 animate-fadeIn"
        >
          {/* Top Control Bar */}
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="w-full max-w-5xl flex items-center justify-between text-white border-b border-white/20 pb-3"
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                {currentPhoto.category}
              </span>
              <h3 className="text-base sm:text-lg font-bold">
                {currentPhoto.title}
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-400">
                {activeImageIndex + 1} / {filteredPhotos.length}
              </span>
              <button
                onClick={closeLightbox}
                className="p-2 bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Close Lightbox (Esc)"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Center Image Stage with Left / Right Navigation */}
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="relative max-w-5xl max-h-[75vh] flex items-center justify-center my-auto"
          >
            {/* Prev Arrow */}
            <button
              onClick={prevImage}
              className="absolute -left-4 sm:-left-12 top-1/2 -translate-y-1/2 p-3 bg-black/80 hover:bg-black text-white border border-white/20 transition-all cursor-pointer z-10"
              title="Previous Photo (Left Arrow)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Photo */}
            <img
              src={currentPhoto.image}
              alt={currentPhoto.title}
              className="max-h-[70vh] max-w-full object-contain border border-white/20 shadow-2xl"
            />

            {/* Next Arrow */}
            <button
              onClick={nextImage}
              className="absolute -right-4 sm:-right-12 top-1/2 -translate-y-1/2 p-3 bg-black/80 hover:bg-black text-white border border-white/20 transition-all cursor-pointer z-10"
              title="Next Photo (Right Arrow)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Caption Bar */}
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="w-full max-w-5xl text-center text-xs text-slate-300 pt-2 border-t border-white/10"
          >
            <p>{currentPhoto.caption}</p>
          </div>
        </div>
      )}

    </div>
  );
}
