import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook to dynamically manage page-level SEO metadata and JSON-LD schema
 *
 * @param {Object} seoOptions
 * @param {string} seoOptions.title Page title
 * @param {string} seoOptions.description Meta description
 * @param {string} [seoOptions.keywords] Comma-separated keywords
 * @param {string} [seoOptions.canonical] Canonical URL
 * @param {string} [seoOptions.ogImage] OpenGraph image URL
 * @param {Object|Array} [seoOptions.jsonLd] Schema.org JSON-LD structured data
 */
export const useSEO = ({
  title,
  description,
  keywords,
  canonical,
  ogImage = 'https://res.cloudinary.com/dai2g47e4/image/upload/v1788772792/WhatsApp_Image_2026-08-24_at_9.14.47_PM_1_-_Copy_mneskp.jpg',
  jsonLd,
}) => {
  const location = useLocation();

  useEffect(() => {
    // 1. Update Title
    if (title) {
      document.title = title;
    }

    // Helper to set or create meta tag
    const setMetaTag = (selector, attributeName, attributeValue, content) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Meta Description
    if (description) {
      setMetaTag('meta[name="description"]', 'name', 'description', description);
      setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
      setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    }

    // 3. OpenGraph & Twitter Title
    if (title) {
      setMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
      setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    }

    // 4. OpenGraph & Twitter Image
    if (ogImage) {
      setMetaTag('meta[property="og:image"]', 'property', 'og:image', ogImage);
      setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);
    }

    // 5. Canonical URL & og:url
    const currentUrl = canonical || `https://royalupholsterybh.com${location.pathname}`;
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', currentUrl);

    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', currentUrl);

    // 6. Keywords
    if (keywords) {
      setMetaTag('meta[name="keywords"]', 'name', 'keywords', keywords);
    }

    // 7. Inject JSON-LD Structured Data
    const scriptId = 'page-json-ld';
    let scriptTag = document.getElementById(scriptId);

    if (jsonLd) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = scriptId;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(jsonLd);
    } else if (scriptTag) {
      scriptTag.remove();
    }

    return () => {
      // Optional cleanup on unmount: remove the dynamic JSON-LD
      const tag = document.getElementById(scriptId);
      if (tag) {
        tag.remove();
      }
    };
  }, [title, description, keywords, canonical, ogImage, jsonLd, location.pathname]);
};
