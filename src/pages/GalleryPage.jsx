import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { SITE_CONFIG } from '../config/site';
import { galleryItems } from '../data/gallery';
import { GalleryLightbox } from '../components/GalleryLightbox';
import { ServiceArea } from '../components/ServiceArea';
import { useSEO } from '../hooks/useSEO';
import {
  Sparkles,
  Eye,
  Scissors,
  AppWindow,
  MessageCircle,
  Phone,
  ChevronRight,
  CheckCircle2,
  Camera,
} from 'lucide-react';

export const GalleryPage = () => {
  const { language, isRTL, t } = useLanguage();
  const [filter, setFilter] = useState('all');
  const [activeImage, setActiveImage] = useState(null);

  const upholsteryCount = galleryItems.filter((i) => i.category === 'upholstery').length;
  const aluminiumCount = galleryItems.filter((i) => i.category === 'aluminium').length;

  const filteredItems = galleryItems.filter((item) => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  const currentIdx = activeImage
    ? galleryItems.findIndex((i) => i.id === activeImage.id)
    : -1;

  const handlePrev = () => {
    if (currentIdx > 0) setActiveImage(galleryItems[currentIdx - 1]);
  };

  const handleNext = () => {
    if (currentIdx < galleryItems.length - 1) setActiveImage(galleryItems[currentIdx + 1]);
  };

  const pageTitle =
    t.galleryPage?.metaTitle ||
    (language === 'ar'
      ? 'معرض الأعمال الحقيقية | رويال لتنجيد الكنب وديكورات الألمنيوم البحرين'
      : 'Project Gallery & Portfolio | Royal Upholstery & Aluminium Decor Bahrain');

  const pageDescription =
    t.galleryPage?.metaDesc ||
    (language === 'ar'
      ? 'شاهد بالصور أعمالنا الحقيقية في تنجيد وتفصيل الكنب، تصليح الأثاث، تركيب الستائر، وتفصيل أبواب ونوافذ الألمنيوم في جميع مناطق البحرين. متاحون 24/7.'
      : 'Browse real completed upholstery, custom sofa making, curtain installation, and aluminium doors and windows projects by Royal Upholstery & Aluminium Decor across Bahrain. Available 24/7.');

  const pageKeywords =
    language === 'ar'
      ? 'معرض تنجيد البحرين, صور تفصيل كنب البحرين, تصليح كنب المنامة, صور ابواب المنيوم البحرين, نوافذ المنيوم البحرين, رويال للديكور البحرين'
      : 'upholstery gallery Bahrain, sofa making portfolio Bahrain, sofa repair pictures Bahrain, aluminium doors Bahrain gallery, aluminium windows photos Bahrain';

  // Dynamic ImageGallery & Breadcrumb JSON-LD for rich Google Indexing
  const galleryJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: language === 'ar' ? 'الرئيسية' : 'Home',
            item: 'https://royalupholsterybh.com/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: language === 'ar' ? 'معرض الأعمال' : 'Gallery & Portfolio',
            item: 'https://royalupholsterybh.com/gallery',
          },
        ],
      },
      {
        '@type': 'ImageGallery',
        name: pageTitle,
        description: pageDescription,
        url: 'https://royalupholsterybh.com/gallery',
        publisher: {
          '@type': 'HomeAndConstructionBusiness',
          name: 'Royal Upholstery & Aluminium Decor',
          telephone: '+97333413852',
          areaServed: 'Bahrain',
        },
        hasPart: galleryItems.map((item) => ({
          '@type': 'ImageObject',
          contentUrl: item.src,
          name: item.title[language] || item.title.en,
          description: item.desc[language] || item.desc.en,
          caption: item.alt[language] || item.alt.en,
        })),
      },
    ],
  };

  useSEO({
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords,
    canonical: 'https://royalupholsterybh.com/gallery',
    jsonLd: galleryJsonLd,
  });

  const whatsappGeneralUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappClean}?text=${encodeURIComponent(
    language === 'ar'
      ? 'مرحباً رويال للديكور، شاهدت معرض أعمالكم وأود الاستفسار والحصول على عرض أسعار لمشروع تفصيل/تصليح في البحرين.'
      : 'Hello Royal Decor, I saw your project gallery and would like to get a quote for my project in Bahrain.'
  )}`;

  return (
    <div className="py-8 md:py-16">
      {/* Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8"
      >
        <ol className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
          <li>
            <Link
              to="/"
              className="hover:text-[#D4AF37] transition-colors flex items-center gap-1"
            >
              {t.galleryPage?.breadcrumbHome || (language === 'ar' ? 'الرئيسية' : 'Home')}
            </Link>
          </li>
          <li>
            <ChevronRight className={`w-3.5 h-3.5 text-gray-600 ${isRTL ? 'rotate-180' : ''}`} />
          </li>
          <li className="text-[#F3E5AB] font-semibold">
            {t.galleryPage?.breadcrumbGallery || (language === 'ar' ? 'معرض الأعمال' : 'Gallery & Portfolio')}
          </li>
        </ol>
      </nav>

      {/* Page Header */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#14141C] border border-[#D4AF37]/30 text-xs text-[#D4AF37] font-bold uppercase tracking-wider mb-4 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.galleryPage?.badge || (language === 'ar' ? 'معرض الأعمال الحقيقية بالبحرين' : 'Real Project Portfolio')}</span>
        </div>

        <h1
          style={{ fontFamily: isRTL ? "'Cairo', sans-serif" : "'Cinzel', 'Outfit', serif" }}
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6"
        >
          {t.galleryPage?.heading || t.gallerySection.title}
        </h1>

        <p className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10">
          {t.galleryPage?.subheading || t.gallerySection.subtitle}
        </p>

        {/* Filter Tabs */}
        <div className="inline-flex flex-wrap items-center justify-center p-1.5 rounded-2xl bg-[#111117] border border-white/10 shadow-2xl gap-1">
          <button
            onClick={() => setFilter('all')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              filter === 'all'
                ? 'bg-[#D4AF37] text-black shadow-md shadow-[#D4AF37]/20 scale-105'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            {t.gallerySection.filterAll} ({galleryItems.length})
          </button>

          <button
            onClick={() => setFilter('upholstery')}
            className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              filter === 'upholstery'
                ? 'bg-[#D4AF37] text-black shadow-md shadow-[#D4AF37]/20 scale-105'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Scissors className="w-3.5 h-3.5" />
            <span>{t.gallerySection.filterUpholstery} ({upholsteryCount})</span>
          </button>

          <button
            onClick={() => setFilter('aluminium')}
            className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              filter === 'aluminium'
                ? 'bg-[#D4AF37] text-black shadow-md shadow-[#D4AF37]/20 scale-105'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <AppWindow className="w-3.5 h-3.5" />
            <span>{t.gallerySection.filterAluminium} ({aluminiumCount})</span>
          </button>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              onClick={() => setActiveImage(item)}
              className="group relative rounded-2xl overflow-hidden bg-[#111116] border border-white/10 hover:border-[#D4AF37]/60 cursor-pointer shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1"
            >
              {/* Image Container with fixed aspect ratio to prevent layout shifting */}
              <div className="relative aspect-[4/3] bg-black overflow-hidden">
                <img
                  src={item.src}
                  alt={item.alt[language]}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

                {/* Zoom Icon Button Badge */}
                <div className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-black/75 border border-white/20 flex items-center justify-center text-[#D4AF37] opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all shadow-md">
                  <Eye className="w-4 h-4" />
                </div>

                <div className="absolute top-3.5 left-3.5">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider bg-black/85 text-[#D4AF37] border border-[#D4AF37]/30 backdrop-blur-sm">
                    {item.categoryLabel[language]}
                  </span>
                </div>
              </div>

              {/* Card Footer Info */}
              <div className="p-5 bg-[#0F0F15] border-t border-white/5 flex flex-col justify-between flex-1">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white group-hover:text-[#F3E5AB] transition-colors mb-1.5 line-clamp-1">
                    {item.title[language]}
                  </h2>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                    {item.desc[language]}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-[#D4AF37] font-semibold flex items-center gap-1 group-hover:underline">
                    {t.gallerySection.viewProject}
                  </span>
                  <span className="text-gray-400 text-[11px] font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    Bahrain Crafted
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Direct WhatsApp Consultation Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="relative rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-[#14141E] via-[#0E0E14] to-[#14141E] border border-[#D4AF37]/30 shadow-2xl overflow-hidden text-center sm:text-start flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold uppercase mb-1">
              <Camera className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'تقييم فوري بالصور' : 'Instant Photo Quote'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {t.galleryPage?.consultationTitle ||
                (language === 'ar'
                  ? 'هل لديك كنب أو عمل ألمنيوم ترغب في تنفيذه أو تصليحه؟'
                  : 'Have a Custom Furniture or Aluminium Project?')}
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              {t.galleryPage?.consultationSubtitle ||
                (language === 'ar'
                  ? 'أرسل لنا صورة طلبك عبر واتساب مع المقاسات وسنقدم لك تقييماً وعرض سعر فوري ومجاني.'
                  : 'Send us photos of your sofa, window, or door on WhatsApp for an immediate free estimate and consultation.')}
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <a
              href={whatsappGeneralUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89324] text-black font-extrabold text-sm shadow-xl shadow-[#D4AF37]/25 hover:brightness-110 active:scale-95 transition-all"
            >
              <MessageCircle className="w-5 h-5 fill-black/30 text-emerald-950" />
              <span>{t.galleryPage?.consultationBtn || (language === 'ar' ? 'تواصل عبر واتساب الآن' : 'WhatsApp Us Now')}</span>
            </a>

            <a
              href={`tel:${SITE_CONFIG.contact.callRaw}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#181820] text-gray-200 border border-white/10 hover:border-[#D4AF37]/40 font-bold text-sm transition-all"
            >
              <Phone className="w-4 h-4 text-[#D4AF37]" />
              <span dir="ltr">{SITE_CONFIG.contact.callDisplay}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Bahrain Service Area Component */}
      <ServiceArea />

      {/* Lightbox Component with Background Scroll Lock */}
      {activeImage && (
        <GalleryLightbox
          item={activeImage}
          onClose={() => setActiveImage(null)}
          onPrev={handlePrev}
          onNext={handleNext}
          hasPrev={currentIdx > 0}
          hasNext={currentIdx < galleryItems.length - 1}
        />
      )}
    </div>
  );
};
