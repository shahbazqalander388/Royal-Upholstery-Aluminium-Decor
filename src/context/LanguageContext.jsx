import React, { createContext, useContext, useState, useEffect } from 'react';
import { en } from '../translations/en';
import { ar } from '../translations/ar';

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    // Check URL query param first
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get('lang');
    if (urlLang === 'ar' || urlLang === 'en') {
      return urlLang;
    }
    // Check localStorage
    const saved = localStorage.getItem('royal_works_lang');
    if (saved === 'ar' || saved === 'en') {
      return saved;
    }
    // Default to English as explicitly required
    return 'en';
  });

  const isRTL = language === 'ar';
  const t = language === 'ar' ? ar : en;

  const setLanguage = (lang) => {
    if (lang !== 'en' && lang !== 'ar') return;
    setLanguageState(lang);
    localStorage.setItem('royal_works_lang', lang);

    // Keep URL clean or update query param gracefully
    const url = new URL(window.location.href);
    if (lang === 'ar') {
      url.searchParams.set('lang', 'ar');
    } else {
      url.searchParams.delete('lang');
    }
    window.history.replaceState({}, '', url.toString());
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';

    if (isRTL) {
      document.body.classList.add('rtl-mode');
      document.body.classList.remove('ltr-mode');
    } else {
      document.body.classList.add('ltr-mode');
      document.body.classList.remove('rtl-mode');
    }
  }, [language, isRTL]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, isRTL, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
