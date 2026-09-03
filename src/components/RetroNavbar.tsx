import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, FileDown, Sparkles, QrCode, Moon, Sun } from 'lucide-react';
import { soundFX } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';

interface RetroNavbarProps {
  onOpenResume: () => void;
  onOpenQR: () => void;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const RetroNavbar: React.FC<RetroNavbarProps> = ({
  onOpenResume,
  onOpenQR,
  onNavigate,
  activeSection,
}) => {
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [time, setTime] = useState<string>('');
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleAudio = () => {
    const nextState = !audioEnabled;
    soundFX.enabled = nextState;
    setAudioEnabled(nextState);
    if (nextState) soundFX.playCoin();
  };

  const navItems = [
    { id: 'hero', label: 'START' },
    { id: 'about', label: 'ABOUT.EXE' },
    { id: 'skills', label: 'SKILLS.DAT' },
    { id: 'projects', label: 'PROJECTS.DIR' },
    { id: 'contact', label: 'CONTACT.MSG' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b-4 border-[#1a1a40] px-3 sm:px-6 py-2.5 shadow-[0_4px_0_#1a1a40]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Brand / Logo */}
        <div 
          onClick={() => {
            soundFX.playBlip(600);
            onNavigate('hero');
          }}
          className="flex items-center space-x-2 cursor-pointer group"
        >
          <div className="w-7 h-7 bg-[#fff07c] border-2 border-[#1a1a40] flex items-center justify-center shadow-[2px_2px_0_#1a1a40] group-hover:bg-[#ffb3d9] transition-colors">
            <Sparkles className="w-4 h-4 text-[#1a1a40]" />
          </div>
          <div>
            <span className="font-pixel text-[11px] sm:text-xs text-[#1a1a40] tracking-wider block">
              BHOOMIKA OS <span className="text-[#ff79c6] text-[9px]">{isDark ? 'CRT·8BIT' : 'v1.0'}</span>
            </span>
            <span className="font-mono-clean text-[9px] text-gray-600 hidden sm:block">
              {isDark ? 'YELLOW-ON-BROWN RETRO' : 'PASTEL PIXEL SYSTEM'}
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1.5">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  soundFX.playBlip(450);
                  onNavigate(item.id);
                }}
                className={`pixel-btn px-3 py-1 text-[11px] font-pixel transition-all ${
                  isActive
                    ? 'bg-[#1a1a40] text-[#fff07c] shadow-[2px_2px_0_#ffffff]'
                    : 'bg-white hover:bg-[#fff07c] text-[#1a1a40]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          {/* Theme Switcher Toggle (Pastel vs 8-Bit Yellow-on-Brown) */}
          <button
            onClick={() => {
              soundFX.playPowerUp();
              toggleTheme();
            }}
            className={`pixel-btn px-2 sm:px-2.5 py-1.5 text-[10px] sm:text-[11px] font-pixel flex items-center space-x-1.5 transition-colors ${
              isDark
                ? 'bg-[#ffd700] text-[#1f140e] hover:bg-[#fff07c]'
                : 'bg-[#fff07c] hover:bg-[#ffe642] text-[#1a1a40]'
            }`}
            title={
              isDark
                ? 'Switch to Default Pastel Theme'
                : 'Switch to 8-Bit Dark Mode (Yellow-on-Brown Retro Style)'
            }
          >
            {isDark ? (
              <>
                <Sun className="w-3.5 h-3.5 text-[#fff07c] shrink-0" />
                <span className="hidden sm:inline font-bold text-[#fff07c]">PASTEL</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-[#1a1a40] shrink-0" />
                <span className="hidden sm:inline font-bold">8-BIT BROWN</span>
              </>
            )}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleAudio}
            className="pixel-btn bg-white hover:bg-[#e6ccff] p-1.5 text-[#1a1a40]"
            title={audioEnabled ? 'Mute 8-Bit Audio' : 'Unmute 8-Bit Audio'}
          >
            {audioEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-700" />
            ) : (
              <VolumeX className="w-4 h-4 text-gray-500" />
            )}
          </button>

          {/* QR Code Button */}
          <button
            onClick={() => {
              soundFX.playPowerUp();
              onOpenQR();
            }}
            className="pixel-btn bg-white hover:bg-[#fff07c] px-2 sm:px-2.5 py-1.5 text-[10px] sm:text-[11px] font-pixel flex items-center space-x-1.5 text-[#1a1a40]"
            title="Generate QR Code for Instant Mobile Sharing"
          >
            <QrCode className="w-3.5 h-3.5 text-[#ff79c6]" />
            <span className="hidden sm:inline font-bold">QR / SHARE</span>
          </button>

          {/* Resume CTA */}
          <button
            onClick={() => {
              soundFX.playCoin();
              onOpenResume();
            }}
            className="pixel-btn pixel-btn-pink px-3 py-1.5 text-[11px] font-pixel flex items-center space-x-1.5 text-white"
            title="Open Resume Document"
          >
            <FileDown className="w-3.5 h-3.5 text-white" />
            <span className="font-bold">RESUME</span>
          </button>
        </div>
      </div>
    </header>
  );
};
