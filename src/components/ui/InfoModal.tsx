import React from 'react';
import { X, Sparkles, Keyboard, Sun, Volume2, MousePointer } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-2xl shadow-2xl p-6 text-stone-100 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-300 border border-amber-500/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-stone-100">日式原木 3D 打字机静谧书桌</h2>
              <p className="text-xs text-stone-400">Japandi Quiet Desktop Experience</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 rounded-xl text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Features List */}
        <div className="space-y-3 text-xs text-stone-300 leading-relaxed">
          <div className="flex items-start gap-3 p-3 bg-stone-950/50 rounded-xl border border-white/5">
            <Keyboard className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-amber-200 block mb-0.5">真实键盘物理打字与声效</span>
              直接在电脑键盘上敲击，3D 打字机按键将同步沉降、车身平移，并伴随复古机械敲击声与铃声！
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-stone-950/50 rounded-xl border border-white/5">
            <MousePointer className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-amber-200 block mb-0.5">3D 场景物件互动</span>
              点击桌面上的台灯（开关灯光）、笔筒（摇晃铅笔）、多肉植物（叶片轻弹）、书本（翻页）与墙面挂画，体验沉浸式静谧氛围。
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-stone-950/50 rounded-xl border border-white/5">
            <Sun className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-amber-200 block mb-0.5">柔和光影与暖阳/雨夜切换</span>
              支持暖阳、暮色、深夜与雨夜四种光影氛围，可任意调节台灯亮度与色温。
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-stone-950/50 rounded-xl border border-white/5">
            <Volume2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-amber-200 block mb-0.5">Web Audio 拟真白噪音</span>
              可播放雨声、篝火裂响或咖啡馆氛围音，助你保持专注与平和。
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white font-medium text-xs rounded-xl shadow-md transition-all"
          >
            开始沉浸体验
          </button>
        </div>
      </div>
    </div>
  );
};
