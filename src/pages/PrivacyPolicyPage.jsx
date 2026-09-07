import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, ArrowLeft, ArrowRight } from 'lucide-react';

export const PrivacyPolicyPage = () => {
  const { language, isRTL, t } = useLanguage();

  return (
    <div className="py-16 md:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-xs font-bold text-[#D4AF37] hover:text-[#F3E5AB] transition-colors mb-8"
      >
        {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
        <span>{t.notFound.backHome}</span>
      </Link>

      <div className="luxury-card rounded-3xl p-8 sm:p-12 border border-[#D4AF37]/25 shadow-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs text-[#D4AF37] font-bold uppercase tracking-wider mb-4">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{t.legal.privacyUpdated}</span>
        </div>

        <h1
          style={{ fontFamily: isRTL ? "'Cairo', sans-serif" : "'Cinzel', 'Outfit', serif" }}
          className="text-3xl sm:text-4xl font-extrabold text-white mb-6"
        >
          {t.legal.privacyTitle}
        </h1>

        <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-10 pb-6 border-b border-white/10">
          {t.legal.privacyIntro}
        </p>

        <div className="space-y-8">
          {t.legal.privacySections.map((sec, idx) => (
            <div key={idx} className="space-y-2">
              <h2 className="text-lg font-bold text-[#F3E5AB]">
                {sec.heading}
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed">
                {sec.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
