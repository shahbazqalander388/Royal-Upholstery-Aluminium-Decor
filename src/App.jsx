import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ScrollToTop } from './components/ScrollToTop';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { FloatingCall } from './components/FloatingCall';

// Pages
import { HomePage } from './pages/HomePage';
import { GalleryPage } from './pages/GalleryPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      {/* Resets scroll to top for standalone pages without interrupting landing scroll */}
      <ScrollToTop />

      <div className="min-h-screen flex flex-col bg-[#07070A] text-gray-100 selection:bg-[#D4AF37]/30 selection:text-[#F3E5AB]">
        <Navbar />

        <main className="flex-1 pt-[72px] md:pt-[88px]">
          <Routes>
            {/* Unified smooth-scrolling landing flow where URL updates dynamically */}
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/about" element={<HomePage />} />
            <Route path="/services" element={<HomePage />} />
            <Route path="/gallery" element={<HomePage />} />
            <Route path="/contact" element={<HomePage />} />

            {/* Standalone Full Portfolio & Legal Pages */}
            <Route path="/portfolio" element={<GalleryPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <Footer />

        {/* Floating Quick Action Contacts */}
        <FloatingWhatsApp />
        <FloatingCall />
      </div>
    </Router>
  );
}

export default App;
