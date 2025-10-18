import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, FileText, Lightbulb, ExternalLink, Database, Globe, Clock, Copy, Check, Film } from 'lucide-react';
import { generateScript, processTopic, type GenerateScriptResponse, type ProcessTopicResponse } from '@/lib/api';

interface ScriptGeneratorProps {
  className?: string;
}

// Function to parse script into sections
const parseScriptSections = (script: string) => {
  const sections = [];
  const lines = script.split('\n');
  let currentSection = { title: '', content: '', icon: null, subtitle: '' };
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Check for main headers (##)
    if (line.startsWith('## ')) {
      // Save previous section if it has content
      if (currentSection.content.trim()) {
        sections.push({ ...currentSection });
      }
      
      // Start new section
      const title = line.replace('## ', '');
      currentSection = {
        title: title,
        content: '',
        icon: getSectionIcon(title),
        subtitle: getSectionSubtitle(title)
      };
    }
    // Check for metadata at the beginning
    else if (line.includes('Word Count:') || line.includes('Video Length:')) {
      if (!sections.length) {
        sections.push({
          title: 'Script Overview',
          content: line,
          icon: <FileText className="w-5 h-5 text-blue-600" />,
          subtitle: 'Script metadata and specifications'
        });
      }
    }
    // Check for separators
    else if (line === '---') {
      // Skip separators, they'll be handled in formatting
      continue;
    }
    // Add content to current section
    else if (line) {
      currentSection.content += (currentSection.content ? '\n' : '') + line;
    }
  }
  
  // Add the last section
  if (currentSection.content.trim()) {
    sections.push(currentSection);
  }
  
  return sections;
};

// Helper function to get appropriate icon for section
const getSectionIcon = (title: string) => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('hook') || lowerTitle.includes('introduction')) {
    return <Lightbulb className="w-5 h-5 text-yellow-600" />;
  } else if (lowerTitle.includes('problem')) {
    return <Database className="w-5 h-5 text-red-600" />;
  } else if (lowerTitle.includes('evidence') || lowerTitle.includes('data')) {
    return <Globe className="w-5 h-5 text-green-600" />;
  } else if (lowerTitle.includes('example') || lowerTitle.includes('real-world')) {
    return <ExternalLink className="w-5 h-5 text-blue-600" />;
  } else if (lowerTitle.includes('solution')) {
    return <Check className="w-5 h-5 text-purple-600" />;
  } else if (lowerTitle.includes('call to action') || lowerTitle.includes('conclusion')) {
    return <Film className="w-5 h-5 text-indigo-600" />;
  } else {
    return <FileText className="w-5 h-5 text-gray-600" />;
  }
};

// Helper function to get section subtitle
const getSectionSubtitle = (title: string) => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('hook') || lowerTitle.includes('introduction')) {
    return 'Opening hook and topic introduction';
  } else if (lowerTitle.includes('problem')) {
    return 'Problem statement and current challenges';
  } else if (lowerTitle.includes('evidence') || lowerTitle.includes('data')) {
    return 'Supporting evidence and data points';
  } else if (lowerTitle.includes('example') || lowerTitle.includes('real-world')) {
    return 'Real-world examples and case studies';
  } else if (lowerTitle.includes('solution')) {
    return 'Potential solutions and recommendations';
  } else if (lowerTitle.includes('call to action') || lowerTitle.includes('conclusion')) {
    return 'Call to action and conclusion';
  } else {
    return 'Script section content';
  }
};

// Function to format script content from markdown to HTML
const formatScriptContent = (content: string): string => {
  return content
    // Convert **(Video Length: ...)** to styled info box
    .replace(/\*\*\(Video Length: (.*?)\)\*\*/g, '<div class="bg-green-50 border border-green-200 rounded-lg p-3 mb-4"><div class="flex items-center"><Clock className="w-4 h-4 mr-2 text-green-600" /><span class="text-sm font-medium text-green-800">Video Length: $1</span></div></div>')
    // Convert **(Total Word Count: ...)** to styled info box
    .replace(/\*\*\(Total Word Count: (.*?)\)\*\*/g, '<div class="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4"><div class="flex items-center"><FileText className="w-4 h-4 mr-2 text-blue-600" /><span class="text-sm font-medium text-blue-800">Total Word Count: $1</span></div></div>')
    // Convert (Word Count: ...) to styled info box
    .replace(/\(Word Count: (.*?)\)/g, '<div class="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4"><div class="flex items-center"><FileText className="w-4 h-4 mr-2 text-blue-600" /><span class="text-sm font-medium text-blue-800">Word Count: $1</span></div></div>')
    // Convert (Video Title Suggestion: ...) to styled title box
    .replace(/\(Video Title Suggestion: (.*?)\)/g, '<div class="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-4 mb-6"><div class="flex items-center"><Film className="w-5 h-5 mr-3 text-indigo-600" /><div><div class="text-sm font-semibold text-indigo-800 uppercase tracking-wide mb-1">Video Title Suggestion</div><div class="text-lg font-bold text-indigo-900">$1</div></div></div></div>')
          // Convert --- to styled separator
          .replace(/^---$/gm, '<div class="border-t-2 border-purple-300 my-2"></div>')
    // Convert ## headers to styled section headers (both numbered and unnumbered)
    .replace(/^## (.+)$/gim, '<h2 class="text-xl font-bold text-purple-800 mt-8 mb-4 pb-2 border-b-2 border-purple-300 bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">$1</h2>')
    // Convert ### headers to styled subheaders
    .replace(/^### (.+)$/gim, '<h3 class="text-lg font-semibold text-purple-700 mt-6 mb-3 pb-1 border-b border-purple-200 bg-purple-50 p-3 rounded">$1</h3>')
    // Convert **HOST:** to styled speaker labels
    .replace(/\*\*HOST:\*\*/g, '<span class="inline-block bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold mr-3 shadow-sm">HOST:</span>')
    // Convert **(Visual: ...)** to styled visual cues
    .replace(/\*\*\(Visual: (.*?)\)\*\*/g, '<div class="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-400 p-4 my-3 rounded-r-lg shadow-sm"><div class="flex items-start"><div class="bg-blue-100 rounded-full p-1 mr-3 mt-0.5"><Film className="w-3 h-3 text-blue-600" /></div><div><div class="text-xs font-semibold text-blue-800 uppercase tracking-wide mb-1">Visual Direction</div><div class="text-sm text-blue-700 italic">$1</div></div></div></div>')
    // Convert **(Approx. ...)** to styled timing info
    .replace(/\*\*\(Approx\. (.*?)\)\*\*/g, '<span class="inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium mr-2">$1</span>')
    // Convert **bold** to <strong> (but not the ones we've already handled)
    .replace(/\*\*([^()]*?)\*\*/g, '<strong class="font-bold text-gray-800">$1</strong>')
    // Convert *italic* to <em>
    .replace(/\*(.*?)\*/g, '<em class="italic text-gray-600">$1</em>')
          // Convert line breaks to <br>
          .replace(/\n/g, '<br>')
          // Convert multiple line breaks to paragraph breaks
          .replace(/(<br>\s*){3,}/g, '</p><p class="mb-4 leading-relaxed">')
          // Wrap in paragraph tags
          .replace(/^(.*)$/gm, '<p class="mb-3 leading-relaxed">$1</p>')
          // Clean up empty paragraphs
          .replace(/<p class="mb-3 leading-relaxed"><br><\/p>/g, '')
          .replace(/<p class="mb-3 leading-relaxed"><\/p>/g, '')
          // Clean up any remaining empty tags
          .replace(/<p class="mb-3 leading-relaxed"><\/p>/g, '')
          // Fix any remaining hr elements with excessive margins
          .replace(/<hr[^>]*>/g, '<div class="border-t-2 border-purple-300 my-2"></div>');
};

export default function ScriptGenerator({ className = '' }: ScriptGeneratorProps) {
  const [topic, setTopic] = useState('');
  const [isGeneratingScript, setIsGeneratingScript] = useState(false);
  const [isProcessingTopic, setIsProcessingTopic] = useState(false);
  const [scriptResult, setScriptResult] = useState<GenerateScriptResponse | null>(null);
  const [topicResult, setTopicResult] = useState<ProcessTopicResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerateScript = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic');
      return;
    }

    setIsGeneratingScript(true);
    setError(null);
    setScriptResult(null);

    try {
      const result = await generateScript({ topic: topic.trim() });
      setScriptResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate script');
    } finally {
      setIsGeneratingScript(false);
    }
  };

  const handleProcessTopic = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic');
      return;
    }

    setIsProcessingTopic(true);
    setError(null);
    setTopicResult(null);

    try {
      const result = await processTopic({ topic: topic.trim() });
      setTopicResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process topic');
    } finally {
      setIsProcessingTopic(false);
    }
  };

  const clearResults = () => {
    setScriptResult(null);
    setTopicResult(null);
    setError(null);
    setCopied(false);
  };

  const copyToClipboard = async () => {
    if (scriptResult) {
      try {
        await navigator.clipboard.writeText(scriptResult.script);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  return (
    <div className={`w-full max-w-7xl mx-auto space-y-4 sm:space-y-6 px-2 sm:px-4 ${className}`}>
      {/* Input Section */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="px-3 sm:px-6">
          <CardTitle className="text-xl sm:text-2xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight">
            StoryBit AI Content Generator
          </CardTitle>
          <CardDescription className="text-center text-gray-600 text-sm sm:text-base px-2">
            Generate scripts or process topics with AI-powered content creation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 px-3 sm:px-6">
          <div className="flex flex-col gap-3">
            <Input
              type="text"
              placeholder="Enter your topic or idea..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (handleGenerateScript() || handleProcessTopic())}
              className="w-full text-base sm:text-lg py-3 px-4 rounded-lg border-2 border-gray-200 focus:border-purple-500"
            />
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button
                onClick={handleProcessTopic}
                disabled={isProcessingTopic || isGeneratingScript}
                className="w-full sm:flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 sm:px-6 py-3 rounded-lg font-medium text-sm sm:text-base"
              >
                {isProcessingTopic ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Lightbulb className="w-4 h-4 mr-2" />
                )}
                <span className="hidden sm:inline">
                  {isProcessingTopic ? 'Processing...' : 'Generate Ideas'}
                </span>
                <span className="sm:hidden">
                  {isProcessingTopic ? 'Processing...' : 'Ideas'}
                </span>
              </Button>
              <Button
                onClick={handleGenerateScript}
                disabled={isGeneratingScript || isProcessingTopic}
                className="w-full sm:flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 sm:px-6 py-3 rounded-lg font-medium text-sm sm:text-base"
              >
                {isGeneratingScript ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <FileText className="w-4 h-4 mr-2" />
                )}
                <span className="hidden sm:inline">
                  {isGeneratingScript ? 'Generating...' : 'Generate Script'}
                </span>
                <span className="sm:hidden">
                  {isGeneratingScript ? 'Generating...' : 'Script'}
                </span>
              </Button>
            </div>
          </div>
          
          {(scriptResult || topicResult || error) && (
            <Button
              onClick={clearResults}
              variant="outline"
              className="w-full text-sm sm:text-base"
            >
              Clear Results
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Loading State */}
      {(isGeneratingScript || isProcessingTopic) && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-4 sm:pt-6 px-3 sm:px-6">
            <div className="flex flex-col sm:flex-row items-center justify-center text-blue-600 text-center sm:text-left">
              <Loader2 className="w-5 h-5 mr-0 sm:mr-3 animate-spin mb-2 sm:mb-0" />
              <div>
                <p className="font-medium text-sm sm:text-base">
                  {isGeneratingScript ? 'Generating Script...' : 'Processing Topic...'}
                </p>
                <p className="text-xs sm:text-sm mt-1">
                  This may take up to 2 minutes. Please don't close this page.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error Display */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-4 sm:pt-6 px-3 sm:px-6">
            <div className="flex flex-col sm:flex-row items-start text-red-600">
              <span className="font-medium text-sm sm:text-base">Error: </span>
              <span className="text-sm sm:text-base mt-1 sm:mt-0 sm:ml-2">{error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Section */}
      <div className={`space-y-6 ${(topicResult && scriptResult) ? 'lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0' : ''}`}>
        {/* Dual Results Header */}
        {(topicResult && scriptResult) && (
          <div className="lg:hidden">
            <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-600 font-medium">
                📊 Both results generated! Scroll down to view all content.
              </p>
            </div>
          </div>
        )}
        {/* Process Topic Results */}
        {topicResult && (
          <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardHeader className="px-3 sm:px-6">
              <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center text-lg sm:text-xl text-blue-800 gap-2 sm:gap-0">
                <div className="flex items-center">
                  <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                  <span>Generated Ideas</span>
                </div>
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                AI-powered topic analysis and content ideas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 px-3 sm:px-6">
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-sm text-gray-700">Source:</span>
                  </div>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                    {topicResult.source_of_context}
                  </Badge>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Content Ideas:</h4>
                  <div className="space-y-2">
                    {topicResult.ideas.map((idea, index) => (
                      <div key={index} className="p-2 sm:p-3 bg-white rounded-lg border border-blue-200">
                        <p className="text-xs sm:text-sm text-gray-700">{idea}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Descriptions:</h4>
                  <div className="space-y-2">
                    {topicResult.descriptions.map((description, index) => (
                      <div key={index} className="p-2 sm:p-3 bg-white rounded-lg border border-blue-200">
                        <p className="text-xs sm:text-sm text-gray-700">{description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {topicResult.source_urls.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Source URLs:</h4>
                      <div className="space-y-1">
                        {topicResult.source_urls.map((url, index) => (
                          <a
                            key={index}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-start text-xs sm:text-sm text-blue-600 hover:text-blue-800 hover:underline break-all"
                          >
                            <ExternalLink className="w-3 h-3 mr-1 mt-0.5 flex-shrink-0" />
                            <span className="break-all">{url}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                
                {topicResult.scraped_text_context && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Context:</h4>
                      <ScrollArea className="h-24 sm:h-32 w-full">
                        <p className="text-xs sm:text-sm text-gray-700 p-2 sm:p-3 bg-white rounded-lg border border-blue-200">
                          {topicResult.scraped_text_context}
                        </p>
                      </ScrollArea>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Generate Script Results */}
        {scriptResult && (
          <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-pink-50">
            <CardHeader className="px-3 sm:px-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                <div className="flex items-center">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-purple-800" />
                  <div>
                    <CardTitle className="text-lg sm:text-xl text-purple-800">
                      Generated Script
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base">
                      AI-generated video script for your topic
                    </CardDescription>
                  </div>
                </div>
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 w-full sm:w-auto text-xs sm:text-sm"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">Copied!</span>
                      <span className="sm:hidden">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">Copy Script</span>
                      <span className="sm:hidden">Copy</span>
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="px-3 sm:px-6">
              <ScrollArea className="h-[1500px] w-full">
                <div className="p-4 bg-white rounded-lg border border-purple-200">
                  <div 
                    className="text-gray-800 leading-relaxed text-sm"
                    dangerouslySetInnerHTML={{
                      __html: formatScriptContent(scriptResult.script)
                    }}
                  />
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
