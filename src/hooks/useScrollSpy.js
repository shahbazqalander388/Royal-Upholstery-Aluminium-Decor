import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SECTION_PATHS = {
  home: '/',
  about: '/about',
  services: '/services',
  gallery: '/gallery',
  contact: '/contact',
};

export const useScrollSpy = () => {
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();

  // Handle direct navigation to /about, /services, etc. on mount or URL change
  useEffect(() => {
    const path = location.pathname.toLowerCase().replace(/\/$/, '') || '/';

    let targetId = 'home';
    if (path === '/about') targetId = 'about';
    else if (path === '/services') targetId = 'services';
    else if (path === '/gallery') targetId = 'gallery';
    else if (path === '/contact') targetId = 'contact';
    else if (location.hash) {
      targetId = location.hash.replace('#', '');
    }

    if (targetId && targetId !== 'home') {
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location.pathname]);

  // Observe scrolling and update the browser address bar dynamically
  useEffect(() => {
    // Only run on the main landing routes
    const isMainRoute = ['/', '/about', '/services', '/gallery', '/contact'].includes(
      location.pathname.replace(/\/$/, '') || '/'
    );

    if (!isMainRoute) return;

    const sectionIds = ['home', 'about', 'services', 'gallery', 'contact'];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (sections.length === 0) return;

    let isUserClicking = false;

    const handleScroll = () => {
      if (isUserClicking) return;

      const scrollPosition = window.scrollY + 200; // offset for fixed header
      let current = 'home';

      for (const section of sections) {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          current = section.id;
          break;
        }
      }

      // Check if at the bottom of the page
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
        current = 'contact';
      }

      setActiveSection(current);

      const targetPath = SECTION_PATHS[current] || '/';
      const currentUrlPath = window.location.pathname.replace(/\/$/, '') || '/';

      if (targetPath !== currentUrlPath && !window.location.hash) {
        window.history.replaceState(null, '', targetPath + (window.location.search || ''));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  const scrollToSection = (id) => {
    setActiveSection(id);
    const targetPath = SECTION_PATHS[id] || '/';
    window.history.pushState(null, '', targetPath + (window.location.search || ''));

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return { activeSection, scrollToSection };
};
