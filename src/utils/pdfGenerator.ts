import jsPDF from 'jspdf';
import { PERSONAL_INFO, EXPERIENCE_DATA, PROJECTS_DATA } from '../data/portfolioData';

export function generateSelectableResumePDF(): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const leftMargin = 14;
  const rightMargin = 14;
  const contentWidth = pageWidth - leftMargin - rightMargin;
  let y = 14; // starting top margin

  const primaryColor = [20, 20, 30] as const;
  const secondaryColor = [60, 60, 70] as const;
  const linkColor = [15, 60, 150] as const;
  const lineColor = [180, 180, 190] as const;

  // Helper: Section Header with clean horizontal rule
  const renderSectionHeader = (title: string) => {
    y += 1.5;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(...primaryColor);
    doc.text(title.toUpperCase(), leftMargin, y);
    y += 1.8;
    doc.setDrawColor(...lineColor);
    doc.setLineWidth(0.4);
    doc.line(leftMargin, y, leftMargin + contentWidth, y);
    y += 3.5;
  };

  // Helper: Bullet with clean wrap and bullet glyph
  const renderBullet = (text: string) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...primaryColor);
    const bulletIndent = 4;
    const bulletSymbol = '•';
    const maxTextWidth = contentWidth - bulletIndent;
    
    // Draw bullet dot
    doc.text(bulletSymbol, leftMargin + 1, y);
    
    const lines = doc.splitTextToSize(text, maxTextWidth);
    doc.text(lines, leftMargin + bulletIndent, y);
    y += lines.length * 3.6 + 0.8;
  };

  // 1. HEADER
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(...primaryColor);
  doc.text(PERSONAL_INFO.name.toUpperCase(), pageWidth / 2, y, { align: 'center' });
  y += 5.2;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...secondaryColor);
  doc.text('Data Analytics · Business Intelligence · Technology & Automation', pageWidth / 2, y, { align: 'center' });
  y += 4.5;

  // Contact info line with clickable links
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...primaryColor);
  
  const contactText = `${PERSONAL_INFO.email}  |  ${PERSONAL_INFO.portfolioDomain}  |  linkedin.com/in/${PERSONAL_INFO.linkedinUser}  |  github.com/${PERSONAL_INFO.githubUser}`;
  doc.text(contactText, pageWidth / 2, y, { align: 'center' });
  y += 4.5;

  // 2. EDUCATION
  renderSectionHeader('Education');
  
  // Institution & Location
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...primaryColor);
  doc.text(PERSONAL_INFO.education.institution, leftMargin, y);
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...secondaryColor);
  doc.text(PERSONAL_INFO.education.location, leftMargin + contentWidth, y, { align: 'right' });
  y += 3.8;

  // Degree & Period
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(...primaryColor);
  const degreeText = `${PERSONAL_INFO.education.degree} in ${PERSONAL_INFO.education.major} — CGPA: ${PERSONAL_INFO.education.gpa}`;
  doc.text(degreeText, leftMargin, y);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...secondaryColor);
  doc.text(PERSONAL_INFO.education.period, leftMargin + contentWidth, y, { align: 'right' });
  y += 4.5;

  // 3. PROFESSIONAL EXPERIENCE
  renderSectionHeader('Professional Experience');

  EXPERIENCE_DATA.forEach((exp) => {
    // Company & Location
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...primaryColor);
    doc.text(exp.company, leftMargin, y);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...secondaryColor);
    doc.text(exp.location, leftMargin + contentWidth, y, { align: 'right' });
    y += 3.6;

    // Role & Period
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(...primaryColor);
    doc.text(exp.role, leftMargin, y);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...secondaryColor);
    doc.text(exp.period, leftMargin + contentWidth, y, { align: 'right' });
    y += 3.8;

    // Bullets
    exp.bulletPoints.forEach((point) => {
      renderBullet(point);
    });
    y += 1.2;
  });

  // 4. INDEPENDENT PROJECTS
  renderSectionHeader('Independent Projects');

  const featuredProjects = PROJECTS_DATA.filter((p) => !p.isAdditional);
  featuredProjects.forEach((proj) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...primaryColor);
    const titleWidth = doc.getTextWidth(proj.title);
    doc.text(proj.title, leftMargin, y);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...secondaryColor);
    doc.text(` | ${proj.techStack.join(', ')}`, leftMargin + titleWidth, y);

    if (proj.id === 'credit-risk') {
      doc.text('Jan 2026 – Present', leftMargin + contentWidth, y, { align: 'right' });
    }
    y += 3.8;

    proj.features.slice(0, 2).forEach((feat) => {
      renderBullet(feat);
    });
    y += 1;
  });

  // 5. TECHNICAL SKILLS
  renderSectionHeader('Technical Skills');

  const skillsList = [
    { label: 'Programming & Analytics', items: 'Python (Pandas, NumPy, Scikit-learn), SQL, Statistical Analysis, A/B Testing, Hypothesis Testing, Regression Analysis' },
    { label: 'Visualization & BI', items: 'Power BI, DAX, Tableau, Advanced Excel (VLOOKUPs, Pivot Tables, Power Query), Geospatial Analysis' },
    { label: 'Cloud & Data Engineering', items: 'Azure Databricks, Apache Spark, PySpark, ETL Pipelines, REST API Integration, Data Quality Management' },
    { label: 'Tools & CRM', items: 'Microsoft Azure, Git, Jupyter, VS Code, LeadSquared CRM, Salesforce basics, Postman, Insomnia' },
  ];

  skillsList.forEach((sk) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...primaryColor);
    const prefix = `• ${sk.label}: `;
    doc.text(prefix, leftMargin, y);

    const prefixWidth = doc.getTextWidth(prefix);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...primaryColor);

    const maxLineLength = contentWidth - prefixWidth;
    const lines = doc.splitTextToSize(sk.items, maxLineLength);
    
    // First line next to prefix
    if (lines.length > 0) {
      doc.text(lines[0], leftMargin + prefixWidth, y);
      if (lines.length > 1) {
        y += 3.6;
        const restLines = lines.slice(1);
        doc.text(restLines, leftMargin + 4, y);
        y += (restLines.length - 1) * 3.6;
      }
    }
    y += 3.8;
  });

  // 6. CERTIFICATIONS & ACHIEVEMENTS
  renderSectionHeader('Certifications & Achievements');

  const certLines = doc.splitTextToSize(
    '• Certifications: Microsoft Certified: Azure AI Fundamentals (AI-900) • Data Science for Engineers – NPTEL (IIT Madras) • Project Management – NPTEL (IIT Kharagpur) • Elements of AI – University of Helsinki • MTA: HTML5 App Development – Microsoft • Exploratory Data Analysis – Accenture via Nasscom',
    contentWidth
  );
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.2);
  doc.setTextColor(...primaryColor);
  doc.text(certLines, leftMargin, y);
  y += certLines.length * 3.5 + 1;

  const achieveLines = doc.splitTextToSize(
    '• Achievements: Attended Google Gurugram office as part of AI Lab (ADK & Vertex AI) conducted by Hack2skill',
    contentWidth
  );
  doc.text(achieveLines, leftMargin, y);

  // Save the PDF
  doc.save('Bhoomika_Haridas_Resume.pdf');
}
