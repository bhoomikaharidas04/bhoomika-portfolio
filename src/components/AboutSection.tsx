import React, { useState } from 'react';
import { User, Award, GraduationCap, Building2, Briefcase, ChevronRight, CheckCircle2, Star, Sparkles, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCE_DATA } from '../data/portfolioData';
import { soundFX } from '../utils/audio';

interface AboutSectionProps {
  onOpenResume: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenResume }) => {
  const [activeExpTab, setActiveExpTab] = useState<string>('hero-fincorp');
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  const currentExp = EXPERIENCE_DATA.find((e) => e.id === activeExpTab) || EXPERIENCE_DATA[0];

  return (
    <section id="about" className="py-10 sm:py-16 px-4 max-w-6xl mx-auto">
      {/* Retro OS Pop-Up Window */}
      <div className="bg-white border-4 border-[#1a1a40] shadow-[8px_8px_0_0_#1a1a40]">
        {/* Window Title Bar */}
        <div className="bg-[#1a1a40] text-white px-3 sm:px-4 py-2 flex items-center justify-between border-b-4 border-[#1a1a40] select-none">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-[#ffb3d9] border-2 border-white flex items-center justify-center">
              <span className="text-[8px] text-[#1a1a40] font-bold">★</span>
            </div>
            <span className="font-pixel text-xs sm:text-sm text-white tracking-wider">
              C:\USERS\BHOOMIKA\ABOUT_ME.EXE
            </span>
          </div>

          <div className="flex items-center space-x-1.5">
            <button
              onClick={() => {
                soundFX.playBlip(400);
                setIsMinimized(!isMinimized);
              }}
              className="w-5 h-5 bg-[#e0e0e0] hover:bg-white text-[#1a1a40] font-bold flex items-center justify-center border-2 border-[#1a1a40] text-xs"
              title="Minimize"
            >
              _
            </button>
            <button
              onClick={() => soundFX.playBlip(600)}
              className="w-5 h-5 bg-[#e0e0e0] hover:bg-white text-[#1a1a40] font-bold flex items-center justify-center border-2 border-[#1a1a40] text-xs"
              title="Maximize"
            >
              □
            </button>
            <button
              onClick={() => soundFX.playCloseWindow()}
              className="w-5 h-5 bg-[#ffb3d9] hover:bg-[#ff66aa] text-[#1a1a40] hover:text-white font-bold flex items-center justify-center border-2 border-[#1a1a40] text-xs"
              title="Close"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Window Content */}
        {!isMinimized && (
          <div className="p-4 sm:p-8 bg-[#fafafa]">
            {/* Top Overview Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
              {/* Left Column: Pixel Avatar & RPG Character Card */}
              <div className="lg:col-span-4 bg-white border-3 border-[#1a1a40] p-5 shadow-[4px_4px_0_#1a1a40]">
                {/* Pixel Avatar Frame */}
                <div className="bg-[#ffb3d9] border-3 border-[#1a1a40] p-4 text-center mb-4 relative shadow-[3px_3px_0_#1a1a40]">
                  <div className="w-24 h-24 mx-auto bg-white border-3 border-[#1a1a40] flex items-center justify-center shadow-[inset_2px_2px_0_rgba(0,0,0,0.1)] relative">
                    <span className="text-4xl">👩🏻‍💻</span>
                  </div>
                  <h3 className="font-pixel text-sm text-[#1a1a40] mt-3 uppercase font-bold">
                    {PERSONAL_INFO.name}
                  </h3>
                  <span className="font-pixel text-[10px] text-purple-900 block mt-0.5">
                    ROLE: {PERSONAL_INFO.stats.roleClass.toUpperCase()}
                  </span>
                </div>

                {/* Professional Profile Status */}
                <div className="space-y-2 text-xs font-pixel">
                  <div className="flex justify-between items-center bg-[#f0e6ff] px-2.5 py-1.5 border border-[#1a1a40]">
                    <span className="text-gray-700 text-[10px]">CORE FOCUS:</span>
                    <span className="text-[#1a1a40] font-bold text-[10px]">DATA &amp; TECH</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#f0e6ff] px-2.5 py-1.5 border border-[#1a1a40]">
                    <span className="text-gray-700 text-[10px]">KEY STACK:</span>
                    <span className="text-blue-700 font-bold text-[10px]">PYTHON / SQL / BI / PYSPARK</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#f0e6ff] px-2.5 py-1.5 border border-[#1a1a40]">
                    <span className="text-gray-700 text-[10px]">STATUS:</span>
                    <span className="text-emerald-700 font-bold text-[10px]">AVAILABLE</span>
                  </div>
                </div>

                {/* Education Badge */}
                <div className="mt-4 pt-4 border-t-2 border-dashed border-[#1a1a40]">
                  <div className="flex items-center space-x-2 text-xs font-pixel text-[#1a1a40] mb-2">
                    <GraduationCap className="w-4 h-4 text-purple-700" />
                    <span>ACADEMIC BACKGROUND</span>
                  </div>
                  <div className="bg-[#fff07c]/30 border-2 border-[#1a1a40] p-3 text-left">
                    <p className="font-bold text-xs text-[#1a1a40]">
                      {PERSONAL_INFO.education.degree}
                    </p>
                    <p className="text-[11px] text-gray-700 font-medium mt-0.5">
                      {PERSONAL_INFO.education.major}
                    </p>
                    <p className="text-[10px] text-gray-600 mt-1">
                      {PERSONAL_INFO.education.institution} ({PERSONAL_INFO.education.period})
                    </p>
                    <div className="mt-2 inline-block bg-[#88ecc0] px-2 py-0.5 text-[10px] font-pixel border border-[#1a1a40]">
                      CGPA: {PERSONAL_INFO.education.gpa}
                    </div>
                  </div>
                </div>

                {/* Verified Certifications Badge */}
                <div className="mt-4 pt-4 border-t-2 border-dashed border-[#1a1a40]">
                  <div className="flex items-center space-x-2 text-xs font-pixel text-[#1a1a40] mb-2">
                    <Award className="w-4 h-4 text-amber-600" />
                    <span>VERIFIED CERTIFICATIONS</span>
                  </div>
                  <div className="space-y-1.5 text-[10.5px] font-mono-clean text-gray-800">
                    <div className="bg-[#e6ccff]/50 border border-[#1a1a40] p-1.5 flex items-start space-x-1.5">
                      <span className="text-purple-700 font-bold">★</span>
                      <span>Microsoft Certified: Azure AI Fundamentals (AI-900)</span>
                    </div>
                    <div className="bg-[#e6ccff]/50 border border-[#1a1a40] p-1.5 flex items-start space-x-1.5">
                      <span className="text-purple-700 font-bold">★</span>
                      <span>Data Science for Engineers — NPTEL (IIT Madras)</span>
                    </div>
                    <div className="bg-[#e6ccff]/50 border border-[#1a1a40] p-1.5 flex items-start space-x-1.5">
                      <span className="text-purple-700 font-bold">★</span>
                      <span>Project Management — NPTEL (IIT Kharagpur)</span>
                    </div>
                    <div className="bg-[#e6ccff]/50 border border-[#1a1a40] p-1.5 flex items-start space-x-1.5">
                      <span className="text-purple-700 font-bold">★</span>
                      <span>Google AI Lab / Hack2skill: ADK & Vertex AI Training (Gurugram)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Bio & Internship Highlight Deck */}
              <div className="lg:col-span-8 flex flex-col justify-between">
                {/* Professional Statement */}
                <div className="bg-white border-3 border-[#1a1a40] p-5 shadow-[4px_4px_0_#1a1a40] mb-6">
                  <div className="flex items-center space-x-2 border-b-2 border-[#1a1a40] pb-2 mb-3">
                    <User className="w-4 h-4 text-purple-800" />
                    <h2 className="font-pixel text-xs sm:text-sm text-[#1a1a40]">
                      EXECUTIVE PROFILE & BACKGROUND
                    </h2>
                  </div>
                  <p className="font-mono-clean text-xs sm:text-sm text-gray-800 leading-relaxed mb-3">
                    I am a technology and data professional with a B.Tech in 
                    <span className="font-bold text-[#1a1a40]"> Computer Science &amp; Engineering</span>. My work centers on transforming complex real-world data and operational workflows into structured data pipelines, automated ETL solutions, and decision-ready dashboards.
                  </p>
                  <p className="font-mono-clean text-xs sm:text-sm text-gray-800 leading-relaxed">
                    Across internships with <span className="bg-[#ffb3d9] px-1 font-semibold border border-[#1a1a40]">Hero FinCorp (with BCG X)</span>, the <span className="bg-[#88ecc0] px-1 font-semibold border border-[#1a1a40]">Ministry of Education (AICTE)</span>, and <span className="bg-[#fff07c] px-1 font-semibold border border-[#1a1a40]">ISRO SDSC-SHAR</span>, I have engineered data tools that eliminate manual workloads, automate validation, and deliver actionable operational intelligence.
                  </p>
                </div>

                {/* Internship Experience Tabs */}
                <div className="bg-white border-3 border-[#1a1a40] p-5 shadow-[4px_4px_0_#1a1a40]">
                  <div className="flex items-center justify-between border-b-2 border-[#1a1a40] pb-2 mb-4">
                    <div className="flex items-center space-x-2">
                      <Briefcase className="w-4 h-4 text-emerald-800" />
                      <h3 className="font-pixel text-xs sm:text-sm text-[#1a1a40]">
                        INTERNSHIP TRACK RECORD
                      </h3>
                    </div>
                    <span className="font-pixel text-[10px] text-gray-500">
                      [SELECT LOG ENTRY]
                    </span>
                  </div>

                  {/* Interactive Tab Selectors */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
                    {EXPERIENCE_DATA.map((exp) => {
                      const isSelected = activeExpTab === exp.id;
                      return (
                        <button
                          key={exp.id}
                          onClick={() => {
                            soundFX.playBlip(520);
                            setActiveExpTab(exp.id);
                          }}
                          className={`pixel-btn p-2 text-left transition-all ${
                            isSelected
                              ? 'bg-[#1a1a40] text-white shadow-[2px_2px_0_#ffffff]'
                              : 'bg-white hover:bg-[#fff07c] text-[#1a1a40]'
                          }`}
                        >
                          <span className="font-pixel text-[10px] block truncate">
                            {exp.id === 'isro' ? '🚀 ISRO' : exp.id === 'hero-fincorp' ? '💼 HERO FINCORP' : '🏛️ MIN. OF EDUCATION'}
                          </span>
                          <span className="text-[10px] font-mono-clean opacity-80 block truncate">
                            {exp.role}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Experience Card */}
                  <div className="bg-[#faf5ff] border-2 border-[#1a1a40] p-4 relative">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-300 pb-2 mb-3">
                      <div>
                        <h4 className="font-bold text-sm text-[#1a1a40]">
                          {currentExp.role}
                        </h4>
                        <p className="text-xs text-purple-900 font-medium">
                          {currentExp.company} · <span className="text-gray-600 font-normal">{currentExp.organizationType}</span>
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="bg-[#88ecc0] px-2 py-0.5 border border-[#1a1a40] text-[10px] font-pixel text-[#1a1a40]">
                          {currentExp.period}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs font-mono-clean text-gray-700 italic mb-3">
                      "{currentExp.summary}"
                    </p>

                    <div className="space-y-2 mb-4">
                      {currentExp.bulletPoints.map((bullet, idx) => (
                        <div key={idx} className="flex items-start space-x-2 text-xs font-mono-clean text-gray-800">
                          <span className="text-purple-700 font-bold mt-0.5">▶</span>
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-dashed border-gray-300 flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] font-pixel text-gray-600 mr-1">TECH USED:</span>
                      {currentExp.skillsUsed.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="bg-white border border-[#1a1a40] px-2 py-0.5 text-[10px] font-mono-clean font-semibold text-[#1a1a40]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Window Footer Action */}
            <div className="bg-[#e6ccff]/40 border-2 border-[#1a1a40] p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-purple-800" />
                <span className="font-pixel text-[11px] text-[#1a1a40]">
                  WANT THE COMPLETE BREAKDOWN?
                </span>
              </div>
              <button
                onClick={() => {
                  soundFX.playCoin();
                  onOpenResume();
                }}
                className="pixel-btn pixel-btn-primary px-4 py-2 text-xs font-pixel flex items-center space-x-2 text-[#1a1a40]"
              >
                <span>OPEN RESUME VIEW</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
