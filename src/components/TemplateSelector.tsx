
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check, Eye, FileText, X } from "lucide-react";
import { ResumePreview } from './ResumePreview';

interface Template {
  id: string;
  name: string;
  description: string;
  preview: string;
  features: string[];
  popular?: boolean;
}

interface TemplateSelectorProps {
  onBack: () => void;
  onSelectTemplate: (templateId: string) => void;
}

const templates: Template[] = [
  {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Clean, modern design with accent colors and clear section divisions',
    preview: '/api/placeholder/300/400',
    features: ['ATS-Friendly', 'Color Accents', 'Clean Layout', 'Professional'],
    popular: true
  },
  {
    id: 'classic',
    name: 'Classic Traditional',
    description: 'Traditional format preferred by conservative industries',
    preview: '/api/placeholder/300/400',
    features: ['Traditional', 'Conservative', 'Text-Focused', 'Minimal']
  },
  {
    id: 'creative',
    name: 'Creative Design',
    description: 'Eye-catching design for creative professionals and designers',
    preview: '/api/placeholder/300/400',
    features: ['Creative', 'Visual Impact', 'Unique Layout', 'Portfolio-Style']
  }
];

// Sample data for template preview
const sampleResumeData = {
  personal: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    phone: '(555) 123-4567',
    location: 'New York, NY',
    website: 'johndoe.com',
    linkedin: 'linkedin.com/in/johndoe',
    summary: 'Experienced software developer with 5+ years of expertise in building scalable web applications and leading cross-functional teams to deliver high-quality products on time and within budget.'
  },
  experience: [
    {
      position: 'Senior Software Developer',
      company: 'Tech Solutions Inc.',
      location: 'New York, NY',
      startDate: 'Jan 2022',
      endDate: 'Present',
      current: true,
      description: '• Led development of microservices architecture serving 1M+ users\n• Improved application performance by 40% through code optimization\n• Mentored 3 junior developers and conducted technical interviews'
    },
    {
      position: 'Software Developer',
      company: 'StartupXYZ',
      location: 'San Francisco, CA',
      startDate: 'Jun 2020',
      endDate: 'Dec 2021',
      current: false,
      description: '• Built full-stack web applications using React and Node.js\n• Collaborated with design team to implement responsive UI components\n• Reduced bug reports by 30% through comprehensive testing strategies'
    }
  ],
  education: [
    {
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      institution: 'University of Technology',
      location: 'Boston, MA',
      graduationDate: '2020',
      gpa: '3.8'
    }
  ],
  skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'MongoDB', 'Git']
};

export const TemplateSelector = ({ onBack, onSelectTemplate }: TemplateSelectorProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('modern');
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null);

  const handleSelectTemplate = () => {
    onSelectTemplate(selectedTemplate);
  };

  const handlePreviewTemplate = (templateId: string) => {
    setPreviewTemplate(templateId);
  };

  const closePreview = () => {
    setPreviewTemplate(null);
  };

  // If previewing a template, show the preview modal
  if (previewTemplate) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold">
              Preview: {templates.find(t => t.id === previewTemplate)?.name}
            </h2>
            <div className="flex gap-2">
              <Button 
                onClick={() => {
                  setSelectedTemplate(previewTemplate);
                  closePreview();
                }}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Use This Template
              </Button>
              <Button variant="ghost" onClick={closePreview}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="flex-1 overflow-auto">
            <ResumePreview 
              resumeData={sampleResumeData}
              onBack={closePreview}
              templateId={previewTemplate}
            />
          </div>
        </div>
      </div>
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
              <h1 className="text-3xl font-bold text-slate-800">Choose Your Template</h1>
              <p className="text-slate-600">Select a professional template for your resume</p>
            </div>
          </div>
          <Button 
            onClick={handleSelectTemplate}
            className="bg-blue-600 hover:bg-blue-700"
            disabled={!selectedTemplate}
          >
            Continue with Template
          </Button>
        </div>

        {/* Template Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {templates.map((template) => (
            <Card 
              key={template.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                selectedTemplate === template.id 
                  ? 'ring-2 ring-blue-500 shadow-lg' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedTemplate(template.id)}
            >
              <CardHeader className="relative">
                {template.popular && (
                  <Badge className="absolute top-4 right-4 bg-green-500 hover:bg-green-500">
                    Popular
                  </Badge>
                )}
                <div className="aspect-[3/4] bg-slate-100 rounded-md mb-4 flex items-center justify-center">
                  <FileText className="w-16 h-16 text-slate-400" />
                  <span className="absolute text-xs text-slate-500 mt-20">
                    {template.name} Preview
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  {selectedTemplate === template.id && (
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-sm mb-4">{template.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {template.features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePreviewTemplate(template.id);
                  }}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview Template
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Template Details */}
        {selectedTemplate && (
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {templates.find(t => t.id === selectedTemplate)?.name}
                  </h3>
                  <p className="text-slate-600">
                    {templates.find(t => t.id === selectedTemplate)?.description}
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  className="ml-4"
                  onClick={() => handlePreviewTemplate(selectedTemplate)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
