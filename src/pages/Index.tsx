
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, FileText, Search, CheckCircle, Zap, Download, Brain } from "lucide-react";
import { ResumeBuilder } from '@/components/ResumeBuilder';

const Index = () => {
  const [showBuilder, setShowBuilder] = useState(false);

  if (showBuilder) {
    return <ResumeBuilder onBack={() => setShowBuilder(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-200">
            <Brain className="w-4 h-4 mr-2" />
            AI-Powered Resume Generation
          </Badge>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-slate-800 via-blue-700 to-indigo-700 bg-clip-text text-transparent">
            Intelligent Resume Generator
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Create ATS-optimized, professional resumes with AI-powered content suggestions. 
            Match your skills to job descriptions and increase your interview chances.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => setShowBuilder(true)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Start Building Resume
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
              View Templates
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl">AI Content Generation</CardTitle>
              <CardDescription className="text-slate-600">
                Generate compelling resume sections with AI-powered suggestions tailored to your industry and role.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl">ATS Optimization</CardTitle>
              <CardDescription className="text-slate-600">
                Automatically optimize your resume with industry-specific keywords for better ATS compatibility.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl">Job Matching</CardTitle>
              <CardDescription className="text-slate-600">
                Analyze your resume against job descriptions and get match scores with improvement suggestions.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-12 text-white mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Trusted by Professionals Worldwide</h2>
            <p className="text-slate-300 text-lg">Join thousands who've landed their dream jobs</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">95%</div>
              <div className="text-slate-300">ATS Pass Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">3x</div>
              <div className="text-slate-300">More Interviews</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">50K+</div>
              <div className="text-slate-300">Resumes Created</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-400 mb-2">4.9/5</div>
              <div className="text-slate-300">User Rating</div>
            </div>
          </div>
        </div>

        {/* Export Options */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8 text-slate-800">Multiple Export Formats</h2>
          <div className="flex justify-center gap-6">
            <div className="flex items-center gap-2 bg-white rounded-lg px-6 py-4 shadow-md">
              <FileText className="w-6 h-6 text-red-500" />
              <span className="font-semibold">PDF</span>
            </div>
            <div className="flex items-center gap-2 bg-white rounded-lg px-6 py-4 shadow-md">
              <Download className="w-6 h-6 text-blue-500" />
              <span className="font-semibold">DOCX</span>
            </div>
            <div className="flex items-center gap-2 bg-white rounded-lg px-6 py-4 shadow-md">
              <Zap className="w-6 h-6 text-orange-500" />
              <span className="font-semibold">HTML</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
