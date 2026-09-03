/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { RetroNavbar } from './components/RetroNavbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { ResumeModal } from './components/ResumeModal';
import { QRModal } from './components/QRModal';
import { RetroTaskbar } from './components/RetroTaskbar';
import { soundFX } from './utils/audio';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <MainPortfolio />
    </ThemeProvider>
  );
}

function MainPortfolio() {
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [isQROpen, setIsQROpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsResumeOpen(false);
        setIsQROpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Smooth scroll helper
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-between overflow-x-hidden">
      {/* Background Pixel Grid Pattern */}
      <div className="fixed inset-0 pixel-pattern-grid pointer-events-none z-0"></div>

      {/* Top Retro Navigation */}
      <RetroNavbar
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenQR={() => setIsQROpen(true)}
        onNavigate={scrollToSection}
        activeSection={activeSection}
      />

      {/* Main Content Area */}
      <main className="flex-grow relative z-10">
        {/* Hero Section */}
        <HeroSection
          onStartClick={() => scrollToSection('about')}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        {/* About Me Section ("Welcome Window") */}
        <AboutSection onOpenResume={() => setIsResumeOpen(true)} />

        {/* Skills Section ("Analysis / Progress" RPG Screen) */}
        <SkillsSection />

        {/* Projects Section ("Folders / Concepts") */}
        <ProjectsSection />

        {/* Contact Section ("Terminal / Mail") */}
        <ContactSection
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenQR={() => setIsQROpen(true)}
        />
      </main>

      {/* Retro Bottom OS Taskbar */}
      <RetroTaskbar
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenQR={() => setIsQROpen(true)}
        onNavigate={scrollToSection}
        activeSection={activeSection}
      />

      {/* Resume Document Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* QR Code Modal */}
      <QRModal
        isOpen={isQROpen}
        onClose={() => setIsQROpen(false)}
      />
    </div>
  );
}
