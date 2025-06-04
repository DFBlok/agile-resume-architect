

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Mail, Phone, MapPin, Globe, Linkedin, Loader2 } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";

interface PersonalInfoFormProps {
  data: any;
  onUpdate: (data: any) => void;
}

export const PersonalInfoForm = ({ data, onUpdate }: PersonalInfoFormProps) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    summary: '',
    role: '',
    experience: '',
    ...data
  });

  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    onUpdate(formData);
  }, [formData, onUpdate]);

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const roles = [
    'Software Engineer',
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'Data Scientist',
    'Product Manager',
    'UX/UI Designer',
    'DevOps Engineer',
    'Marketing Manager',
    'Sales Representative',
    'Business Analyst',
    'Project Manager',
    'Consultant',
    'Teacher/Educator',
    'Healthcare Professional',
    'Financial Analyst',
    'Human Resources',
    'Customer Success Manager',
    'Operations Manager',
    'Other'
  ];

  const experiences = [
    'Entry Level (0-1 years)',
    'Junior Level (1-3 years)',
    'Mid Level (3-5 years)',
    'Senior Level (5-8 years)',
    'Lead/Principal (8-12 years)',
    'Executive Level (12+ years)'
  ];

  const generateAISummary = async () => {
    if (!formData.role || !formData.experience) {
      toast.error('Please select both role and experience level first');
      return;
    }

    setIsGenerating(true);
    
    try {
      const { data: result, error } = await supabase.functions.invoke('generate-ai-summary', {
        body: {
          role: formData.role,
          experience: formData.experience,
          personalInfo: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            location: formData.location
          }
        }
      });

      if (error) {
        console.error('Error generating AI summary:', error);
        toast.error('Failed to generate AI summary. Please try again.');
        return;
      }

      if (result?.error) {
        console.error('AI summary error:', result.error);
        toast.error(result.error);
        return;
      }

      if (result?.summary) {
        updateField('summary', result.summary);
        toast.success('AI summary generated successfully!');
      } else {
        toast.error('No summary was generated. Please try again.');
      }
    } catch (error) {
      console.error('Error calling AI summary function:', error);
      toast.error('Failed to generate AI summary. Please check your connection and try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Summary Generation */}
      <Card className="border-2 border-blue-100 bg-blue-50/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2 text-blue-700">
            <Sparkles className="w-5 h-5" />
            AI-Powered Professional Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Role and Experience Selection */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="role">Professional Role</Label>
                <Select value={formData.role} onValueChange={(value) => updateField('role', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="experience">Experience Level</Label>
                <Select value={formData.experience} onValueChange={(value) => updateField('experience', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    {experiences.map((exp) => (
                      <SelectItem key={exp} value={exp}>
                        {exp}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Textarea
              placeholder="Your professional summary will appear here, or write your own..."
              value={formData.summary}
              onChange={(e) => updateField('summary', e.target.value)}
              className="min-h-[120px]"
            />
            <Button 
              onClick={generateAISummary}
              disabled={isGenerating || !formData.role || !formData.experience}
              variant="outline"
              className="border-blue-200 text-blue-700 hover:bg-blue-100"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating AI Summary...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate AI Summary
                </>
              )}
            </Button>
            {(!formData.role || !formData.experience) && (
              <p className="text-sm text-blue-600">
                Select your role and experience level to generate a personalized AI summary
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => updateField('firstName', e.target.value)}
                placeholder="John"
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => updateField('lastName', e.target.value)}
                placeholder="Doe"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="john.doe@email.com"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="location" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Location
            </Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => updateField('location', e.target.value)}
              placeholder="San Francisco, CA"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="website" className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Website
              </Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) => updateField('website', e.target.value)}
                placeholder="https://johndoe.com"
              />
            </div>
            <div>
              <Label htmlFor="linkedin" className="flex items-center gap-2">
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </Label>
              <Input
                id="linkedin"
                value={formData.linkedin}
                onChange={(e) => updateField('linkedin', e.target.value)}
                placeholder="linkedin.com/in/johndoe"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
