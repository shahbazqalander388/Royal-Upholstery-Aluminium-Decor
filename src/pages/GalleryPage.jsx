import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { galleryItems } from '../data/gallery';
import { GalleryLightbox } from '../components/GalleryLightbox';
import { Sparkles, Eye, Scissors, AppWindow, MessageCircle } from 'lucide-react';

export const GalleryPage = () => {
  const { language, isRTL, t } = useLanguage();
  const [filter, setFilter] = useState('all');
  const [activeImage, setActiveImage] = useState(null);

  const filteredItems = galleryItems.filter((item) => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  const currentIdx = activeImage
    ? galleryItems.findIndex((i) => i.id === activeImage.id)
    : -1;

  const handlePrev = () => {
    if (currentIdx > 0) setActiveImage(galleryItems[currentIdx - 1]);
  };

  const handleNext = () => {
    if (currentIdx < galleryItems.length - 1) setActiveImage(galleryItems[currentIdx + 1]);
  };

  return (
    <div className="py-12 md:py-20">
      {/* Header */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#14141C] border border-[#D4AF37]/30 text-xs text-[#D4AF37] font-bold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{language === 'ar' ? 'معرض الأعمال الحقيقية' : 'Real Project Portfolio'}</span>
        </div>

        <h1
          style={{ fontFamily: isRTL ? "'Cairo', sans-serif" : "'Cinzel', 'Outfit', serif" }}
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6"
        >
          {t.gallerySection.title}
        </h1>

        <p className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10">
          {t.gallerySection.subtitle}
        </p>

        {/* Filter Tabs */}
        <div className="inline-flex items-center p-1.5 rounded-2xl bg-[#111117] border border-white/10 shadow-xl">
          <button
            onClick={() => setFilter('all')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              filter === 'all'
                ? 'bg-[#D4AF37] text-black shadow-md'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            {t.gallerySection.filterAll} ({galleryItems.length})
          </button>

          <button
            onClick={() => setFilter('upholstery')}
            className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              filter === 'upholstery'
                ? 'bg-[#D4AF37] text-black shadow-md'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <Scissors className="w-3.5 h-3.5" />
            <span>{t.gallerySection.filterUpholstery} (7)</span>
          </button>

          <button
            onClick={() => setFilter('aluminium')}
            className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              filter === 'aluminium'
                ? 'bg-[#D4AF37] text-black shadow-md'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <AppWindow className="w-3.5 h-3.5" />
            <span>{t.gallerySection.filterAluminium} (6)</span>
          </button>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveImage(item)}
              className="group relative rounded-2xl overflow-hidden bg-[#111116] border border-white/10 hover:border-[#D4AF37]/60 cursor-pointer shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Image Container with fixed aspect ratio to prevent layout shifting */}
              <div className="relative aspect-[4/3] bg-black overflow-hidden">
                <img
                  src={item.src}
                  alt={item.alt[language]}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

                {/* Zoom Icon Button Badge */}
                <div className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-[#D4AF37] opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all shadow-md">
                  <Eye className="w-4 h-4" />
                </div>

                <div className="absolute top-3.5 left-3.5">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider bg-black/80 text-[#D4AF37] border border-[#D4AF37]/30 backdrop-blur-sm">
                    {item.categoryLabel[language]}
                  </span>
                </div>
              </div>

              {/* Card Footer Info */}
              <div className="p-5 bg-[#0F0F15] border-t border-white/5 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-[#F3E5AB] transition-colors mb-1.5 line-clamp-1">
                    {item.title[language]}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                    {item.desc[language]}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-[#D4AF37] font-semibold flex items-center gap-1 group-hover:underline">
                    {t.gallerySection.viewProject}
                  </span>
                  <span className="text-gray-400 text-[11px]">Bahrain Work</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Component */}
      {activeImage && (
        <GalleryLightbox
          item={activeImage}
          onClose={() => setActiveImage(null)}
          onPrev={handlePrev}
          onNext={handleNext}
          hasPrev={currentIdx > 0}
          hasNext={currentIdx < galleryItems.length - 1}
        />
      )}
    </div>
  );
};
