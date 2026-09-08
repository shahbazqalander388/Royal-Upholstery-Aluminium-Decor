import { useEffect } from 'react';

/**
 * Custom hook to lock body scroll when a modal or mobile drawer is open.
 * - Prevents background page scrolling
 * - Prevents desktop layout shift by compensating for scrollbar width
 * - Restores original styles when modal/drawer is closed
 *
 * @param {boolean} isLocked Whether the body scroll should be locked
 */
export const useBodyScrollLock = (isLocked = false) => {
  useEffect(() => {
    if (!isLocked) return;

    // Get current overflow style
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const originalTouchAction = document.body.style.touchAction;

    // Calculate scrollbar width to prevent horizontal layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    // Lock scrolling
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow || '';
      document.body.style.paddingRight = originalPaddingRight || '';
      document.body.style.touchAction = originalTouchAction || '';
    };
  }, [isLocked]);
};
