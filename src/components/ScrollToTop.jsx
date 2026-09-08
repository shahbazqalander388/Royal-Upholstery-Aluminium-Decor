import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls window to top only when navigating to standalone pages (e.g. /privacy-policy, /terms).
 * Prevents interfering with unified smooth-scrolling sections on the landing page.
 */
export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const mainSections = ['/', '/home', '/about', '/services', '/gallery', '/contact'];
    const current = pathname.replace(/\/$/, '') || '/';

    if (!mainSections.includes(current)) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant',
      });
    }
  }, [pathname]);

  return null;
};
