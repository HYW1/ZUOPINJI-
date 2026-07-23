import React, { useState } from 'react';
import { DeskState, DEFAULT_QUOTES } from '../../types';
import { soundManager } from '../../utils/audioSystem';
import {
  Type,
  Trash2,
  Download,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Keyboard,
} from 'lucide-react';

interface TypingPanelProps {
  state: DeskState;
  onUpdateState: (updater: (prev: DeskState) => DeskState) => void;
}

export const TypingPanel: React.FC<TypingPanelProps> = ({ state, onUpdateState }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>('');

  const handleApplyPreset = (text: string) => {
    soundManager.playCarriageBell();
    onUpdateState((prev) => ({
      ...prev,
      paperText: text,
      keystrokeCount: prev.keystrokeCount + text.length,
    }));
  };

  const handleClear = () => {
    soundManager.playCarriageBell();
    onUpdateState((prev) => ({
      ...prev,
      paperText: '',
    }));
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(state.paperText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([state.paperText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `typewriter-note-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleAddCustomLine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    soundManager.playTypewriterKey();
    onUpdateState((prev) => ({
      ...prev,
      paperText: prev.paperText ? prev.paperText + '\n' + inputText : inputText,
      keystrokeCount: prev.keystrokeCount + inputText.length,
    }));
    setInputText('');
  };

  return (
    <div className={`absolute bottom-4 left-4 z-20 text-stone-100 transition-all ${
      isExpanded 
        ? 'w-80 sm:w-96 max-w-[calc(100vw-2rem)] bg-slate-900/85 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl overflow-hidden' 
        : 'w-auto'
    }`}>
      {/* Header / Collapsed Pill */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className={`flex items-center justify-between cursor-pointer hover:bg-stone-900/60 transition-all ${
          isExpanded
            ? 'p-3 bg-stone-950/40 border-b border-white/5'
            : 'px-3.5 py-2 bg-slate-900/80 backdrop-blur-md rounded-full border border-white/15 shadow-xl hover:border-amber-500/40'
        }`}
      >
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-md bg-amber-500/20 flex items-center justify-center text-amber-300 border border-amber-500/30">
            <Keyboard className="w-3.5 h-3.5" />
          </div>
          <div className="text-left">
            <h3 className="text-xs font-semibold text-stone-200">
              打字机文稿 <span className="text-[10px] font-mono text-amber-300 ml-1">({state.paperText.length}字)</span>
            </h3>
            {isExpanded && (
              <p className="text-[10px] text-stone-400">
                直接在键盘打字，或选择预设文案
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-1.5 ml-3">
          <button className="text-stone-400 hover:text-white p-0.5">
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="p-4 space-y-3 max-h-[60vh] overflow-y-auto custom-scrollbar">
          {/* Quick Preset Quotes */}
          <div>
            <label className="text-[11px] font-medium text-stone-400 block mb-1.5">
              名言 preset 快速写入：
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {DEFAULT_QUOTES.map((q) => (
                <button
                  key={q.id}
                  onClick={() => handleApplyPreset(q.text)}
                  className="px-2.5 py-1.5 text-left bg-stone-950/50 hover:bg-amber-600/20 text-stone-300 hover:text-amber-200 text-xs rounded-xl border border-white/5 hover:border-amber-500/30 transition-all truncate"
                >
                  <span className="font-medium">{q.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Current Text Area Preview & Edit */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-medium text-stone-400">
                纸张实时预览：
              </label>
              <div className="flex items-center space-x-1">
                <button
                  onClick={handleCopyText}
                  className="p-1 hover:bg-white/10 rounded text-stone-400 hover:text-stone-200 transition-colors"
                  title="复制文字"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={handleDownloadTxt}
                  className="p-1 hover:bg-white/10 rounded text-stone-400 hover:text-stone-200 transition-colors"
                  title="导出为 TXT"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleClear}
                  className="p-1 hover:bg-red-500/20 rounded text-stone-400 hover:text-red-300 transition-colors"
                  title="清空纸张"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <textarea
              value={state.paperText}
              onChange={(e) =>
                onUpdateState((prev) => ({
                  ...prev,
                  paperText: e.target.value,
                }))
              }
              rows={3}
              placeholder="在这里输入，或直接在实体键盘上随意敲击..."
              className="w-full p-2.5 bg-stone-950/80 text-amber-100 font-mono text-xs rounded-xl border border-white/10 focus:outline-none focus:border-amber-500/50 resize-none"
            />
          </div>

          {/* Fast Line Input Form */}
          <form onSubmit={handleAddCustomLine} className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="追加一行文案..."
              className="flex-1 px-3 py-1.5 bg-stone-950/80 text-stone-200 text-xs rounded-xl border border-white/10 focus:outline-none focus:border-amber-500/50"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white font-medium text-xs rounded-xl transition-colors shadow-sm"
            >
              打字
            </button>
          </form>

          {/* Tip Note */}
          <p className="text-[10px] text-stone-500 text-center italic">
            💡 提示：按键盘字母键，在 3D 场景中将播放复古机械打字音效与按键下沉动画
          </p>
        </div>
      )}
    </div>
  );
};
