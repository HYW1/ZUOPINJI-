import React from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { Mail, Github, Linkedin, Twitter, Dribbble, ArrowUp } from 'lucide-react';

export const ContactFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative bg-stone-950 border-t border-stone-800/80 pt-16 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono">
          <Mail className="w-3.5 h-3.5" />
          <span>GET IN TOUCH</span>
        </div>

        <h2 className="text-3xl font-extrabold text-stone-100 tracking-tight">
          开启合作或交流探讨
        </h2>

        <p className="max-w-xl mx-auto text-xs sm:text-sm text-stone-400 font-light leading-relaxed">
          无论您是有新的 Web 交互项目意向、3D 体验开发需求，还是仅仅想聊聊创意前端与数字美学，都非常欢迎随时与我联系！
        </p>

        {/* Status Pill */}
        <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-stone-900/90 border border-stone-800 shadow-xl">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span className="text-xs text-stone-200 font-medium">
            目前开放合作意向（远程 / 全职 / 3D Web 顾问）
          </span>
        </div>

        {/* Social & Direct Email Links */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href={`mailto:${PERSONAL_INFO.contacts.email}`}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white text-xs font-semibold shadow-lg shadow-teal-900/30 hover:scale-105 transition-all"
          >
            <Mail className="w-4 h-4 text-amber-300" />
            <span>发送邮件联系我 ({PERSONAL_INFO.contacts.email})</span>
          </a>

          <a
            href={PERSONAL_INFO.contacts.github}
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-xl bg-stone-900 border border-stone-800 text-stone-400 hover:text-white hover:border-teal-500/50 transition-all hover:scale-110"
            title="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href={PERSONAL_INFO.contacts.linkedin}
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-xl bg-stone-900 border border-stone-800 text-stone-400 hover:text-white hover:border-teal-500/50 transition-all hover:scale-110"
            title="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href={PERSONAL_INFO.contacts.twitter}
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-xl bg-stone-900 border border-stone-800 text-stone-400 hover:text-white hover:border-teal-500/50 transition-all hover:scale-110"
            title="Twitter"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href={PERSONAL_INFO.contacts.dribbble}
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-xl bg-stone-900 border border-stone-800 text-stone-400 hover:text-white hover:border-teal-500/50 transition-all hover:scale-110"
            title="Dribbble"
          >
            <Dribbble className="w-5 h-5" />
          </a>
        </div>

        {/* Bottom Copyright & Back to top */}
        <div className="pt-12 border-t border-stone-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} 何怡文 Alex He. Crafted with Three.js, React & TailwindCSS.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 hover:text-stone-200 hover:border-stone-700 transition-all group"
          >
            <span>返回顶部</span>
            <ArrowUp className="w-3.5 h-3.5 text-amber-400 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};
