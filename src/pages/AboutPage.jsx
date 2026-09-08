import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { SITE_CONFIG } from '../config/site';
import { ServiceArea } from '../components/ServiceArea';
import { useSEO } from '../hooks/useSEO';
import {
  ShieldCheck,
  Award,
  Clock,
  MapPin,
  Hammer,
  Scissors,
  AppWindow,
  MessageCircle,
  Phone,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export const AboutPage = () => {
  const { language, isRTL, t } = useLanguage();

  const aboutTitle =
    language === 'ar'
      ? 'من نحن | رويال لديكورات التنجيد والألمنيوم في البحرين'
      : 'About Us | Royal Upholstery & Aluminium Decor Bahrain';

  const aboutDesc =
    language === 'ar'
      ? 'تعرف على رويال لديكورات التنجيد والألمنيوم، خبرة عريقة في تفصيل وصيانة الكنب والأثاث وديكورات وأبواب ونوافذ الألمنيوم في جميع محافظات البحرين 24/7.'
      : 'Learn about Royal Upholstery & Aluminium Decor. Premium upholstery craftsmanship, sofa repair, curtain making, and precision aluminium works across Bahrain.';

  useSEO({
    title: aboutTitle,
    description: aboutDesc,
    keywords: language === 'ar' ? 'من نحن رويال تنجيد البحرين, ورشة تنجيد كنب البحرين, ورشة المنيوم البحرين' : 'about royal upholstery Bahrain, aluminium company Bahrain',
    canonical: 'https://royalupholsterybh.com/about',
  });

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappClean}?text=${encodeURIComponent(
    language === 'ar'
      ? 'مرحباً رويال لديكورات التنجيد والألمنيوم، أود الاستفسار والتحدث معكم بخصوص خدماتكم.'
      : 'Hello Royal Upholstery & Aluminium Decor, I would like to enquire about your services.'
  )}`;

  return (
    <div className="py-12 md:py-20">
      {/* Page Header */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#14141C] border border-[#D4AF37]/30 text-xs text-[#D4AF37] font-bold uppercase tracking-wider mb-4">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{t.brand.shortName} • Bahrain</span>
        </div>

        <h1
          style={{ fontFamily: isRTL ? "'Cairo', sans-serif" : "'Cinzel', 'Outfit', serif" }}
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6"
        >
          {t.aboutPage.heading}
        </h1>

        <p className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          {t.aboutPage.subheading}
        </p>
      </section>

      {/* Main Philosophy & Workmanship Details */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Text */}
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              {t.aboutPage.introTitle}
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
              {language === 'ar'
                ? 'حلول التنجيد والألمنيوم الاحترافية في مكان واحد'
                : 'Upholstery & Aluminium Craftsmanship Under One Trusted Roof'}
            </h2>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              {t.aboutPage.introP1}
            </p>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              {t.aboutPage.introP2}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
              <div className="p-4 rounded-xl bg-[#0F0F16] border border-white/5">
                <span className="text-xs text-[#D4AF37] font-bold uppercase block mb-1">
                  {language === 'ar' ? 'التغطية الجغرافية' : 'Service Coverage'}
                </span>
                <span className="text-sm font-semibold text-white">
                  {language === 'ar' ? 'جميع محافظات البحرين' : 'All Bahrain Governorates'}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#0F0F16] border border-white/5">
                <span className="text-xs text-[#D4AF37] font-bold uppercase block mb-1">
                  {language === 'ar' ? 'أوقات العمل' : 'Working Hours'}
                </span>
                <span className="text-sm font-semibold text-amber-300">
                  {language === 'ar' ? '24 ساعة / 7 أيام' : '24 Hours / 7 Days'}
                </span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89324] text-black font-extrabold text-sm shadow-lg shadow-[#D4AF37]/20 hover:brightness-110 transition-all"
              >
                <span>{t.aboutPage.cta}</span>
                <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#14141C] text-white border border-white/10 hover:border-[#D4AF37] font-bold text-sm transition-all"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>{t.nav.whatsappCta}</span>
              </a>
            </div>
          </div>

          {/* Right Visual Collage with Real Images */}
          <div className="grid grid-cols-2 gap-4 relative">
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-xl aspect-[4/5]">
                <img
                  src="https://res.cloudinary.com/dai2g47e4/image/upload/v1788772794/WhatsApp_Image_2026-08-24_at_9.14.48_PM_1_h4jazg.jpg"
                  alt="Custom sofa crafting Bahrain"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 rounded-2xl bg-[#121218] border border-white/10 text-center">
                <Scissors className="w-6 h-6 text-[#D4AF37] mx-auto mb-2" />
                <span className="text-xs font-bold text-white block">
                  {language === 'ar' ? 'تنجيد متقن وتفصيل' : 'Expert Upholstery'}
                </span>
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <div className="p-4 rounded-2xl bg-[#121218] border border-white/10 text-center">
                <AppWindow className="w-6 h-6 text-[#D4AF37] mx-auto mb-2" />
                <span className="text-xs font-bold text-white block">
                  {language === 'ar' ? 'ألمنيوم دقيق ومتين' : 'Precision Aluminium'}
                </span>
              </div>
              <div className="rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-xl aspect-[4/5]">
                <img
                  src="https://res.cloudinary.com/dai2g47e4/image/upload/v1788772795/WhatsApp_Image_2026-08-24_at_11.23.08_PM_ytrt7x.jpg"
                  alt="Aluminium door fabrication Bahrain"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values / Commitments */}
      <section className="py-16 bg-[#09090D] border-t border-b border-white/5 mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3">
              {t.aboutPage.valuesTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.aboutPage.values.map((val, idx) => (
              <div
                key={idx}
                className="luxury-card rounded-2xl p-6 border border-white/5 hover:border-[#D4AF37]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-center text-[#D4AF37] mb-4">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                    {val.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bahrain Service Area Component */}
      <ServiceArea />
    </div>
  );
};
