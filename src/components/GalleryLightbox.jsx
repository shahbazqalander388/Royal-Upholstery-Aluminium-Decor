import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SITE_CONFIG } from '../config/site';
import { X, ChevronLeft, ChevronRight, MessageCircle, ZoomIn } from 'lucide-react';

export const GalleryLightbox = ({ item, onClose, onPrev, onNext, hasPrev, hasNext }) => {
  const { language, isRTL, t } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') {
        if (isRTL) {
          if (hasNext) onNext();
        } else {
          if (hasPrev) onPrev();
        }
      }
      if (e.key === 'ArrowRight') {
        if (isRTL) {
          if (hasPrev) onPrev();
        } else {
          if (hasNext) onNext();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose, onPrev, onNext, hasPrev, hasNext, isRTL]);

  if (!item) return null;

  const itemTitle = item.title[language];
  const itemDesc = item.desc[language];

  const whatsappInquiryText =
    language === 'ar'
      ? `مرحباً رويال لديكورات التنجيد والألمنيوم، أود الاستفسار بخصوص هذا العمل المعروض في معرض أعمالكم (${itemTitle}) والحصول على عرض أسعار.`
      : `Hello Royal Upholstery & Aluminium Decor, I am interested in this project from your gallery (${itemTitle}) and would like to get a quote.`;

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappClean}?text=${encodeURIComponent(whatsappInquiryText)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6 md:p-10 animate-fadeIn">
      {/* Backdrop clickable */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Lightbox Content Container */}
      <div className="relative z-10 max-w-5xl w-full bg-[#0E0E14] border border-[#D4AF37]/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[92vh]">
        {/* Close Button Top-Right (or Top-Left in RTL) */}
        <button
          onClick={onClose}
          className={`absolute top-4 ${
            isRTL ? 'left-4' : 'right-4'
          } z-20 p-2 rounded-full bg-black/60 hover:bg-[#D4AF37] text-white hover:text-black transition-colors`}
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Preview Container */}
        <div className="relative flex-1 bg-black flex items-center justify-center min-h-[300px] md:min-h-[480px] overflow-hidden group">
          <img
            src={item.src}
            alt={item.alt[language]}
            className="w-full h-full max-h-[70vh] md:max-h-[85vh] object-contain select-none"
          />

          {/* Prev Button */}
          {hasPrev && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className={`absolute ${
                isRTL ? 'right-4' : 'left-4'
              } top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 hover:bg-[#D4AF37] text-white hover:text-black border border-white/10 transition-colors shadow-lg`}
              aria-label="Previous image"
            >
              {isRTL ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
            </button>
          )}

          {/* Next Button */}
          {hasNext && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className={`absolute ${
                isRTL ? 'left-4' : 'right-4'
              } top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/70 hover:bg-[#D4AF37] text-white hover:text-black border border-white/10 transition-colors shadow-lg`}
              aria-label="Next image"
            >
              {isRTL ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
            </button>
          )}
        </div>

        {/* Info Sidebar */}
        <div className="w-full md:w-80 lg:w-96 p-6 md:p-8 flex flex-col justify-between bg-[#121218] border-t md:border-t-0 md:border-l md:border-[#D4AF37]/20 overflow-y-auto">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs px-2.5 py-1 rounded-md uppercase font-semibold bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30">
                {item.categoryLabel[language]}
              </span>
              <span className="text-xs text-gray-500">
                {language === 'ar' ? 'أعمال حقيقية بالبحرين' : 'Real Bahrain Project'}
              </span>
            </div>

            <h3 className="text-xl font-bold text-white mb-3 leading-snug">
              {itemTitle}
            </h3>

            <p className="text-sm text-gray-300 leading-relaxed mb-6">
              {itemDesc}
            </p>

            <div className="p-3.5 rounded-xl bg-[#09090C] border border-white/5 text-xs text-gray-400 space-y-1.5">
              <div className="flex items-center justify-between">
                <span>{language === 'ar' ? 'الموقع:' : 'Location:'}</span>
                <span className="text-gray-200 font-medium">Bahrain</span>
              </div>
              <div className="flex items-center justify-between">
                <span>{language === 'ar' ? 'الجاهزية:' : 'Availability:'}</span>
                <span className="text-amber-300 font-medium">24 Hours / 7 Days</span>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-white/10">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89324] text-black font-bold text-sm shadow-lg hover:brightness-110 active:scale-95 transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-black/30" />
              <span>{t.gallerySection.inquireWhatsApp}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
