import React, { useState } from 'react';
import { Project } from '../../types';
import { PROJECTS_DATA } from '../../data/portfolioData';
import { ProjectModal } from './ProjectModal';
import { FolderKanban, Sparkles, ExternalLink, Github, Search, Check, Layers, Code, Box, Palette } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = [
    { id: 'all', label: '全部作品' },
    { id: '3d', label: '3D & WebGL' },
    { id: 'web', label: 'Web 应用' },
    { id: 'ai', label: 'AI & 智能' },
    { id: 'design', label: '设计与体验' },
  ];

  const filteredProjects = PROJECTS_DATA.filter(project => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="relative py-20 bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-3">
            <FolderKanban className="w-3.5 h-3.5" />
            <span>SELECTED WORKS</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-stone-100 tracking-tight">
            代表项目与作品展现
          </h2>
          <p className="mt-3 text-sm text-stone-400 leading-relaxed font-light">
            精选 3D 交互、Web 全栈应用与 AI 工具集，点击卡片可查看技术深度分析与在线预览。
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-stone-800/80">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-lg shadow-teal-900/30 scale-105'
                    : 'bg-stone-900 text-stone-400 hover:text-stone-200 hover:bg-stone-800 border border-stone-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
            <input
              type="text"
              placeholder="搜索技术栈或项目..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-stone-900 border border-stone-800 rounded-xl text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-teal-500 transition-colors"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="py-16 text-center text-stone-500 text-sm">
            未找到匹配的项目作品，请尝试更改搜索词或分类。
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group relative bg-stone-900/60 border border-stone-800/90 rounded-2xl overflow-hidden hover:border-teal-500/50 transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-2xl hover:shadow-teal-950/50 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Project Image Preview */}
                  <div className="relative h-48 overflow-hidden bg-stone-950">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent" />

                    {/* Featured Tag */}
                    {project.featured && (
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-amber-500/90 text-stone-950 font-bold text-[10px] tracking-wider uppercase shadow-md flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>精选项目</span>
                      </div>
                    )}

                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-stone-900/80 border border-stone-700/80 text-stone-300 text-[10px] font-mono backdrop-blur-md">
                      {project.category.toUpperCase()}
                    </div>
                  </div>

                  {/* Project Meta Info */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-stone-100 group-hover:text-teal-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-stone-400 font-mono mt-1 mb-3">
                      {project.subtitle}
                    </p>
                    <p className="text-xs text-stone-300 line-clamp-2 font-light leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {project.tags.slice(0, 4).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-stone-950 border border-stone-800 text-[11px] font-mono text-stone-400"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className="px-1.5 py-0.5 text-[10px] text-stone-500 font-mono">
                          +{project.tags.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-stone-800/60 text-xs font-semibold text-teal-400 group-hover:text-amber-400 transition-colors">
                  <span>查看项目详情 & 技术栈</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Project Detail Modal */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
};
