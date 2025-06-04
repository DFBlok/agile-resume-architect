import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, FileText, Search, CheckCircle, Zap, Download, Brain } from "lucide-react";
import { ResumeBuilder } from '@/components/ResumeBuilder';
import { TemplateSelector } from '@/components/TemplateSelector';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ContactSection } from '@/components/ContactSection';

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'templates' | 'builder'>('home');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('modern');

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    setCurrentView('builder');
  };

  if (currentView === 'builder') {
    return (
      <ResumeBuilder 
        onBack={() => setCurrentView('home')} 
        templateId={selectedTemplate}
      />
    );
  }

  if (currentView === 'templates') {
    return (
      <TemplateSelector 
        onBack={() => setCurrentView('home')}
        onSelectTemplate={handleSelectTemplate}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <div className="text-center mb-8 sm:mb-16">
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300">
            <Brain className="w-4 h-4 mr-2" />
            AI-Powered Resume Generation
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-slate-800 via-blue-700 to-indigo-700 bg-clip-text text-transparent dark:from-slate-200 dark:via-blue-300 dark:to-indigo-300">
            Intelligent Resume Generator
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
            Create ATS-optimized, professional resumes with AI-powered content suggestions. 
            Match your skills to job descriptions and increase your interview chances.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <Button 
              size="lg" 
              onClick={() => setCurrentView('builder')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl w-full sm:w-auto"
            >
              Start Building Resume
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-6 sm:px-8 py-3 text-base sm:text-lg w-full sm:w-auto"
              onClick={() => setCurrentView('templates')}
            >
              View Templates
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-16 px-4">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg sm:text-xl">AI Content Generation</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
                Generate compelling resume sections with AI-powered suggestions tailored to your industry and role.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg sm:text-xl">ATS Optimization</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
                Automatically optimize your resume with industry-specific keywords for better ATS compatibility.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 sm:col-span-2 lg:col-span-1">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg sm:text-xl">Job Matching</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
                Analyze your resume against job descriptions and get match scores with improvement suggestions.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 dark:from-slate-700 dark:to-slate-800 rounded-2xl p-6 sm:p-12 text-white mb-8 sm:mb-16 mx-4">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">Trusted by Professionals Worldwide</h2>
            <p className="text-slate-300 text-base sm:text-lg">Join thousands who've landed their dream jobs</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-blue-400 mb-2">95%</div>
              <div className="text-slate-300 text-sm sm:text-base">ATS Pass Rate</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-green-400 mb-2">3x</div>
              <div className="text-slate-300 text-sm sm:text-base">More Interviews</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-purple-400 mb-2">50K+</div>
              <div className="text-slate-300 text-sm sm:text-base">Resumes Created</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-pink-400 mb-2">4.9/5</div>
              <div className="text-slate-300 text-sm sm:text-base">User Rating</div>
            </div>
          </div>
        </div>

        {/* Export Options */}
        <div className="text-center px-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-slate-800 dark:text-slate-200">Multiple Export Formats</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2 bg-white dark:bg-slate-800 rounded-lg px-4 sm:px-6 py-4 shadow-md">
              <FileText className="w-5 sm:w-6 h-5 sm:h-6 text-red-500" />
              <span className="font-semibold text-sm sm:text-base">PDF</span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-slate-800 rounded-lg px-4 sm:px-6 py-4 shadow-md">
              <Download className="w-5 sm:w-6 h-5 sm:h-6 text-blue-500" />
              <span className="font-semibold text-sm sm:text-base">DOCX</span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-slate-800 rounded-lg px-4 sm:px-6 py-4 shadow-md">
              <Zap className="w-5 sm:w-6 h-5 sm:h-6 text-orange-500" />
              <span className="font-semibold text-sm sm:text-base">HTML</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
};

export default Index;
