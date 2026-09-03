import React, { useState } from 'react';
import { Cpu, Terminal, CheckCircle2, Layers, Wrench, Database, BarChart3, Cloud, Sparkles } from 'lucide-react';
import { SKILLS_DATA } from '../data/portfolioData';
import { SkillItem } from '../types';
import { soundFX } from '../utils/audio';

export const SkillsSection: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<SkillItem>(SKILLS_DATA[0]);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'ALL CAPABILITIES' },
    { id: 'programming', label: 'CORE PROGRAMMING' },
    { id: 'bi', label: 'BI & ANALYTICS' },
    { id: 'engineering', label: 'DATA ENGINEERING' },
    { id: 'tools', label: 'TOOLS & AI' },
  ];

  const filteredSkills = SKILLS_DATA.filter((skill) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'programming') return skill.category === 'programming';
    if (activeCategory === 'bi') return skill.category === 'bi';
    if (activeCategory === 'engineering') return skill.category === 'engineering';
    if (activeCategory === 'tools') return skill.category === 'tools' || skill.category === 'ai';
    return true;
  });

  return (
    <section id="skills" className="py-10 sm:py-16 px-4 max-w-6xl mx-auto">
      {/* Retro OS Pop-Up Window */}
      <div className="bg-white border-4 border-[#1a1a40] shadow-[8px_8px_0_0_#1a1a40]">
        {/* Title Bar */}
        <div className="bg-[#1a1a40] text-white px-3 sm:px-4 py-2 flex items-center justify-between border-b-4 border-[#1a1a40] select-none">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-[#ffffaa] border-2 border-white flex items-center justify-center">
              <span className="text-[8px] text-[#1a1a40] font-bold">⚡</span>
            </div>
            <h2 className="font-pixel text-xs sm:text-sm text-white tracking-wider">
              C:\SYS\SKILLS_MATRIX.DAT
            </h2>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="hidden sm:inline-block text-[10px] font-pixel text-[#aaffaa] mr-2">
              STATUS: VERIFIED WORKING PROFICIENCY
            </span>
            <div className="w-5 h-5 bg-[#e0e0e0] border-2 border-[#1a1a40] flex items-center justify-center text-[#1a1a40] text-xs font-bold">_</div>
            <div className="w-5 h-5 bg-[#e0e0e0] border-2 border-[#1a1a40] flex items-center justify-center text-[#1a1a40] text-xs font-bold">□</div>
            <div className="w-5 h-5 bg-[#ffb3d9] border-2 border-[#1a1a40] flex items-center justify-center text-[#1a1a40] text-xs font-bold">X</div>
          </div>
        </div>

        {/* Action / Category Ribbon */}
        <div className="bg-[#f0e6ff] px-3 sm:px-4 py-2 border-b-3 border-[#1a1a40] flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="text-[10px] font-pixel text-[#1a1a40] mr-1 hidden md:inline">FILTER VIEW:</span>
          {categories.map((cat) => {
            const isSel = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  soundFX.playBlip(500);
                  setActiveCategory(cat.id);
                }}
                className={`pixel-btn px-2.5 py-1 text-[9px] sm:text-[10px] font-pixel transition-all cursor-pointer ${
                  isSel
                    ? 'bg-[#1a1a40] text-[#fff07c] shadow-[2px_2px_0_#ffffff]'
                    : 'bg-white hover:bg-[#fff07c] text-[#1a1a40]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Matrix Body */}
        <div className="p-4 sm:p-8 bg-[#fafafa]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Categorized Technical Cards */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-white border-3 border-[#1a1a40] p-4 shadow-[4px_4px_0_#1a1a40]">
                <div className="flex items-center justify-between border-b-2 border-[#1a1a40] pb-2 mb-3">
                  <div className="flex items-center space-x-2">
                    <Cpu className="w-4 h-4 text-purple-700" />
                    <span className="font-pixel text-xs text-[#1a1a40]">CORE TECHNICAL PROFICIENCIES</span>
                  </div>
                  <span className="font-pixel text-[9px] text-gray-500">CLICK TO INSPECT PROOFS</span>
                </div>

                {/* Skills Cards List */}
                <div className="space-y-2.5">
                  {filteredSkills.map((skill) => {
                    const isSelected = selectedSkill.id === skill.id;

                    return (
                      <div
                        key={skill.id}
                        onClick={() => {
                          soundFX.playBlip(600);
                          setSelectedSkill(skill);
                        }}
                        className={`p-3 border-2 border-[#1a1a40] transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#fff07c]/25 shadow-[3px_3px_0_#1a1a40] -translate-y-0.5'
                            : 'bg-white hover:bg-[#faf5ff]'
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                          <div className="flex items-center space-x-2">
                            <span
                              className="w-3 h-3 border border-[#1a1a40] shrink-0"
                              style={{ backgroundColor: skill.color }}
                            ></span>
                            <span className="font-pixel text-xs text-[#1a1a40] font-bold">
                              {skill.name}
                            </span>
                          </div>
                          <span className="font-pixel text-[9px] px-2 py-0.5 border border-[#1a1a40] bg-white text-[#1a1a40]">
                            {skill.proficiency.toUpperCase()}
                          </span>
                        </div>

                        <p className="text-[11px] font-mono-clean text-gray-700 line-clamp-1">
                          {skill.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Auxiliary Tools & Workflow Ribbon */}
              <div className="bg-white border-3 border-[#1a1a40] p-4 shadow-[4px_4px_0_#1a1a40]">
                <div className="flex items-center space-x-2 text-xs font-pixel text-[#1a1a40] mb-2.5">
                  <Terminal className="w-3.5 h-3.5 text-blue-700" />
                  <span>SUPPORTING TOOLS &amp; ANALYTICS WORKFLOW:</span>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {[
                    'Git & GitHub',
                    'PostgreSQL',
                    'MySQL',
                    'Postman',
                    'Insomnia',
                    'Delta Lake',
                    'Jupyter Lab',
                    'VS Code',
                    'LeadSquared CRM',
                    'Star Schema (Data Modeling)',
                    'Statistical Regression',
                    'K-Means Clustering',
                    'Prompt Engineering',
                  ].map((tool, idx) => (
                    <span
                      key={idx}
                      className="bg-[#f0e6ff] border border-[#1a1a40] px-2 py-0.5 text-[11px] font-mono-clean font-semibold text-[#1a1a40] shadow-[1px_1px_0_#1a1a40]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Skill Inspector / Real Operational Proofs */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="bg-white border-3 border-[#1a1a40] p-5 shadow-[4px_4px_0_#1a1a40] flex-1 flex flex-col justify-between">
                <div>
                  {/* Inspector Header */}
                  <div className="bg-[#1a1a40] text-white p-2.5 border-2 border-[#1a1a40] mb-4 flex justify-between items-center">
                    <span className="font-pixel text-[11px] text-[#fff07c]">INSPECTOR_LOG.EXE</span>
                    <span className="font-pixel text-[9px] bg-[#88ecc0] text-[#1a1a40] px-1.5 py-0.5">VERIFIED</span>
                  </div>

                  {/* Selected Skill Badge */}
                  <div
                    className="p-4 border-2 border-[#1a1a40] mb-4 shadow-[3px_3px_0_#1a1a40]"
                    style={{ backgroundColor: `${selectedSkill.color}40` }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-pixel text-base text-[#1a1a40] font-bold">
                          {selectedSkill.name}
                        </h3>
                        <span className="font-pixel text-[10px] text-purple-900 block mt-0.5">
                          TIER: {selectedSkill.proficiency}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-pixel text-[10px] bg-white px-2 py-1 border border-[#1a1a40] text-[#1a1a40] font-bold">
                          PRACTICE-PROVEN
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Capability Summary */}
                  <div className="mb-4">
                    <span className="font-pixel text-[10px] text-gray-500 block mb-1">
                      TECHNICAL SCOPE &amp; APPLICATION:
                    </span>
                    <p className="font-mono-clean text-xs text-gray-800 leading-relaxed bg-[#f9fafb] p-3 border border-[#1a1a40]">
                      {selectedSkill.description}
                    </p>
                  </div>

                  {/* Operational Proofs Bullet List */}
                  <div>
                    <span className="font-pixel text-[10px] text-gray-500 block mb-2">
                      OPERATIONAL PROOFS &amp; DELIVERABLES:
                    </span>
                    <div className="space-y-2">
                      {selectedSkill.highlights.map((h, i) => (
                        <div key={i} className="flex items-start space-x-2 text-xs font-mono-clean text-gray-800">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Context Banner */}
                <div className="mt-6 pt-3 border-t border-dashed border-gray-300 flex items-center justify-between text-[11px] font-pixel text-gray-600">
                  <span>GROUNDED IN HANDS-ON PROJECTS</span>
                  <span className="text-emerald-700 font-bold">DOCUMENTED IN RESUME</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
