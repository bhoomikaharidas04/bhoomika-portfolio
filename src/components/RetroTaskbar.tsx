import React, { useState, useEffect } from 'react';
import { Play, Sparkles, FileText, Volume2, VolumeX, Terminal, Folder, Cpu, Mail, QrCode, Moon, Sun } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundFX } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';

interface RetroTaskbarProps {
  onOpenResume: () => void;
  onOpenQR: () => void;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const RetroTaskbar: React.FC<RetroTaskbarProps> = ({
  onOpenResume,
  onOpenQR,
  onNavigate,
  activeSection,
}) => {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const [time, setTime] = useState<{
    hours: string;
    minutes: string;
    seconds: string;
    period: string;
    fullDate: string;
  }>({
    hours: '12',
    minutes: '00',
    seconds: '00',
    period: 'AM',
    fullDate: '',
  });

  const [use24Hour, setUse24Hour] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let h = now.getHours();
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      const period = h >= 12 ? 'PM' : 'AM';

      if (!use24Hour) {
        h = h % 12 || 12;
      }
      const formattedHours = String(h).padStart(2, '0');

      const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      };

      setTime({
        hours: formattedHours,
        minutes: m,
        seconds: s,
        period,
        fullDate: now.toLocaleDateString(undefined, dateOptions),
      });
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [use24Hour]);

  const menuItems = [
    { id: 'hero', label: '🏠 Desktop Start', desc: 'Return to start screen' },
    { id: 'about', label: '👩🏻‍💻 About Bhoomika', desc: 'Education & ISRO / Hero FinCorp' },
    { id: 'skills', label: '⚡ Skill Matrix', desc: 'Python, SQL, Power BI, Databricks' },
    { id: 'projects', label: '📁 Projects Dir', desc: 'Credit Risk, ETL Pipeline, COINS' },
    { id: 'contact', label: '✉️ Dispatch Mail', desc: 'bhoomikaharidas@outlook.com' },
  ];

  return (
    <>
      {/* Start Menu Popup */}
      {isStartMenuOpen && (
        <>
          {/* Backdrop to dismiss when clicking empty space */}
          <div 
            className="fixed inset-0 z-40 bg-transparent"
            onClick={() => setIsStartMenuOpen(false)}
          />
          <div className="fixed bottom-12 left-2 z-50 w-72 bg-white border-4 border-[#1a1a40] shadow-[6px_6px_0_#1a1a40] animate-in fade-in slide-in-from-bottom-2 duration-150">
          {/* Start Menu Header Banner */}
          <div className="bg-[#1a1a40] text-white p-3 flex items-center justify-between border-b-3 border-[#1a1a40]">
            <div>
              <span className="font-pixel text-xs text-[#fff07c] block">
                BHOOMIKA HARIDAS
              </span>
              <span className="text-[10px] font-pixel text-[#aaffaa] tracking-wider block">
                BHOOMIKA OS v1.0
              </span>
            </div>
            <span className="text-xl">👩🏻‍💻</span>
          </div>

          {/* Start Menu Items */}
          <div className="p-2 space-y-1 bg-[#fafafa]">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  soundFX.playBlip(500);
                  setIsStartMenuOpen(false);
                  onNavigate(item.id);
                }}
                className="w-full text-left p-2 hover:bg-[#fff07c] border border-transparent hover:border-[#1a1a40] transition-colors flex flex-col"
              >
                <span className="font-pixel text-[11px] text-[#1a1a40]">
                  {item.label}
                </span>
                <span className="text-[10px] font-mono-clean text-gray-600">
                  {item.desc}
                </span>
              </button>
            ))}

            <div className="pt-1.5 border-t border-dashed border-gray-300 space-y-0.5">
              <button
                onClick={() => {
                  soundFX.playPowerUp();
                  setIsStartMenuOpen(false);
                  onOpenQR();
                }}
                className="w-full text-left p-2 hover:bg-[#fff07c] border border-transparent hover:border-[#1a1a40] transition-colors flex items-center space-x-2 text-[#1a1a40] cursor-pointer"
              >
                <QrCode className="w-4 h-4 text-[#9d72ff] shrink-0" />
                <div>
                  <span className="font-pixel text-[11px] block text-[#1a1a40]">
                    QR CODE / SHARE
                  </span>
                  <span className="text-[9px] font-mono-clean block text-gray-600">
                    Instant mobile scan & vCard
                  </span>
                </div>
              </button>

              <button
                onClick={() => {
                  soundFX.playCoin();
                  setIsStartMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full text-left p-2 hover:bg-[#fff07c] border border-transparent hover:border-[#1a1a40] transition-colors flex items-center space-x-2 text-[#1a1a40] cursor-pointer"
              >
                <FileText className="w-4 h-4 text-[#1a1a40] shrink-0" />
                <div>
                  <span className="font-pixel text-[11px] block text-[#1a1a40]">
                    OPEN RESUME
                  </span>
                  <span className="text-[9px] font-mono-clean block text-gray-600">
                    Print and download resume
                  </span>
                </div>
              </button>

              <button
                onClick={() => {
                  soundFX.playPowerUp();
                  setIsStartMenuOpen(false);
                  toggleTheme();
                }}
                className="w-full text-left p-2 hover:bg-[#fff07c] border border-transparent hover:border-[#1a1a40] transition-colors flex items-center space-x-2 text-[#1a1a40] cursor-pointer"
              >
                {isDark ? (
                  <Sun className="w-4 h-4 text-[#fff07c] shrink-0" />
                ) : (
                  <Moon className="w-4 h-4 text-[#1a1a40] shrink-0" />
                )}
                <div>
                  <span className="font-pixel text-[11px] block text-[#1a1a40]">
                    {isDark ? 'SWITCH TO PASTEL THEME' : 'SWITCH TO 8-BIT YELLOW-BROWN'}
                  </span>
                  <span className="text-[9px] font-mono-clean block text-gray-600">
                    {isDark ? 'Soft pastel retro OS colors' : 'Yellow-on-brown retro style'}
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </>
    )}

      {/* Retro OS Bottom Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 h-12 bg-[#c0c0c0] border-t-4 border-white flex items-center px-2 sm:px-4 justify-between shadow-[0_-2px_4px_rgba(0,0,0,0.1)]">
        {/* Left: Start Button & Task Items */}
        <div className="flex gap-2 items-center">
          <button
            onClick={() => {
              soundFX.playStart();
              setIsStartMenuOpen(!isStartMenuOpen);
            }}
            className={`flex items-center gap-2 px-3 py-1 font-bold text-xs sm:text-sm font-pixel transition-all cursor-pointer ${
              isStartMenuOpen
                ? 'bg-[#b0b0b0] border-t-2 border-l-2 border-black border-b-2 border-r-2 border-white shadow-[inset_1px_1px_0_0_#000]'
                : 'bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black shadow-[inset_1px_1px_0_0_#fff]'
            }`}
          >
            <div className="w-4 h-4 bg-[#ff66aa] border border-black flex items-center justify-center">
              <span className="text-[8px] text-white font-bold">★</span>
            </div>
            <span>START</span>
          </button>

          <div className="h-7 w-[2px] bg-gray-400 mx-1 hidden sm:block"></div>

          {/* Running Task Indicators (Desktop) */}
          <div className="hidden md:flex items-center gap-1.5">
            <button
              onClick={() => onNavigate('hero')}
              className={`px-3 py-1 text-xs font-bold font-mono-clean cursor-pointer ${
                activeSection === 'hero'
                  ? 'bg-white border-t-2 border-l-2 border-black border-b-2 border-r-2 border-white text-[#1a1a40]'
                  : 'bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black text-gray-800'
              }`}
            >
              Portfolio.exe
            </button>

            <button
              onClick={() => onNavigate('about')}
              className={`px-3 py-1 text-xs font-bold font-mono-clean cursor-pointer ${
                activeSection === 'about'
                  ? 'bg-white border-t-2 border-l-2 border-black border-b-2 border-r-2 border-white text-[#1a1a40]'
                  : 'bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black text-gray-800'
              }`}
            >
              About_Me.exe
            </button>

            <button
              onClick={() => onNavigate('skills')}
              className={`px-3 py-1 text-xs font-bold font-mono-clean cursor-pointer ${
                activeSection === 'skills'
                  ? 'bg-white border-t-2 border-l-2 border-black border-b-2 border-r-2 border-white text-[#1a1a40]'
                  : 'bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black text-gray-800'
              }`}
            >
              System_Stats
            </button>

            <button
              onClick={() => onNavigate('projects')}
              className={`px-3 py-1 text-xs font-bold font-mono-clean cursor-pointer ${
                activeSection === 'projects'
                  ? 'bg-white border-t-2 border-l-2 border-black border-b-2 border-r-2 border-white text-[#1a1a40]'
                  : 'bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black text-gray-800'
              }`}
            >
              Projects.dir
            </button>
          </div>
        </div>

        {/* Right: Quick Action & System Tray Clock */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Quick QR Trigger */}
          <button
            onClick={() => {
              soundFX.playPowerUp();
              onOpenQR();
            }}
            className="flex items-center gap-1 px-2 py-1 bg-white hover:bg-[#fff07c] text-[#1a1a40] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black text-xs font-pixel cursor-pointer"
            title="Open QR Code & Share"
          >
            <QrCode className="w-3.5 h-3.5 text-[#ff79c6]" />
            <span className="hidden md:inline">QR</span>
          </button>

          <button
            onClick={() => {
              soundFX.playCoin();
              onOpenResume();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-[#ff66aa] text-white border-t-2 border-l-2 border-[#ff99cc] border-b-2 border-r-2 border-[#990044] text-xs font-pixel font-bold cursor-pointer hover:bg-[#ff4d99]"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">RESUME</span>
          </button>

          {/* Digital Pixel Clock */}
          <div
            title={time.fullDate}
            className="select-none px-2.5 sm:px-3 py-1 bg-[#1a1a40] border-t-2 border-l-2 border-black border-b-2 border-r-2 border-[#4a4a70] text-[#aaffaa] flex items-center gap-1.5 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.5)]"
          >
            {/* Blinking Live Pixel LED */}
            <span className="w-1.5 h-1.5 bg-[#aaffaa] rounded-xs shadow-[0_0_4px_#aaffaa] animate-pulse"></span>

            {/* 8-bit Digital Time Display with AM / PM */}
            <div className="flex items-center font-pixel text-[10px] sm:text-xs tracking-wider">
              <span>{time.hours}</span>
              <span className="animate-[pixel-blink_1s_steps(1)_infinite] text-[#aaffaa] mx-0.5">:</span>
              <span>{time.minutes}</span>
              <span className="hidden md:inline-block text-[9px] text-[#88ecc0]/80 ml-1 font-mono-clean">
                :{time.seconds}
              </span>
              <span className="text-[9px] sm:text-[10px] font-pixel text-[#fff07c] ml-1.5 font-bold">
                {time.period}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
