import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdAccountsConnection from '@/components/AdAccountsConnection';
import AISuggestions from '@/components/AISuggestions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { Upload } from 'lucide-react';

const AdManager = () => {
  const [businessData, setBusinessData] = useState({
    name: '',
    description: '',
    industry: '',
    targetAudience: '',
    goals: '',
  });
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);

  const handleBusinessDataChange = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBusinessData(prev => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setMediaFiles(prev => [...prev, ...files]);

    // Create temporary URLs for preview
    const urls = files.map(file => URL.createObjectURL(file));
    setMediaUrls(prev => [...prev, ...urls]);
  };

  const handleAnalyze = () => {
    if (!businessData.name || !businessData.description) {
      toast({
        title: 'Missing Information',
        description: 'Please provide business name and description',
        variant: 'destructive',
      });
      return;
    }

    if (mediaFiles.length === 0) {
      toast({
        title: 'No Media',
        description: 'Please upload at least one media file for analysis',
        variant: 'destructive',
      });
      return;
    }

    // The AISuggestions component will handle the analysis
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold">Ad Campaign Manager</h1>
      
      <Tabs defaultValue="accounts" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="accounts">Ad Accounts</TabsTrigger>
          <TabsTrigger value="business">Business Profile</TabsTrigger>
          <TabsTrigger value="suggestions">AI Suggestions</TabsTrigger>
        </TabsList>

        <TabsContent value="accounts" className="mt-6">
          <AdAccountsConnection />
        </TabsContent>

        <TabsContent value="business" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Business Profile</CardTitle>
              <CardDescription>
                Provide information about your business to get personalized AI suggestions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Business Name</Label>
                <Input
                  id="name"
                  value={businessData.name}
                  onChange={handleBusinessDataChange('name')}
                  placeholder="Enter your business name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Business Description</Label>
                <Textarea
                  id="description"
                  value={businessData.description}
                  onChange={handleBusinessDataChange('description')}
                  placeholder="Describe your business and what makes it unique"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Input
                  id="industry"
                  value={businessData.industry}
                  onChange={handleBusinessDataChange('industry')}
                  placeholder="E.g., Technology, Retail, Healthcare"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetAudience">Target Audience</Label>
                <Textarea
                  id="targetAudience"
                  value={businessData.targetAudience}
                  onChange={handleBusinessDataChange('targetAudience')}
                  placeholder="Describe your ideal customer profile"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="goals">Business Goals</Label>
                <Textarea
                  id="goals"
                  value={businessData.goals}
                  onChange={handleBusinessDataChange('goals')}
                  placeholder="What are your main advertising objectives?"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Upload Media</Label>
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById('media-upload')?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Files
                  </Button>
                  <input
                    id="media-upload"
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    className="hidden"
                    onChange={handleMediaUpload}
                  />
                  <span className="text-sm text-muted-foreground">
                    {mediaFiles.length} file(s) selected
                  </span>
                </div>
              </div>

              {mediaUrls.length > 0 && (
                <div className="grid grid-cols-4 gap-4 mt-4">
                  {mediaUrls.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`Upload preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}

              <Button onClick={handleAnalyze} className="w-full">
                Analyze Business Profile
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suggestions" className="mt-6">
          <AISuggestions
            businessData={businessData}
            mediaUrls={mediaUrls}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdManager; 