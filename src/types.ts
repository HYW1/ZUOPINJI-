export type LightingMode = 'golden' | 'evening' | 'night' | 'rainy';

export type DeskWoodStyle = 'natural_oak' | 'dark_walnut' | 'light_birch' | 'muji_hinoki';

export type TypewriterColor = 'dusty_teal' | 'cream_ivory' | 'matte_black' | 'cherry_red' | 'sage_green';

export type CameraPreset = 'overview' | 'typing' | 'cozy' | 'wall';

export type AmbientSoundType = 'none' | 'rain' | 'fireplace' | 'cafe' | 'wind';

export interface DeskState {
  // Lighting & Mood
  lightingMode: LightingMode;
  lampOn: boolean;
  lampIntensity: number; // 0.5 to 2.0
  lampColor: string; // hex
  
  // Customization
  woodStyle: DeskWoodStyle;
  typewriterColor: TypewriterColor;
  wallArtStyle: 'fuji' | 'kanji' | 'botanical' | 'minimalist';
  
  // Typewriter Paper State
  paperText: string;
  paperFontSize: number;
  typewriterSoundEnabled: boolean;
  
  // Ambient Sound
  ambientSound: AmbientSoundType;
  ambientVolume: number; // 0 to 1
  
  // Active Interactive Object Focus
  activeCameraPreset: CameraPreset;
  interactiveFocusedObject: string | null;
  
  // Stats & Interaction Counter
  keystrokeCount: number;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: '3d' | 'web' | 'ai' | 'design';
  description: string;
  image: string;
  tags: string[];
  highlights: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface SkillGroup {
  category: string;
  skills: { name: string; level: number; icon?: string }[];
}

export interface Experience {
  year: string;
  role: string;
  company: string;
  description: string;
}
export interface QuotePreset {
  id: string;
  label: string;
  text: string;
  author?: string;
}

export const DEFAULT_QUOTES: QuotePreset[] = [
  {
    id: '1',
    label: 'Design Thought',
    text: 'Design is thinking\nmade visual.',
    author: 'Saul Bass'
  },
  {
    id: '2',
    label: 'Japanese Quietness',
    text: '静寂の中に、\n真の自由がある。',
    author: '静夜考'
  },
  {
    id: '3',
    label: 'Simplicity',
    text: 'Simplicity is the ultimate\nsophistication.',
    author: 'Leonardo da Vinci'
  },
  {
    id: '4',
    label: 'Daily Reflection',
    text: 'Slow down and appreciate\nthe quiet moments of creation.',
    author: 'Zen Notes'
  }
];
