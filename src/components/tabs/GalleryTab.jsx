import React, { useState } from 'react';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight, Maximize2, Tag } from 'lucide-react';

export default function GalleryTab({ content }) {
  const { gallery } = content;
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
    e.stopPropagation();
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex + 1) % filteredPhotos.length);
    }
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-extrabold uppercase tracking-wider text-brand-green bg-brand-mint px-3 py-1 rounded-full border border-emerald-200">
          Photographic Archive
        </span>
        <h1 className="text-3xl sm:text-4xl font-black font-heading text-brand-navy">
          Conference Photo Gallery
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Glimpses from inaugural ceremonies, keynote addresses, technical presentations, and award felicitations.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeCategory === cat
                ? 'bg-brand-navy text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Modern Pinterest-Style Masonry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhotos.map((photo, idx) => (
          <div
            key={photo.id}
            onClick={() => openLightbox(idx)}
            className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1"
          >
            <div className="h-64 overflow-hidden relative bg-slate-100">
              <img
                src={photo.image}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                <div className="text-white space-y-1">
                  <span className="inline-block text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-brand-green text-white">
                    {photo.category}
                  </span>
                  <h4 className="text-sm font-bold">{photo.title}</h4>
                  <p className="text-xs text-slate-300 line-clamp-2">{photo.caption}</p>
                </div>
              </div>
              <div className="absolute top-3 right-3 p-2 rounded-full bg-slate-900/50 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>

            <div className="p-4 flex items-center justify-between bg-white border-t border-slate-100">
              <span className="text-xs font-bold text-brand-navy truncate">{photo.title}</span>
              <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                {photo.category}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Fullscreen Popup Modal */}
      {activeImageIndex !== null && filteredPhotos[activeImageIndex] && (
        <div 
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left Arrow */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/70 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Container */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-white/10"
          >
            <div className="w-full flex-1 max-h-[70vh] flex items-center justify-center bg-black overflow-hidden">
              <img
                src={filteredPhotos[activeImageIndex].image}
                alt={filteredPhotos[activeImageIndex].title}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>
            <div className="w-full p-4 bg-slate-900 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-white">
              <div>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-brand-green text-white mr-2">
                  {filteredPhotos[activeImageIndex].category}
                </span>
                <span className="text-sm font-bold">{filteredPhotos[activeImageIndex].title}</span>
                <p className="text-xs text-slate-400 mt-0.5">{filteredPhotos[activeImageIndex].caption}</p>
              </div>
              <span className="text-xs text-slate-500 font-mono">
                {activeImageIndex + 1} of {filteredPhotos.length}
              </span>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
