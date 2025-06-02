
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Sparkles, Briefcase, Calendar } from "lucide-react";

interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface ExperienceFormProps {
  data: Experience[];
  onUpdate: (data: Experience[]) => void;
}

export const ExperienceForm = ({ data, onUpdate }: ExperienceFormProps) => {
  const [experiences, setExperiences] = useState<Experience[]>(data || []);

  useEffect(() => {
    onUpdate(experiences);
  }, [experiences, onUpdate]);

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    setExperiences([...experiences, newExp]);
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    setExperiences(experiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const generateAIDescription = (id: string, position: string, company: string) => {
    // Mock AI generation
    const sampleDescriptions = [
      "• Led cross-functional team of 8 engineers to deliver high-impact features, resulting in 25% increase in user engagement\n• Architected and implemented scalable microservices using React, Node.js, and AWS, serving 1M+ daily active users\n• Mentored junior developers and established best practices for code review and deployment processes",
      "• Developed and executed comprehensive digital marketing strategies that increased brand awareness by 150%\n• Managed social media campaigns across multiple platforms, achieving 300% growth in follower engagement\n• Analyzed market trends and customer data to optimize marketing spend, reducing CAC by 40%",
      "• Provided exceptional patient care in high-pressure emergency department environment\n• Collaborated with multidisciplinary healthcare teams to ensure optimal patient outcomes\n• Maintained detailed medical records and documentation in compliance with HIPAA regulations"
    ];
    
    const randomDescription = sampleDescriptions[Math.floor(Math.random() * sampleDescriptions.length)];
    updateExperience(id, 'description', randomDescription);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold">Work Experience</h3>
        </div>
        <Button onClick={addExperience} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </Button>
      </div>

      {experiences.length === 0 && (
        <Card className="border-dashed border-2 border-slate-200">
          <CardContent className="p-8 text-center">
            <Briefcase className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-500 mb-4">No work experience added yet</p>
            <Button onClick={addExperience} variant="outline">
              Add Your First Experience
            </Button>
          </CardContent>
        </Card>
      )}

      {experiences.map((exp, index) => (
        <Card key={exp.id} className="border-l-4 border-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Experience #{index + 1}
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeExperience(exp.id)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`company-${exp.id}`}>Company</Label>
                <Input
                  id={`company-${exp.id}`}
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                  placeholder="Company Name"
                />
              </div>
              <div>
                <Label htmlFor={`position-${exp.id}`}>Position</Label>
                <Input
                  id={`position-${exp.id}`}
                  value={exp.position}
                  onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                  placeholder="Job Title"
                />
              </div>
            </div>

            <div>
              <Label htmlFor={`location-${exp.id}`}>Location</Label>
              <Input
                id={`location-${exp.id}`}
                value={exp.location}
                onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                placeholder="City, State"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`startDate-${exp.id}`}>Start Date</Label>
                <Input
                  id={`startDate-${exp.id}`}
                  type="month"
                  value={exp.startDate}
                  onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor={`endDate-${exp.id}`}>End Date</Label>
                <div className="space-y-2">
                  <Input
                    id={`endDate-${exp.id}`}
                    type="month"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                    disabled={exp.current}
                  />
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={exp.current}
                      onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                      className="rounded"
                    />
                    Current position
                  </label>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor={`description-${exp.id}`}>Job Description</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => generateAIDescription(exp.id, exp.position, exp.company)}
                  className="border-blue-200 text-blue-700 hover:bg-blue-50"
                >
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI Generate
                </Button>
              </div>
              <Textarea
                id={`description-${exp.id}`}
                value={exp.description}
                onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                placeholder="Describe your responsibilities and achievements..."
                className="min-h-[120px]"
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
