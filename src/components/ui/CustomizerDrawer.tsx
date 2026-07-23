import React from 'react';
import { DeskState, TypewriterColor, DeskWoodStyle } from '../../types';
import { soundManager } from '../../utils/audioSystem';
import { Sliders, X, Sparkles, Palette, Sun, Image } from 'lucide-react';

interface CustomizerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  state: DeskState;
  onUpdateState: (updater: (prev: DeskState) => DeskState) => void;
}

export const CustomizerDrawer: React.FC<CustomizerDrawerProps> = ({
  isOpen,
  onClose,
  state,
  onUpdateState,
}) => {
  if (!isOpen) return null;

  const typewriterColors: { id: TypewriterColor; label: string; colorHex: string }[] = [
    { id: 'dusty_teal', label: '复古雾蓝 (默认)', colorHex: '#4C7A8C' },
    { id: 'cream_ivory', label: '象牙温白', colorHex: '#E6DFD3' },
    { id: 'matte_black', label: '深邃哑黑', colorHex: '#2D3136' },
    { id: 'cherry_red', label: '经典樱红', colorHex: '#9E2A2B' },
    { id: 'sage_green', label: '鼠尾草绿', colorHex: '#5E7063' },
  ];

  const woodStyles: { id: DeskWoodStyle; label: string; bgClass: string }[] = [
    { id: 'natural_oak', label: '自然暖橡木', bgClass: 'bg-[#C29B72]' },
    { id: 'dark_walnut', label: '沉稳黑胡桃', bgClass: 'bg-[#4A3326]' },
    { id: 'light_birch', label: '清爽白桦木', bgClass: 'bg-[#E3CEB1]' },
    { id: 'muji_hinoki', label: '日式无印桧木', bgClass: 'bg-[#D8C2A0]' },
  ];

  const wallArtStyles: { id: 'fuji' | 'kanji' | 'botanical' | 'minimalist'; label: string; desc: string }[] = [
    { id: 'fuji', label: '富士赤阳', desc: '红日与富士山剪影' },
    { id: 'kanji', label: '静寂书法', desc: '日式极简墨宝 "静寂"' },
    { id: 'botanical', label: '银杏叶画', desc: '金黄银杏扇叶极简线描' },
    { id: 'minimalist', label: 'Japandi抽象', desc: '温润几何色块与柔和线条' },
  ];

  const lampColors = [
    { name: '温暖金光', hex: '#ffb852' },
    { name: '烛光琥珀', hex: '#ff9933' },
    { name: '日光柔白', hex: '#fffae6' },
    { name: '浪漫晚霞', hex: '#f39c12' },
  ];

  return (
    <div className="fixed inset-y-0 right-0 z-30 w-80 sm:w-96 bg-slate-900/95 backdrop-blur-xl border-l border-white/10 shadow-2xl text-stone-100 flex flex-col transition-all duration-300">
      {/* Drawer Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-stone-950/40">
        <div className="flex items-center space-x-2">
          <Sliders className="w-5 h-5 text-amber-400" />
          <h2 className="text-base font-semibold text-stone-100">书桌布局与材质定制</h2>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-white/10 rounded-xl text-stone-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Drawer Body */}
      <div className="flex-1 p-5 space-y-6 overflow-y-auto custom-scrollbar">
        {/* 1. TYPEWRITER COLOR */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Palette className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-300">
              打字机车身配色
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {typewriterColors.map((tc) => (
              <button
                key={tc.id}
                onClick={() => {
                  soundManager.playPageFlip();
                  onUpdateState((prev) => ({ ...prev, typewriterColor: tc.id }));
                }}
                className={`flex items-center space-x-3 p-2.5 rounded-xl border text-xs font-medium transition-all ${
                  state.typewriterColor === tc.id
                    ? 'bg-amber-600/20 border-amber-500 text-amber-200'
                    : 'bg-stone-950/40 border-white/5 text-stone-300 hover:border-white/20'
                }`}
              >
                <span
                  className="w-5 h-5 rounded-full border border-white/20 shadow-inner"
                  style={{ backgroundColor: tc.colorHex }}
                />
                <span>{tc.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. DESK WOOD MATERIAL */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-300">
              办公桌原木材质
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {woodStyles.map((ws) => (
              <button
                key={ws.id}
                onClick={() => {
                  soundManager.playPageFlip();
                  onUpdateState((prev) => ({ ...prev, woodStyle: ws.id }));
                }}
                className={`flex flex-col items-center p-3 rounded-xl border text-xs font-medium gap-2 transition-all ${
                  state.woodStyle === ws.id
                    ? 'bg-amber-600/20 border-amber-500 text-amber-200'
                    : 'bg-stone-950/40 border-white/5 text-stone-300 hover:border-white/20'
                }`}
              >
                <div className={`w-full h-8 rounded-lg shadow-inner ${ws.bgClass}`} />
                <span>{ws.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 3. WALL ART FRAME */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Image className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-300">
              墙面艺术挂画
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {wallArtStyles.map((art) => (
              <button
                key={art.id}
                onClick={() => {
                  soundManager.playPageFlip();
                  onUpdateState((prev) => ({ ...prev, wallArtStyle: art.id }));
                }}
                className={`flex flex-col items-start p-3 rounded-xl border text-xs text-left transition-all ${
                  state.wallArtStyle === art.id
                    ? 'bg-amber-600/20 border-amber-500 text-amber-200'
                    : 'bg-stone-950/40 border-white/5 text-stone-300 hover:border-white/20'
                }`}
              >
                <span className="font-semibold text-stone-200">{art.label}</span>
                <span className="text-[10px] text-stone-400 mt-0.5">{art.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 4. DESK LAMP SETTINGS */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Sun className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-300">
              台灯柔光参数
            </h3>
          </div>
          <div className="p-3 bg-stone-950/50 rounded-xl border border-white/5 space-y-3">
            <div>
              <div className="flex justify-between text-xs text-stone-300 mb-1">
                <span>台灯亮度</span>
                <span className="text-amber-400 font-mono">
                  {Math.round(state.lampIntensity * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0.3"
                max="2.0"
                step="0.1"
                value={state.lampIntensity}
                onChange={(e) =>
                  onUpdateState((prev) => ({
                    ...prev,
                    lampIntensity: parseFloat(e.target.value),
                  }))
                }
                className="w-full accent-amber-500 bg-stone-800 rounded-lg cursor-pointer h-1.5"
              />
            </div>

            <div>
              <label className="text-xs text-stone-400 block mb-1.5">灯光色温：</label>
              <div className="grid grid-cols-2 gap-1.5">
                {lampColors.map((lc) => (
                  <button
                    key={lc.hex}
                    onClick={() =>
                      onUpdateState((prev) => ({
                        ...prev,
                        lampColor: lc.hex,
                      }))
                    }
                    className={`flex items-center gap-2 p-2 rounded-lg text-xs border transition-all ${
                      state.lampColor === lc.hex
                        ? 'border-amber-400 bg-amber-500/20 text-amber-200'
                        : 'border-white/5 text-stone-300 hover:bg-white/5'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
                      style={{ backgroundColor: lc.hex }}
                    />
                    <span>{lc.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
