import React from 'react';
import { Project } from '../../types';
import { X, ExternalLink, Github, CheckCircle2, Layers, Sparkles } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-stone-950 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="relative h-48 sm:h-64 overflow-hidden border-b border-stone-800">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700 backdrop-blur-md transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <span className="px-2.5 py-1 rounded-md bg-teal-500/20 border border-teal-500/40 text-teal-300 text-[11px] font-mono uppercase tracking-wider">
              {project.category}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-stone-100 mt-2">
              {project.title}
            </h3>
            <p className="text-xs text-stone-400 font-mono mt-0.5">
              {project.subtitle}
            </p>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div>
            <h4 className="text-xs font-mono text-stone-400 uppercase tracking-wider mb-2">项目概述</h4>
            <p className="text-sm text-stone-300 leading-relaxed font-light">
              {project.description}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-mono text-stone-400 uppercase tracking-wider mb-3">核心亮点与技术特点</h4>
            <ul className="space-y-2">
              {project.highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-stone-300">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono text-stone-400 uppercase tracking-wider mb-3">使用技术栈</h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 text-xs font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-stone-900/90 border-t border-stone-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target={project.demoUrl.startsWith('#') ? '_self' : '_blank'}
                rel="noreferrer"
                onClick={(e) => {
                  if (project.demoUrl?.startsWith('#')) {
                    e.preventDefault();
                    onClose();
                    const el = document.getElementById(project.demoUrl.substring(1));
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white text-xs font-semibold shadow-lg shadow-teal-900/30 hover:scale-105 transition-transform"
              >
                <ExternalLink className="w-4 h-4" />
                <span>在线预览 / Demo</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold border border-stone-700 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>查看源码</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs text-stone-400 hover:text-stone-200"
          >
            关闭窗口
          </button>
        </div>
      </div>
    </div>
  );
};
