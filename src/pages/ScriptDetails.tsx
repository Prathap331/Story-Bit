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

Key themes include agricultural productivity decline, extreme weather costs, insurance industry transformation, real estate market changes, and emerging green economy opportunities. The script balances concern with optimism, presenting challenges alongside innovative solutions and economic opportunities.

The script is structured to maintain audience attention through strategic pacing, incorporating both emotional appeals and logical arguments. Research-based facts are woven throughout to establish credibility, while real-world examples make complex economic concepts accessible to general audiences. Historical context provides perspective on current challenges, and the conclusion motivates viewers toward meaningful action.`
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

          {/* Script Structure Flow Diagram */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Script Structure Flow</CardTitle>
                <CardDescription>
                  Visual representation of your script's flow and structure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scriptData.structure.map((section, index) => (
                    <div key={section.id} className="flex items-center">
                      <div className="flex flex-col items-center mr-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </div>
                        {index < scriptData.structure.length - 1 && (
                          <div className="w-0.5 h-8 bg-gradient-to-b from-purple-600 to-blue-600 mt-2"></div>
                        )}
                      </div>
                      <div className="flex-1 bg-white/50 rounded-lg p-4 border border-gray-200">
                        <h3 className="font-semibold text-gray-900 mb-1">{section.title}</h3>
                        <div className="text-sm text-gray-600">
                          {section.duration} • {section.words} words
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Synopsis Section */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Script Synopsis</CardTitle>
                <CardDescription>
                  Comprehensive overview of your script content and approach
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line text-sm">
                    {scriptData.synopsis}
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
