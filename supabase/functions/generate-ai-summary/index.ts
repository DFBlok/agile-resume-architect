
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { role, experience, personalInfo } = await req.json();

    console.log('Generating AI summary for:', { role, experience, personalInfo });

    // Create a detailed prompt for the AI
    const prompt = `Create a professional resume summary for a ${role} with ${experience} of experience. 

Personal information provided:
- Name: ${personalInfo.firstName} ${personalInfo.lastName}
- Location: ${personalInfo.location || 'Not specified'}
- Skills/Background: Based on ${role} role

Requirements:
- Write in third person
- Keep it between 2-4 sentences
- Highlight relevant skills for ${role}
- Mention experience level (${experience})
- Make it professional and compelling
- Focus on achievements and value proposition
- Avoid generic phrases
- Make it specific to the role and experience level

Generate a compelling professional summary that would catch a hiring manager's attention.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'You are a professional resume writer and career coach. Generate compelling, specific, and professional resume summaries that highlight the candidate\'s unique value proposition.' 
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 200,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const generatedSummary = data.choices[0].message.content.trim();

    console.log('Generated summary:', generatedSummary);

    return new Response(JSON.stringify({ summary: generatedSummary }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-ai-summary function:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to generate AI summary', 
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
