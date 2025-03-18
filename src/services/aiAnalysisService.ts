
import { supabase } from '@/integrations/supabase/client';
import OpenAI from 'openai';

interface AdCampaignData {
  id: string;
  platform: 'meta' | 'google';
  metrics: {
    impressions: number;
    clicks: number;
    spend: number;
    conversions: number;
    ctr: number;
    cpc: number;
  };
  targeting: {
    age_range?: string[];
    gender?: string[];
    interests?: string[];
    locations?: string[];
  };
  creatives: {
    type: string;
    url: string;
    performance_score?: number;
  }[];
}

interface AISuggestion {
  type: 'targeting' | 'creative' | 'budget' | 'general';
  suggestion: string;
  reasoning: string;
  confidence: number;
  priority: 'high' | 'medium' | 'low';
  campaign_id?: string;
  created_at?: string;
}

// Create an ai_suggestions type for our mock implementation
interface AITableRow {
  id: string;
  campaign_id: string;
  type: string;
  suggestion: string;
  reasoning: string;
  confidence: number;
  priority: string;
  created_at: string;
}

class AIAnalysisService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || '',
    });
  }

  // Analyze campaign performance and generate insights
  async analyzeCampaign(campaignData: AdCampaignData): Promise<AISuggestion[]> {
    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are an expert digital marketing analyst. Analyze the campaign data and provide actionable insights."
          },
          {
            role: "user",
            content: JSON.stringify(campaignData)
          }
        ],
        temperature: 0.7,
      });

      const suggestions = this.parseSuggestions(response.choices[0].message.content || '');
      await this.storeSuggestions(campaignData.id, suggestions);
      return suggestions;
    } catch (error) {
      console.error('Error analyzing campaign:', error);
      throw error;
    }
  }

  // Analyze business profile and media for ad recommendations
  async analyzeBusinessProfile(
    businessData: any,
    mediaUrls: string[]
  ): Promise<AISuggestion[]> {
    try {
      // First, analyze the media using GPT-4 Vision
      const mediaAnalysis = await this.analyzeMedia(mediaUrls);

      const response = await this.openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are an expert in digital advertising and brand strategy. Analyze the business profile and media analysis to provide recommendations for advertising."
          },
          {
            role: "user",
            content: JSON.stringify({
              business: businessData,
              mediaAnalysis
            })
          }
        ],
        temperature: 0.7,
      });

      return this.parseSuggestions(response.choices[0].message.content || '');
    } catch (error) {
      console.error('Error analyzing business profile:', error);
      throw error;
    }
  }

  // Analyze uploaded media for ad suitability
  private async analyzeMedia(mediaUrls: string[]): Promise<any> {
    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Analyze these images for their advertising potential. Consider visual appeal, brand consistency, and potential audience impact."
          },
          {
            role: "user",
            content: "Analyze these images: " + mediaUrls.join(", ")
          }
        ],
        max_tokens: 500,
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error('Error analyzing media:', error);
      throw error;
    }
  }

  // Store AI suggestions in Supabase
  private async storeSuggestions(campaignId: string, suggestions: AISuggestion[]): Promise<void> {
    // Since the ai_suggestions table doesn't exist in our schema, we'll simulate storing
    // by logging the suggestions - in a real implementation, we would create this table
    console.log(`Storing suggestions for campaign ${campaignId}:`, suggestions);
    
    // In a real implementation with the ai_suggestions table:
    // const { error } = await supabase
    //   .from('ai_suggestions')
    //   .insert(suggestions.map(suggestion => ({
    //     campaign_id: campaignId,
    //     ...suggestion,
    //     created_at: new Date().toISOString(),
    //   })));
    //
    // if (error) throw error;
  }

  // Parse OpenAI response into structured suggestions
  private parseSuggestions(aiResponse: string): AISuggestion[] {
    try {
      // Attempt to parse if response is JSON
      return JSON.parse(aiResponse);
    } catch {
      // If not JSON, create a structured suggestion from the text
      return [{
        type: 'general',
        suggestion: aiResponse,
        reasoning: 'Generated from AI analysis',
        confidence: 0.7,
        priority: 'medium'
      }];
    }
  }

  // Get historical suggestions for a campaign
  async getHistoricalSuggestions(campaignId: string): Promise<AISuggestion[]> {
    // Since we don't have the ai_suggestions table, return mock data
    console.log(`Getting suggestions for campaign ${campaignId}`);
    
    // Mock suggestions
    return [
      {
        type: 'targeting',
        suggestion: 'Consider expanding to 25-34 age group',
        reasoning: 'This demographic shows higher engagement',
        confidence: 0.85,
        priority: 'high',
        campaign_id: campaignId,
        created_at: new Date().toISOString()
      },
      {
        type: 'budget',
        suggestion: 'Increase weekend budget by 20%',
        reasoning: 'Weekend performance is 35% better',
        confidence: 0.78,
        priority: 'medium',
        campaign_id: campaignId,
        created_at: new Date().toISOString()
      }
    ];
    
    // Real implementation when table exists:
    // const { data, error } = await supabase
    //   .from('ai_suggestions')
    //   .select('*')
    //   .eq('campaign_id', campaignId)
    //   .order('created_at', { ascending: false });
    //
    // if (error) throw error;
    // return data;
  }
}

export const aiAnalysisService = new AIAnalysisService();
