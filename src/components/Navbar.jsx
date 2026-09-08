import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { SITE_CONFIG } from '../config/site';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';

export const Navbar = () => {
  const { t, isRTL, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();

  // Prevent background scrolling when mobile menu drawer is open
  useBodyScrollLock(isOpen);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const currentPath = location.pathname.replace(/\/$/, '') || '/';
  const isHomePage = currentPath === '/' || currentPath === '/home';

  useEffect(() => {
    // Set active nav item based on route
    if (currentPath === '/gallery') {
      setCurrentSection('gallery');
    } else if (currentPath === '/services') {
      setCurrentSection('services');
    } else if (currentPath === '/about') {
      setCurrentSection('about');
    } else if (currentPath === '/contact') {
      setCurrentSection('contact');
    } else if (isHomePage) {
      setCurrentSection('home');
    }
  }, [currentPath, isHomePage]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (!isHomePage) return;

      const sections = ['home', 'about', 'services', 'gallery', 'contact'];
      const scrollPos = window.scrollY + 250;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setCurrentSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const navItems = [
    { id: 'home', label: t.nav.home, path: '/' },
    { id: 'about', label: t.nav.about, path: '/about' },
    { id: 'services', label: t.nav.services, path: '/services' },
    { id: 'gallery', label: t.nav.gallery, path: '/gallery' },
    { id: 'contact', label: t.nav.contact, path: '/contact' },
  ];

  const handleNavClick = (e, item) => {
    e.preventDefault();
    setIsOpen(false);

    if (item.id === 'home') {
      if (isHomePage) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/');
      }
    } else {
      navigate(item.path);
    }
  };

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappClean}?text=${encodeURIComponent(
    language === 'ar'
      ? 'مرحباً رويال لديكورات التنجيد والألمنيوم، أود الاستفسار عن خدماتكم في البحرين.'
      : 'Hello Royal Upholstery & Aluminium Decor, I would like to enquire about your services in Bahrain.'
  )}`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#07070A]/98 backdrop-blur-md border-b border-[#D4AF37]/30 shadow-2xl shadow-black/80 py-2.5'
          : 'bg-[#07070A]/95 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/50 py-3.5'
      }`}
    >
      {/* Top micro-bar for 24/7 status */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-1.5 hidden md:flex items-center justify-between text-[11px] text-gray-400 border-b border-white/5 pb-1">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-amber-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block -ml-3.5" />
            {t.brand.availability} • {t.hero.badge}
          </span>
          <span className="text-gray-600">|</span>
          <span>{t.brand.location}</span>
        </div>
        <div className="flex items-center gap-4">
          {/* Simple Call */}
          <a
            href={`tel:${SITE_CONFIG.contact.callRaw}`}
            className="hover:text-amber-300 flex items-center gap-1.5 transition-colors font-medium"
          >
            <Phone className="w-3 h-3 text-[#D4AF37]" />
            <span>{language === 'ar' ? 'اتصال:' : 'Call:'}</span>
            <span dir="ltr" className="font-bold text-gray-200">{SITE_CONFIG.contact.callDisplay}</span>
          </a>
          <span className="text-gray-600">|</span>
          {/* WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-400 flex items-center gap-1.5 transition-colors font-medium"
          >
            <MessageCircle className="w-3 h-3 text-[#25D366]" />
            <span>WhatsApp:</span>
            <span dir="ltr" className="font-bold text-[#F3E5AB]">{SITE_CONFIG.contact.whatsappDisplay}</span>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = currentSection === item.id;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200 relative cursor-pointer ${
                    isActive
                      ? 'text-[#F3E5AB] font-bold bg-[#D4AF37]/15 border border-[#D4AF37]/40 shadow-sm'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: WhatsApp CTA + Language Switcher */}
          <div className="hidden sm:flex items-center gap-3">
            <LanguageSwitcher />

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-bold rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#B89324] text-black shadow-md shadow-[#D4AF37]/20 hover:brightness-110 active:scale-95 transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-black/30" />
              <span>{t.nav.whatsappCta}</span>
            </a>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-2 sm:hidden">
            <LanguageSwitcher variant="compact" />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-[#14141A] border border-white/10 text-gray-200 hover:text-white hover:border-[#D4AF37]/40 transition-colors"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <>
          <div
            className="sm:hidden fixed inset-0 top-[65px] bg-black/70 backdrop-blur-sm z-30"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="sm:hidden fixed inset-x-0 top-full bg-[#0B0B0F]/98 border-b border-[#D4AF37]/30 px-6 py-6 shadow-2xl backdrop-blur-xl animate-fadeIn z-40 max-h-[calc(100vh-80px)] overflow-y-auto">
            <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = currentSection === item.id;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-lg text-base font-medium transition-all ${
                    isActive
                      ? 'bg-[#D4AF37]/15 text-[#F3E5AB] font-bold border border-[#D4AF37]/40'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-3">
              {/* WhatsApp CTA */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B89324] text-black font-bold text-sm shadow-lg shadow-[#D4AF37]/20"
              >
                <MessageCircle className="w-5 h-5 fill-black/30" />
                <span>{t.nav.whatsappCta} ({SITE_CONFIG.contact.whatsappDisplay})</span>
              </a>

              {/* Simple Call CTA */}
              <a
                href={`tel:${SITE_CONFIG.contact.callRaw}`}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#181820] text-gray-200 border border-white/10 font-medium text-sm hover:border-[#D4AF37]/40 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <span>{t.nav.callCta}: <strong className="text-white" dir="ltr">{SITE_CONFIG.contact.callDisplay}</strong></span>
              </a>

              <div className="flex items-center justify-between pt-2 px-1 text-xs text-gray-400">
                <span>{t.brand.availability}</span>
                <span className="text-amber-300 font-semibold">{t.hero.badge}</span>
              </div>
            </div>
          </div>
        </div>
      </>
    )}
  </header>
  );
};
