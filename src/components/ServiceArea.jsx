import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { serviceAreas } from '../data/serviceAreas';
import { MapPin, CheckCircle, Clock, Shield } from 'lucide-react';

export const ServiceArea = () => {
  const { language, isRTL, t } = useLanguage();

  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-[#09090D] border-t border-b border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#D4AF37]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#14141C] border border-[#D4AF37]/30 text-xs text-[#D4AF37] font-semibold uppercase tracking-wider mb-4">
            <MapPin className="w-3.5 h-3.5" />
            <span>{t.serviceArea.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            {t.serviceArea.title}
          </h2>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            {t.serviceArea.description}
          </p>
        </div>

        {/* 3 Pillars for Bahrain Service */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-[#111117] border border-[#D4AF37]/20 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1">
                {language === 'ar' ? 'جاهزية على مدار الساعة' : '24/7 Availability'}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                {language === 'ar'
                  ? 'خدمات واستشارات سريعة طوال أيام الأسبوع في كافة أرجاء البحرين.'
                  : 'On-demand consultations and timely execution across all Bahrain.'}
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#111117] border border-[#D4AF37]/20 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1">
                {language === 'ar' ? 'خدمة موقعية في كل المناطق' : 'Kingdom-Wide Reach'}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                {language === 'ar'
                  ? 'معاينة ورفع مقاسات وتوصيل وتنفيذ للأثاث والألمنيوم أينما كنت.'
                  : 'Site inspection, precision measurement, and on-site fitting.'}
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#111117] border border-[#D4AF37]/20 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1">
                {language === 'ar' ? 'سكني وتجاري' : 'Residential & Commercial'}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                {language === 'ar'
                  ? 'نخدم الفلل، الشقق، المكاتب، المحلات والمطاعم بأعلى معايير الدقة.'
                  : 'Villas, private homes, commercial offices, retail shops, and hospitality.'}
              </p>
            </div>
          </div>
        </div>

        {/* City / Region Grid */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0D0D12] border border-[#D4AF37]/25 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/5">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[#F3E5AB]">
                {t.serviceArea.citiesTitle}
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                {t.serviceArea.coverageNotice}
              </p>
            </div>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 self-start sm:self-auto">
              ✓ {language === 'ar' ? 'نخدم كل البحرين' : 'Serving Customers Across Bahrain'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {serviceAreas.map((area) => (
              <div
                key={area.id}
                className="p-3 rounded-xl bg-[#14141B] border border-white/5 hover:border-[#D4AF37]/40 transition-colors group flex flex-col justify-center"
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-200 group-hover:text-amber-300">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <span className="truncate">{area.name[language]}</span>
                </div>
                <span className="text-[10px] text-gray-400 mt-1 pl-5">
                  {area.tag[language]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
