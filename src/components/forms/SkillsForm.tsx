
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Sparkles, Zap } from "lucide-react";

interface SkillsFormProps {
  data: string[];
  onUpdate: (data: string[]) => void;
}

export const SkillsForm = ({ data, onUpdate }: SkillsFormProps) => {
  const [skills, setSkills] = useState<string[]>(data || []);
  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    onUpdate(skills);
  }, [skills, onUpdate]);

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const addSuggestedSkills = (category: string) => {
    const skillCategories = {
      'technical': ['JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'AWS', 'Docker', 'Git'],
      'marketing': ['SEO', 'Google Analytics', 'Social Media Marketing', 'Content Strategy', 'Email Marketing', 'PPC', 'Brand Management'],
      'management': ['Leadership', 'Project Management', 'Team Building', 'Strategic Planning', 'Budget Management', 'Risk Assessment'],
      'design': ['Adobe Creative Suite', 'Figma', 'UI/UX Design', 'Prototyping', 'Wireframing', 'User Research', 'Typography']
    };

    const categorySkills = skillCategories[category as keyof typeof skillCategories] || [];
    const newSkills = categorySkills.filter(skill => !skills.includes(skill));
    setSkills([...skills, ...newSkills.slice(0, 4)]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Zap className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Skills & Technologies</h3>
      </div>

      {/* Add New Skill */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Add Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a skill and press Enter"
              className="flex-1"
            />
            <Button onClick={addSkill} disabled={!newSkill.trim()}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {/* Quick Add Categories */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Quick Add by Category:</Label>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => addSuggestedSkills('technical')}
                className="border-blue-200 text-blue-700 hover:bg-blue-50"
              >
                <Sparkles className="w-3 h-3 mr-1" />
                Technical Skills
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => addSuggestedSkills('marketing')}
                className="border-green-200 text-green-700 hover:bg-green-50"
              >
                <Sparkles className="w-3 h-3 mr-1" />
                Marketing
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => addSuggestedSkills('management')}
                className="border-purple-200 text-purple-700 hover:bg-purple-50"
              >
                <Sparkles className="w-3 h-3 mr-1" />
                Management
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => addSuggestedSkills('design')}
                className="border-pink-200 text-pink-700 hover:bg-pink-50"
              >
                <Sparkles className="w-3 h-3 mr-1" />
                Design
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills Display */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your Skills ({skills.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {skills.length === 0 ? (
            <p className="text-slate-500 text-center py-8">
              No skills added yet. Start by typing a skill above or using the quick add buttons.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-blue-100 text-blue-800 hover:bg-blue-200 px-3 py-1 text-sm"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
