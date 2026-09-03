import React, { useRef, useState } from 'react';
import { X, Download, Printer, Copy, Check, FileText } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCE_DATA, PROJECTS_DATA } from '../data/portfolioData';
import { soundFX } from '../utils/audio';
import { generateSelectableResumePDF } from '../utils/pdfGenerator';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleDownloadPDF = () => {
    soundFX.playCoin();
    try {
      setIsGenerating(true);
      generateSelectableResumePDF();
    } catch (err) {
      console.error('PDF Generation error:', err);
      window.print();
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    soundFX.playBlip(500);
    window.print();
  };

  const handleCopyText = () => {
    soundFX.playBlip(700);
    const resumeText = `
BHOOMIKA HARIDAS
Data Analytics · Business Intelligence · Technology & Automation
Phone: ${PERSONAL_INFO.phone} | Email: ${PERSONAL_INFO.email} | Portfolio: ${PERSONAL_INFO.portfolioUrl} | LinkedIn: ${PERSONAL_INFO.linkedin} | GitHub: ${PERSONAL_INFO.github}

EDUCATION
${PERSONAL_INFO.education.institution}
${PERSONAL_INFO.education.degree} in ${PERSONAL_INFO.education.major} | CGPA: ${PERSONAL_INFO.education.gpa} (${PERSONAL_INFO.education.period})

PROFESSIONAL EXPERIENCE
${EXPERIENCE_DATA.map(exp => `${exp.company} — ${exp.location}\n${exp.role} (${exp.period})\n${exp.bulletPoints.map(b => `• ${b}`).join('\n')}`).join('\n\n')}

INDEPENDENT PROJECTS
${PROJECTS_DATA.filter(proj => !proj.isAdditional).map(proj => `${proj.title} | ${proj.techStack.join(', ')}\n${proj.features.map(f => `• ${f}`).join('\n')}`).join('\n\n')}

TECHNICAL SKILLS
• Programming & Analytics: Python (Pandas, NumPy, Scikit-learn), SQL, Statistical Analysis, A/B Testing, Hypothesis Testing, Regression Analysis
• Visualization & BI: Power BI, DAX, Tableau, Advanced Excel (VLOOKUPs, Pivot Tables, Power Query), Geospatial Analysis
• Cloud & Data Engineering: Azure Databricks, Apache Spark, PySpark, ETL Pipelines, REST API Integration, Data Quality Management
• Tools & CRM: Microsoft Azure, Git, Jupyter, VS Code, LeadSquared CRM, Salesforce basics, Postman, Insomnia

CERTIFICATIONS & ACHIEVEMENTS
• Certifications: Microsoft Certified: Azure AI Fundamentals (AI-900) | Data Science for Engineers – NPTEL (IIT Madras) | Project Management – NPTEL (IIT Kharagpur) | Elements of AI – University of Helsinki | MTA: HTML5 App Development – Microsoft | Exploratory Data Analysis – Accenture via Nasscom
• Achievements: Attended Google Gurugram office as part of AI Lab (ADK & Vertex AI) conducted by Hack2skill
    `.trim();

    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto cursor-pointer"
      onClick={() => {
        soundFX.playCloseWindow();
        onClose();
      }}
    >
      {/* Modal Window Container */}
      <div 
        className="relative w-full max-w-4xl bg-white border-4 border-[#1a1a40] shadow-[8px_8px_0_0_#1a1a40] my-auto animate-in fade-in zoom-in duration-150 cursor-default"
        id="resume-window"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Retro Window Header */}
        <div className="bg-[#1a1a40] text-white px-3 py-2 flex items-center justify-between border-b-4 border-[#1a1a40] select-none">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-[#ff66aa] border-2 border-white flex items-center justify-center">
              <FileText className="w-2.5 h-2.5 text-white" />
            </div>
            <span className="font-pixel text-xs sm:text-sm tracking-wider text-white">
              C:\DOCS\RESUME_VIEWER.EXE
            </span>
          </div>
          <div className="flex items-center space-x-1.5">
            <button
              onClick={() => {
                soundFX.playCloseWindow();
                onClose();
              }}
              className="w-5 h-5 bg-[#ffb3d9] hover:bg-[#ff66aa] text-[#1a1a40] hover:text-white font-bold flex items-center justify-center border-2 border-[#1a1a40] text-xs transition-colors cursor-pointer"
              title="Close Viewer"
            >
              X
            </button>
          </div>
        </div>

        {/* Retro Action Bar */}
        <div className="bg-[#f0e6ff] px-4 py-3 border-b-3 border-[#1a1a40] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-xs font-pixel text-[#1a1a40]">
            <FileText className="w-4 h-4 text-[#1a1a40]" />
            <span className="hidden sm:inline">RESUME DOCUMENT ·</span>
            <span className="bg-[#88ecc0] px-2 py-0.5 border border-[#1a1a40] text-[10px]">
              VERIFIED READY
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleDownloadPDF}
              disabled={isGenerating}
              className="pixel-btn pixel-btn-primary px-3 py-1.5 text-xs font-pixel flex items-center space-x-1.5 disabled:opacity-50 cursor-pointer"
              title="Download PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isGenerating ? 'GENERATING...' : 'DOWNLOAD PDF'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="pixel-btn bg-white hover:bg-slate-100 px-3 py-1.5 text-xs font-pixel flex items-center space-x-1.5 text-[#1a1a40] cursor-pointer"
              title="Print Page / Save Document"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">PRINT</span>
            </button>

            <button
              onClick={handleCopyText}
              className="pixel-btn bg-[#e6ccff] hover:bg-[#d9b3ff] px-3 py-1.5 text-xs font-pixel flex items-center space-x-1.5 text-[#1a1a40] cursor-pointer"
              title="Copy plain text for job applications"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'COPIED!' : 'COPY TEXT'}</span>
            </button>
          </div>
        </div>

        {/* Scrollable Document Container */}
        <div className="p-3 sm:p-6 max-h-[72vh] overflow-y-auto bg-[#fafafa]">
          {/* Resume Canvas */}
          <div
            ref={resumeRef}
            id="resume-document-content"
            className="resume-page-container bg-white text-black p-6 sm:p-10 mx-auto max-w-[800px] shadow-sm border border-gray-200 font-sans leading-relaxed text-[13px] select-text"
            style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
          >
            {/* Header / Name & Contact */}
            <div className="text-center pb-2.5 mb-2.5 border-b border-gray-900">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 uppercase">
                {PERSONAL_INFO.name}
              </h1>
              <p className="text-xs font-semibold text-gray-800 mt-0.5">
                Data Analytics · Business Intelligence · Technology &amp; Automation
              </p>
              <p className="text-[11.5px] text-gray-700 mt-1 flex flex-wrap justify-center items-center gap-x-2.5 gap-y-0.5">
                <span>{PERSONAL_INFO.phone}</span>
                <span>|</span>
                <a href={`mailto:${PERSONAL_INFO.email}`} className="text-blue-900 hover:underline">
                  {PERSONAL_INFO.email}
                </a>
                <span>|</span>
                <a href={PERSONAL_INFO.portfolioUrl} target="_blank" rel="noreferrer" className="text-blue-900 hover:underline font-semibold">
                  {PERSONAL_INFO.portfolioDomain}
                </a>
                <span>|</span>
                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-blue-900 hover:underline">
                  linkedin.com/in/{PERSONAL_INFO.linkedinUser}
                </a>
                <span>|</span>
                <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-blue-900 hover:underline">
                  github.com/{PERSONAL_INFO.githubUser}
                </a>
              </p>
            </div>

            {/* Section: Education */}
            <div className="mb-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-900 pb-0.5 mb-1">
                Education
              </h2>
              <div className="flex justify-between items-baseline text-xs font-bold text-gray-900">
                <span>{PERSONAL_INFO.education.institution}</span>
                <span className="text-gray-700 font-normal text-[11px]">{PERSONAL_INFO.education.location}</span>
              </div>
              <div className="flex justify-between items-baseline text-xs text-gray-800 italic">
                <span>{PERSONAL_INFO.education.degree} in {PERSONAL_INFO.education.major} | <span className="not-italic font-semibold text-gray-900">CGPA: {PERSONAL_INFO.education.gpa}</span></span>
                <span className="not-italic text-gray-700 text-[11px]">{PERSONAL_INFO.education.period}</span>
              </div>
            </div>

            {/* Section: Experience */}
            <div className="mb-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-900 pb-0.5 mb-1.5">
                Professional Experience
              </h2>

              {EXPERIENCE_DATA.map((exp) => (
                <div key={exp.id} className="mb-2.5">
                  <div className="flex justify-between items-baseline text-xs font-bold text-gray-900">
                    <span>{exp.company}</span>
                    <span className="not-italic text-gray-700 text-[11px] font-normal">{exp.location}</span>
                  </div>
                  <div className="flex justify-between items-baseline text-[11.5px] text-gray-800 italic mb-0.5">
                    <span>{exp.role}</span>
                    <span className="not-italic font-normal text-gray-600 text-[11px]">{exp.period}</span>
                  </div>
                  <ul className="list-disc list-outside ml-4 text-[11px] text-gray-800 space-y-0.5">
                    {exp.bulletPoints.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Section: Independent Projects */}
            <div className="mb-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-900 pb-0.5 mb-1.5">
                Independent Projects
              </h2>

              {PROJECTS_DATA.filter((proj) => !proj.isAdditional).map((proj) => (
                <div key={proj.id} className="mb-2">
                  <div className="flex justify-between items-baseline text-xs font-bold text-gray-900">
                    <span>
                      {proj.title} <span className="font-normal text-gray-700 text-[11px]">| {proj.techStack.join(', ')}</span>
                    </span>
                    <span className="text-[11px] font-normal text-gray-600">
                      {proj.id === 'credit-risk' ? 'Jan 2026 – Present' : ''}
                    </span>
                  </div>
                  <ul className="list-disc list-outside ml-4 text-[11px] text-gray-800 space-y-0.5 mt-0.5">
                    {proj.features.slice(0, 2).map((feat, fIdx) => (
                      <li key={fIdx}>{feat}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Section: Technical Skills */}
            <div className="mb-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-900 pb-0.5 mb-1">
                Technical Skills
              </h2>
              <div className="text-[11px] text-gray-800 space-y-0.5">
                <p>
                  <span className="font-bold text-gray-900">Programming & Analytics:</span> Python (Pandas, NumPy, Scikit-learn), SQL, Statistical Analysis, A/B Testing, Hypothesis Testing, Regression Analysis
                </p>
                <p>
                  <span className="font-bold text-gray-900">Visualization & BI:</span> Power BI, DAX, Tableau, Advanced Excel (VLOOKUPs, Pivot Tables, Power Query), Geospatial Analysis
                </p>
                <p>
                  <span className="font-bold text-gray-900">Cloud & Data Engineering:</span> Azure Databricks, Apache Spark, PySpark, ETL Pipelines, REST API Integration, Data Quality Management
                </p>
                <p>
                  <span className="font-bold text-gray-900">Tools & CRM:</span> Microsoft Azure, Git, Jupyter, VS Code, LeadSquared CRM, Salesforce basics, Postman, Insomnia
                </p>
              </div>
            </div>

            {/* Section: Certifications & Achievements */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-900 pb-0.5 mb-1">
                Certifications & Achievements
              </h2>
              <p className="text-[10.5px] text-gray-800 leading-snug">
                <span className="font-bold text-gray-900">Certifications:</span> Microsoft Certified: Azure AI Fundamentals (AI-900) • Data Science for Engineers – NPTEL (IIT Madras) • Project Management – NPTEL (IIT Kharagpur) • Elements of AI – University of Helsinki • MTA: HTML5 App Development – Microsoft • Exploratory Data Analysis – Accenture via Nasscom
              </p>
              <p className="text-[10.5px] text-gray-800 leading-snug mt-0.5">
                <span className="font-bold text-gray-900">Achievements:</span> Attended Google Gurugram office as part of AI Lab (ADK & Vertex AI) conducted by Hack2skill
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#ffffff] px-4 py-3 border-t-3 border-[#1a1a40] flex justify-between items-center text-xs">
          <span className="font-vt text-sm text-gray-600">
            PRESS [ESC] OR CLICK CLOSE TO RETURN TO DESKTOP
          </span>
          <button
            onClick={() => {
              soundFX.playCloseWindow();
              onClose();
            }}
            className="pixel-btn bg-[#ffb3d9] px-4 py-1 text-xs font-pixel text-[#1a1a40]"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};
