import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { SITE_CONFIG } from '../config/site';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Phone, Mail, MapPin, Clock, MessageCircle, ArrowUpRight } from 'lucide-react';

export const Footer = () => {
  const { t, isRTL, language } = useLanguage();

  const servicesList = [
    { name: isRTL ? 'تفصيل كنب جديد' : 'Sofa New Making', path: '/services?cat=upholstery' },
    { name: isRTL ? 'تصليح وصيانة الكنب' : 'Sofa Repair', path: '/services?cat=upholstery' },
    { name: isRTL ? 'استبدال قماش الكنب' : 'Sofa Fabric Replacement', path: '/services?cat=upholstery' },
    { name: isRTL ? 'تفصيل ستائر' : 'Curtains Making', path: '/services?cat=upholstery' },
    { name: isRTL ? 'الشتر الروماني' : 'Roman Blinds', path: '/services?cat=upholstery' },
    { name: isRTL ? 'أبواب ألمنيوم' : 'Aluminium Doors', path: '/services?cat=aluminium' },
    { name: isRTL ? 'نوافذ ألمنيوم' : 'Aluminium Windows', path: '/services?cat=aluminium' },
    { name: isRTL ? 'صيانة وديكورات الألمنيوم' : 'Aluminium Repair & Decor', path: '/services?cat=aluminium' },
  ];

  const quickLinks = [
    { label: t.nav.home, to: '/#home' },
    { label: t.nav.about, to: '/#about' },
    { label: t.nav.services, to: '/#services' },
    { label: t.nav.gallery, to: '/#gallery' },
    { label: t.nav.contact, to: '/#contact' },
  ];

  const areasList = [
    isRTL ? 'المنامة' : 'Manama',
    isRTL ? 'الرفاع' : 'Riffa',
    isRTL ? 'المحرق' : 'Muharraq',
    isRTL ? 'مدينة حمد' : 'Hamad Town',
    isRTL ? 'مدينة عيسى' : 'Isa Town',
    isRTL ? 'سار' : 'Saar',
    isRTL ? 'ضاحية السيف' : 'Seef',
    isRTL ? 'البديع' : 'Budaiya',
    isRTL ? 'الجفير' : 'Juffair',
    isRTL ? 'توبلي' : 'Tubli',
    isRTL ? 'عالي' : "A'ali",
    isRTL ? 'سترة' : 'Sitra',
  ];

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappClean}?text=${encodeURIComponent(
    language === 'ar'
      ? 'مرحباً رويال لديكورات التنجيد والألمنيوم، أود الاستفسار عن خدماتكم في البحرين.'
      : 'Hello Royal Upholstery & Aluminium Decor, I would like to enquire about your services in Bahrain.'
  )}`;

  return (
    <footer className="bg-[#060608] text-gray-300 border-t border-[#D4AF37]/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <Logo size="large" />
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed pt-2">
              {t.footer.desc}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#14141A] border border-[#D4AF37]/30 text-xs text-amber-300 font-medium">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{t.footer.availabilityBadge}</span>
            </div>
            <div className="pt-2">
              <span className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
                {isRTL ? 'اختر اللغة' : 'Select Language'}
              </span>
              <LanguageSwitcher />
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#F3E5AB] mb-4 pb-2 border-b border-white/5 inline-block">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((item) => (
                <li key={item.to}>
                  <a
                    href={item.to}
                    className="text-gray-400 hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowUpRight className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#D4AF37] ${isRTL ? 'rotate-[-90deg]' : ''}`} />
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-gray-500 hover:text-gray-300 text-xs transition-colors"
                >
                  {t.footer.privacyLink}
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-gray-500 hover:text-gray-300 text-xs transition-colors"
                >
                  {t.footer.termsLink}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Services */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#F3E5AB] mb-4 pb-2 border-b border-white/5 inline-block">
              {t.footer.servicesTitle}
            </h4>
            <ul className="space-y-2 text-sm">
              {servicesList.map((service, index) => (
                <li key={index}>
                  <Link
                    to={service.path}
                    className="text-gray-400 hover:text-[#D4AF37] transition-colors text-xs sm:text-sm block"
                  >
                    • {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Service Area */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#F3E5AB] mb-4 pb-2 border-b border-white/5 inline-block">
              {t.footer.contactTitle}
            </h4>
            <div className="space-y-3 text-sm">
              {/* WhatsApp Item */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-2.5 rounded-xl bg-[#111116] border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 text-gray-200 transition-colors group"
              >
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase">WhatsApp (24/7)</span>
                  <span className="font-semibold text-xs sm:text-sm text-[#F3E5AB]" dir="ltr">
                    {SITE_CONFIG.contact.whatsappDisplay}
                  </span>
                </div>
              </a>

              {/* Simple Call Item */}
              <a
                href={`tel:${SITE_CONFIG.contact.callRaw}`}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-[#111116] border border-white/5 hover:border-[#D4AF37]/40 text-gray-200 transition-colors"
              >
                <div className="p-2 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase">
                    {language === 'ar' ? 'اتصال هاتف مباشر' : 'Direct Call'}
                  </span>
                  <span className="font-semibold text-xs sm:text-sm" dir="ltr">
                    {SITE_CONFIG.contact.callDisplay} ({SITE_CONFIG.contact.callDisplayIntl})
                  </span>
                </div>
              </a>

              {/* Email Item */}
              <a
                href={`mailto:${SITE_CONFIG.contact.email}`}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-[#111116] border border-white/5 hover:border-[#D4AF37]/40 text-gray-200 transition-colors"
              >
                <div className="p-2 rounded-lg bg-white/5 text-gray-300">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase">Email</span>
                  <span className="font-semibold text-xs break-all">{SITE_CONFIG.contact.email}</span>
                </div>
              </a>

              {/* Service Area Item */}
              <div className="flex items-start gap-3 p-2.5 rounded-xl bg-[#111116] border border-white/5 text-gray-300">
                <div className="p-2 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase">{t.footer.servingTitle}</span>
                  <span className="text-xs leading-relaxed">{t.footer.servingText}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bahrain Coverage Tags */}
        <div className="pt-6 pb-6 border-t border-white/5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-gray-400">
              {isRTL ? 'مناطق التغطية في البحرين:' : 'Serving Across Bahrain:'}
            </span>
            {areasList.map((area, idx) => (
              <span
                key={idx}
                className="text-[11px] px-2.5 py-1 rounded-md bg-[#121218] border border-white/5 text-gray-400 hover:text-amber-200 transition-colors"
              >
                {area}
              </span>
            ))}
            <span className="text-[11px] px-2.5 py-1 rounded-md bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-amber-300 font-medium">
              {isRTL ? '+ كافة مناطق المملكة' : '+ All Kingdom Areas'}
            </span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>{t.footer.copyright}</div>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="hover:text-gray-300 transition-colors">
              {t.footer.privacyLink}
            </Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-gray-300 transition-colors">
              {t.footer.termsLink}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
