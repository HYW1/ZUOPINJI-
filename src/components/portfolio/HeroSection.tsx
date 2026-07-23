import React, { useRef } from 'react';
import { DeskState } from '../../types';
import { DeskScene } from '../3d/DeskScene';
import { TypingPanel } from '../ui/TypingPanel';
import { ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  deskState: DeskState;
  onUpdateState: (updater: (prev: DeskState) => DeskState) => void;
  onOpenCustomizer: () => void;
  scrollOffset?: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  deskState,
  onUpdateState,
  scrollOffset,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate Parallax Progress (0.0 to 1.0)
  const currentScrollY = scrollOffset !== undefined ? scrollOffset : 0;
  const heroHeight = containerRef.current?.offsetHeight || 500;
  const scrollProgress = Math.min(Math.max(currentScrollY / (heroHeight * 0.75), 0), 1);

  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Natural Parallax Transformations
  // Clean downward vertical translation as user scrolls
  const sceneTranslateY = currentScrollY * 0.38;
  // Scene remains completely clear and visible as you scroll down, smoothly fading only near bottom transition
  const sceneOpacity = scrollProgress < 0.65 ? 1 : Math.max(1 - (scrollProgress - 0.65) / 0.35, 0);

  return (
    <section ref={containerRef} id="hero" className="relative w-full pt-0 bg-stone-950 overflow-hidden min-h-[85vh]">
      {/* Background Glow Accent with Smooth Radial Gradient */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-teal-500/15 via-amber-500/10 to-transparent blur-[120px] pointer-events-none rounded-full" />

      {/* 3D Scene Container flush with top edge */}
      <div 
        className="relative w-full h-[70vh] min-h-[480px] max-h-[650px] m-0 overflow-hidden transition-transform duration-75 ease-out"
        style={{
          transform: `translateY(${sceneTranslateY}px)`,
          opacity: sceneOpacity,
        }}
      >
        <DeskScene state={deskState} onUpdateState={onUpdateState} scrollOffset={currentScrollY} />

        {/* Subtle Bottom Edge Blend */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-stone-950/90 to-transparent pointer-events-none z-10" />

        {/* Minimal Typing Panel at Bottom */}
        <TypingPanel state={deskState} onUpdateState={onUpdateState} />
      </div>

      {/* Scroll Down Indicator */}
      <div className="relative max-w-7xl mx-auto px-4 py-3 flex flex-col items-center justify-center z-10">
        <button
          onClick={scrollToAbout}
          className="group flex flex-col items-center gap-1.5 text-stone-400 hover:text-teal-300 transition-colors focus:outline-none"
        >
          <span className="text-xs font-mono tracking-widest uppercase group-hover:underline">
            探索个人作品与履历
          </span>
          <div className="p-1.5 rounded-full bg-stone-900 border border-stone-800 group-hover:border-teal-500/50 group-hover:scale-110 transition-all shadow-lg">
            <ArrowDown className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  );
};
