
export const exportToPDF = async (resumeData: any) => {
  try {
    // Note: This is a simplified implementation
    // For real PDF generation, you would use libraries like jsPDF or Puppeteer
    const htmlContent = generateResumeHTML(resumeData);
    
    // Create a blob with HTML content and suggest PDF printing
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    // Open in new window for PDF printing
    const printWindow = window.open(url, '_blank');
    if (printWindow) {
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
        }, 500);
      };
    }
    
    // Clean up
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    
    return true;
  } catch (error) {
    console.error('Export to PDF failed:', error);
    return false;
  }
};

export const exportToDOCX = async (resumeData: any) => {
  try {
    // Create a proper Word document structure
    const docContent = generateWordDocument(resumeData);
    
    const blob = new Blob([docContent], { 
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${resumeData.personal?.firstName || 'resume'}_resume.docx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error('Export to DOCX failed:', error);
    return false;
  }
};

export const exportToHTML = async (resumeData: any) => {
  try {
    const htmlContent = generateResumeHTML(resumeData);
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${resumeData.personal?.firstName || 'resume'}_resume.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error('Export to HTML failed:', error);
    return false;
  }
};

const generateWordDocument = (resumeData: any) => {
  const { personal, experience = [], education = [], skills = [] } = resumeData;
  
  // Create a basic RTF document that can be opened by Word
  let rtfContent = `{\\rtf1\\ansi\\deff0 {\\fonttbl {\\f0 Times New Roman;}}`;
  rtfContent += `\\f0\\fs24 `;
  
  // Header
  rtfContent += `{\\b\\fs32 ${personal?.firstName || ''} ${personal?.lastName || ''}}\\par`;
  rtfContent += `${personal?.email || ''} | ${personal?.phone || ''}\\par`;
  rtfContent += `${personal?.address || ''}\\par\\par`;
  
  // Professional Summary
  if (personal?.summary) {
    rtfContent += `{\\b\\fs28 PROFESSIONAL SUMMARY}\\par`;
    rtfContent += `${personal.summary}\\par\\par`;
  }
  
  // Work Experience
  if (experience.length > 0) {
    rtfContent += `{\\b\\fs28 WORK EXPERIENCE}\\par`;
    experience.forEach((exp: any) => {
      rtfContent += `{\\b ${exp.position || ''}} at {\\b ${exp.company || ''}}\\par`;
      rtfContent += `${exp.startDate || ''} - ${exp.endDate || 'Present'}\\par`;
      rtfContent += `${exp.description || ''}\\par\\par`;
    });
  }
  
  // Education
  if (education.length > 0) {
    rtfContent += `{\\b\\fs28 EDUCATION}\\par`;
    education.forEach((edu: any) => {
      rtfContent += `{\\b ${edu.degree || ''}} in ${edu.field || ''}\\par`;
      rtfContent += `${edu.institution || ''} (${edu.graduationYear || ''})\\par\\par`;
    });
  }
  
  // Skills
  if (skills.length > 0) {
    rtfContent += `{\\b\\fs28 SKILLS}\\par`;
    rtfContent += `${skills.join(', ')}\\par`;
  }
  
  rtfContent += `}`;
  return rtfContent;
};

const generateResumeHTML = (resumeData: any) => {
  const { personal, experience = [], education = [], skills = [] } = resumeData;
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${personal?.firstName || ''} ${personal?.lastName || ''} - Resume</title>
    <style>
        body { 
            font-family: 'Arial', sans-serif; 
            max-width: 800px; 
            margin: 0 auto; 
            padding: 40px 20px; 
            line-height: 1.6; 
            color: #333;
            background: white;
        }
        .header { 
            text-align: center; 
            border-bottom: 3px solid #2563eb; 
            padding-bottom: 20px; 
            margin-bottom: 30px; 
        }
        .header h1 {
            margin: 0;
            font-size: 2.5rem;
            color: #1e40af;
        }
        .contact-info {
            margin-top: 10px;
            font-size: 1.1rem;
            color: #666;
        }
        .section { 
            margin-bottom: 30px; 
        }
        .section h2 { 
            color: #1e40af; 
            border-bottom: 2px solid #ddd; 
            padding-bottom: 8px;
            margin-bottom: 20px;
            font-size: 1.5rem;
        }
        .experience-item, .education-item { 
            margin-bottom: 25px; 
            padding-left: 20px;
            border-left: 3px solid #e5e7eb;
        }
        .job-title {
            font-weight: bold;
            font-size: 1.2rem;
            color: #1f2937;
        }
        .company {
            color: #2563eb;
            font-weight: 600;
        }
        .date-range {
            color: #6b7280;
            font-style: italic;
            margin: 5px 0;
        }
        .skills { 
            display: flex; 
            flex-wrap: wrap; 
            gap: 12px; 
            margin-top: 15px;
        }
        .skill { 
            background: linear-gradient(135deg, #3b82f6, #1d4ed8); 
            color: white;
            padding: 8px 16px; 
            border-radius: 25px; 
            font-weight: 500;
            font-size: 0.9rem;
        }
        @media print {
            body { padding: 20px; }
            .header { page-break-inside: avoid; }
            .section { page-break-inside: avoid; }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>${personal?.firstName || ''} ${personal?.lastName || ''}</h1>
        <div class="contact-info">
            <div>${personal?.email || ''} | ${personal?.phone || ''}</div>
            ${personal?.address ? `<div>${personal.address}</div>` : ''}
        </div>
    </div>
    
    ${personal?.summary ? `
    <div class="section">
        <h2>Professional Summary</h2>
        <p>${personal.summary}</p>
    </div>
    ` : ''}
    
    ${experience.length > 0 ? `
    <div class="section">
        <h2>Work Experience</h2>
        ${experience.map((exp: any) => `
        <div class="experience-item">
            <div class="job-title">${exp.position || ''}</div>
            <div class="company">${exp.company || ''}</div>
            <div class="date-range">${exp.startDate || ''} - ${exp.endDate || 'Present'}</div>
            <p>${exp.description || ''}</p>
        </div>
        `).join('')}
    </div>
    ` : ''}
    
    ${education.length > 0 ? `
    <div class="section">
        <h2>Education</h2>
        ${education.map((edu: any) => `
        <div class="education-item">
            <div class="job-title">${edu.degree || ''} in ${edu.field || ''}</div>
            <div class="company">${edu.institution || ''}</div>
            <div class="date-range">${edu.graduationYear || ''}</div>
        </div>
        `).join('')}
    </div>
    ` : ''}
    
    ${skills.length > 0 ? `
    <div class="section">
        <h2>Skills</h2>
        <div class="skills">
            ${skills.map((skill: string) => `<span class="skill">${skill}</span>`).join('')}
        </div>
    </div>
    ` : ''}
</body>
</html>
  `;
};
