
import { useState, useEffect, useCallback } from 'react';
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

  // Use useCallback to prevent infinite loops
  const loadResumeData = useCallback(async (): Promise<ResumeData | null> => {
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
        // Helper function to safely convert Json array to string array
        const convertToStringArray = (jsonData: any): string[] => {
          if (Array.isArray(jsonData)) {
            return jsonData.filter((item): item is string => typeof item === 'string');
          }
          return [];
        };

        return {
          personal: data.personal_info || {},
          experience: Array.isArray(data.experience) ? data.experience : [],
          education: Array.isArray(data.education) ? data.education : [],
          skills: convertToStringArray(data.skills)
        };
      }

      return null;
    } catch (error) {
      console.error('Error in loadResumeData:', error);
      return null;
    }
  }, []);

  const loadExistingResume = useCallback(async () => {
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
  }, []);

  // Load existing resume data on component mount
  useEffect(() => {
    loadExistingResume();
  }, [loadExistingResume]);

  const saveResumeData = async (resumeData: ResumeData) => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Please log in to save your resume data');
        return;
      }

      console.log('Saving resume data:', resumeData);

      const resumePayload = {
        user_id: user.id,
        personal_info: resumeData.personal,
        experience: resumeData.experience,
        education: resumeData.education,
        skills: resumeData.skills,
      };

      console.log('Resume payload:', resumePayload);

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
        console.log('Resume updated successfully');
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
          console.log('New resume created with ID:', data.id);
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

  return {
    saveResumeData,
    loadResumeData,
    isLoading,
    resumeId
  };
};
