import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SITE_CONFIG } from '../config/site';
import {
  Armchair,
  Wrench,
  Scissors,
  SquareAsterisk,
  Hammer,
  Layers,
  Repeat,
  Grid,
  Bed,
  DoorClosed,
  AppWindow,
  ShieldAlert,
  Component,
  RefreshCw,
  Building2,
  MessageCircle,
  CheckCircle2,
} from 'lucide-react';

const iconMap = {
  Armchair,
  Wrench,
  Scissors,
  SquareAsterisk,
  Hammer,
  Layers,
  Repeat,
  Grid,
  Bed,
  DoorClosed,
  AppWindow,
  ShieldAlert,
  Component,
  RefreshCw,
  Building2,
};

export const ServiceCard = ({ service }) => {
  const { language, isRTL, t } = useLanguage();

  const IconComponent = iconMap[service.icon] || Armchair;

  const whatsappMessage = service.whatsappText[language] || service.whatsappText.en;
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappClean}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="luxury-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between group relative overflow-hidden">
      {/* Top subtle glow edge */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div>
        {/* Header: Icon & Category Tag */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1C1C24] to-[#121217] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] group-hover:border-[#D4AF37] group-hover:scale-110 transition-all duration-300 shadow-md">
            <IconComponent className="w-6 h-6" />
          </div>

          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider bg-[#D4AF37]/10 text-amber-300 border border-[#D4AF37]/25">
            {service.category === 'upholstery'
              ? (isRTL ? 'تنجيد' : 'Upholstery')
              : (isRTL ? 'ألمنيوم' : 'Aluminium')}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-gray-100 group-hover:text-[#F3E5AB] transition-colors mb-2.5">
          {service.name[language]}
        </h3>

        {/* Short Description */}
        <p className="text-sm text-gray-400 leading-relaxed mb-5">
          {service.shortDesc[language]}
        </p>

        {/* Feature Bullets */}
        {service.features && (
          <ul className="space-y-2 mb-6 border-t border-white/5 pt-4">
            {service.features[language].map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* CTA Button: Get a Quote via WhatsApp */}
      <div className="pt-2">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#16161E] hover:bg-[#D4AF37] text-amber-200 hover:text-black border border-[#D4AF37]/30 hover:border-[#D4AF37] font-semibold text-sm transition-all duration-200 shadow-sm group-hover:shadow-md"
        >
          <MessageCircle className="w-4 h-4" />
          <span>{t.servicesSection.getQuoteBtn}</span>
        </a>
      </div>
    </div>
  );
};
