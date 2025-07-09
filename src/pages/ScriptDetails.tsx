import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  FileText, 
  Heart, 
  Lightbulb, 
  BookOpen, 
  History, 
  Search, 
  Link,
  ExternalLink,
  Languages,
  Monitor,
  Download,
  Eye,
  ChevronDown,
  Loader2
} from 'lucide-react';

const ScriptDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scriptViewed, setScriptViewed] = useState(false);
  const [showTranslateOptions, setShowTranslateOptions] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [searchLanguage, setSearchLanguage] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [isGeneratingTeleprompter, setIsGeneratingTeleprompter] = useState(false);
  const [nativeLanguageScript, setNativeLanguageScript] = useState('');
  const [teleprompterScript, setTeleprompterScript] = useState('');
  const [currentView, setCurrentView] = useState<'original' | 'native' | 'teleprompter'>('original');

  // Mock script data
  const scriptData = {
    title: "The Hidden Impact of Climate Change on Global Economy",
    metrics: {
      totalWords: 1247,
      videoLength: 12.5,
      emotionalDepth: 75,
      generalExamples: 8,
      proverbs: 3,
      historicalExamples: 5,
      historicalFacts: 12,
      researchFacts: 18,
      lawsIncluded: 4,
      keywords: [
        'empathetic',
        'compelling',
        'factual',
        'engaging',
        'analytical',
        'persuasive'
      ]
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

The script is structured to maintain audience attention through strategic pacing, incorporating both emotional appeals and logical arguments. Research-based facts are woven throughout to establish credibility, while real-world examples make complex economic concepts accessible to general audiences. Historical context provides perspective on current challenges, and the conclusion motivates viewers toward meaningful action.

This script leverages multiple research sources, statistical data from reputable organizations, and case studies from various industries affected by climate change. The content is designed to be both informative and engaging, suitable for educational content creators, documentary filmmakers, and news channels focusing on climate and economic issues.

The emotional depth is carefully calibrated to connect with viewers without overwhelming them, using storytelling techniques that make complex economic data relatable and actionable. The script includes specific examples from different geographic regions and economic sectors to provide a comprehensive global perspective on climate change's economic implications.`,
    sources: [
      {
        title: "IPCC Climate Change and Land Report 2019",
        url: "https://www.ipcc.ch/srccl/",
        description: "Comprehensive analysis of climate change impacts on land use and agriculture"
      },
      {
        title: "World Bank Climate Change Action Plan",
        url: "https://www.worldbank.org/en/topic/climatechange",
        description: "Economic analysis of climate change adaptation and mitigation strategies"
      },
      {
        title: "McKinsey Global Institute Climate Risk Report",
        url: "https://www.mckinsey.com/business-functions/sustainability/our-insights",
        description: "Business and economic implications of physical climate risks"
      },
      {
        title: "Federal Reserve Climate Risk Assessment",
        url: "https://www.federalreserve.gov/econres/climate-change.htm",
        description: "Financial system stability and climate-related economic risks"
      },
      {
        title: "Nature Climate Change Journal",
        url: "https://www.nature.com/nclimate/",
        description: "Peer-reviewed research on climate science and economic impacts"
      },
      {
        title: "UNEP Global Environment Outlook",
        url: "https://www.unep.org/global-environment-outlook",
        description: "Environmental and economic trends analysis from UN Environment Programme"
      }
    ]
  };

  const languages = [
    'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Russian', 
    'Chinese', 'Japanese', 'Korean', 'Arabic', 'Hindi', 'Dutch'
  ];

  const filteredLanguages = languages.filter(lang => 
    lang.toLowerCase().includes(searchLanguage.toLowerCase())
  );

  const handleViewFullScript = () => {
    setScriptViewed(true);
  };

  const handleTranslate = () => {
    setShowTranslateOptions(!showTranslateOptions);
  };

  const handleLanguageSelect = async (language: string) => {
    setSelectedLanguage(language);
    setShowTranslateOptions(false);
    setIsTranslating(true);
    
    // Simulate API call for translation
    setTimeout(() => {
      const translatedScript = `[${language} Translation]\n\n${scriptData.synopsis}\n\n[This is a simulated translation to ${language}. In a real implementation, this would be the actual translated content from your translation service.]`;
      setNativeLanguageScript(translatedScript);
      setCurrentView('native');
      setIsTranslating(false);
    }, 2000);
  };

  const handleTeleprompter = async () => {
    if (currentView === 'original') {
      // If viewing original, first convert to native language (English as default)
      setIsTranslating(true);
      setTimeout(() => {
        const defaultNativeScript = scriptData.synopsis;
        setNativeLanguageScript(defaultNativeScript);
        setCurrentView('native');
        setIsTranslating(false);
        
        // Then convert to teleprompter
        generateTeleprompterScript(defaultNativeScript);
      }, 1000);
    } else {
      // If already in native language, convert to teleprompter
      generateTeleprompterScript(nativeLanguageScript);
    }
  };

  const generateTeleprompterScript = (sourceScript: string) => {
    setIsGeneratingTeleprompter(true);
    
    // Simulate API call for teleprompter conversion
    setTimeout(() => {
      const teleScript = sourceScript
        .split('\n\n')
        .map(paragraph => {
          if (paragraph.trim()) {
            return `${paragraph}\n\n[PAUSE - 2 seconds]\n`;
          }
          return paragraph;
        })
        .join('\n')
        .replace(/\./g, '.\n[BREATH]\n')
        .replace(/[?!]/g, match => `${match}\n[PAUSE - 1 second]\n`);
      
      setTeleprompterScript(`[TELEPROMPTER VERSION]\n\n${teleScript}\n\n[END OF SCRIPT]`);
      setCurrentView('teleprompter');
      setIsGeneratingTeleprompter(false);
    }, 1500);
  };

  const handleDownload = () => {
    setShowDownloadModal(true);
  };

  const downloadScript = (type: 'script' | 'native' | 'teleprompter') => {
    let content = '';
    let filename = '';
    
    switch (type) {
      case 'script':
        content = `${scriptData.title}\n\n${scriptData.synopsis}`;
        filename = `${scriptData.title}-Original-Script.doc`;
        break;
      case 'native':
        content = nativeLanguageScript || `${scriptData.title}\n\n${scriptData.synopsis}`;
        filename = `${scriptData.title}-Native-Language.doc`;
        break;
      case 'teleprompter':
        content = teleprompterScript || `${scriptData.title}\n\nTeleprompter Version\n\n${scriptData.synopsis.replace(/\n\n/g, '\n\n[PAUSE]\n\n')}`;
        filename = `${scriptData.title}-Teleprompter.doc`;
        break;
    }
    
    const blob = new Blob([content], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setShowDownloadModal(false);
  };

  const getCurrentScript = () => {
    switch (currentView) {
      case 'native':
        return nativeLanguageScript;
      case 'teleprompter':
        return teleprompterScript;
      default:
        return scriptData.synopsis;
    }
  };

  const getViewTitle = () => {
    switch (currentView) {
      case 'native':
        return `Script Synopsis - Native Language${selectedLanguage ? ` (${selectedLanguage})` : ''}`;
      case 'teleprompter':
        return 'Script Synopsis - Teleprompter Version';
      default:
        return 'Script Synopsis';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {scriptData.title}
          </h1>
          <p className="text-gray-600">
            Generated script with comprehensive research and strategic structure
          </p>
        </div>

        {/* Script Metrics - Top Rectangular Box */}
        <Card className="shadow-lg mb-8">
          <CardHeader>
            <CardTitle>Script Metrics</CardTitle>
            <CardDescription>
              Comprehensive analysis of your generated script
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-6 gap-4 mb-6">
              <div className="text-center">
                <FileText className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <div className="text-2xl font-bold text-gray-900">
                  {scriptData.metrics.totalWords}
                </div>
                <div className="text-sm text-gray-600">Total Words</div>
              </div>
              
              <div className="text-center">
                <Heart className="w-8 h-8 mx-auto mb-2 text-red-500" />
                <div className="text-2xl font-bold text-gray-900">
                  {scriptData.metrics.emotionalDepth}%
                </div>
                <div className="text-sm text-gray-600">Emotional Depth</div>
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
            </div>

            {/* Keywords Section */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Keywords</h4>
              <div className="flex flex-wrap gap-2">
                {scriptData.metrics.keywords.map((keyword, index) => (
                  <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800 px-4 py-2">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content - 25% : 75% Grid Layout */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Column - Script Structure & Sources (25% width) */}
          <div className="lg:col-span-1 space-y-6">
            {/* Script Structure */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Script Structure Flow</CardTitle>
                <CardDescription>
                  Visual representation of your script's flow and structure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-3 pr-4">
                    {scriptData.structure.map((section, index) => (
                      <div key={section.id} className="flex items-center">
                        <div className="flex flex-col items-center mr-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                            {index + 1}
                          </div>
                          {index < scriptData.structure.length - 1 && (
                            <div className="w-0.5 h-6 bg-gradient-to-b from-purple-600 to-blue-600 mt-1"></div>
                          )}
                        </div>
                        <div className="flex-1 bg-white/50 rounded-lg p-3 border border-gray-200">
                          <h3 className="font-semibold text-gray-900 mb-1 text-sm">{section.title}</h3>
                          <div className="text-xs text-gray-600">
                            {section.duration} • {section.words} words
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Sources Section */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Link className="w-5 h-5 mr-2" />
                  Research Sources
                </CardTitle>
                <CardDescription>
                  Credible sources and references used in this script
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4 pr-4">
                    {scriptData.sources.map((source, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <ExternalLink className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-1">
                            {source.title}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2">
                            {source.description}
                          </p>
                          <a 
                            href={source.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:text-blue-800 underline"
                          >
                            {source.url}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Synopsis (75% width) */}
          <div className="lg:col-span-3">
            {/* Synopsis with Action Buttons in Header */}
            <Card className="shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex flex-col space-y-4">
                  <div>
                    <CardTitle className="text-lg">{getViewTitle()}</CardTitle>
                    <CardDescription>
                      {currentView === 'teleprompter' 
                        ? 'Teleprompter-optimized version with timing cues and pauses'
                        : currentView === 'native'
                        ? 'Converted to native language version'
                        : 'Comprehensive overview of your script content and approach'
                      }
                    </CardDescription>
                  </div>
                  
                  {/* Action Buttons in Header */}
                  <div className="flex space-x-3">
                    <Button 
                      size="sm" 
                      className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
                      onClick={handleViewFullScript}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Full Script
                    </Button>

                    <div className="relative flex-1">
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                        onClick={handleTranslate}
                        disabled={!scriptViewed || isTranslating}
                      >
                        {isTranslating ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                            Translating...
                          </>
                        ) : (
                          <>
                            <Languages className="w-4 h-4 mr-1" />
                            Native Language
                            <ChevronDown className="w-3 h-3 ml-1" />
                          </>
                        )}
                      </Button>

                      {showTranslateOptions && scriptViewed && (
                        <Card className="absolute top-full mt-2 w-full z-50 shadow-lg bg-white">
                          <CardHeader>
                            <CardTitle className="text-sm">Select Language</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <Input
                                placeholder="Search languages..."
                                value={searchLanguage}
                                onChange={(e) => setSearchLanguage(e.target.value)}
                                className="text-sm"
                              />
                              <div className="max-h-40 overflow-y-auto space-y-1">
                                {filteredLanguages.map((language) => (
                                  <Button
                                    key={language}
                                    variant="outline"
                                    size="sm"
                                    className="w-full justify-start"
                                    onClick={() => handleLanguageSelect(language)}
                                  >
                                    {language}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={handleTeleprompter}
                      disabled={!scriptViewed || isGeneratingTeleprompter}
                    >
                      {isGeneratingTeleprompter ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                          Converting...
                        </>
                      ) : (
                        <>
                          <Monitor className="w-4 h-4 mr-1" />
                          Teleprompter
                        </>
                      )}
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={handleDownload}
                      disabled={!scriptViewed}
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0 flex-1">
                <ScrollArea className="h-[800px]">
                  <div className="prose prose-sm max-w-none">
                    <div className="text-gray-700 leading-relaxed whitespace-pre-line text-base">
                      {getCurrentScript()}
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Download Modal */}
      <Dialog open={showDownloadModal} onOpenChange={setShowDownloadModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Download Options</DialogTitle>
            <DialogDescription>
              Choose the format you'd like to download
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Button
              onClick={() => downloadScript('script')}
              className="w-full justify-start"
              variant="outline"
            >
              <FileText className="w-4 h-4 mr-2" />
              Original Script
            </Button>
            <Button
              onClick={() => downloadScript('native')}
              className="w-full justify-start"
              variant="outline"
              disabled={!nativeLanguageScript && currentView === 'original'}
            >
              <Languages className="w-4 h-4 mr-2" />
              Native Language Version
            </Button>
            <Button
              onClick={() => downloadScript('teleprompter')}
              className="w-full justify-start"
              variant="outline"
              disabled={!teleprompterScript && currentView !== 'teleprompter'}
            >
              <Monitor className="w-4 h-4 mr-2" />
              Teleprompter Version
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ScriptDetails;
