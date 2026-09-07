import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SITE_CONFIG } from '../config/site';
import { ShieldCheck, Sparkles, MessageCircle, Star } from 'lucide-react';

export const Testimonials = () => {
  const { language, isRTL, t } = useLanguage();

  return (
    <section className="py-16 md:py-20 relative bg-[#07070A]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/25 text-xs text-[#D4AF37] font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.testimonials.title}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
            {t.testimonials.subtitle}
          </h2>
        </div>

        {/* Honest Commitment & Feedback Hub */}
        <div className="luxury-card rounded-3xl p-8 sm:p-10 border border-[#D4AF37]/30 text-center relative overflow-hidden">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] mb-6">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-[#F3E5AB] mb-4">
            {language === 'ar'
              ? 'التزامنا بالجودة ورضا العملاء'
              : 'Our Commitment to Quality & Transparency'}
          </h3>

          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8">
            {t.testimonials.placeholderNotice}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8 text-start">
            <div className="p-4 rounded-xl bg-[#0F0F16] border border-white/5">
              <span className="text-xs text-[#D4AF37] font-bold block mb-1">
                {language === 'ar' ? '١. دقة في المواعيد' : '1. On-Time Delivery'}
              </span>
              <p className="text-[11px] text-gray-400">
                {language === 'ar'
                  ? 'نحدد موعد الإنجاز بوضوح ونلتزم به دون تأخير.'
                  : 'Clear schedules agreed upfront and respected.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0F0F16] border border-white/5">
              <span className="text-xs text-[#D4AF37] font-bold block mb-1">
                {language === 'ar' ? '٢. خامات متينة ومضمونة' : '2. Durable Materials'}
              </span>
              <p className="text-[11px] text-gray-400">
                {language === 'ar'
                  ? 'أقمشة تنجيد وهياكل ألمنيوم مقاومة لطقس البحرين.'
                  : 'Bahrain weather-resistant fabrics & aluminium.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0F0F16] border border-white/5">
              <span className="text-xs text-[#D4AF37] font-bold block mb-1">
                {language === 'ar' ? '٣. أسعار مدروسة ومناسبة' : '3. Fair & Honest Pricing'}
              </span>
              <p className="text-[11px] text-gray-400">
                {language === 'ar'
                  ? 'عروض أسعار شفافة ومجانية بدون أي رسوم خفية.'
                  : 'Transparent, competitive rates with free quotation.'}
              </p>
            </div>
          </div>

          <a
            href={`https://wa.me/${SITE_CONFIG.contact.whatsappClean}?text=${encodeURIComponent(
              language === 'ar'
                ? 'مرحباً رويال ديكور، أود مشاركة استفساري أو مراجعة أعمالكم السابقة في البحرين.'
                : 'Hello Royal Decor, I would like to inquire about your recent projects and client references in Bahrain.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#E5C158] text-black font-bold text-sm shadow-lg shadow-[#D4AF37]/20 transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-black/20" />
            <span>{t.testimonials.cta}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
