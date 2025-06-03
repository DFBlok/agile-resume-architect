
export const exportToPDF = async (resumeData: any) => {
  try {
    // Create a simple HTML representation of the resume
    const htmlContent = generateResumeHTML(resumeData);
    
    // For now, we'll create a blob and download it
    // In a real implementation, you'd use libraries like jsPDF or Puppeteer
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
    console.error('Export to PDF failed:', error);
    return false;
  }
};

export const exportToDOCX = async (resumeData: any) => {
  try {
    // Create a simple text representation
    const textContent = generateResumeText(resumeData);
    
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${resumeData.personal?.firstName || 'resume'}_resume.txt`;
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
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
        .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
        .section { margin-bottom: 30px; }
        .section h2 { color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
        .experience-item, .education-item { margin-bottom: 20px; }
        .skills { display: flex; flex-wrap: wrap; gap: 10px; }
        .skill { background: #f0f0f0; padding: 5px 10px; border-radius: 5px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>${personal?.firstName || ''} ${personal?.lastName || ''}</h1>
        <p>${personal?.email || ''} | ${personal?.phone || ''}</p>
        <p>${personal?.address || ''}</p>
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
            <h3>${exp.position || ''} at ${exp.company || ''}</h3>
            <p><strong>${exp.startDate || ''} - ${exp.endDate || 'Present'}</strong></p>
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
            <h3>${edu.degree || ''} in ${edu.field || ''}</h3>
            <p><strong>${edu.institution || ''}</strong> (${edu.graduationYear || ''})</p>
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

const generateResumeText = (resumeData: any) => {
  const { personal, experience = [], education = [], skills = [] } = resumeData;
  
  let text = `${personal?.firstName || ''} ${personal?.lastName || ''}\n`;
  text += `${personal?.email || ''} | ${personal?.phone || ''}\n`;
  text += `${personal?.address || ''}\n\n`;
  
  if (personal?.summary) {
    text += `PROFESSIONAL SUMMARY\n${personal.summary}\n\n`;
  }
  
  if (experience.length > 0) {
    text += `WORK EXPERIENCE\n`;
    experience.forEach((exp: any) => {
      text += `${exp.position || ''} at ${exp.company || ''}\n`;
      text += `${exp.startDate || ''} - ${exp.endDate || 'Present'}\n`;
      text += `${exp.description || ''}\n\n`;
    });
  }
  
  if (education.length > 0) {
    text += `EDUCATION\n`;
    education.forEach((edu: any) => {
      text += `${edu.degree || ''} in ${edu.field || ''}\n`;
      text += `${edu.institution || ''} (${edu.graduationYear || ''})\n\n`;
    });
  }
  
  if (skills.length > 0) {
    text += `SKILLS\n${skills.join(', ')}\n`;
  }
  
  return text;
};
