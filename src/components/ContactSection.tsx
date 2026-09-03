import React, { useState } from 'react';
import { Mail, Github, Linkedin, Send, Copy, Check, Terminal, ExternalLink, Sparkles, FileText, QrCode } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundFX } from '../utils/audio';

interface ContactSectionProps {
  onOpenResume: () => void;
  onOpenQR?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenResume, onOpenQR }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderMsg, setSenderMsg] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleCopyEmail = () => {
    soundFX.playCoin();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSendDraft = (e: React.FormEvent) => {
    e.preventDefault();
    soundFX.playCoin();
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=Collaboration%20Inquiry%20from%20${encodeURIComponent(senderName || 'Recruiter')}&body=${encodeURIComponent(
      `Hello Bhoomika,\n\n${senderMsg}\n\nFrom: ${senderName} (${senderEmail})`
    )}`;
    window.location.href = mailtoUrl;
    setIsSent(true);
    setTimeout(() => setIsSent(false), 4000);
  };

  return (
    <section id="contact" className="py-10 sm:py-16 px-4 max-w-6xl mx-auto mb-16">
      {/* Retro Email / Terminal Client Window */}
      <div className="bg-white border-4 border-[#1a1a40] shadow-[8px_8px_0_0_#1a1a40]">
        {/* Title Bar */}
        <div className="bg-[#1a1a40] text-white px-3 sm:px-4 py-2 flex items-center justify-between border-b-4 border-[#1a1a40] select-none">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-[#aaffaa] border-2 border-white flex items-center justify-center">
              <span className="text-[8px] text-[#1a1a40] font-bold">✉</span>
            </div>
            <h2 className="font-pixel text-xs sm:text-sm text-white tracking-wider">
              C:\USERS\BHOOMIKA\COMM_TERMINAL.EXE
            </h2>
          </div>
          <div className="flex items-center space-x-1.5">
            <div className="w-5 h-5 bg-[#e0e0e0] border-2 border-[#1a1a40] flex items-center justify-center text-[#1a1a40] text-xs font-bold">_</div>
            <div className="w-5 h-5 bg-[#e0e0e0] border-2 border-[#1a1a40] flex items-center justify-center text-[#1a1a40] text-xs font-bold">□</div>
            <div className="w-5 h-5 bg-[#ffb3d9] border-2 border-[#1a1a40] flex items-center justify-center text-[#1a1a40] text-xs font-bold">X</div>
          </div>
        </div>

        {/* Client Top Toolbar */}
        <div className="bg-[#f0e6ff] px-4 py-2 border-b-3 border-[#1a1a40] flex flex-wrap items-center justify-between gap-2 text-xs font-pixel text-[#1a1a40]">
          <div className="flex items-center space-x-2">
            <span className="text-gray-500">RECIPIENT:</span>
            <span className="bg-white px-2 py-0.5 border border-[#1a1a40]">
              {PERSONAL_INFO.email}
            </span>
          </div>
          <span className="text-[10px] text-emerald-800 bg-[#88ecc0] px-2 py-0.5 border border-[#1a1a40]">
            STATUS: ONLINE & RECEIVING
          </span>
        </div>

        {/* Client Body */}
        <div className="p-4 sm:p-8 bg-[#fafafa]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Direct Links & Terminal Info */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white border-3 border-[#1a1a40] p-4 shadow-[4px_4px_0_#1a1a40]">
                <h3 className="font-pixel text-xs text-[#1a1a40] mb-3 border-b-2 border-[#1a1a40] pb-2">
                  DIRECT CHANNELS & PROFILES
                </h3>

                {/* Email Box */}
                <div className="bg-[#fff07c]/20 border-2 border-[#1a1a40] p-3 mb-3 shadow-[2px_2px_0_#1a1a40]">
                  <div className="flex items-center space-x-2 mb-1">
                    <Mail className="w-4 h-4 text-purple-700" />
                    <span className="font-pixel text-[11px] text-[#1a1a40] font-bold">EMAIL INBOX</span>
                  </div>
                  <p className="font-mono-clean text-xs text-gray-800 break-all mb-2">
                    {PERSONAL_INFO.email}
                  </p>
                  <div className="flex gap-2">
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="pixel-btn pixel-btn-primary px-3 py-1 text-[10px] font-pixel text-[#1a1a40]"
                    >
                      OPEN MAIL APP
                    </a>
                    <button
                      onClick={handleCopyEmail}
                      className="pixel-btn bg-white hover:bg-slate-100 px-3 py-1 text-[10px] font-pixel text-[#1a1a40] flex items-center space-x-1"
                    >
                      {copiedEmail ? <Check className="w-3 h-3 text-emerald-700" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedEmail ? 'COPIED!' : 'COPY'}</span>
                    </button>
                  </div>
                </div>

                {/* GitHub Box */}
                <div className="bg-[#88ecc0]/20 border-2 border-[#1a1a40] p-3 mb-3 shadow-[2px_2px_0_#1a1a40]">
                  <div className="flex items-center space-x-2 mb-1">
                    <Github className="w-4 h-4 text-[#1a1a40]" />
                    <span className="font-pixel text-[11px] text-[#1a1a40] font-bold">GITHUB REPOSITORIES</span>
                  </div>
                  <p className="font-mono-clean text-xs text-gray-800 mb-2">
                    github.com/{PERSONAL_INFO.githubUser}
                  </p>
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1 pixel-btn bg-white hover:bg-[#88ecc0] px-3 py-1 text-[10px] font-pixel text-[#1a1a40]"
                  >
                    <span>VIEW REPOSITORIES</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* LinkedIn Box */}
                <div className="bg-[#ffb3d9]/20 border-2 border-[#1a1a40] p-3 shadow-[2px_2px_0_#1a1a40]">
                  <div className="flex items-center space-x-2 mb-1">
                    <Linkedin className="w-4 h-4 text-blue-700" />
                    <span className="font-pixel text-[11px] text-[#1a1a40] font-bold">LINKEDIN NETWORK</span>
                  </div>
                  <p className="font-mono-clean text-xs text-gray-800 mb-2">
                    linkedin.com/in/{PERSONAL_INFO.linkedinUser}
                  </p>
                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1 pixel-btn bg-white hover:bg-[#ffb3d9] px-3 py-1 text-[10px] font-pixel text-[#1a1a40]"
                  >
                    <span>CONNECT ON LINKEDIN</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Quick Action Mini-Cards: Resume & QR Code */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-[#e6ccff]/50 border-3 border-[#1a1a40] p-3.5 shadow-[4px_4px_0_#1a1a40] flex items-center justify-between">
                  <div>
                    <span className="font-pixel text-[10px] text-[#1a1a40] block font-bold">
                      OFFLINE RESUME
                    </span>
                    <span className="text-[9px] font-mono-clean text-gray-700">
                      Printable Document
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      soundFX.playCoin();
                      onOpenResume();
                    }}
                    className="pixel-btn pixel-btn-primary px-2.5 py-1 text-[9px] font-pixel flex items-center space-x-1"
                  >
                    <FileText className="w-3 h-3" />
                    <span>VIEW</span>
                  </button>
                </div>

                <div className="bg-[#ffb3d9]/40 border-3 border-[#1a1a40] p-3.5 shadow-[4px_4px_0_#1a1a40] flex items-center justify-between">
                  <div>
                    <span className="font-pixel text-[10px] text-[#1a1a40] block font-bold">
                      ✨ SHARE / QR
                    </span>
                    <span className="text-[9px] font-mono-clean text-gray-700">
                      Mobile scanner
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      soundFX.playPowerUp();
                      onOpenQR?.();
                    }}
                    className="pixel-btn pixel-btn-pink px-2.5 py-1 text-[9px] font-pixel flex items-center space-x-1 text-white"
                  >
                    <QrCode className="w-3 h-3 text-white" />
                    <span>SCAN</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Quick Message Dispatcher */}
            <div className="lg:col-span-7">
              <div className="bg-white border-3 border-[#1a1a40] p-5 shadow-[4px_4px_0_#1a1a40]">
                <div className="flex items-center space-x-2 border-b-2 border-[#1a1a40] pb-2 mb-4">
                  <Terminal className="w-4 h-4 text-purple-700" />
                  <h3 className="font-pixel text-xs text-[#1a1a40]">
                    SEND QUICK DISPATCH / MESSAGE
                  </h3>
                </div>

                {isSent ? (
                  <div className="bg-[#88ecc0]/30 border-2 border-[#1a1a40] p-6 text-center shadow-[3px_3px_0_#1a1a40]">
                    <div className="w-10 h-10 mx-auto bg-[#88ecc0] border-2 border-[#1a1a40] flex items-center justify-center mb-2">
                      <Check className="w-5 h-5 text-[#1a1a40]" />
                    </div>
                    <h4 className="font-pixel text-sm text-[#1a1a40] font-bold mb-1">
                      MESSAGE DISPATCH LAUNCHED!
                    </h4>
                    <p className="font-mono-clean text-xs text-gray-700">
                      Your default mail client has opened to send the message to bhoomikaharidas@outlook.com.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSendDraft} className="space-y-4">
                    <div>
                      <label className="block font-pixel text-[10px] text-gray-700 mb-1">
                        YOUR NAME / ORGANIZATION:
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alex Morgan / Analytics Lead"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        className="w-full bg-[#faf5ff] border-2 border-[#1a1a40] px-3 py-2 text-xs font-mono-clean text-[#1a1a40] focus:outline-none focus:bg-white shadow-[inset_2px_2px_0_rgba(0,0,0,0.05)]"
                      />
                    </div>

                    <div>
                      <label className="block font-pixel text-[10px] text-gray-700 mb-1">
                        YOUR RETURN EMAIL:
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. alex@company.com"
                        value={senderEmail}
                        onChange={(e) => setSenderEmail(e.target.value)}
                        className="w-full bg-[#faf5ff] border-2 border-[#1a1a40] px-3 py-2 text-xs font-mono-clean text-[#1a1a40] focus:outline-none focus:bg-white shadow-[inset_2px_2px_0_rgba(0,0,0,0.05)]"
                      />
                    </div>

                    <div>
                      <label className="block font-pixel text-[10px] text-gray-700 mb-1">
                        MESSAGE / OPPORTUNITY DETAILS:
                      </label>
                      <textarea
                        rows={4}
                        required
                        placeholder="Hi Bhoomika, we saw your credit risk dashboard and ISRO internship experience..."
                        value={senderMsg}
                        onChange={(e) => setSenderMsg(e.target.value)}
                        className="w-full bg-[#faf5ff] border-2 border-[#1a1a40] px-3 py-2 text-xs font-mono-clean text-[#1a1a40] focus:outline-none focus:bg-white shadow-[inset_2px_2px_0_rgba(0,0,0,0.05)] resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full pixel-btn pixel-btn-primary py-3 font-pixel text-xs flex items-center justify-center space-x-2 text-[#1a1a40]"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>DISPATCH EMAIL TO BHOOMIKA</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer info bar */}
        <div className="bg-white px-4 py-2 border-t-3 border-[#1a1a40] flex justify-between items-center text-[10px] font-pixel text-gray-500">
          <span>STATUS: OPEN TO WORK · BHOOMIKA HARIDAS</span>
          <span className="text-[#1a1a40]">LOC: INDIA</span>
        </div>
      </div>
    </section>
  );
};
