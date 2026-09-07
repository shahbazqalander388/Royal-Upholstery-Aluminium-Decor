import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { SITE_CONFIG } from '../config/site';

export const Logo = ({ size = 'normal', showTagline = true, light = false }) => {
  const { isRTL } = useLanguage();

  return (
    <Link to="/" className="group flex items-center gap-3 select-none text-start">
      {/* Vector Crest Mark */}
      <div className="relative shrink-0 flex items-center justify-center">
        <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-[#1C1C24] to-[#0A0A0C] border border-[#D4AF37]/40 group-hover:border-[#D4AF37] transition-all duration-300 flex items-center justify-center shadow-lg shadow-black/60 overflow-hidden">
          <svg
            className="w-7 h-7 text-[#D4AF37] group-hover:scale-105 transition-transform duration-300"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer subtle shield */}
            <path
              d="M50 10L82 24V54C82 72 50 88 50 88C50 88 18 72 18 54V24L50 10Z"
              stroke="url(#goldGradLogo)"
              strokeWidth="3"
              strokeLinejoin="round"
              fill="rgba(18, 18, 22, 0.7)"
            />
            {/* Crown Top / Craftsmanship Crest */}
            <path
              d="M30 40L38 52L50 32L62 52L70 40L67 62H33L30 40Z"
              fill="url(#goldGradLogo)"
              stroke="#D4AF37"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {/* Aluminium Frame Cross Grid */}
            <rect x="35" y="48" width="30" height="14" rx="2" fill="#0C0C10" stroke="#F3E5AB" strokeWidth="1.5" />
            <line x1="50" y1="48" x2="50" y2="62" stroke="#D4AF37" strokeWidth="1.5" />
            <line x1="35" y1="55" x2="65" y2="55" stroke="#D4AF37" strokeWidth="1.5" />
            {/* Tufting upholstery dots */}
            <circle cx="42" cy="51.5" r="1.2" fill="#D4AF37" />
            <circle cx="58" cy="51.5" r="1.2" fill="#D4AF37" />
            <circle cx="42" cy="58.5" r="1.2" fill="#D4AF37" />
            <circle cx="58" cy="58.5" r="1.2" fill="#D4AF37" />
            {/* Crown jewels */}
            <circle cx="30" cy="38" r="2" fill="#FFF" />
            <circle cx="50" cy="30" r="2.5" fill="#FFF" />
            <circle cx="70" cy="38" r="2" fill="#FFF" />
            <defs>
              <linearGradient id="goldGradLogo" x1="20" y1="10" x2="80" y2="85" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F9EDC7" />
                <stop offset="0.4" stopColor="#D4AF37" />
                <stop offset="0.8" stopColor="#B8860B" />
                <stop offset="1" stopColor="#E5C158" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span
            style={{ fontFamily: "'Cinzel', 'Outfit', serif" }}
            className={`font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-[#D4AF37] to-amber-300 ${
              size === 'large' ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'
            }`}
          >
            {isRTL ? SITE_CONFIG.brand.shortNameAr : 'ROYAL DECOR'}
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded uppercase font-semibold tracking-wider bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30">
            {isRTL ? 'البحرين' : 'BAHRAIN'}
          </span>
        </div>
        {showTagline && (
          <span
            className={`text-[10px] md:text-[11px] font-medium tracking-wider uppercase ${
              light ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300'
            } transition-colors`}
          >
            {isRTL ? SITE_CONFIG.brand.subAr : SITE_CONFIG.brand.subEn}
          </span>
        )}
      </div>
    </Link>
  );
};
