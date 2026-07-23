import React, { useState, useEffect } from 'react';
import { DeskState } from '../../types';
import { Sparkles, Sliders, Volume2, VolumeX } from 'lucide-react';

interface NavbarProps {
  deskState: DeskState;
  onUpdateState: (updater: (prev: DeskState) => DeskState) => void;
  onOpenCustomizer: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  return null;
};
