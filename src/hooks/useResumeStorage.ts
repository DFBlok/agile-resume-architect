
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ResumeData {
  personal: any;
  experience: any[];
  education: any[];
  skills: string[];
}

export const useResumeStorage = () => {
  const [resumeId, setResumeId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load existing resume data on component mount
  useEffect(() => {
    loadExistingResume();
  }, []);

  const loadExistingResume = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Error loading resume:', error);
        return;
      }

      if (data) {
        setResumeId(data.id);
      }
    } catch (error) {
      console.error('Error in loadExistingResume:', error);
    }
  };

  const saveResumeData = async (resumeData: ResumeData) => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Please log in to save your resume data');
        return;
      }

      const resumePayload = {
        user_id: user.id,
        personal_info: resumeData.personal,
        experience: resumeData.experience,
        education: resumeData.education,
        skills: resumeData.skills,
      };

      if (resumeId) {
        // Update existing resume
        const { error } = await supabase
          .from('resumes')
          .update(resumePayload)
          .eq('id', resumeId);

        if (error) {
          console.error('Error updating resume:', error);
          toast.error('Failed to save resume data');
          return;
        }
      } else {
        // Create new resume
        const { data, error } = await supabase
          .from('resumes')
          .insert(resumePayload)
          .select('id')
          .single();

        if (error) {
          console.error('Error creating resume:', error);
          toast.error('Failed to save resume data');
          return;
        }

        if (data) {
          setResumeId(data.id);
        }
      }

      toast.success('Resume data saved successfully!');
    } catch (error) {
      console.error('Error in saveResumeData:', error);
      toast.error('Failed to save resume data');
    } finally {
      setIsLoading(false);
    }
  };

  const loadResumeData = async (): Promise<ResumeData | null> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Error loading resume data:', error);
        return null;
      }

      if (data) {
        return {
          personal: data.personal_info || {},
          experience: data.experience || [],
          education: data.education || [],
          skills: data.skills || []
        };
      }

      return null;
    } catch (error) {
      console.error('Error in loadResumeData:', error);
      return null;
    }
  };

  return {
    saveResumeData,
    loadResumeData,
    isLoading,
    resumeId
  };
};
