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
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      {/* Resets scroll to top cleanly on route transition */}
      <ScrollToTop />

      <div className="min-h-screen flex flex-col bg-[#07070A] text-gray-100 selection:bg-[#D4AF37]/30 selection:text-[#F3E5AB]">
        <Navbar />

        <main className="flex-1 pt-[72px] md:pt-[88px]">
          <Routes>
            {/* Landing & Dedicated Pages */}
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Standalone Legal & Error Pages */}
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
