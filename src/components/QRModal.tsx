import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { X, Copy, Check, Sparkles, Download, ExternalLink, Lock, Unlock, KeyRound, ShieldCheck } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundFX } from '../utils/audio';

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type QRMode = 'portfolio' | 'linkedin' | 'github' | 'vcard';

const DEFAULT_VERCEL_URL = PERSONAL_INFO.vercelUrl || 'https://bhoomikaharidas.vercel.app';
// Owner passkeys accepted (case-insensitive)
const ACCEPTED_PASSKEYS = ['bhoomika', 'bhoomika04', '04', 'admin', 'bhoomikaharidas'];

export const QRModal: React.FC<QRModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<QRMode>('portfolio');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [accentColor, setAccentColor] = useState<string>('#ff79c6');
  const [mascotMood, setMascotMood] = useState<string>('(｡♥‿♥｡)');

  // Target Vercel domain state (strictly Vercel only)
  const [vercelUrl, setVercelUrl] = useState<string>(() => {
    try {
      return localStorage.getItem('bhoomika_vercel_url') || DEFAULT_VERCEL_URL;
    } catch {
      return DEFAULT_VERCEL_URL;
    }
  });

  // Owner authentication state: Only Bhoomika can edit
  const [isOwner, setIsOwner] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('bhoomika_owner_authenticated') === 'true';
    } catch {
      return false;
    }
  });

  const [showOwnerAuthPrompt, setShowOwnerAuthPrompt] = useState<boolean>(false);
  const [passkeyInput, setPasskeyInput] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');
  const [isEditingUrl, setIsEditingUrl] = useState<boolean>(false);
  const [tempUrlInput, setTempUrlInput] = useState<string>(vercelUrl);
  const [noticeMessage, setNoticeMessage] = useState<string>('');

  const vCardData = `BEGIN:VCARD
VERSION:3.0
N:Haridas;Bhoomika;;;
FN:Bhoomika Haridas
TITLE:Data Analytics · Technology & Automation
EMAIL;TYPE=INTERNET:${PERSONAL_INFO.email}
URL:${vercelUrl}
URL:${PERSONAL_INFO.linkedin}
URL:${PERSONAL_INFO.github}
NOTE:BHOOMIKA OS v1.0 Portfolio - ${vercelUrl}
END:VCARD`;

  const targets: Record<QRMode, { label: string; url: string; displayTitle: string; mood: string; color: string }> = {
    portfolio: {
      label: 'PORTFOLIO',
      url: vercelUrl,
      displayTitle: '✨ Portfolio Website ✨',
      mood: '(｡♥‿♥｡)',
      color: '#ff79c6',
    },
    linkedin: {
      label: 'LINKEDIN',
      url: PERSONAL_INFO.linkedin,
      displayTitle: '💼 LinkedIn Profile 💼',
      mood: '(◕‿◕)♡',
      color: '#4fa3e3',
    },
    github: {
      label: 'GITHUB',
      url: PERSONAL_INFO.github,
      displayTitle: '👾 GitHub Repositories 👾',
      mood: '(★ω★)',
      color: '#9d72ff',
    },
    vcard: {
      label: 'VCARD CONTACT',
      url: vCardData,
      displayTitle: '📱 Save Contact Directly 📱',
      mood: 'ʕ•ᴥ•ʔ',
      color: '#05c46b',
    },
  };

  useEffect(() => {
    if (!isOpen) return;

    const current = targets[activeTab];
    setMascotMood(current.mood);
    setAccentColor(current.color);

    // Generate high-density QR code strictly for the chosen target
    QRCode.toDataURL(current.url, {
      width: 260,
      margin: 2,
      color: {
        dark: '#1a1a40', // deep retro ink for 100% phone camera recognition
        light: '#ffffff', // clean white background
      },
      errorCorrectionLevel: 'H',
    })
      .then((url) => {
        setQrDataUrl(url);
      })
      .catch((err) => {
        console.error('Failed to generate QR code', err);
      });
  }, [isOpen, activeTab, vercelUrl]);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    soundFX.playCoin();
    const linkToCopy = activeTab === 'vcard' ? `${PERSONAL_INFO.name} - ${PERSONAL_INFO.email} - ${PERSONAL_INFO.phone}` : targets[activeTab].url;
    navigator.clipboard.writeText(linkToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQR = () => {
    soundFX.playPowerUp();
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    const filename = activeTab === 'portfolio' ? 'Bhoomika_Portfolio_Website_QR.png' : `Bhoomika_${activeTab}_QR.png`;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Owner Authentication verification
  const handleVerifyOwner = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanKey = passkeyInput.trim().toLowerCase();
    if (ACCEPTED_PASSKEYS.includes(cleanKey)) {
      soundFX.playPowerUp();
      setIsOwner(true);
      setShowOwnerAuthPrompt(false);
      setPasskeyInput('');
      setAuthError('');
      setIsEditingUrl(true);
      try {
        sessionStorage.setItem('bhoomika_owner_authenticated', 'true');
      } catch (err) {
        console.error(err);
      }
      setNoticeMessage('👑 OWNER ACCESS UNLOCKED');
      setTimeout(() => setNoticeMessage(''), 3000);
    } else {
      soundFX.playBlip(200);
      setAuthError('Incorrect passkey. Only Bhoomika can edit this URL.');
    }
  };

  const handleLockOwner = () => {
    soundFX.playBlip(300);
    setIsOwner(false);
    setIsEditingUrl(false);
    setShowOwnerAuthPrompt(false);
    try {
      sessionStorage.removeItem('bhoomika_owner_authenticated');
    } catch (err) {
      console.error(err);
    }
    setNoticeMessage('🔒 OWNER MODE LOCKED');
    setTimeout(() => setNoticeMessage(''), 2500);
  };

  const handleSaveCustomUrl = () => {
    soundFX.playPowerUp();
    let cleaned = tempUrlInput.trim();
    if (!cleaned) cleaned = DEFAULT_VERCEL_URL;
    if (!cleaned.startsWith('http://') && !cleaned.startsWith('https://')) {
      cleaned = `https://${cleaned}`;
    }
    setVercelUrl(cleaned);
    try {
      localStorage.setItem('bhoomika_vercel_url', cleaned);
    } catch (e) {
      console.error(e);
    }
    setIsEditingUrl(false);
    setNoticeMessage('PORTFOLIO DOMAIN UPDATED & REGENERATED!');
    setTimeout(() => setNoticeMessage(''), 3000);
  };

  const handleResetUrl = () => {
    soundFX.playBlip(400);
    setTempUrlInput(DEFAULT_VERCEL_URL);
    setVercelUrl(DEFAULT_VERCEL_URL);
    try {
      localStorage.removeItem('bhoomika_vercel_url');
    } catch (e) {
      console.error(e);
    }
    setIsEditingUrl(false);
    setNoticeMessage('RESET TO DEFAULT URL');
    setTimeout(() => setNoticeMessage(''), 3000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#1a1a40]/75 backdrop-blur-xs animate-fadeIn cursor-pointer"
      onClick={() => {
        soundFX.playBlip(300);
        onClose();
      }}
    >
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-md bg-white border-4 border-[#1a1a40] shadow-[8px_8px_0_#1a1a40] overflow-hidden flex flex-col animate-scaleUp cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Window Header */}
        <div
          style={{ backgroundColor: accentColor }}
          className="px-4 py-2.5 border-b-4 border-[#1a1a40] flex items-center justify-between transition-colors duration-300"
        >
          <div className="flex items-center space-x-2">
            <span className="text-base animate-bounce">✨</span>
            <span className="font-pixel text-[11px] sm:text-xs text-[#1a1a40] font-bold tracking-wider">
              QR CODE GENERATOR · PORTFOLIO ACCESS
            </span>
          </div>
          <button
            onClick={() => {
              soundFX.playBlip(300);
              onClose();
            }}
            className="w-6 h-6 bg-white border-2 border-[#1a1a40] flex items-center justify-center hover:bg-[#ff5555] hover:text-white transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-3.5 h-3.5 stroke-[3]" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="bg-[#f7f0fa] p-2 border-b-2 border-[#1a1a40] grid grid-cols-4 gap-1 sm:gap-1.5">
          {(['portfolio', 'linkedin', 'github', 'vcard'] as QRMode[]).map((mode) => {
            const isSel = activeTab === mode;
            return (
              <button
                key={mode}
                onClick={() => {
                  soundFX.playBlip(500);
                  setActiveTab(mode);
                }}
                className={`py-1 px-0.5 text-[9px] sm:text-[10px] font-pixel border-2 border-[#1a1a40] transition-all text-center uppercase truncate cursor-pointer ${
                  isSel
                    ? 'bg-[#1a1a40] text-[#fff07c] shadow-[2px_2px_0_#ff79c6] -translate-y-0.5'
                    : 'bg-white text-[#1a1a40] hover:bg-[#fff07c]'
                }`}
              >
                {targets[mode].label}
              </button>
            );
          })}
        </div>

        {/* Owner Passkey Prompt (only shown if Bhoomika clicks the discrete owner lock) */}
        {showOwnerAuthPrompt && (
          <form onSubmit={handleVerifyOwner} className="bg-[#fff07c] border-b-2 border-[#1a1a40] p-3 text-left animate-in slide-in-from-top-2">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-pixel text-[10px] text-[#1a1a40] font-bold flex items-center gap-1">
                <KeyRound className="w-3 h-3 text-[#1a1a40]" />
                OWNER VERIFICATION (BHOOMIKA ONLY):
              </span>
              <button
                type="button"
                onClick={() => {
                  setShowOwnerAuthPrompt(false);
                  setAuthError('');
                }}
                className="text-[9px] font-pixel text-gray-700 hover:text-black cursor-pointer"
              >
                ✕ CANCEL
              </button>
            </div>
            <p className="text-[10px] font-mono-clean text-gray-800 mb-1.5">
              Enter your owner passkey to edit the destination portfolio website URL:
            </p>
            <div className="flex gap-1.5">
              <input
                type="password"
                value={passkeyInput}
                onChange={(e) => setPasskeyInput(e.target.value)}
                placeholder="Enter passkey (e.g., bhoomika)"
                autoFocus
                className="flex-1 bg-white border-2 border-[#1a1a40] px-2 py-1 text-xs font-mono-clean text-[#1a1a40] focus:outline-hidden"
              />
              <button
                type="submit"
                className="pixel-btn bg-[#1a1a40] hover:bg-[#2e2e6a] text-[#fff07c] px-3 py-1 text-[10px] font-pixel cursor-pointer"
              >
                UNLOCK
              </button>
            </div>
            {authError && (
              <p className="text-[9px] font-pixel text-[#d63031] mt-1">
                {authError}
              </p>
            )}
          </form>
        )}

        {/* Owner URL Editor (Visible ONLY to Bhoomika when authenticated) */}
        {isOwner && isEditingUrl && activeTab === 'portfolio' && (
          <div className="bg-[#fff07c]/35 border-b-2 border-[#1a1a40] p-3 text-left animate-in slide-in-from-top-2">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-pixel text-[10px] text-[#1a1a40] font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                OWNER PANEL · EDIT PORTFOLIO DOMAIN:
              </span>
              <button
                onClick={() => setIsEditingUrl(false)}
                className="text-[9px] font-pixel text-gray-700 hover:text-black cursor-pointer"
              >
                ✕ HIDE
              </button>
            </div>
            <div className="flex gap-1.5 mb-1.5">
              <input
                type="text"
                value={tempUrlInput}
                onChange={(e) => setTempUrlInput(e.target.value)}
                placeholder="https://bhoomikaharidas.vercel.app"
                className="flex-1 bg-white border-2 border-[#1a1a40] px-2 py-1 text-xs font-mono-clean text-[#1a1a40] focus:outline-hidden"
              />
              <button
                onClick={handleSaveCustomUrl}
                className="pixel-btn bg-[#88ecc0] hover:bg-[#6edbb0] px-3 py-1 text-[10px] font-pixel text-[#1a1a40] cursor-pointer"
              >
                SAVE
              </button>
            </div>
            <div className="flex items-center justify-between text-[9px] font-mono-clean text-gray-700">
              <span>QR code &amp; links update immediately</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleResetUrl}
                  className="underline hover:text-[#1a1a40] cursor-pointer font-pixel text-[9px]"
                >
                  Reset Default
                </button>
                <button
                  onClick={handleLockOwner}
                  className="text-[#d63031] font-pixel text-[9px] hover:underline cursor-pointer"
                >
                  Lock Panel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Notice Message Toast */}
        {noticeMessage && (
          <div className="bg-[#aaffaa] text-[#1a1a40] px-3 py-1 border-b border-[#1a1a40] text-[10px] font-pixel text-center">
            {noticeMessage}
          </div>
        )}

        {/* Main Body */}
        <div className="p-4 sm:p-5 flex flex-col items-center text-center bg-[#fffdf9]">
          {/* Status Speech Bubble */}
          <div className="mb-3 px-3 py-1.5 bg-[#fff07c] border-2 border-[#1a1a40] shadow-[3px_3px_0_#1a1a40] flex items-center gap-2">
            <span className="font-pixel text-xs">{mascotMood}</span>
            <span className="font-pixel text-[10px] text-[#1a1a40] font-bold">
              {targets[activeTab].displayTitle}
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#ff79c6]" />
          </div>

          <p className="text-[11px] font-mono-clean text-gray-600 mb-3 max-w-xs">
            {activeTab === 'portfolio'
              ? 'Scan with any phone camera to open portfolio website!'
              : `Scan with any phone camera to instantly open ${targets[activeTab].label.toLowerCase()}!`}
          </p>

          {/* QR Box with Retro Framing & Corner Accents */}
          <div className="relative p-3 bg-white border-4 border-[#1a1a40] shadow-[6px_6px_0_#ff79c6] rounded-xs group">
            {/* Corner Accents */}
            <div className="absolute -top-2.5 -left-2.5 text-xs">🌸</div>
            <div className="absolute -top-2.5 -right-2.5 text-xs">✨</div>
            <div className="absolute -bottom-2.5 -left-2.5 text-xs">🎀</div>
            <div className="absolute -bottom-2.5 -right-2.5 text-xs">💖</div>

            {/* QR Image */}
            {qrDataUrl ? (
              <div className="relative flex items-center justify-center">
                <img
                  src={qrDataUrl}
                  alt={`QR code for ${activeTab}`}
                  className="w-48 h-48 sm:w-52 sm:h-52 object-contain image-rendering-pixelated"
                />
                {/* Center Retro Badge */}
                <div className="absolute w-10 h-10 bg-[#fff07c] border-2 border-[#1a1a40] rounded-full flex items-center justify-center shadow-[1px_1px_0_#1a1a40] pointer-events-none">
                  {activeTab === 'portfolio' ? (
                    <span className="text-sm font-bold">▲</span>
                  ) : (
                    <span className="text-sm">👾</span>
                  )}
                </div>
              </div>
            ) : (
              <div className="w-48 h-48 flex items-center justify-center font-pixel text-xs text-gray-500">
                GENERATING...
              </div>
            )}
          </div>

          {/* URL / Info Box (Strictly clean and read-only for public visitors) */}
          <div className="w-full mt-3.5 p-2 bg-[#f0e6ff] border-2 border-[#1a1a40] text-left flex items-center justify-between gap-2 overflow-hidden shadow-[2px_2px_0_#1a1a40]">
            <div className="truncate text-[10px] font-mono-clean text-[#1a1a40] flex-1">
              <span className="font-bold text-[#9d72ff] mr-1">
                [URL]:
              </span>
              {activeTab === 'vcard' ? 'Bhoomika Haridas Contact Card (vCard)' : targets[activeTab].url}
            </div>

            <div className="flex items-center gap-1 shrink-0">
              {/* If Bhoomika is authenticated, show the edit toggle directly */}
              {isOwner && activeTab === 'portfolio' && (
                <button
                  onClick={() => {
                    soundFX.playBlip(400);
                    setTempUrlInput(vercelUrl);
                    setIsEditingUrl(!isEditingUrl);
                  }}
                  className="px-1.5 py-0.5 bg-[#88ecc0] hover:bg-[#6edbb0] border border-[#1a1a40] text-[#1a1a40] font-pixel text-[9px] cursor-pointer"
                  title="Owner: Edit URL"
                >
                  EDIT
                </button>
              )}

              {activeTab !== 'vcard' && (
                <a
                  href={targets[activeTab].url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1 bg-white hover:bg-[#fff07c] border border-[#1a1a40] text-[#1a1a40]"
                  title="Open Link in New Tab"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2.5 w-full mt-3.5">
            <button
              onClick={handleCopyLink}
              className="pixel-btn bg-white hover:bg-[#fff07c] py-2 text-[10px] font-pixel flex items-center justify-center gap-1.5 text-[#1a1a40] cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">COPIED!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>COPY LINK</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadQR}
              className="pixel-btn pixel-btn-pink py-2 text-[10px] font-pixel flex items-center justify-center gap-1.5 text-white cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>SAVE QR PNG</span>
            </button>
          </div>
        </div>

        {/* Footer info: Includes discrete Owner Lock so only Bhoomika can unlock and edit */}
        <div className="bg-[#1a1a40] text-white px-3 py-1.5 flex items-center justify-between text-[9px] font-pixel">
          <span className="text-[#88ecc0]">
            ● LIVE PORTFOLIO DESTINATION
          </span>
          
          <div className="flex items-center gap-1.5">
            <span className="text-[#fff07c]">BHOOMIKA HARIDAS</span>
            
            {/* Owner Lock/Unlock toggle */}
            {isOwner ? (
              <button
                onClick={handleLockOwner}
                className="flex items-center gap-0.5 text-[#aaffaa] hover:text-[#fff07c] cursor-pointer transition-colors"
                title="Owner Mode Active (Click to Lock)"
              >
                <Unlock className="w-2.5 h-2.5" />
                <span className="text-[8px]">OWNER</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  soundFX.playBlip(350);
                  setShowOwnerAuthPrompt(!showOwnerAuthPrompt);
                  setAuthError('');
                }}
                className="text-gray-400 hover:text-[#fff07c] cursor-pointer transition-colors"
                title="Owner Access"
              >
                <Lock className="w-2.5 h-2.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
