import React from 'react';
import { PERSONAL_INFO, EXPERIENCES_DATA } from '../../data/portfolioData';
import { User, Briefcase, MapPin } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative py-20 bg-stone-900/60 border-t border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono mb-3">
            <User className="w-3.5 h-3.5" />
            <span>ABOUT ME</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-stone-100 tracking-tight">
            个人介绍
          </h2>
          <p className="mt-3 text-sm text-stone-400 leading-relaxed font-light">
            在代码与数字艺术之间寻找平衡，专注打造既具有极致流畅性能、又兼具人文设计美感的 Web 交互体验。
          </p>
        </div>

        {/* Bio Card - Centered Showcase */}
        <div className="max-w-4xl mx-auto bg-stone-950/80 border border-stone-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden group mb-16">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-teal-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-700" />
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6 text-center sm:text-left">
            <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-teal-500/40 p-1 bg-stone-900 shadow-xl shrink-0">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                alt="何怡文"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-stone-100">何怡文</h3>
              <div className="text-xs text-teal-400 font-mono mt-1">Creative Web & 3D Front-End Developer</div>
              <div className="flex items-center justify-center sm:justify-start gap-1 text-xs text-stone-400 mt-2">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light mb-6 border-t border-stone-800/80 pt-4">
            {PERSONAL_INFO.bio}
          </p>

          {/* Key Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {PERSONAL_INFO.stats.map((stat, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-stone-900/90 border border-stone-800 text-center">
                <div className="text-xl font-extrabold text-amber-400 font-mono">
                  {stat.value}
                </div>
                <div className="text-[11px] text-stone-400 mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="max-w-4xl mx-auto bg-stone-950/80 border border-stone-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center gap-2 text-stone-100 font-bold text-lg mb-8 pb-3 border-b border-stone-800">
            <Briefcase className="w-5 h-5 text-amber-400" />
            <span>工作与经历轨迹</span>
          </div>

          <div className="relative border-l border-stone-800/80 ml-4 space-y-8 pl-6 sm:pl-8">
            {EXPERIENCES_DATA.map((exp, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline Dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full bg-stone-900 border-2 border-teal-400 group-hover:bg-teal-400 transition-colors shadow-lg" />

                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="text-base font-bold text-stone-100 group-hover:text-teal-300 transition-colors">
                    {exp.role} <span className="text-stone-400 text-sm font-normal">@ {exp.company}</span>
                  </h4>
                  <span className="px-2.5 py-1 rounded-full bg-stone-900 border border-stone-800 text-[11px] font-mono text-amber-400">
                    {exp.year}
                  </span>
                </div>

                <p className="mt-2 text-xs sm:text-sm text-stone-400 font-light leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
