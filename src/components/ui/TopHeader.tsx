import React from 'react';
import { CameraPreset, LightingMode, AmbientSoundType, DeskState } from '../../types';
import { soundManager } from '../../utils/audioSystem';
import {
  Camera,
  Sun,
  Moon,
  CloudRain,
  Sunset,
  Volume2,
  VolumeX,
  Sliders,
  Sparkles,
  Maximize2,
  Type,
  HelpCircle,
  EyeOff,
} from 'lucide-react';

interface TopHeaderProps {
  state: DeskState;
  onUpdateState: (updater: (prev: DeskState) => DeskState) => void;
  onOpenCustomizer: () => void;
  onOpenInfo: () => void;
  onTakeSnapshot: () => void;
  onToggleZenMode: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  state,
  onUpdateState,
  onOpenCustomizer,
  onOpenInfo,
  onTakeSnapshot,
  onToggleZenMode,
}) => {
  const cameraPresets: { id: CameraPreset; label: string }[] = [
    { id: 'overview', label: '全景视角' },
    { id: 'typing', label: '打字特写' },
    { id: 'cozy', label: '温馨绿植' },
    { id: 'wall', label: '墙面挂画' },
  ];

  const lightingModes: { id: LightingMode; label: string; icon: React.ReactNode }[] = [
    { id: 'golden', label: '暖阳', icon: <Sun className="w-4 h-4 text-amber-500" /> },
    { id: 'evening', label: '暮色', icon: <Sunset className="w-4 h-4 text-orange-400" /> },
    { id: 'night', label: '深夜', icon: <Moon className="w-4 h-4 text-indigo-400" /> },
    { id: 'rainy', label: '雨夜', icon: <CloudRain className="w-4 h-4 text-cyan-400" /> },
  ];

  const ambientSounds: { id: AmbientSoundType; label: string }[] = [
    { id: 'none', label: '静音' },
    { id: 'rain', label: '雨声' },
    { id: 'fireplace', label: '篝火' },
    { id: 'cafe', label: '咖啡馆' },
  ];

  const handleAmbientChange = (type: AmbientSoundType) => {
    onUpdateState((prev) => {
      const nextSound = prev.ambientSound === type ? 'none' : type;
      soundManager.setAmbientSound(nextSound, prev.ambientVolume);
      return { ...prev, ambientSound: nextSound };
    });
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between gap-2 p-2.5 sm:p-4 bg-slate-900/80 backdrop-blur-md border-b border-white/10 text-stone-100 transition-all max-w-full overflow-x-auto no-scrollbar">
      {/* Title & Brand */}
      <div className="flex items-center space-x-2 shrink-0">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-amber-600 to-stone-800 flex items-center justify-center shadow-md border border-amber-500/30">
          <Type className="w-4 h-4 sm:w-5 sm:h-5 text-amber-200" />
        </div>
        <div>
          <h1 className="text-xs sm:text-base font-semibold tracking-wide text-stone-100 flex items-center gap-1.5 whitespace-nowrap">
            3D 打字机静谧书桌
            <span className="text-[10px] sm:text-xs px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 hidden xs:inline">
              Muji
            </span>
          </h1>
          <p className="text-xs text-stone-400 hidden lg:block">
            温润材质 · 柔和灯光 · 真实键盘敲击体验
          </p>
        </div>
      </div>

      {/* Center Controls: Camera Presets & Lighting */}
      <div className="flex items-center gap-1.5 shrink-0">
        {/* Camera Views */}
        <div className="flex items-center bg-stone-950/70 p-1 rounded-xl border border-white/10">
          {cameraPresets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => onUpdateState((prev) => ({ ...prev, activeCameraPreset: preset.id }))}
              className={`px-2 sm:px-3 py-1 text-[11px] sm:text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                state.activeCameraPreset === preset.id
                  ? 'bg-amber-600/90 text-white shadow-sm border border-amber-400/40 font-semibold'
                  : 'text-stone-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Lighting Mode Switcher */}
        <div className="hidden md:flex items-center bg-stone-950/70 p-1 rounded-xl border border-white/10">
          {lightingModes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => onUpdateState((prev) => ({ ...prev, lightingMode: mode.id }))}
              className={`flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-lg transition-all ${
                state.lightingMode === mode.id
                  ? 'bg-stone-800 text-amber-300 shadow-sm border border-stone-700'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-white/5'
              }`}
              title={mode.label}
            >
              {mode.icon}
              <span className="hidden lg:inline">{mode.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Right Controls: Ambient Sound, Lamp Switch, Customizer, Info */}
      <div className="flex items-center gap-1.5 shrink-0">
        {/* Lamp Quick Toggle */}
        <button
          onClick={() => {
            soundManager.playLampSwitch();
            onUpdateState((prev) => ({ ...prev, lampOn: !prev.lampOn }));
          }}
          className={`flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 text-[11px] sm:text-xs font-medium rounded-xl border transition-all ${
            state.lampOn
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
              : 'bg-stone-950/60 text-stone-400 border-white/10 hover:text-stone-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>台灯 {state.lampOn ? 'ON' : 'OFF'}</span>
        </button>

        {/* Ambient Sound Selector */}
        <div className="relative group">
          <button
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl border transition-all ${
              state.ambientSound !== 'none'
                ? 'bg-cyan-950/60 text-cyan-300 border-cyan-500/40'
                : 'bg-stone-950/60 text-stone-400 border-white/10 hover:text-stone-200'
            }`}
          >
            {state.ambientSound !== 'none' ? (
              <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
            ) : (
              <VolumeX className="w-3.5 h-3.5" />
            )}
            <span className="capitalize">{state.ambientSound === 'none' ? '氛围音' : state.ambientSound}</span>
          </button>

          {/* Sound Menu Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-36 p-1.5 bg-stone-900/95 backdrop-blur-md rounded-xl border border-white/10 shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all">
            <p className="text-[10px] uppercase tracking-wider text-stone-500 px-2 py-1 font-semibold">
              自然白噪音
            </p>
            {ambientSounds.map((s) => (
              <button
                key={s.id}
                onClick={() => handleAmbientChange(s.id)}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  state.ambientSound === s.id
                    ? 'bg-amber-600/80 text-white font-semibold'
                    : 'text-stone-300 hover:bg-white/10'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Zen View Mode (Hide UI) */}
        <button
          onClick={onToggleZenMode}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-xs font-medium rounded-xl border border-amber-500/40 shadow-sm transition-all"
          title="隐藏界面 (沉浸无UI全景)"
        >
          <EyeOff className="w-3.5 h-3.5" />
          <span className="hidden lg:inline">沉浸视角</span>
        </button>

        {/* Snapshot Button */}
        <button
          onClick={onTakeSnapshot}
          className="p-2 bg-stone-950/60 hover:bg-stone-800 text-stone-300 hover:text-white rounded-xl border border-white/10 transition-all"
          title="拍摄高清桌景快照"
        >
          <Camera className="w-4 h-4" />
        </button>

        {/* Customizer Drawer Toggle */}
        <button
          onClick={onOpenCustomizer}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-100 text-xs font-medium rounded-xl border border-stone-600 transition-all shadow-sm"
        >
          <Sliders className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">个性化布置</span>
        </button>

        {/* Help Info */}
        <button
          onClick={onOpenInfo}
          className="p-2 bg-stone-950/60 hover:bg-stone-800 text-stone-400 hover:text-white rounded-xl border border-white/10 transition-all"
          title="关于与使用指南"
        >
          <HelpCircle className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
