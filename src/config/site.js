export const SITE_CONFIG = {
  brand: {
    nameEn: "Royal Upholstery & Aluminium Decor",
    nameAr: "رويال لديكورات التنجيد والألمنيوم",
    shortNameEn: "Royal Decor",
    shortNameAr: "رويال ديكور",
    subEn: "Upholstery & Aluminium Decor",
    subAr: "تنجيد وديكورات ألمنيوم",
    locationEn: "Bahrain — Serving All Bahrain",
    locationAr: "البحرين — نخدم جميع مناطق البحرين",
  },
  contact: {
    // WhatsApp Number (specified by user)
    whatsappDisplay: "+973 3341 3852",
    whatsappClean: "97333413852",
    whatsappUrlPrefix: "https://wa.me/97333413852",

    // Simple Phone Call Number (specified by user)
    callDisplay: "32141254",
    callDisplayIntl: "+973 32141254",
    callRaw: "+97332141254",
    callDirect: "32141254",

    email: "walim6360@gmail.com",
    availabilityEn: "24 Hours / 7 Days",
    availabilityAr: "24 ساعة / 7 أيام في الأسبوع",
    badgeEn: "Available 24/7 Across Bahrain",
    badgeAr: "متاحون 24/7 في كافة أنحاء البحرين",
  },
};

export const getWhatsAppLink = (message = "") => {
  if (!message) return SITE_CONFIG.contact.whatsappUrlPrefix;
  return `${SITE_CONFIG.contact.whatsappUrlPrefix}?text=${encodeURIComponent(message)}`;
};
