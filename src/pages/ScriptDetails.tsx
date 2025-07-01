
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  FileText, 
  Clock, 
  Heart, 
  Lightbulb, 
  BookOpen, 
  History, 
  Search, 
  Scale,
  Download,
  Share
} from 'lucide-react';

const ScriptDetails = () => {
  const { id } = useParams();
  const [activeSection, setActiveSection] = useState('introduction');

  // Mock script data
  const scriptData = {
    title: "The Hidden Impact of Climate Change on Global Economy",
    metrics: {
      totalWords: 1247,
      videoLength: 12.5,
      emotionalDepth: 75, // 0-100 scale
      generalExamples: 8,
      proverbs: 3,
      historicalExamples: 5,
      historicalFacts: 12,
      researchFacts: 18,
      lawsIncluded: 4
    },
    structure: [
      { id: 'introduction', title: 'Hook & Introduction', duration: '0:00-1:30', words: 187 },
      { id: 'problem', title: 'Problem Statement', duration: '1:30-3:00', words: 156 },
      { id: 'evidence', title: 'Evidence & Data', duration: '3:00-5:30', words: 298 },
      { id: 'examples', title: 'Real-world Examples', duration: '5:30-8:00', words: 245 },
      { id: 'solutions', title: 'Potential Solutions', duration: '8:00-10:30', words: 234 },
      { id: 'conclusion', title: 'Call to Action', duration: '10:30-12:30', words: 127 }
    ],
    synopsis: `This comprehensive script explores the hidden economic impacts of climate change, examining how environmental changes are reshaping global markets, industries, and financial systems. The script provides a balanced analysis combining factual data with real-world examples to illustrate the far-reaching economic consequences of climate change.

The narrative begins with a compelling hook about climate change's economic impact on daily life, then systematically presents evidence through statistical data, case studies, and expert insights. The script maintains viewer engagement through strategic use of examples, historical parallels, and emotional connections while building toward actionable solutions and a strong call to action.

Key themes include agricultural productivity decline, extreme weather costs, insurance industry transformation, real estate market changes, and emerging green economy opportunities. The script balances concern with optimism, presenting challenges alongside innovative solutions and economic opportunities.`
  };

  const getEmotionalDepthLabel = (depth: number) => {
    if (depth < 30) return "Logical Analysis";
    if (depth < 70) return "Balanced Approach";
    return "Connecting with Emotions";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {scriptData.title}
            </h1>
            <p className="text-gray-600">
              Generated script with comprehensive research and strategic structure
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Metrics Section */}
          <div className="lg:col-span-4 mb-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Script Metrics</CardTitle>
                <CardDescription>
                  Comprehensive analysis of your generated script
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 lg:grid-cols-8 gap-6">
                  <div className="text-center">
                    <FileText className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                    <div className="text-2xl font-bold text-gray-900">
                      {scriptData.metrics.totalWords}
                    </div>
                    <div className="text-sm text-gray-600">Total Words</div>
                  </div>
                  
                  <div className="text-center">
                    <Clock className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold text-gray-900">
                      {scriptData.metrics.videoLength}m
                    </div>
                    <div className="text-sm text-gray-600">Video Length</div>
                  </div>
                  
                  <div className="text-center">
                    <Heart className="w-8 h-8 mx-auto mb-2 text-red-500" />
                    <div className="text-2xl font-bold text-gray-900">
                      {scriptData.metrics.emotionalDepth}%
                    </div>
                    <div className="text-sm text-gray-600">
                      {getEmotionalDepthLabel(scriptData.metrics.emotionalDepth)}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <Lightbulb className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                    <div className="text-2xl font-bold text-gray-900">
                      {scriptData.metrics.generalExamples}
                    </div>
                    <div className="text-sm text-gray-600">Examples</div>
                  </div>
                  
                  <div className="text-center">
                    <BookOpen className="w-8 h-8 mx-auto mb-2 text-green-600" />
                    <div className="text-2xl font-bold text-gray-900">
                      {scriptData.metrics.proverbs}
                    </div>
                    <div className="text-sm text-gray-600">Proverbs</div>
                  </div>
                  
                  <div className="text-center">
                    <History className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                    <div className="text-2xl font-bold text-gray-900">
                      {scriptData.metrics.historicalFacts}
                    </div>
                    <div className="text-sm text-gray-600">Historical Facts</div>
                  </div>
                  
                  <div className="text-center">
                    <Search className="w-8 h-8 mx-auto mb-2 text-indigo-600" />
                    <div className="text-2xl font-bold text-gray-900">
                      {scriptData.metrics.researchFacts}
                    </div>
                    <div className="text-sm text-gray-600">Research Facts</div>
                  </div>
                  
                  <div className="text-center">
                    <Scale className="w-8 h-8 mx-auto mb-2 text-teal-600" />
                    <div className="text-2xl font-bold text-gray-900">
                      {scriptData.metrics.lawsIncluded}
                    </div>
                    <div className="text-sm text-gray-600">Laws Included</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-lg mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Script Structure</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-64">
                  <div className="p-6 space-y-2">
                    {scriptData.structure.map((section, index) => (
                      <div key={section.id}>
                        <Button
                          variant={activeSection === section.id ? "default" : "ghost"}
                          onClick={() => setActiveSection(section.id)}
                          className="w-full justify-start text-left h-auto p-3"
                        >
                          <div className="flex flex-col items-start">
                            <div className="font-medium">{section.title}</div>
                            <div className="text-xs text-gray-500 mt-1">
                              {section.duration} • {section.words} words
                            </div>
                          </div>
                        </Button>
                        {index < scriptData.structure.length - 1 && (
                          <Separator className="my-2" />
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Synopsis Section */}
            <Card className="sticky top-96 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Synopsis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-700 leading-relaxed">
                  {scriptData.synopsis}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content Section - Static content, not linked to structure */}
          <div className="lg:col-span-3">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">Full Script Content</CardTitle>
                    <CardDescription>
                      Complete script ready for your video production
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose prose-lg max-w-none">
                  <div className="whitespace-pre-line text-gray-800 leading-relaxed space-y-6">
                    <div className="border-l-4 border-purple-500 pl-4">
                      <h3 className="font-bold text-lg mb-2">Hook & Introduction</h3>
                      <p>Did you know that climate change isn't just melting ice caps and causing extreme weather? It's quietly reshaping the global economy in ways that affect your daily life right now. From the coffee you drink to the mortgage rates you pay, climate change is an economic force that's already costing the world trillions of dollars annually.</p>
                      <p>Today, we're diving deep into the hidden economic impacts of climate change – impacts that mainstream media often overlooks but that are fundamentally changing how money flows around the world.</p>
                    </div>

                    <div className="border-l-4 border-blue-500 pl-4">
                      <h3 className="font-bold text-lg mb-2">Problem Statement</h3>
                      <p>Here's the stark reality: climate change is costing the global economy approximately $150 billion annually, and this figure is accelerating rapidly. But these aren't just abstract numbers on a spreadsheet – they represent fundamental shifts in how our economic systems operate.</p>
                      <p>The World Bank estimates that without immediate action, climate change could reduce global GDP by 10-23% by 2100. To put this in perspective, the 2008 financial crisis reduced global GDP by just 0.6%.</p>
                    </div>

                    <div className="border-l-4 border-green-500 pl-4">
                      <h3 className="font-bold text-lg mb-2">Evidence & Data</h3>
                      <p>Let's examine the data that reveals the true scope of this economic transformation:</p>
                      <p>First, agricultural productivity has declined by 21% since 1961 due to climate change, according to Cornell University research. This isn't just about farmers – it directly impacts food prices globally.</p>
                      <p>Second, extreme weather events caused $280 billion in damages in 2021 alone. Hurricane Ida cost $65 billion, while European floods caused $43 billion in damages.</p>
                      <p>Third, the insurance industry is restructuring entirely. Swiss Re estimates that insurers face $23 trillion in climate-related losses by 2100.</p>
                    </div>

                    <div className="border-l-4 border-orange-500 pl-4">
                      <h3 className="font-bold text-lg mb-2">Call to Action</h3>
                      <p>The economic impact of climate change isn't a future problem – it's reshaping markets, investments, and opportunities right now. While the challenges are significant, they're also creating unprecedented opportunities for innovation and growth.</p>
                      <p>As individuals and businesses, we can't afford to ignore these economic realities. Whether you're making investment decisions, career choices, or simply trying to understand why prices are changing, climate economics affects you.</p>
                      <p>What economic impacts of climate change have you noticed in your daily life? Share your observations in the comments below, and don't forget to subscribe for more deep dives into the hidden forces shaping our world.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScriptDetails;
