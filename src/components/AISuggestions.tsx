import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { aiAnalysisService } from '@/services/aiAnalysisService';
import { Loader2, TrendingUp, Target, Image, DollarSign } from 'lucide-react';

interface AISuggestionsProps {
  campaignId?: string;
  businessData?: any;
  mediaUrls?: string[];
}

const AISuggestions = ({ campaignId, businessData, mediaUrls }: AISuggestionsProps) => {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    if (campaignId) {
      fetchCampaignSuggestions();
    } else if (businessData && mediaUrls) {
      analyzeBusinessProfile();
    }
  }, [campaignId, businessData, mediaUrls]);

  const fetchCampaignSuggestions = async () => {
    if (!campaignId) return;
    
    try {
      setLoading(true);
      const suggestions = await aiAnalysisService.getHistoricalSuggestions(campaignId);
      setSuggestions(suggestions);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      toast({
        title: 'Error',
        description: 'Failed to load AI suggestions',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const analyzeBusinessProfile = async () => {
    if (!businessData || !mediaUrls) return;
    
    try {
      setLoading(true);
      const suggestions = await aiAnalysisService.analyzeBusinessProfile(businessData, mediaUrls);
      setSuggestions(suggestions);
    } catch (error) {
      console.error('Error analyzing business profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to analyze business profile',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'targeting':
        return <Target className="h-4 w-4" />;
      case 'creative':
        return <Image className="h-4 w-4" />;
      case 'budget':
        return <DollarSign className="h-4 w-4" />;
      default:
        return <TrendingUp className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredSuggestions = activeTab === 'all'
    ? suggestions
    : suggestions.filter(s => s.type === activeTab);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Suggestions</CardTitle>
          <CardDescription>
            Get intelligent recommendations to improve your ad performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="targeting">Targeting</TabsTrigger>
              <TabsTrigger value="creative">Creative</TabsTrigger>
              <TabsTrigger value="budget">Budget</TabsTrigger>
              <TabsTrigger value="general">General</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <div className="space-y-4">
                {filteredSuggestions.length > 0 ? (
                  filteredSuggestions.map((suggestion, index) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <div className="flex items-start space-x-4">
                          <div className="mt-1">
                            {getIconForType(suggestion.type)}
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">
                                {suggestion.suggestion}
                              </h4>
                              <Badge className={getPriorityColor(suggestion.priority)}>
                                {suggestion.priority}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {suggestion.reasoning}
                            </p>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-muted-foreground">
                                Confidence: {Math.round(suggestion.confidence * 100)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No suggestions available for this category
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {campaignId && (
        <div className="flex justify-center">
          <Button
            onClick={fetchCampaignSuggestions}
            disabled={loading}
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Refresh Suggestions
          </Button>
        </div>
      )}
    </div>
  );
};

export default AISuggestions; 