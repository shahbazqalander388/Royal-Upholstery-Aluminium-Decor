import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SITE_CONFIG } from '../config/site';
import { services } from '../data/services';
import { serviceAreas } from '../data/serviceAreas';
import { MessageCircle, CheckCircle2, AlertCircle, Send, ArrowRight } from 'lucide-react';

export const ContactForm = () => {
  const { language, isRTL, t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    area: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [submittedMessage, setSubmittedMessage] = useState(null);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = t.contactPage.validation.nameRequired;
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 7) {
      errs.phone = t.contactPage.validation.phoneRequired;
    }
    if (!formData.service) {
      errs.service = t.contactPage.validation.serviceRequired;
    }
    if (!formData.message.trim()) {
      errs.message = t.contactPage.validation.messageRequired;
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Construct the WhatsApp message text
    const selectedServiceObj = services.find((s) => s.id === formData.service);
    const serviceTitle = selectedServiceObj
      ? selectedServiceObj.name[language]
      : formData.service;

    const fullMessage =
      language === 'ar'
        ? `*طلب عرض أسعار جديد - رويال ديكور البحرين*
👤 *الاسم:* ${formData.name}
📱 *الهاتف:* ${formData.phone}
✉️ *البريد:* ${formData.email || 'لم يحدد'}
🛠️ *الخدمة:* ${serviceTitle}
📍 *المنطقة:* ${formData.area || 'البحرين'}
📝 *التفاصيل:*
${formData.message}`
        : `*New Quote Request - Royal Decor Bahrain*
👤 *Name:* ${formData.name}
📱 *Phone:* ${formData.phone}
✉️ *Email:* ${formData.email || 'N/A'}
🛠️ *Service:* ${serviceTitle}
📍 *Area:* ${formData.area || 'Bahrain'}
📝 *Message:*
${formData.message}`;

    setSubmittedMessage(fullMessage);

    // Open WhatsApp directly
    const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappClean}?text=${encodeURIComponent(fullMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleReset = () => {
    setSubmittedMessage(null);
    setFormData({
      name: '',
      phone: '',
      email: '',
      service: '',
      area: '',
      message: '',
    });
    setErrors({});
  };

  if (submittedMessage) {
    const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappClean}?text=${encodeURIComponent(submittedMessage)}`;

    return (
      <div className="luxury-card rounded-3xl p-8 sm:p-10 border border-[#D4AF37]/40 text-center animate-fadeIn">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <h3 className="text-2xl font-bold text-white mb-2">
          {t.contactPage.successTitle}
        </h3>

        <p className="text-sm text-gray-300 max-w-md mx-auto mb-6 leading-relaxed">
          {t.contactPage.successDesc}
        </p>

        <div className="p-4 rounded-xl bg-[#0B0B0F] border border-white/10 text-start text-xs text-gray-300 mb-6 font-mono whitespace-pre-line max-w-lg mx-auto">
          {submittedMessage}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm shadow-lg transition-all"
          >
            <MessageCircle className="w-5 h-5 fill-white/20" />
            <span>{t.contactPage.openWhatsAppNow}</span>
          </a>

          <button
            onClick={handleReset}
            className="w-full sm:w-auto py-3 px-6 rounded-xl bg-[#181822] hover:bg-[#242432] text-gray-300 border border-white/10 text-sm font-semibold transition-all"
          >
            {t.contactPage.resetBtn}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="luxury-card rounded-3xl p-6 sm:p-10 border border-[#D4AF37]/25 shadow-2xl"
    >
      <div className="mb-8 pb-4 border-b border-white/5">
        <h3 className="text-xl sm:text-2xl font-bold text-white">
          {t.contactPage.formTitle}
        </h3>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">
          {t.contactPage.formSubtitle}
        </p>
      </div>

      <div className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5">
            {t.contactPage.nameLabel} <span className="text-[#D4AF37]">*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder={t.contactPage.namePlaceholder}
            className={`w-full px-4 py-3 rounded-xl bg-[#111118] border text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 transition-colors ${
              errors.name ? 'border-rose-500/80' : 'border-white/10 focus:border-[#D4AF37]'
            }`}
          />
          {errors.name && (
            <p className="flex items-center gap-1 text-xs text-rose-400 mt-1.5">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        {/* Grid: Phone + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              {t.contactPage.phoneLabel} <span className="text-[#D4AF37]">*</span>
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder={t.contactPage.phonePlaceholder}
              className={`w-full px-4 py-3 rounded-xl bg-[#111118] border text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 transition-colors ${
                errors.phone ? 'border-rose-500/80' : 'border-white/10 focus:border-[#D4AF37]'
              }`}
            />
            {errors.phone && (
              <p className="flex items-center gap-1 text-xs text-rose-400 mt-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.phone}</span>
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              {t.contactPage.emailLabel}
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder={t.contactPage.emailPlaceholder}
              className="w-full px-4 py-3 rounded-xl bg-[#111118] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-colors"
            />
          </div>
        </div>

        {/* Grid: Service + Area */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              {t.contactPage.serviceLabel} <span className="text-[#D4AF37]">*</span>
            </label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl bg-[#111118] border text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 transition-colors ${
                errors.service ? 'border-rose-500/80' : 'border-white/10 focus:border-[#D4AF37]'
              }`}
            >
              <option value="">{t.contactPage.servicePlaceholder}</option>
              <optgroup label={language === 'ar' ? 'أعمال التنجيد' : 'Upholstery Services'}>
                {services
                  .filter((s) => s.category === 'upholstery')
                  .map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name[language]}
                    </option>
                  ))}
              </optgroup>
              <optgroup label={language === 'ar' ? 'أعمال الألمنيوم' : 'Aluminium Works'}>
                {services
                  .filter((s) => s.category === 'aluminium')
                  .map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name[language]}
                    </option>
                  ))}
              </optgroup>
            </select>
            {errors.service && (
              <p className="flex items-center gap-1 text-xs text-rose-400 mt-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.service}</span>
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              {t.contactPage.areaLabel}
            </label>
            <select
              value={formData.area}
              onChange={(e) => setFormData({ ...formData, area: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#111118] border border-white/10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-colors"
            >
              <option value="">{t.contactPage.areaPlaceholder}</option>
              {serviceAreas.map((area) => (
                <option key={area.id} value={area.name[language]}>
                  {area.name[language]} ({area.tag[language]})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5">
            {t.contactPage.messageLabel} <span className="text-[#D4AF37]">*</span>
          </label>
          <textarea
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder={t.contactPage.messagePlaceholder}
            className={`w-full px-4 py-3 rounded-xl bg-[#111118] border text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 transition-colors resize-none ${
              errors.message ? 'border-rose-500/80' : 'border-white/10 focus:border-[#D4AF37]'
            }`}
          />
          {errors.message && (
            <p className="flex items-center gap-1 text-xs text-rose-400 mt-1.5">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.message}</span>
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#B89324] hover:brightness-110 text-black font-extrabold text-sm sm:text-base shadow-xl shadow-[#D4AF37]/20 active:scale-[0.99] transition-all"
          >
            <MessageCircle className="w-5 h-5 fill-black/20" />
            <span>{t.contactPage.submitBtn}</span>
          </button>
          <p className="text-center text-[11px] text-gray-500 mt-2.5">
            {language === 'ar'
              ? `تجهيز فوري للرسالة وإرسال مباشر عبر واتساب إلى ${SITE_CONFIG.contact.whatsappDisplay} لضمان سرعة الاستجابة.`
              : `Directly compiles your enquiry and opens WhatsApp (${SITE_CONFIG.contact.whatsappDisplay}) for immediate response.`}
          </p>
        </div>
      </div>
    </form>
  );
};
