import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { SITE_CONFIG } from '../config/site';
import { services } from '../data/services';
import { galleryItems } from '../data/gallery';
import { faqs } from '../data/faqs';
import { ServiceCard } from '../components/ServiceCard';
import { GalleryLightbox } from '../components/GalleryLightbox';
import { ServiceArea } from '../components/ServiceArea';
import { Testimonials } from '../components/Testimonials';
import { ContactForm } from '../components/ContactForm';
import {
  ShieldCheck,
  Home as HomeIcon,
  Clock,
  MapPin,
  Hammer,
  BadgePercent,
  MessageCircle,
  Phone,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Scissors,
  AppWindow,
  Eye,
  Mail,
} from 'lucide-react';

const iconLookup = {
  ShieldCheck,
  Home: HomeIcon,
  Clock,
  MapPin,
  Hammer,
  BadgePercent,
};

export const HomePage = () => {
  const { language, isRTL, t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(null);
  const [openFaqId, setOpenFaqId] = useState(1);
  const location = useLocation();

  // Scroll to targeted section on load if user navigated to /about, /services, etc.
  useEffect(() => {
    const path = location.pathname.toLowerCase().replace(/\/$/, '') || '/';
    let targetId = '';
    if (path === '/about') targetId = 'about';
    else if (path === '/services') targetId = 'services';
    else if (path === '/gallery') targetId = 'gallery';
    else if (path === '/contact') targetId = 'contact';
    else if (location.hash) {
      targetId = location.hash.replace('#', '');
    }

    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 120);
      }
    }
  }, [location.pathname]);

  // Top 6 featured services for homepage
  const featuredServices = [
    services[0], // Sofa New Making
    services[1], // Sofa Repair
    services[2], // Sofa Fabric Replacement
    services[9], // Aluminium Doors
    services[10], // Aluminium Windows
    services[11], // Aluminium Repair
  ];

  // 6 preview gallery items
  const previewGallery = galleryItems.slice(0, 6);

  const toggleFaq = (id) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const whatsappGeneralUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappClean}?text=${encodeURIComponent(
    language === 'ar'
      ? 'مرحباً رويال لديكورات التنجيد والألمنيوم، أود الحصول على عرض أسعار لخدماتكم في البحرين.'
      : 'Hello Royal Upholstery & Aluminium Decor, I would like to get a quote for your services in Bahrain.'
  )}`;

  const currentIdx = selectedImage
    ? galleryItems.findIndex((i) => i.id === selectedImage.id)
    : -1;

  const handlePrev = () => {
    if (currentIdx > 0) setSelectedImage(galleryItems[currentIdx - 1]);
  };

  const handleNext = () => {
    if (currentIdx < galleryItems.length - 1) setSelectedImage(galleryItems[currentIdx + 1]);
  };

  return (
    <div className="space-y-0">
      {/* 1. HERO SECTION (id="home") */}
      <section id="home" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-12 pb-20 md:py-28 bg-[#07070A]">
        {/* Background real project image with deep dark gradient overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://res.cloudinary.com/dai2g47e4/image/upload/v1788772792/WhatsApp_Image_2026-08-24_at_9.14.47_PM_1_-_Copy_mneskp.jpg"
            alt="Royal Upholstery & Aluminium Decor craftsmanship in Bahrain"
            fetchPriority="high"
            className="w-full h-full object-cover object-center opacity-25 scale-105 filter blur-[1px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07070A] via-[#07070A]/85 to-[#07070A]/95" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#07070A]/70 to-[#07070A]" />
        </div>

        {/* Ambient Gold Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#D4AF37]/10 blur-[140px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Availability Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#14141C]/90 border border-[#D4AF37]/40 shadow-lg shadow-black/50 backdrop-blur-md mb-8 animate-fadeIn">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs sm:text-sm font-bold text-[#F3E5AB] tracking-wide">
              {t.hero.badge}
            </span>
          </div>

          {/* Headline */}
          <h1
            style={{ fontFamily: isRTL ? "'Cairo', sans-serif" : "'Cinzel', 'Outfit', serif" }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.15] mb-6 max-w-5xl mx-auto"
          >
            {isRTL ? (
              <>
                <span className="text-gold-gradient">ديكورات وتنجيد</span> الألمنيوم والأثاث الفاخر في البحرين
              </>
            ) : (
              <>
                Premium <span className="text-gold-gradient">Upholstery & Aluminium</span> Decor Across Bahrain
              </>
            )}
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light mb-10">
            {t.hero.subheading}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-12">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                window.history.pushState(null, '', '/contact');
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#B89324] hover:brightness-110 text-black font-extrabold text-base shadow-xl shadow-[#D4AF37]/25 active:scale-95 transition-all cursor-pointer"
            >
              <span>{t.hero.primaryCta}</span>
              <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
            </a>

            <a
              href={whatsappGeneralUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#14141C]/90 hover:bg-[#1C1C26] text-white border border-[#D4AF37]/40 hover:border-[#D4AF37] font-bold text-base shadow-lg active:scale-95 transition-all backdrop-blur-sm"
            >
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
              <span>{t.hero.secondaryCta}</span>
            </a>
          </div>

          {/* Highlights Mini Pills */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto text-xs text-gray-300 pt-4 border-t border-white/10">
            {t.hero.highlights.map((highlight, index) => (
              <div
                key={index}
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span className="font-medium truncate">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. ABOUT US & WHY CHOOSE US (id="about") */}
      <section id="about" className="py-16 md:py-24 relative bg-[#07070A] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] block mb-2">
              {isRTL ? 'عن رويال ديكور البحرين' : 'About Royal Decor Bahrain'}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
              {t.whyChooseUs.title}
            </h2>
            <p className="text-base sm:text-lg text-gray-400">
              {t.whyChooseUs.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
            {t.whyChooseUs.items.map((item, index) => {
              const IconComp = iconLookup[item.icon] || ShieldCheck;
              return (
                <div
                  key={index}
                  className="luxury-card rounded-2xl p-7 border border-white/5 hover:border-[#D4AF37]/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-5">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick About Philosophy Highlight */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#0D0D14] border border-[#D4AF37]/25 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                {t.aboutPage.introTitle}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {isRTL ? 'إتقان الصنعة وحلول الصيانة الموثوقة' : 'Precision Craftsmanship & Reliable Maintenance'}
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                {t.aboutPage.introP2}
              </p>
            </div>
            <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  window.history.pushState(null, '', '/contact');
                }}
                className="px-6 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#E5C158] text-black font-bold text-sm shadow-md transition-all text-center"
              >
                {t.aboutPage.cta}
              </a>
              <a
                href={`tel:${SITE_CONFIG.contact.callRaw}`}
                className="px-6 py-3 rounded-xl bg-[#181822] hover:bg-[#222230] text-gray-200 border border-white/10 font-bold text-sm transition-all text-center flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <span dir="ltr">{SITE_CONFIG.contact.callDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION (id="services") */}
      <section id="services" className="py-16 md:py-24 bg-[#09090D] border-t border-b border-white/5 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Quick Categories Banner */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Category 1: Upholstery */}
            <div className="luxury-card rounded-3xl p-8 sm:p-10 border border-[#D4AF37]/25 relative overflow-hidden group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1C1C24] to-[#121217] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-6 group-hover:scale-110 transition-transform">
                <Scissors className="w-8 h-8" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                {t.quickCategories.upholstery.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-6">
                {t.quickCategories.upholstery.desc}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  isRTL ? 'تفصيل كنب' : 'Sofa Making',
                  isRTL ? 'تصليح كنب' : 'Sofa Repair',
                  isRTL ? 'تجديد أقمشة' : 'Fabric Replacement',
                  isRTL ? 'ستائر وشتر' : 'Curtains & Blinds',
                  isRTL ? 'تصليح أسرة' : 'Bed Repair',
                ].map((item, idx) => (
                  <span key={idx} className="text-xs px-3 py-1.5 rounded-lg bg-[#14141C] border border-white/5 text-gray-300">
                    • {item}
                  </span>
                ))}
              </div>
              <a
                href="#services-catalog"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('services-catalog')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-sm font-bold text-[#F3E5AB] group-hover:text-[#D4AF37] transition-colors"
              >
                <span>{t.quickCategories.upholstery.cta}</span>
                <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
              </a>
            </div>

            {/* Category 2: Aluminium */}
            <div className="luxury-card rounded-3xl p-8 sm:p-10 border border-[#D4AF37]/25 relative overflow-hidden group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1C1C24] to-[#121217] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-6 group-hover:scale-110 transition-transform">
                <AppWindow className="w-8 h-8" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                {t.quickCategories.aluminium.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-6">
                {t.quickCategories.aluminium.desc}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  isRTL ? 'أبواب ألمنيوم' : 'Aluminium Doors',
                  isRTL ? 'نوافذ ألمنيوم' : 'Aluminium Windows',
                  isRTL ? 'صيانة دورية' : 'Aluminium Repair',
                  isRTL ? 'تركيب جديد' : 'New Installations',
                  isRTL ? 'استبدال القديم' : 'Replacement Work',
                ].map((item, idx) => (
                  <span key={idx} className="text-xs px-3 py-1.5 rounded-lg bg-[#14141C] border border-white/5 text-gray-300">
                    • {item}
                  </span>
                ))}
              </div>
              <a
                href="#services-catalog"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('services-catalog')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-sm font-bold text-[#F3E5AB] group-hover:text-[#D4AF37] transition-colors"
              >
                <span>{t.quickCategories.aluminium.cta}</span>
                <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
              </a>
            </div>
          </div>

          {/* Featured Services Section */}
          <div id="services-catalog" className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 scroll-mt-24">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] block mb-2">
                {language === 'ar' ? 'أعمال متقنة ومضمونة' : 'Professional Workmanship'}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                {t.servicesSection.title}
              </h2>
            </div>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                window.history.pushState(null, '', '/contact');
              }}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#D4AF37] hover:text-[#F3E5AB] transition-colors"
            >
              <span>{language === 'ar' ? 'طلب عرض سعر فوري' : 'Request a Fast Quote'}</span>
              <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          {/* 9 additional services in accordion or expand button */}
          <div className="mt-12 text-center">
            <a
              href={whatsappGeneralUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#14141C] hover:bg-[#1C1C26] text-[#F3E5AB] border border-[#D4AF37]/40 font-bold text-sm shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>{language === 'ar' ? 'استفسر عن كافة خدمات التنجيد والألمنيوم (15 خدمة)' : 'Inquire About All 15 Services on WhatsApp'}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 4. REAL WORK GALLERY (id="gallery") */}
      <section id="gallery" className="py-16 md:py-24 bg-[#07070A] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] block mb-2">
                {language === 'ar' ? 'نماذج حقيقية من مشاريعنا' : 'Real Project Showcase'}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                {t.gallerySection.title}
              </h2>
              <p className="text-sm sm:text-base text-gray-400 mt-2">
                {t.gallerySection.subtitle}
              </p>
            </div>
          </div>

          {/* Grid of All 13 Unique Real Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedImage(item)}
                className="group relative rounded-2xl overflow-hidden bg-[#111116] border border-white/10 hover:border-[#D4AF37]/50 cursor-pointer shadow-lg transition-all duration-300 aspect-[4/3]"
              >
                <img
                  src={item.src}
                  alt={item.alt[language]}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                <div className="absolute inset-x-0 bottom-0 p-5 text-start">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded uppercase tracking-wider bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 inline-block mb-2">
                    {item.categoryLabel[language]}
                  </span>
                  <h3 className="text-base font-bold text-white group-hover:text-[#F3E5AB] transition-colors line-clamp-1">
                    {item.title[language]}
                  </h3>
                  <p className="text-xs text-gray-300 line-clamp-1 mt-1">
                    {item.desc[language]}
                  </p>
                </div>

                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SERVICE AREA (SERVING ALL BAHRAIN) */}
      <ServiceArea />

      {/* 6. FAQ ACCORDION SECTION */}
      <section className="py-16 md:py-24 bg-[#07070A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] block mb-2">
              {language === 'ar' ? 'وضوح وشفافية' : 'Common Enquiries'}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
              {t.faq.title}
            </h2>
            <p className="text-base text-gray-400">
              {t.faq.subtitle}
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl bg-[#0F0F16] border border-white/10 hover:border-[#D4AF37]/30 transition-colors overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-start"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg font-bold text-white">
                      {faq.question[language]}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full bg-[#181824] border border-white/10 flex items-center justify-center text-[#D4AF37] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 bg-[#D4AF37] text-black' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-sm text-gray-300 leading-relaxed border-t border-white/5 pt-4 animate-fadeIn">
                      {faq.answer[language]}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS / CLIENT FEEDBACK COMMITMENT */}
      <Testimonials />

      {/* 8. CONTACT US SECTION (id="contact") */}
      <section id="contact" className="py-16 md:py-24 bg-[#09090D] border-t border-b border-white/5 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] block mb-2">
              {language === 'ar' ? 'تواصل مباشر 24/7' : 'Direct Support 24/7'}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
              {t.contactPage.heading}
            </h2>
            <p className="text-base text-gray-300">
              {t.contactPage.subheading}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Contact Info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-8 rounded-3xl bg-[#0F0F15] border border-[#D4AF37]/25 shadow-xl space-y-6">
                <h3 className="text-xl sm:text-2xl font-bold text-white pb-3 border-b border-white/10">
                  {t.contactPage.infoTitle}
                </h3>

                {/* WhatsApp Card */}
                <a
                  href={whatsappGeneralUrl}
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

                {/* Simple Call Card */}
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
                      {language === 'ar' ? 'اتصال مباشر متاح 24/7' : 'Direct call line available 24/7'}
                    </span>
                  </div>
                </a>

                {/* Email Card */}
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
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
                      {SITE_CONFIG.contact.email}
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
            </div>

            {/* Right Contact Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <GalleryLightbox
          item={selectedImage}
          onClose={() => setSelectedImage(null)}
          onPrev={handlePrev}
          onNext={handleNext}
          hasPrev={currentIdx > 0}
          hasNext={currentIdx < galleryItems.length - 1}
        />
      )}
    </div>
  );
};
