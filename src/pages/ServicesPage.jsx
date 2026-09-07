import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { SITE_CONFIG } from '../config/site';
import { services } from '../data/services';
import { ServiceCard } from '../components/ServiceCard';
import { Scissors, AppWindow, Layers, MessageCircle, Phone } from 'lucide-react';

export const ServicesPage = () => {
  const { language, isRTL, t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const catQuery = searchParams.get('cat');

  const [activeFilter, setActiveFilter] = useState(() => {
    if (catQuery === 'upholstery' || catQuery === 'aluminium') {
      return catQuery;
    }
    return 'all';
  });

  useEffect(() => {
    if (catQuery === 'upholstery' || catQuery === 'aluminium') {
      setActiveFilter(catQuery);
    } else {
      setActiveFilter('all');
    }
  }, [catQuery]);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    if (filter === 'all') {
      searchParams.delete('cat');
    } else {
      searchParams.set('cat', filter);
    }
    setSearchParams(searchParams);
  };

  const filteredServices = services.filter((s) => {
    if (activeFilter === 'all') return true;
    return s.category === activeFilter;
  });

  return (
    <div className="py-12 md:py-20">
      {/* Header */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#14141C] border border-[#D4AF37]/30 text-xs text-[#D4AF37] font-bold uppercase tracking-wider mb-4">
          <Layers className="w-3.5 h-3.5" />
          <span>{language === 'ar' ? 'جميع الخدمات الـ 15' : 'All 15 Craftsmanship Services'}</span>
        </div>

        <h1
          style={{ fontFamily: isRTL ? "'Cairo', sans-serif" : "'Cinzel', 'Outfit', serif" }}
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6"
        >
          {t.servicesSection.title}
        </h1>

        <p className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10">
          {t.servicesSection.subtitle}
        </p>

        {/* Filter Tabs */}
        <div className="inline-flex items-center p-1.5 rounded-2xl bg-[#111117] border border-white/10 shadow-xl">
          <button
            onClick={() => handleFilterChange('all')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeFilter === 'all'
                ? 'bg-[#D4AF37] text-black shadow-md'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            {t.servicesSection.filterAll} ({services.length})
          </button>

          <button
            onClick={() => handleFilterChange('upholstery')}
            className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeFilter === 'upholstery'
                ? 'bg-[#D4AF37] text-black shadow-md'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <Scissors className="w-3.5 h-3.5" />
            <span>{t.servicesSection.filterUpholstery} (9)</span>
          </button>

          <button
            onClick={() => handleFilterChange('aluminium')}
            className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeFilter === 'aluminium'
                ? 'bg-[#D4AF37] text-black shadow-md'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <AppWindow className="w-3.5 h-3.5" />
            <span>{t.servicesSection.filterAluminium} (6)</span>
          </button>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* Custom Inquiry Callout */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#14141C] via-[#101016] to-[#14141C] border border-[#D4AF37]/30 text-center shadow-2xl">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
            {language === 'ar'
              ? 'هل تبحث عن عمل مخصص غير مذكور في القائمة؟'
              : 'Need a Custom Upholstery or Aluminium Project?'}
          </h3>
          <p className="text-sm text-gray-300 max-w-xl mx-auto mb-6 leading-relaxed">
            {language === 'ar'
              ? 'فريقنا مجهز للتعامل مع مختلف التصاميم الخاصة والمقاسات المعمارية في أي مكان بالبحرين. تواصل معنا لمناقشة فكرتك مباشرة.'
              : 'Our craftsmen are equipped to build custom shapes, dimensions, and architectural specs across Bahrain. Send us your requirements for an immediate quote.'}
          </p>
          <a
            href={`https://wa.me/${SITE_CONFIG.contact.whatsappClean}?text=${encodeURIComponent(
              language === 'ar'
                ? 'مرحباً رويال ديكور، لدي طلب مخصص وأود استشارتكم والحصول على عرض أسعار.'
                : 'Hello Royal Decor, I have a custom upholstery/aluminium inquiry and would like to discuss a quote.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#D4AF37] hover:bg-[#E5C158] text-black font-extrabold text-sm shadow-xl shadow-[#D4AF37]/20 transition-all"
          >
            <MessageCircle className="w-5 h-5 fill-black/20" />
            <span>{language === 'ar' ? 'تحدث مع الحرفي عبر واتساب' : 'Speak with Our Team on WhatsApp'}</span>
          </a>
        </div>
      </section>
    </div>
  );
};
