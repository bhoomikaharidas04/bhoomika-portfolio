import React from 'react';
import { Play, FileText, Database, Sparkles, Terminal, Code2, Cpu, BarChart3 } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS_DATA } from '../data/portfolioData';
import { soundFX } from '../utils/audio';

interface HeroSectionProps {
  onStartClick: () => void;
  onOpenResume: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartClick,
  onOpenResume,
}) => {
  return (
    <section id="hero" className="relative pt-4 sm:pt-8 pb-12 sm:pb-20 px-3 sm:px-6 max-w-7xl mx-auto overflow-hidden">
      {/* Desktop Workspace Container */}
      <div className="flex flex-col lg:flex-row gap-6 relative z-10">
        
        {/* Desktop Icons (Left Dock) */}
        <div className="hidden lg:flex flex-col gap-6 w-24 shrink-0 pt-2">
          {/* Icon: CREDIT.exe */}
          <div 
            onClick={() => {
              soundFX.playOpenWindow();
              const el = document.getElementById('projects');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex flex-col items-center group cursor-pointer"
            title="Open Credit Risk Dashboard Project"
          >
            <div className="w-14 h-12 bg-white border-4 border-[#1a1a40] relative mb-1.5 shadow-[4px_4px_0_0_#1a1a40] group-hover:bg-[#ffffaa] transition-colors flex items-center justify-center">
              <div className="absolute -top-2 left-0 w-6 h-2 bg-white border-t-4 border-l-4 border-r-4 border-[#1a1a40] group-hover:bg-[#ffffaa]"></div>
              <BarChart3 className="w-5 h-5 text-[#1a1a40]" />
            </div>
            <span className="text-[10px] bg-[#1a1a40] text-white px-1.5 py-0.5 font-bold font-pixel tracking-tighter">
              CREDIT.exe
            </span>
          </div>

          {/* Icon: ETL_DATA */}
          <div 
            onClick={() => {
              soundFX.playOpenWindow();
              const el = document.getElementById('projects');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex flex-col items-center group cursor-pointer"
            title="Open ETL Pipeline Project"
          >
            <div className="w-14 h-12 bg-white border-4 border-[#1a1a40] relative mb-1.5 shadow-[4px_4px_0_0_#1a1a40] group-hover:bg-[#ffb3d9] transition-colors flex items-center justify-center">
              <div className="absolute -top-2 left-0 w-6 h-2 bg-white border-t-4 border-l-4 border-r-4 border-[#1a1a40] group-hover:bg-[#ffb3d9]"></div>
              <Database className="w-5 h-5 text-[#1a1a40]" />
            </div>
            <span className="text-[10px] bg-[#1a1a40] text-white px-1.5 py-0.5 font-bold font-pixel tracking-tighter">
              ETL_DATA
            </span>
          </div>

          {/* Icon: ISRO_LOG */}
          <div 
            onClick={() => {
              soundFX.playBlip(500);
              const el = document.getElementById('about');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex flex-col items-center group cursor-pointer"
            title="Open ISRO Experience Log"
          >
            <div className="w-14 h-12 bg-white border-4 border-[#1a1a40] relative mb-1.5 shadow-[4px_4px_0_0_#1a1a40] group-hover:bg-[#aaffaa] transition-colors flex items-center justify-center">
              <div className="absolute -top-2 left-0 w-6 h-2 bg-white border-t-4 border-l-4 border-r-4 border-[#1a1a40] group-hover:bg-[#aaffaa]"></div>
              <Terminal className="w-5 h-5 text-[#1a1a40]" />
            </div>
            <span className="text-[10px] bg-[#1a1a40] text-white px-1.5 py-0.5 font-bold font-pixel tracking-tighter">
              ISRO_LOG
            </span>
          </div>

          {/* Icon: RESUME */}
          <div 
            onClick={() => {
              soundFX.playCoin();
              onOpenResume();
            }}
            className="flex flex-col items-center group cursor-pointer"
            title="Open Resume Document"
          >
            <div className="w-14 h-12 bg-[#ff66aa] text-white border-4 border-[#1a1a40] relative mb-1.5 shadow-[4px_4px_0_0_#1a1a40] group-hover:bg-[#ff4d99] transition-colors flex items-center justify-center">
              <div className="absolute -top-2 left-0 w-6 h-2 bg-[#ff66aa] border-t-4 border-l-4 border-r-4 border-[#1a1a40]"></div>
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-[10px] bg-[#1a1a40] text-white px-1.5 py-0.5 font-bold font-pixel tracking-tighter">
              RESUME
            </span>
          </div>
        </div>

        {/* Main Window: Welcome & Hero */}
        <div className="flex-1 flex flex-col border-4 border-[#1a1a40] bg-white shadow-[8px_8px_0_0_#1a1a40]">
          {/* Title Bar */}
          <div className="bg-[#1a1a40] text-white px-3 py-2 flex justify-between items-center select-none">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#ffb3d9] border-2 border-white"></div>
              <span className="text-xs sm:text-sm font-bold font-pixel tracking-tight text-white">
                C:\USERS\BHOOMIKA\PORTFOLIO.EXE
              </span>
            </div>
            <div className="flex gap-1.5">
              <button 
                onClick={() => soundFX.playBlip(400)}
                className="w-5 h-5 bg-[#e0e0e0] border-2 border-[#1a1a40] flex items-center justify-center text-[#1a1a40] text-xs font-bold hover:bg-white"
                title="Minimize"
              >
                _
              </button>
              <button 
                onClick={() => soundFX.playBlip(700)}
                className="w-5 h-5 bg-[#e0e0e0] border-2 border-[#1a1a40] flex items-center justify-center text-[#1a1a40] text-xs font-bold hover:bg-white"
                title="Maximize"
              >
                □
              </button>
              <button 
                onClick={() => soundFX.playCloseWindow()}
                className="w-5 h-5 bg-[#ffb3d9] border-2 border-[#1a1a40] flex items-center justify-center text-[#1a1a40] text-xs font-bold hover:bg-[#ff66aa] hover:text-white"
                title="Close"
              >
                X
              </button>
            </div>
          </div>

          {/* Window Content */}
          <div className="p-5 sm:p-8 flex flex-col justify-between h-full">
            <div>
              {/* Header Title and Role Badge */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 bg-[#aaffaa] border border-[#1a1a40] inline-block animate-pulse"></span>
                  <span className="text-[10px] sm:text-xs font-pixel text-gray-500 uppercase">
                    STATUS: AVAILABLE · DATA &amp; TECHNOLOGY
                  </span>
                </div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black mb-3 tracking-tighter uppercase font-pixel text-[#1a1a40] drop-shadow-[2px_2px_0_#ffb3d9]">
                  {PERSONAL_INFO.name}
                </h1>
                <p className="text-xs sm:text-base font-bold bg-[#aaffaa] text-[#1a1a40] inline-block px-2.5 py-1 border-2 border-[#1a1a40] shadow-[2px_2px_0_0_#1a1a40]">
                  {PERSONAL_INFO.tagline}
                </p>
              </div>

              {/* Dotted Divider */}
              <div className="border-b-4 border-dotted border-[#1a1a40] mb-6"></div>

              {/* 2-Column Info Matrix */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Left: WELCOME_LOG */}
                <div className="space-y-4">
                  <h2 className="font-bold bg-[#ffb3d9] text-[#1a1a40] px-2 py-0.5 border-2 border-[#1a1a40] inline-block text-xs font-pixel shadow-[2px_2px_0_0_#1a1a40]">
                    WELCOME_LOG
                  </h2>
                  <p className="text-xs sm:text-sm leading-relaxed font-mono-clean text-[#1a1a40]">
                    {PERSONAL_INFO.shortBio}
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      onClick={() => {
                        soundFX.playCoin();
                        onOpenResume();
                      }}
                      className="bg-[#ff66aa] text-white px-4 py-2 border-4 border-[#1a1a40] shadow-[4px_4px_0_0_#1a1a40] active:translate-x-1 active:translate-y-1 active:shadow-none font-bold uppercase text-xs font-pixel flex items-center gap-2 cursor-pointer"
                      id="hero-download-resume-btn"
                    >
                      <FileText className="w-4 h-4" />
                      Download Resume
                    </button>
                    <button
                      onClick={() => {
                        soundFX.playStart();
                        onStartClick();
                      }}
                      className="bg-[#ffffaa] text-[#1a1a40] px-4 py-2 border-4 border-[#1a1a40] shadow-[4px_4px_0_0_#1a1a40] active:translate-x-1 active:translate-y-1 active:shadow-none font-bold uppercase text-xs font-pixel flex items-center gap-1.5 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-[#1a1a40]" />
                      Explore
                    </button>
                  </div>
                </div>

                {/* Right: PROJECT_PREVIEW */}
                <div className="space-y-4 bg-[#fafafa] border-2 border-[#1a1a40] p-4 shadow-[3px_3px_0_0_#1a1a40]">
                  <h2 className="font-bold bg-[#ffffaa] text-[#1a1a40] px-2 py-0.5 border-2 border-[#1a1a40] inline-block text-xs font-pixel shadow-[2px_2px_0_0_#1a1a40]">
                    PROJECT_PREVIEW
                  </h2>
                  <ul className="text-xs space-y-2.5 font-mono-clean text-[#1a1a40]">
                    <li className="flex gap-2 items-start">
                      <span className="text-[#ff66aa] font-bold font-pixel">[+]</span>
                      <span>
                        <strong>Credit Risk:</strong> Power BI dashboard for 32.5k borrowers.
                      </span>
                    </li>
                    <li className="flex gap-2 items-start">
                      <span className="text-[#ff66aa] font-bold font-pixel">[+]</span>
                      <span>
                        <strong>ETL Pipeline:</strong> Azure Databricks/PySpark automated solution.
                      </span>
                    </li>
                    <li className="flex gap-2 items-start">
                      <span className="text-[#ff66aa] font-bold font-pixel">[+]</span>
                      <span>
                        <strong>COINS System:</strong> ISRO digitized reporting platform.
                      </span>
                    </li>
                  </ul>
                  <div className="pt-2 border-t border-dashed border-gray-300 flex items-center justify-between text-[10px] font-pixel text-gray-600">
                    <span>STATUS: 3 REPOSITORIES</span>
                    <button
                      onClick={() => {
                        const el = document.getElementById('projects');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="underline font-bold text-[#1a1a40] hover:text-[#ff66aa]"
                    >
                      VIEW ALL &gt;&gt;
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Pixel Skyline (Decorative) */}
            <div className="mt-6 pt-4 border-t-2 border-dashed border-gray-200">
              <div className="h-12 flex items-end gap-1.5 opacity-30">
                <div className="w-8 h-8 bg-[#1a1a40]"></div>
                <div className="w-12 h-12 bg-[#1a1a40]"></div>
                <div className="w-6 h-4 bg-[#1a1a40]"></div>
                <div className="w-10 h-10 bg-[#1a1a40]"></div>
                <div className="w-8 h-6 bg-[#1a1a40]"></div>
                <div className="w-12 h-14 bg-[#1a1a40]"></div>
                <div className="w-16 h-8 bg-[#1a1a40]"></div>
                <div className="w-10 h-11 bg-[#1a1a40]"></div>
                <div className="w-14 h-6 bg-[#1a1a40]"></div>
                <div className="w-20 h-12 bg-[#1a1a40]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: System Stats & Terminal */}
        <div className="w-full lg:w-64 flex flex-col gap-6 shrink-0">
          {/* Stats Box */}
          <div className="border-4 border-[#1a1a40] bg-white shadow-[4px_4px_0_0_#1a1a40]">
            <div className="bg-[#1a1a40] text-white px-2.5 py-1 text-xs font-bold font-pixel flex items-center justify-between">
              <span>CORE_STACK.EXE</span>
              <span className="w-2 h-2 bg-[#aaffaa] rounded-full animate-ping"></span>
            </div>
            <div className="p-4 space-y-3.5">
              <div>
                <div className="flex justify-between text-[10px] font-bold font-pixel mb-1">
                  <span>PYTHON</span>
                  <span className="text-emerald-700 bg-[#aaffaa] px-1 border border-[#1a1a40] text-[9px]">ADVANCED</span>
                </div>
                <div className="h-3 w-full border-2 border-[#1a1a40] bg-gray-100 p-0.5 flex gap-1">
                  <div className="h-full flex-1 bg-[#aaffaa]"></div>
                  <div className="h-full flex-1 bg-[#aaffaa]"></div>
                  <div className="h-full flex-1 bg-[#aaffaa]"></div>
                  <div className="h-full flex-1 bg-[#aaffaa]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[10px] font-bold font-pixel mb-1">
                  <span>SQL</span>
                  <span className="text-[#1a1a40] bg-[#ffb3d9] px-1 border border-[#1a1a40] text-[9px]">ADVANCED</span>
                </div>
                <div className="h-3 w-full border-2 border-[#1a1a40] bg-gray-100 p-0.5 flex gap-1">
                  <div className="h-full flex-1 bg-[#ffb3d9]"></div>
                  <div className="h-full flex-1 bg-[#ffb3d9]"></div>
                  <div className="h-full flex-1 bg-[#ffb3d9]"></div>
                  <div className="h-full flex-1 bg-[#ffb3d9]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[10px] font-bold font-pixel mb-1">
                  <span>POWER BI &amp; DAX</span>
                  <span className="text-[#1a1a40] bg-[#ffffaa] px-1 border border-[#1a1a40] text-[9px]">ADVANCED</span>
                </div>
                <div className="h-3 w-full border-2 border-[#1a1a40] bg-gray-100 p-0.5 flex gap-1">
                  <div className="h-full flex-1 bg-[#ffffaa]"></div>
                  <div className="h-full flex-1 bg-[#ffffaa]"></div>
                  <div className="h-full flex-1 bg-[#ffffaa]"></div>
                  <div className="h-full flex-1 bg-[#ffffaa]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[10px] font-bold font-pixel mb-1">
                  <span>PYSPARK / DATABRICKS</span>
                  <span className="text-purple-900 bg-[#e6ccff] px-1 border border-[#1a1a40] text-[9px]">WORKING</span>
                </div>
                <div className="h-3 w-full border-2 border-[#1a1a40] bg-gray-100 p-0.5 flex gap-1">
                  <div className="h-full flex-1 bg-[#e6ccff]"></div>
                  <div className="h-full flex-1 bg-[#e6ccff]"></div>
                  <div className="h-full flex-1 bg-[#e6ccff]"></div>
                  <div className="h-full flex-1 bg-gray-200"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[10px] font-bold font-pixel mb-1">
                  <span>EXCEL &amp; RECONCILIATION</span>
                  <span className="text-blue-900 bg-[#99ccff] px-1 border border-[#1a1a40] text-[9px]">ADVANCED</span>
                </div>
                <div className="h-3 w-full border-2 border-[#1a1a40] bg-gray-100 p-0.5 flex gap-1">
                  <div className="h-full flex-1 bg-[#99ccff]"></div>
                  <div className="h-full flex-1 bg-[#99ccff]"></div>
                  <div className="h-full flex-1 bg-[#99ccff]"></div>
                  <div className="h-full flex-1 bg-[#99ccff]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Terminal Box */}
          <div className="border-4 border-[#1a1a40] bg-black text-[#aaffaa] p-3 text-[10px] h-52 font-mono shadow-[4px_4px_0_0_#1a1a40] flex flex-col justify-between overflow-hidden">
            <div>
              <div className="mb-2 opacity-50 uppercase tracking-widest text-[9px]">--- Terminal Terminal ---</div>
              <p className="mb-1 text-gray-400">&gt; bhoomika.email()</p>
              <p className="mb-2 text-white font-bold">{PERSONAL_INFO.email}</p>
              <p className="mb-1 text-gray-400">&gt; bhoomika.socials()</p>
              <p className="text-white mb-0.5">LinkedIn: /in/{PERSONAL_INFO.linkedinUser}</p>
              <p className="text-white mb-0.5">GitHub: /{PERSONAL_INFO.githubUser}</p>
            </div>
            <div className="mt-2 flex items-center justify-between text-[9px] text-gray-400 border-t border-gray-800 pt-1">
              <span>READY</span>
              <span className="animate-pulse text-[#aaffaa] font-bold">_</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

