import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SITE_CONFIG } from '../config/site';
import { Phone } from 'lucide-react';

export const FloatingCall = () => {
  const { isRTL, language } = useLanguage();

  return (
    <aside
      aria-label="Phone Quick Call"
      className={`fixed bottom-6 ${isRTL ? 'right-6' : 'left-6'} z-40 sm:hidden`}
    >
      <a
        href={`tel:${SITE_CONFIG.contact.callRaw}`}
        className="flex items-center gap-2 px-3.5 py-3 rounded-full bg-[#181820]/95 hover:bg-[#22222c] border border-[#D4AF37]/50 text-white shadow-xl shadow-black/80 hover:scale-105 active:scale-95 transition-all backdrop-blur-md"
        aria-label="Call 32141254"
      >
        <div className="w-7 h-7 rounded-full bg-[#D4AF37] flex items-center justify-center text-black">
          <Phone className="w-3.5 h-3.5 fill-black" />
        </div>
        <span className="text-xs font-bold text-amber-100 pr-1" dir="ltr">
          {SITE_CONFIG.contact.callDisplay}
        </span>
      </a>
    </aside>
  );
};
