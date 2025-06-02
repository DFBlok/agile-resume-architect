
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Mail, Phone, MapPin, Globe, Linkedin } from "lucide-react";

interface ResumePreviewProps {
  resumeData: any;
  onBack: () => void;
}

export const ResumePreview = ({ resumeData, onBack }: ResumePreviewProps) => {
  const { personal = {}, experience = [], education = [], skills = [] } = resumeData;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Editor
          </Button>
        </div>

        {/* Resume Preview */}
        <Card className="max-w-4xl mx-auto shadow-2xl">
          <CardContent className="p-0">
            {/* Modern Template */}
            <div className="bg-white">
              {/* Header */}
              <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-8">
                <h1 className="text-4xl font-bold mb-2">
                  {personal.firstName} {personal.lastName}
                </h1>
                <div className="flex flex-wrap gap-4 text-slate-300">
                  {personal.email && (
                    <div className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {personal.email}
                    </div>
                  )}
                  {personal.phone && (
                    <div className="flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      {personal.phone}
                    </div>
                  )}
                  {personal.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {personal.location}
                    </div>
                  )}
                  {personal.website && (
                    <div className="flex items-center gap-1">
                      <Globe className="w-4 h-4" />
                      {personal.website}
                    </div>
                  )}
                  {personal.linkedin && (
                    <div className="flex items-center gap-1">
                      <Linkedin className="w-4 h-4" />
                      {personal.linkedin}
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-8">
                {/* Professional Summary */}
                {personal.summary && (
                  <section>
                    <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-blue-500 pb-2">
                      Professional Summary
                    </h2>
                    <p className="text-slate-700 leading-relaxed">{personal.summary}</p>
                  </section>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                  <section>
                    <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-blue-500 pb-2">
                      Professional Experience
                    </h2>
                    <div className="space-y-6">
                      {experience.map((exp: any, index: number) => (
                        <div key={index} className="border-l-4 border-blue-500 pl-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="text-xl font-semibold text-slate-800">{exp.position}</h3>
                              <p className="text-lg text-blue-600 font-medium">{exp.company}</p>
                              <p className="text-slate-600">{exp.location}</p>
                            </div>
                            <div className="text-slate-600 text-right">
                              <p>
                                {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                              </p>
                            </div>
                          </div>
                          {exp.description && (
                            <div className="text-slate-700 whitespace-pre-line">
                              {exp.description}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Education */}
                {education.length > 0 && (
                  <section>
                    <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-blue-500 pb-2">
                      Education
                    </h2>
                    <div className="space-y-4">
                      {education.map((edu: any, index: number) => (
                        <div key={index} className="border-l-4 border-green-500 pl-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-semibold text-slate-800">
                                {edu.degree} in {edu.field}
                              </h3>
                              <p className="text-green-600 font-medium">{edu.institution}</p>
                              <p className="text-slate-600">{edu.location}</p>
                              {edu.gpa && (
                                <p className="text-slate-600">GPA: {edu.gpa}</p>
                              )}
                            </div>
                            <div className="text-slate-600">
                              <p>{edu.graduationDate}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Skills */}
                {skills.length > 0 && (
                  <section>
                    <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-blue-500 pb-2">
                      Skills & Technologies
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill: string, index: number) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
