import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

export const LanguageSwitcher = ({ variant = 'header' }) => {
  const { language, setLanguage } = useLanguage();

  if (variant === 'compact') {
    return (
      <button
        onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#14141A] border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors"
        aria-label="Change Language"
      >
        <Globe className="w-3.5 h-3.5" />
        <span>{language === 'en' ? 'العربية' : 'English'}</span>
      </button>
    );
  }

  return (
    <div className="inline-flex items-center rounded-lg p-1 bg-[#121217] border border-[#D4AF37]/25 shadow-inner">
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 text-xs font-semibold rounded-md transition-all duration-200 ${
          language === 'en'
            ? 'bg-[#D4AF37] text-black shadow-sm font-bold'
            : 'text-gray-300 hover:text-white'
        }`}
        aria-pressed={language === 'en'}
      >
        English
      </button>
      <span className="text-gray-600 px-0.5 text-xs">|</span>
      <button
        type="button"
        onClick={() => setLanguage('ar')}
        className={`px-3 py-1 text-xs font-semibold rounded-md transition-all duration-200 ${
          language === 'ar'
            ? 'bg-[#D4AF37] text-black shadow-sm font-bold'
            : 'text-gray-300 hover:text-white'
        }`}
        style={{ fontFamily: "'Cairo', sans-serif" }}
        aria-pressed={language === 'ar'}
      >
        العربية
      </button>
    </div>
  );
};
