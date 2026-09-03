import React, { useState } from 'react';
import { Folder, ExternalLink, Sparkles, X, CheckCircle2, ChevronRight, ArrowRight, Github, Workflow } from 'lucide-react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { ProjectItem } from '../types';
import { soundFX } from '../utils/audio';

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [filterTab, setFilterTab] = useState<'featured' | 'additional' | 'all'>('featured');

  const featuredProjects = PROJECTS_DATA.filter((p) => !p.isAdditional);
  const additionalProjects = PROJECTS_DATA.filter((p) => p.isAdditional);

  const displayedProjects =
    filterTab === 'featured'
      ? featuredProjects
      : filterTab === 'additional'
      ? additionalProjects
      : PROJECTS_DATA;

  return (
    <section id="projects" className="py-10 sm:py-16 px-4 max-w-6xl mx-auto">
      {/* Retro OS Folder Explorer Window */}
      <div className="bg-white border-4 border-[#1a1a40] shadow-[8px_8px_0_0_#1a1a40]">
        {/* Title Bar */}
        <div className="bg-[#1a1a40] text-white px-3 sm:px-4 py-2 flex items-center justify-between border-b-4 border-[#1a1a40] select-none">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-[#ffb3d9] border-2 border-white flex items-center justify-center">
              <span className="text-[8px] text-[#1a1a40] font-bold">📁</span>
            </div>
            <h2 className="font-pixel text-xs sm:text-sm text-white tracking-wider">
              C:\PORTFOLIO\PROJECTS_DIRECTORY
            </h2>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="text-[10px] font-pixel text-[#aaffaa] mr-2 hidden sm:inline-block">
              {PROJECTS_DATA.length} ARCHIVED REPOSITORIES
            </span>
            <div className="w-5 h-5 bg-[#e0e0e0] border-2 border-[#1a1a40] flex items-center justify-center text-[#1a1a40] text-xs font-bold">_</div>
            <div className="w-5 h-5 bg-[#e0e0e0] border-2 border-[#1a1a40] flex items-center justify-center text-[#1a1a40] text-xs font-bold">□</div>
            <div className="w-5 h-5 bg-[#ffb3d9] border-2 border-[#1a1a40] flex items-center justify-center text-[#1a1a40] text-xs font-bold">X</div>
          </div>
        </div>

        {/* Directory Bar & Category Tabs */}
        <div className="bg-[#f0e6ff] px-3 sm:px-4 py-2 border-b-3 border-[#1a1a40] flex flex-wrap items-center justify-between gap-2 text-xs font-pixel text-[#1a1a40]">
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 hidden sm:inline">PATH:</span>
            <span className="bg-white px-2 py-0.5 border border-[#1a1a40] shadow-[1px_1px_0_#1a1a40] text-[10px] sm:text-xs">
              C:\BHOOMIKA\PROJECTS\{filterTab.toUpperCase()}\*
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                soundFX.playBlip(500);
                setFilterTab('featured');
              }}
              className={`pixel-btn px-2.5 py-1 text-[9px] sm:text-[10px] font-pixel transition-all cursor-pointer ${
                filterTab === 'featured'
                  ? 'bg-[#1a1a40] text-[#fff07c] shadow-[2px_2px_0_#ffffff]'
                  : 'bg-white hover:bg-[#fff07c] text-[#1a1a40]'
              }`}
            >
              FEATURED ({featuredProjects.length})
            </button>

            <button
              onClick={() => {
                soundFX.playBlip(500);
                setFilterTab('additional');
              }}
              className={`pixel-btn px-2.5 py-1 text-[9px] sm:text-[10px] font-pixel transition-all cursor-pointer ${
                filterTab === 'additional'
                  ? 'bg-[#1a1a40] text-[#fff07c] shadow-[2px_2px_0_#ffffff]'
                  : 'bg-white hover:bg-[#fff07c] text-[#1a1a40]'
              }`}
            >
              ADDITIONAL ({additionalProjects.length})
            </button>

            <button
              onClick={() => {
                soundFX.playBlip(500);
                setFilterTab('all');
              }}
              className={`pixel-btn px-2.5 py-1 text-[9px] sm:text-[10px] font-pixel transition-all cursor-pointer ${
                filterTab === 'all'
                  ? 'bg-[#1a1a40] text-[#fff07c] shadow-[2px_2px_0_#ffffff]'
                  : 'bg-white hover:bg-[#fff07c] text-[#1a1a40]'
              }`}
            >
              ALL ({PROJECTS_DATA.length})
            </button>
          </div>
        </div>

        {/* Folders Grid */}
        <div className="p-4 sm:p-8 bg-[#fafafa]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayedProjects.map((project, idx) => (
              <div
                key={project.id}
                onClick={() => {
                  soundFX.playOpenWindow();
                  setSelectedProject(project);
                }}
                className="bg-white border-3 border-[#1a1a40] p-5 shadow-[5px_5px_0_#1a1a40] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_#1a1a40] transition-all cursor-pointer flex flex-col justify-between group relative"
              >
                {/* Folder Header */}
                <div>
                  <div className="flex items-center justify-between mb-4 border-b-2 border-dashed border-gray-300 pb-3">
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-10 h-10 border-2 border-[#1a1a40] flex items-center justify-center text-xl shadow-[2px_2px_0_#1a1a40] group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: project.color }}
                      >
                        {project.folderIcon}
                      </div>
                      <div>
                        <span className="font-pixel text-[9px] text-gray-500 block">
                          DIR 0{idx + 1} · {project.isAdditional ? 'ADDITIONAL' : 'FEATURED'}
                        </span>
                        <span className="font-pixel text-[10px] text-purple-900 truncate max-w-[140px] block">
                          {project.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Project Title */}
                  <h3 className="font-pixel text-xs sm:text-sm text-[#1a1a40] mb-2 leading-snug group-hover:text-purple-900 transition-colors">
                    {project.title}
                  </h3>

                  {/* Tagline */}
                  <p className="font-mono-clean text-xs text-gray-700 leading-relaxed mb-4">
                    {project.tagline}
                  </p>

                  {/* Key Metrics Chips */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {project.metrics.slice(0, 2).map((m, mIdx) => (
                      <div key={mIdx} className="bg-[#f0e6ff]/70 border border-[#1a1a40] p-1.5 text-center">
                        <span className="text-[9px] font-pixel text-gray-600 block truncate">{m.label}</span>
                        <span className="text-[10px] sm:text-[11px] font-pixel text-[#1a1a40] font-bold block truncate">{m.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Badges & Open Prompt */}
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.techStack.slice(0, 3).map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="bg-white border border-[#1a1a40] px-2 py-0.5 text-[10px] font-mono-clean font-semibold text-[#1a1a40]"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="text-[10px] font-mono-clean text-gray-500 self-center">
                        +{project.techStack.length - 3} more
                      </span>
                    )}
                  </div>

                  <button className="w-full pixel-btn pixel-btn-primary py-2 text-[10px] font-pixel flex items-center justify-center space-x-1.5 text-[#1a1a40]">
                    <span>OPEN PROJECT FILE</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Explorer Status Bar */}
        <div className="bg-white px-4 py-2 border-t-3 border-[#1a1a40] flex justify-between items-center text-[10px] font-pixel text-gray-600">
          <span>SHOWING {displayedProjects.length} PROJECT ARTIFACTS</span>
          <span className="text-emerald-700">● READY FOR INTERVIEW REVIEW</span>
        </div>
      </div>

      {/* Interactive Project Deep-Dive Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto cursor-pointer"
          onClick={() => {
            soundFX.playCloseWindow();
            setSelectedProject(null);
          }}
        >
          <div 
            className="relative w-full max-w-2xl bg-white border-4 border-[#1a1a40] shadow-[8px_8px_0_#1a1a40] my-auto animate-in fade-in zoom-in duration-150 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Title Bar */}
            <div className="bg-[#1a1a40] text-white px-4 py-2.5 flex items-center justify-between border-b-4 border-[#1a1a40]">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{selectedProject.folderIcon}</span>
                <span className="font-pixel text-xs text-[#fff07c]">
                  {selectedProject.title.toUpperCase()} · PROJ_VIEW.EXE
                </span>
              </div>
              <button
                onClick={() => {
                  soundFX.playCloseWindow();
                  setSelectedProject(null);
                }}
                className="w-6 h-6 bg-[#ffb3d9] hover:bg-[#ff79c6] text-[#1a1a40] font-bold flex items-center justify-center border-2 border-[#1a1a40] text-xs cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 max-h-[75vh] overflow-y-auto bg-[#fafafa]">
              {/* Header Badge */}
              <div className="p-4 border-3 border-[#1a1a40] mb-5 shadow-[4px_4px_0_#1a1a40]" style={{ backgroundColor: `${selectedProject.color}40` }}>
                <span className="font-pixel text-[10px] text-purple-900 block mb-1">
                  CATEGORY: {selectedProject.category.toUpperCase()}
                </span>
                <h3 className="font-pixel text-base text-[#1a1a40] font-bold">
                  {selectedProject.title}
                </h3>
                <p className="font-mono-clean text-xs text-gray-800 mt-1">
                  {selectedProject.tagline}
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
                {selectedProject.metrics.map((m, idx) => (
                  <div key={idx} className="bg-white border-2 border-[#1a1a40] p-2.5 text-center shadow-[2px_2px_0_#1a1a40]">
                    <span className="text-[9px] font-pixel text-gray-500 block truncate">{m.label}</span>
                    <span className="text-xs font-pixel text-[#1a1a40] font-bold block mt-0.5 truncate">{m.value}</span>
                  </div>
                ))}
              </div>

              {/* System Architecture & Data Flow Pipeline */}
              {selectedProject.architectureFlow && selectedProject.architectureFlow.length > 0 && (
                <div className="bg-[#1a1a40] text-white p-4 mb-4 border-2 border-[#1a1a40] shadow-[3px_3px_0_#1a1a40]">
                  <div className="flex items-center space-x-1.5 mb-2.5">
                    <Workflow className="w-3.5 h-3.5 text-[#fff07c]" />
                    <span className="font-pixel text-[10px] text-[#fff07c]">
                      SYSTEM ARCHITECTURE &amp; PIPELINE FLOW:
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row flex-wrap items-center gap-1.5 text-[10px] font-mono-clean">
                    {selectedProject.architectureFlow.map((step, sIdx) => (
                      <React.Fragment key={sIdx}>
                        <div className="bg-white/10 px-2.5 py-1 border border-white/20 text-[#aaffaa] text-center w-full sm:w-auto">
                          {sIdx + 1}. {step}
                        </div>
                        {sIdx < selectedProject.architectureFlow!.length - 1 && (
                          <span className="text-[#ffb3d9] hidden sm:inline font-bold">➔</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}

              {/* Executive Summary */}
              <div className="bg-white border-2 border-[#1a1a40] p-4 mb-4 shadow-[2px_2px_0_#1a1a40]">
                <span className="font-pixel text-[10px] text-purple-800 block mb-1.5">
                  PROJECT CONTEXT &amp; PURPOSE:
                </span>
                <p className="font-mono-clean text-xs text-gray-800 leading-relaxed">
                  {selectedProject.summary}
                </p>
              </div>

              {/* Deliverables / Features */}
              <div className="bg-white border-2 border-[#1a1a40] p-4 mb-4 shadow-[2px_2px_0_#1a1a40]">
                <span className="font-pixel text-[10px] text-purple-800 block mb-2">
                  TECHNICAL DELIVERABLES &amp; IMPLEMENTATION:
                </span>
                <div className="space-y-2">
                  {selectedProject.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start space-x-2 text-xs font-mono-clean text-gray-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Business Impact Banner */}
              <div className="bg-[#88ecc0]/30 border-2 border-[#1a1a40] p-4 mb-5 shadow-[2px_2px_0_#1a1a40]">
                <span className="font-pixel text-[10px] text-emerald-900 block mb-1">
                  BUSINESS &amp; OPERATIONAL OUTCOME:
                </span>
                <p className="font-mono-clean text-xs text-[#1a1a40] font-medium">
                  {selectedProject.businessImpact}
                </p>
              </div>

              {/* Tech Stack Chips */}
              <div className="mb-4">
                <span className="font-pixel text-[10px] text-gray-500 block mb-1.5">
                  TECHNOLOGY ARSENAL:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.techStack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="bg-white border border-[#1a1a40] px-2.5 py-1 text-xs font-mono-clean font-semibold text-[#1a1a40] shadow-[1px_1px_0_#1a1a40]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* External Links */}
              {selectedProject.githubUrl && (
                <div className="pt-2 border-t border-dashed border-gray-300">
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-2 pixel-btn bg-white hover:bg-[#88ecc0] px-3 py-1.5 text-xs font-pixel text-[#1a1a40]"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>VIEW GITHUB REPOSITORY</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-white px-4 py-3 border-t-4 border-[#1a1a40] flex justify-between items-center">
              <span className="font-vt text-sm text-gray-500">
                PROJ_ID: {selectedProject.id} · RECORD_OK
              </span>
              <button
                onClick={() => {
                  soundFX.playCloseWindow();
                  setSelectedProject(null);
                }}
                className="pixel-btn pixel-btn-pink px-4 py-1.5 text-xs font-pixel text-[#1a1a40] cursor-pointer"
              >
                CLOSE WINDOW
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
