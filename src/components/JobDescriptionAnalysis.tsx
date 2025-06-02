import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Target, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";

interface JobDescriptionAnalysisProps {
  resumeData: any;
}

export const JobDescriptionAnalysis = ({ resumeData }: JobDescriptionAnalysisProps) => {
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeMatch = async () => {
    if (!jobDescription.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const result = performAnalysis(jobDescription, resumeData);
      setAnalysis(result);
      setIsAnalyzing(false);
    }, 2000);
  };

  const performAnalysis = (jobDesc: string, resume: any) => {
    // Extract keywords from job description (simplified)
    const jobKeywords = extractKeywords(jobDesc.toLowerCase());
    const resumeText = getResumeText(resume).toLowerCase();
    
    // Calculate match score with proper fallback
    const matchedKeywords = jobKeywords.filter(keyword => 
      resumeText.includes(keyword.toLowerCase())
    );
    
    // Prevent NaN by ensuring we have a valid calculation
    const matchScore = jobKeywords.length > 0 
      ? Math.round((matchedKeywords.length / jobKeywords.length) * 100)
      : 0;
    
    // Generate suggestions
    const missingKeywords = jobKeywords.filter(keyword => 
      !resumeText.includes(keyword.toLowerCase())
    );
    
    const suggestions = generateSuggestions(missingKeywords, matchScore);
    
    return {
      matchScore,
      matchedKeywords,
      missingKeywords: missingKeywords.slice(0, 8), // Limit to top 8
      suggestions,
      strengths: generateStrengths(matchedKeywords),
    };
  };

  const extractKeywords = (text: string) => {
    // Enhanced keyword extraction with more comprehensive list
    const commonKeywords = [
      'javascript', 'react', 'node.js', 'python', 'aws', 'docker', 'kubernetes',
      'project management', 'leadership', 'team collaboration', 'agile', 'scrum',
      'problem solving', 'communication', 'analytical', 'strategic planning',
      'data analysis', 'machine learning', 'artificial intelligence', 'sql',
      'git', 'ci/cd', 'testing', 'debugging', 'optimization', 'scalability',
      'html', 'css', 'typescript', 'angular', 'vue', 'mongodb', 'postgresql',
      'rest api', 'graphql', 'microservices', 'cloud computing', 'devops'
    ];
    
    // Also extract words that appear multiple times in the job description
    const words = text.toLowerCase().match(/\b\w{3,}\b/g) || [];
    const wordFreq: { [key: string]: number } = {};
    
    words.forEach(word => {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    });
    
    // Get frequently mentioned words (appeared 2+ times)
    const frequentWords = Object.keys(wordFreq).filter(word => 
      wordFreq[word] >= 2 && word.length > 3
    );
    
    // Combine common keywords with frequent words from job description
    const allKeywords = [...commonKeywords, ...frequentWords];
    return allKeywords.filter(keyword => text.includes(keyword));
  };

  const getResumeText = (resume: any) => {
    let text = '';
    
    if (resume.personal?.summary) text += resume.personal.summary + ' ';
    if (resume.experience) {
      resume.experience.forEach((exp: any) => {
        text += `${exp.position || ''} ${exp.company || ''} ${exp.description || ''} `;
      });
    }
    if (resume.skills) {
      text += resume.skills.join(' ') + ' ';
    }
    if (resume.education) {
      resume.education.forEach((edu: any) => {
        text += `${edu.degree || ''} ${edu.field || ''} ${edu.institution || ''} `;
      });
    }
    
    return text;
  };

  const generateSuggestions = (missingKeywords: string[], score: number) => {
    const suggestions = [];
    
    if (score < 60) {
      suggestions.push('Consider adding more relevant keywords to your experience descriptions');
      suggestions.push('Tailor your professional summary to match the job requirements');
    }
    
    if (missingKeywords.length > 0) {
      suggestions.push(`Add these key skills to your resume: ${missingKeywords.slice(0, 3).join(', ')}`);
    }
    
    if (score < 40) {
      suggestions.push('Consider gaining experience in the missing technical skills');
      suggestions.push('Highlight transferable skills that relate to the job requirements');
    }
    
    return suggestions;
  };

  const generateStrengths = (matchedKeywords: string[]) => {
    if (matchedKeywords.length === 0) return ['Complete your resume to see your strengths'];
    
    return [
      `Strong match in ${matchedKeywords.length} key areas`,
      'Relevant technical skills identified',
      'Good foundation for this role'
    ].slice(0, matchedKeywords.length > 5 ? 3 : 2);
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-green-600 bg-green-100';
    if (score >= 50) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 75) return <CheckCircle2 className="w-5 h-5" />;
    if (score >= 50) return <TrendingUp className="w-5 h-5" />;
    return <AlertCircle className="w-5 h-5" />;
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Target className="w-5 h-5 text-purple-600" />
          Job Match Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Paste Job Description
          </label>
          <Textarea
            placeholder="Paste the job description here to analyze how well your resume matches the position..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="min-h-[120px]"
          />
        </div>
        
        <Button 
          onClick={analyzeMatch}
          disabled={!jobDescription.trim() || isAnalyzing}
          className="w-full bg-purple-600 hover:bg-purple-700"
        >
          {isAnalyzing ? 'Analyzing Match...' : 'Analyze Job Match'}
        </Button>

        {analysis && (
          <div className="space-y-4 pt-4 border-t">
            {/* Match Score */}
            <div className={`p-4 rounded-lg ${getScoreColor(analysis.matchScore)}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getScoreIcon(analysis.matchScore)}
                  <span className="font-semibold">Match Score</span>
                </div>
                <span className="text-2xl font-bold">{analysis.matchScore}%</span>
              </div>
            </div>

            {/* Strengths */}
            {analysis.strengths.length > 0 && (
              <div>
                <h4 className="font-semibold text-green-700 mb-2 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  Strengths
                </h4>
                <ul className="space-y-1">
                  {analysis.strengths.map((strength: string, index: number) => (
                    <li key={index} className="text-sm text-green-700">• {strength}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Missing Keywords */}
            {analysis.missingKeywords.length > 0 && (
              <div>
                <h4 className="font-semibold text-orange-700 mb-2">Missing Keywords</h4>
                <div className="flex flex-wrap gap-1">
                  {analysis.missingKeywords.map((keyword: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs border-orange-300 text-orange-700">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Suggestions */}
            {analysis.suggestions.length > 0 && (
              <div>
                <h4 className="font-semibold text-blue-700 mb-2 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  Improvement Suggestions
                </h4>
                <ul className="space-y-1">
                  {analysis.suggestions.map((suggestion: string, index: number) => (
                    <li key={index} className="text-sm text-blue-700">• {suggestion}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
