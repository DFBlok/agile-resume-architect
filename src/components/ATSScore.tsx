
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Target } from "lucide-react";

interface ATSScoreProps {
  resumeData: any;
}

export const ATSScore = ({ resumeData }: ATSScoreProps) => {
  // Mock ATS scoring logic
  const calculateATSScore = () => {
    let score = 0;
    let totalChecks = 0;

    // Check personal info completeness
    const personal = resumeData.personal || {};
    if (personal.firstName && personal.lastName) score += 10;
    if (personal.email) score += 10;
    if (personal.phone) score += 10;
    if (personal.summary && personal.summary.length > 50) score += 15;
    totalChecks += 4;

    // Check experience
    const experience = resumeData.experience || [];
    if (experience.length > 0) score += 20;
    if (experience.some((exp: any) => exp.description && exp.description.length > 100)) score += 15;
    totalChecks += 2;

    // Check education
    const education = resumeData.education || [];
    if (education.length > 0) score += 10;
    totalChecks += 1;

    // Check skills
    const skills = resumeData.skills || [];
    if (skills.length >= 5) score += 10;
    totalChecks += 1;

    return Math.min(100, score);
  };

  const score = calculateATSScore();
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreStatus = (score: number) => {
    if (score >= 80) return { label: "Excellent", color: "bg-green-100 text-green-800" };
    if (score >= 60) return { label: "Good", color: "bg-yellow-100 text-yellow-800" };
    return { label: "Needs Improvement", color: "bg-red-100 text-red-800" };
  };

  const status = getScoreStatus(score);

  const suggestions = [
    { text: "Add more keywords relevant to your industry", completed: score >= 60 },
    { text: "Include quantifiable achievements", completed: score >= 70 },
    { text: "Complete all contact information", completed: resumeData.personal?.email && resumeData.personal?.phone },
    { text: "Add a professional summary", completed: resumeData.personal?.summary },
    { text: "Include at least 5 relevant skills", completed: (resumeData.skills?.length || 0) >= 5 }
  ];

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-600" />
          ATS Score
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className={`text-3xl font-bold ${getScoreColor(score)}`}>
            {score}%
          </div>
          <Badge className={status.color}>
            {status.label}
          </Badge>
        </div>

        <Progress value={score} className="w-full" />

        <div className="space-y-2">
          <h4 className="font-medium text-sm">Suggestions:</h4>
          {suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              {suggestion.completed ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <AlertCircle className="w-4 h-4 text-yellow-500" />
              )}
              <span className={suggestion.completed ? "text-green-700" : "text-slate-600"}>
                {suggestion.text}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
