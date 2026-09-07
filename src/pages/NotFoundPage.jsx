import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { AlertTriangle, Home } from 'lucide-react';

export const NotFoundPage = () => {
  const { isRTL, t } = useLanguage();

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full text-center luxury-card p-10 rounded-3xl border border-[#D4AF37]/30 shadow-2xl">
        <div className="w-20 h-20 mx-auto rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] mb-6">
          <AlertTriangle className="w-10 h-10" />
        </div>

        <h1 className="text-4xl font-extrabold text-white mb-3 tracking-tight">
          {t.notFound.title}
        </h1>

        <p className="text-sm text-gray-300 mb-8 leading-relaxed">
          {t.notFound.desc}
        </p>

        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89324] text-black font-extrabold text-sm shadow-xl shadow-[#D4AF37]/25 hover:brightness-110 active:scale-95 transition-all"
        >
          <Home className="w-4 h-4" />
          <span>{t.notFound.backHome}</span>
        </Link>
      </div>
    </div>
  );
};
