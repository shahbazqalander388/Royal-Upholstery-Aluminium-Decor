import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SITE_CONFIG } from '../config/site';
import { ContactForm } from '../components/ContactForm';
import { ServiceArea } from '../components/ServiceArea';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  ShieldCheck,
  Send,
} from 'lucide-react';

export const ContactPage = () => {
  const { language, isRTL, t } = useLanguage();

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappClean}?text=${encodeURIComponent(
    language === 'ar'
      ? 'مرحباً رويال لديكورات التنجيد والألمنيوم، أود طلب عرض أسعار للتنجيد أو أعمال الألمنيوم في البحرين.'
      : 'Hello Royal Upholstery & Aluminium Decor, I would like to request a quotation for upholstery or aluminium work in Bahrain.'
  )}`;

  return (
    <div className="py-12 md:py-20">
      {/* Header */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#14141C] border border-[#D4AF37]/30 text-xs text-[#D4AF37] font-bold uppercase tracking-wider mb-4">
          <MessageCircle className="w-3.5 h-3.5" />
          <span>{language === 'ar' ? 'تواصل مباشر 24/7' : 'Direct Support 24/7'}</span>
        </div>

        <h1
          style={{ fontFamily: isRTL ? "'Cairo', sans-serif" : "'Cinzel', 'Outfit', serif" }}
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6"
        >
          {t.contactPage.heading}
        </h1>

        <p className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          {t.contactPage.subheading}
        </p>
      </section>

      {/* Main Content Grid: Info on left, Form on right */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Verified Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-[#0F0F15] border border-[#D4AF37]/25 shadow-xl space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white pb-3 border-b border-white/10">
                {t.contactPage.infoTitle}
              </h2>

              {/* WhatsApp Card */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 rounded-2xl bg-[#14141E] border border-emerald-500/30 hover:border-emerald-500 text-white transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-emerald-400 font-bold uppercase block mb-0.5">
                    WhatsApp (24/7 Instant)
                  </span>
                  <span className="text-base sm:text-lg font-bold text-white block" dir="ltr">
                    {SITE_CONFIG.contact.whatsappDisplay}
                  </span>
                  <span className="text-xs text-gray-400 mt-1 block">
                    {language === 'ar' ? 'اضغط للمراسلة الفورية' : 'Click to chat instantly'}
                  </span>
                </div>
              </a>

              {/* Phone Call Card */}
              <a
                href={`tel:${SITE_CONFIG.contact.callRaw}`}
                className="flex items-start gap-4 p-4 rounded-2xl bg-[#14141E] border border-white/5 hover:border-[#D4AF37]/50 text-white transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shrink-0 group-hover:scale-105 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-[#D4AF37] font-bold uppercase block mb-0.5">
                    {language === 'ar' ? 'اتصال هاتفي مباشر' : 'Direct Phone Call'}
                  </span>
                  <span className="text-base sm:text-lg font-bold text-white block" dir="ltr">
                    {SITE_CONFIG.contact.callDisplay} ({SITE_CONFIG.contact.callDisplayIntl})
                  </span>
                  <span className="text-xs text-gray-400 mt-1 block">
                    {language === 'ar' ? 'اتصال مباشر متاح 24/7' : 'Direct line available 24/7'}
                  </span>
                </div>
              </a>

              {/* Email Card */}
              <a
                href="mailto:walim6360@gmail.com"
                className="flex items-start gap-4 p-4 rounded-2xl bg-[#14141E] border border-white/5 hover:border-[#D4AF37]/50 text-white transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 shrink-0 group-hover:scale-105 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 font-bold uppercase block mb-0.5">
                    Official Email
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-gray-200 block break-all">
                    {t.brand.email}
                  </span>
                  <span className="text-xs text-gray-400 mt-1 block">
                    {language === 'ar' ? 'للاستفسارات والمراسلات الرسمية' : 'For formal business inquiries'}
                  </span>
                </div>
              </a>

              {/* Location & Availability */}
              <div className="pt-4 border-t border-white/10 space-y-3 text-xs text-gray-300">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>{t.brand.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span className="text-amber-300 font-semibold">{t.brand.availability}</span>
                </div>
              </div>
            </div>

            {/* Quick Tips Box */}
            <div className="p-6 rounded-2xl bg-[#0A0A0E] border border-white/5 text-xs text-gray-400 space-y-2">
              <span className="text-[#D4AF37] font-bold block text-sm mb-1">
                {language === 'ar' ? '💡 نصيحة لسرعة التقييم:' : '💡 Fast Quotation Tip:'}
              </span>
              <p>
                {language === 'ar'
                  ? 'عند التواصل معنا عبر واتساب، يرجى إرسال صورة للكنب أو النافذة أو الباب المطلوب تصليحه أو تفصيله مع المقاسات التقريبية للحصول على عرض سعر فوري ومحدد.'
                  : 'Sending photos of your sofa, window, or door along with approximate dimensions on WhatsApp allows our craftsmen to provide an accurate estimate immediately.'}
              </p>
            </div>
          </div>

          {/* Right Column: Contact & Quote Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Service Area Section */}
      <ServiceArea />
    </div>
  );
};
