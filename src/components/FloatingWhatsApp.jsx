import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SITE_CONFIG } from '../config/site';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsApp = () => {
  const { isRTL, language } = useLanguage();
  const [showTooltip, setShowTooltip] = useState(false);

  const defaultMessage =
    language === 'ar'
      ? 'مرحباً رويال لديكورات التنجيد والألمنيوم، أود الاستفسار والحصول على عرض أسعار في البحرين.'
      : 'Hello Royal Upholstery & Aluminium Decor, I would like to get a quote for services in Bahrain.';

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappClean}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <aside
      aria-label="WhatsApp Quick Contact"
      className={`fixed bottom-6 ${isRTL ? 'left-6' : 'right-6'} z-50 flex flex-col items-${isRTL ? 'start' : 'end'} gap-2`}
    >
      {/* Interactive Tooltip Card */}
      {showTooltip && (
        <div className="w-72 p-4 rounded-2xl bg-[#121218] border border-[#D4AF37]/40 shadow-2xl backdrop-blur-xl text-gray-200 animate-fadeIn relative">
          <button
            onClick={() => setShowTooltip(false)}
            className={`absolute top-2.5 ${isRTL ? 'left-2.5' : 'right-2.5'} text-gray-400 hover:text-white p-1`}
            aria-label="Close message popup"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
              {language === 'ar' ? 'واتساب البحرين 24/7' : 'Bahrain WhatsApp 24/7'}
            </span>
          </div>
          <p className="text-xs text-gray-300 mb-3 leading-relaxed">
            {language === 'ar'
              ? `راسلنا مباشرة على ${SITE_CONFIG.contact.whatsappDisplay} للحصول على عرض سعر فوري للتنجيد أو ديكورات الألمنيوم.`
              : `Message us on ${SITE_CONFIG.contact.whatsappDisplay} for an instant quotation for upholstery or aluminium decor.`}
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-white/20" />
            <span>{language === 'ar' ? 'محادثة فورية على واتساب' : 'Chat on WhatsApp'}</span>
          </a>
        </div>
      )}

      {/* Floating Main Button */}
      <div className="relative group">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setShowTooltip(true)}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-xl shadow-emerald-950/60 hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/20 relative"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-7 h-7 fill-white/20" />
          {/* Pulsing ring */}
          <span className="absolute -inset-1 rounded-full border-2 border-[#25D366]/50 animate-ping pointer-events-none" />
        </a>

        {/* Small badge */}
        <span
          className={`absolute -top-1 ${
            isRTL ? '-left-1' : '-right-1'
          } flex h-4 w-4 items-center justify-center rounded-full bg-[#D4AF37] text-[9px] font-bold text-black border border-black shadow`}
        >
          1
        </span>
      </div>
    </aside>
  );
};
