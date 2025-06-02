
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText, Download, Eye } from "lucide-react";
import { PersonalInfoForm } from './forms/PersonalInfoForm';
import { ExperienceForm } from './forms/ExperienceForm';
import { EducationForm } from './forms/EducationForm';
import { SkillsForm } from './forms/SkillsForm';
import { ResumePreview } from './ResumePreview';
import { ATSScore } from './ATSScore';
import { ExportOptions } from './ExportOptions';

interface ResumeBuilderProps {
  onBack: () => void;
}

export const ResumeBuilder = ({ onBack }: ResumeBuilderProps) => {
  const [activeSection, setActiveSection] = useState('personal');
  const [showPreview, setShowPreview] = useState(false);
  const [resumeData, setResumeData] = useState({
    personal: {},
    experience: [],
    education: [],
    skills: []
  });

  const sections = [
    { id: 'personal', label: 'Personal Info', component: PersonalInfoForm },
    { id: 'experience', label: 'Experience', component: ExperienceForm },
    { id: 'education', label: 'Education', component: EducationForm },
    { id: 'skills', label: 'Skills', component: SkillsForm },
  ];

  const ActiveComponent = sections.find(s => s.id === activeSection)?.component || PersonalInfoForm;

  const updateResumeData = (section: string, data: any) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  if (showPreview) {
    return (
      <ResumePreview 
        resumeData={resumeData} 
        onBack={() => setShowPreview(false)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Resume Builder</h1>
              <p className="text-slate-600">Create your professional resume step by step</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowPreview(true)}>
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <ExportOptions resumeData={resumeData} />
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-lg">Resume Sections</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                        activeSection === section.id
                          ? 'bg-blue-100 text-blue-700 font-semibold border-l-4 border-blue-500'
                          : 'hover:bg-slate-100 text-slate-600'
                      }`}
                    >
                      {section.label}
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>

            {/* ATS Score Card */}
            <ATSScore resumeData={resumeData} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="shadow-lg">
              <CardHeader className="border-b">
                <CardTitle className="text-xl flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  {sections.find(s => s.id === activeSection)?.label}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ActiveComponent
                  data={resumeData[activeSection as keyof typeof resumeData]}
                  onUpdate={(data: any) => updateResumeData(activeSection, data)}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
