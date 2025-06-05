
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText, Download, Eye, Save } from "lucide-react";
import { PersonalInfoForm } from './forms/PersonalInfoForm';
import { ExperienceForm } from './forms/ExperienceForm';
import { EducationForm } from './forms/EducationForm';
import { SkillsForm } from './forms/SkillsForm';
import { ResumePreview } from './ResumePreview';
import { ATSScore } from './ATSScore';
import { ExportOptions } from './ExportOptions';
import { JobDescriptionAnalysis } from './JobDescriptionAnalysis';
import { ThemeToggle } from './ThemeToggle';
import { useResumeStorage } from '@/hooks/useResumeStorage';
import { toast } from 'sonner';

interface ResumeBuilderProps {
  onBack: () => void;
  templateId?: string;
}

export const ResumeBuilder = ({ onBack, templateId = 'modern' }: ResumeBuilderProps) => {
  const [activeSection, setActiveSection] = useState('personal');
  const [showPreview, setShowPreview] = useState(false);
  const [resumeData, setResumeData] = useState({
    personal: {},
    experience: [],
    education: [],
    skills: []
  });

  const { saveResumeData, loadResumeData, isLoading } = useResumeStorage();

  // Load existing resume data on component mount
  useEffect(() => {
    const loadExistingData = async () => {
      const existingData = await loadResumeData();
      if (existingData) {
        setResumeData(existingData);
        toast.success('Resume data loaded successfully!');
      }
    };
    loadExistingData();
  }, [loadResumeData]);

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

  const handleSaveResume = async () => {
    await saveResumeData(resumeData);
  };

  const getTemplateName = (id: string) => {
    const templates = {
      modern: 'Modern Professional',
      classic: 'Classic Traditional',
      creative: 'Creative Design'
    };
    return templates[id as keyof typeof templates] || 'Modern Professional';
  };

  if (showPreview) {
    return (
      <ResumePreview 
        resumeData={resumeData} 
        onBack={() => setShowPreview(false)}
        templateId={templateId}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-4 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
            <Button variant="ghost" onClick={onBack} className="self-start">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <div className="w-full sm:w-auto">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-200">Resume Builder</h1>
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
                Create your professional resume step by step • Template: {getTemplateName(templateId)}
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="sm:hidden">
              <ThemeToggle />
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={handleSaveResume} 
                disabled={isLoading}
                className="flex-1 sm:flex-none"
              >
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? 'Saving...' : 'Save'}
              </Button>
              <Button variant="outline" onClick={() => setShowPreview(true)} className="flex-1 sm:flex-none">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <div className="flex-1 sm:flex-none">
                <ExportOptions resumeData={resumeData} />
              </div>
            </div>
          </div>
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-4 sm:gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <Card className="sticky top-4 sm:top-8">
              <CardHeader className="pb-4">
                <CardTitle className="text-base sm:text-lg">Resume Sections</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all duration-200 text-sm sm:text-base ${
                        activeSection === section.id
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-semibold border-l-4 border-blue-500'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {section.label}
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>

            {/* ATS Score Card */}
            <div className="hidden lg:block">
              <ATSScore resumeData={resumeData} />
            </div>

            {/* Job Description Analysis Card */}
            <div className="hidden lg:block">
              <JobDescriptionAnalysis resumeData={resumeData} />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <Card className="shadow-lg">
              <CardHeader className="border-b">
                <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  {sections.find(s => s.id === activeSection)?.label}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <ActiveComponent
                  data={resumeData[activeSection as keyof typeof resumeData]}
                  onUpdate={(data: any) => updateResumeData(activeSection, data)}
                />
              </CardContent>
            </Card>

            {/* Mobile ATS Score and Job Analysis */}
            <div className="lg:hidden mt-6 space-y-6">
              <ATSScore resumeData={resumeData} />
              <JobDescriptionAnalysis resumeData={resumeData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
