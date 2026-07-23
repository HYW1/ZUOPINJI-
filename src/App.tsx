import React, { useState, useEffect } from 'react';
import { DeskState } from './types';
import { Navbar } from './components/portfolio/Navbar';
import { HeroSection } from './components/portfolio/HeroSection';
import { AboutSection } from './components/portfolio/AboutSection';
import { ProjectsSection } from './components/portfolio/ProjectsSection';
import { ContactFooter } from './components/portfolio/ContactFooter';
import { CustomizerDrawer } from './components/ui/CustomizerDrawer';
import { InfoModal } from './components/ui/InfoModal';

export default function App() {
  const [scrollOffset, setScrollOffset] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollOffset(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [deskState, setDeskState] = useState<DeskState>({
    lightingMode: 'evening', // Warm twilight ambient lighting
    lampOn: true,
    lampIntensity: 1.0,
    lampColor: '#ffb852',
    
    woodStyle: 'natural_oak',
    typewriterColor: 'dusty_teal', // Dusty teal vintage typewriter
    wallArtStyle: 'fuji',
    
    paperText: 'Code is prose;\nDesign is poetry.', // Default quote on paper
    paperFontSize: 36,
    typewriterSoundEnabled: true,
    
    ambientSound: 'none',
    ambientVolume: 0.6,
    
    activeCameraPreset: 'typing',
    interactiveFocusedObject: null,
    
    keystrokeCount: 0,
  });

  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean>(false);
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);

  return (
    <div className="relative w-full min-h-screen bg-stone-950 font-sans text-stone-100 antialiased selection:bg-teal-500 selection:text-stone-950">
      {/* Fixed Navigation Bar */}
      <Navbar
        deskState={deskState}
        onUpdateState={setDeskState}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
      />

      {/* 1. Hero / Cover Section (#hero) with embedded 3D Typewriter Scene */}
      <HeroSection
        deskState={deskState}
        onUpdateState={setDeskState}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        scrollOffset={scrollOffset}
      />

      {/* 2. Personal Introduction / Bio & Skills (#about) */}
      <AboutSection />

      {/* 3. Project Cards Showcase (#projects) */}
      <ProjectsSection />

      {/* 4. Footer & Contact Form (#contact) */}
      <ContactFooter />

      {/* Personalization Customizer Drawer */}
      <CustomizerDrawer
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        state={deskState}
        onUpdateState={setDeskState}
      />

      {/* Instructions & Info Modal */}
      <InfoModal
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
      />
    </div>
  );
}
