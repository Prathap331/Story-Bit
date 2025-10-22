
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, FileText, TrendingUp, Clock, Loader2, AlertCircle } from 'lucide-react';
import { ApiService } from '../services/api';

interface ScriptIdea {
  id: number;
  title: string;
  description: string;
  category: string;
}

// Global cache to store results across component remounts
const resultsCache = new Map<string, {
  scriptIdeas: ScriptIdea[];
  error: string | null;
  timestamp: number;
}>();

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Function to clean up old cache entries
const cleanupCache = () => {
  const now = Date.now();
  for (const [key, value] of resultsCache.entries()) {
    if (now - value.timestamp > CACHE_DURATION) {
      resultsCache.delete(key);
    }
  }
};

const SearchResults = () => {
  const { topic } = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [videoLengths, setVideoLengths] = useState<{[key: number]: string}>({});
  const [scriptIdeas, setScriptIdeas] = useState<ScriptIdea[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = ['all', 'Technology', 'Social Impact', 'Economic Analysis', 'Historical', 'Future Analysis'];

  // Clean up old cache entries on component mount
  useEffect(() => {
    cleanupCache();
  }, []);

  // Fetch script ideas from API with resilient retry and persistent loader (up to ~2 minutes)
  const initialLoadStartRef = useRef<number | null>(null);
  useEffect(() => {
    let isCancelled = false;

    const run = async () => {
      if (!topic) return;

      // Check cache first
      const cachedResult = resultsCache.get(topic);
      const now = Date.now();
      
      if (cachedResult && (now - cachedResult.timestamp) < CACHE_DURATION) {
        // Use cached data
        setScriptIdeas(cachedResult.scriptIdeas);
        setError(cachedResult.error);
        setIsLoading(false);
        return;
      }

      // initialize load start for this topic
      initialLoadStartRef.current = Date.now();
      setIsLoading(true);
      setError(null);
      setScriptIdeas([]);

      const maxWaitMs = 120000; // 2 minutes total wait budget
      const retryDelayMs = 5000; // 5s between retries when 502

      while (!isCancelled) {
        try {
          const response = await ApiService.processTopic(topic);
          if (isCancelled) return;

          const ideas: ScriptIdea[] = response.ideas.map((idea, index) => ({
            id: index + 1,
            title: idea,
            description: response.descriptions[index] || 'No description available.',
            category: getCategoryFromIndex(index)
          }));

          // Cache the successful result
          resultsCache.set(topic, {
            scriptIdeas: ideas,
            error: null,
            timestamp: Date.now()
          });

          setScriptIdeas(ideas);
          setIsLoading(false);
          return; // success
        } catch (err) {
          const elapsed = Date.now() - (initialLoadStartRef.current ?? Date.now());
          const message = err instanceof Error ? err.message : String(err);

          // If it's a 502 or startup-like condition and we still have budget, wait and retry without clearing loader
          const isRetryable = message.includes('502') || message.toLowerCase().includes('temporarily unavailable');
          if (isRetryable && elapsed + retryDelayMs < maxWaitMs) {
            await new Promise(r => setTimeout(r, retryDelayMs));
            continue; // retry loop
          }

          // Give up: show friendly message and fallback data
          if (isCancelled) return;
          const fallbackIdeas: ScriptIdea[] = [
            {
              id: 1,
              title: `Understanding ${topic}: A Comprehensive Analysis`,
              description: `Dive deep into the world of ${topic} and explore its various aspects, implications, and real-world applications. This comprehensive analysis will provide you with valuable insights and perspectives that will help you understand the topic from multiple angles.`,
              category: 'Technology'
            },
            {
              id: 2,
              title: `The Impact of ${topic} on Modern Society`,
              description: `Explore how ${topic} is shaping our world today and what it means for the future. This analysis covers social implications, economic effects, and cultural changes brought about by this trending topic.`,
              category: 'Social Impact'
            },
            {
              id: 3,
              title: `Future Trends: Where ${topic} is Heading`,
              description: `Get a glimpse into the future of ${topic} and discover what experts predict will happen next. This forward-looking analysis examines emerging trends, potential developments, and what to expect in the coming years.`,
              category: 'Future Analysis'
            }
          ];

          // Cache the fallback result
          const errorMessage = message.includes('timeout') 
            ? 'API request timed out after waiting. Using sample data.'
            : message.includes('502')
            ? 'API server returned 502 for an extended period. Using sample data.'
            : 'API temporarily unavailable. Using sample data.';

          resultsCache.set(topic, {
            scriptIdeas: fallbackIdeas,
            error: errorMessage,
            timestamp: Date.now()
          });

          setScriptIdeas(fallbackIdeas);
          setError(errorMessage);
          setIsLoading(false);
          return;
        }
      }
    };

    run();
    return () => {
      isCancelled = true;
    };
  }, [topic]);

  // Helper function to assign categories based on index
  const getCategoryFromIndex = (index: number): string => {
    const categoryMap = ['Technology', 'Social Impact', 'Economic Analysis', 'Historical', 'Future Analysis'];
    return categoryMap[index % categoryMap.length];
  };

  const filteredStatements = scriptIdeas.filter(statement => {
    return selectedCategory === 'all' || statement.category === selectedCategory;
  });

  const handleStatementClick = (id: number) => {
    navigate(`/script/${id}`);
  };

  const handleGenerateScript = (id: number) => {
    const videoLength = videoLengths[id];
    if (videoLength && videoLength.trim()) {
      console.log(`Generating script for idea ${id} with ${videoLength} minutes duration`);
      navigate(`/script/${id}?duration=${videoLength}`);
    }
  };

  const handleVideoLengthChange = (id: number, value: string) => {
    setVideoLengths(prev => ({
      ...prev,
      [id]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Script Ideas for: <span className="text-purple-600">{topic}</span>
          </h1>
          <p className="text-gray-600">
            Choose from various problem statements and perspectives for your YouTube script
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Category Filter */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">
                    Category
                  </label>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        onClick={() => setSelectedCategory(category)}
                        className="w-full justify-start"
                        size="sm"
                      >
                        {category === 'all' ? 'All Categories' : category}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={() => setSelectedCategory('all')}
                  variant="outline"
                  className="w-full"
                >
                  Reset Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600">
                {isLoading ? 'Loading script ideas...' : `Found ${filteredStatements.length} script ideas`}
              </p>
            </div>

            {/* Loading State */}
            {isLoading && (
              <Card className="text-center py-12">
                <CardContent>
                  <div className="flex flex-col items-center space-y-4">
                    <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Generating Script Ideas
                      </h3>
                      <p className="text-gray-600">
                        Our AI is analyzing "{topic}" and creating personalized script ideas for you...
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        This may take up to 2 minutes
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Error State */}
            {error && (
              <Card className="text-center py-8 border-yellow-200 bg-yellow-50 mb-6">
                <CardContent>
                  <div className="flex flex-col items-center space-y-4">
                    <AlertCircle className="w-6 h-6 text-yellow-600" />
                    <div>
                      <h3 className="text-lg font-semibold text-yellow-900 mb-2">
                        API Temporarily Unavailable
                      </h3>
                      <p className="text-yellow-700 mb-4">
                        {error}
                      </p>
                      <Button
                        onClick={() => window.location.reload()}
                        variant="outline"
                        className="border-yellow-300 text-yellow-700 hover:bg-yellow-100"
                      >
                        Try Again
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Results */}
            {!isLoading && (
              <div className="space-y-6">
                {filteredStatements.map((statement) => (
                  <Card
                    key={statement.id}
                    className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <CardTitle 
                              className="text-xl hover:text-purple-600 transition-colors cursor-pointer mr-3"
                              onClick={() => handleStatementClick(statement.id)}
                            >
                              {statement.title}
                            </CardTitle>
                            <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Trending
                            </Badge>
                          </div>
                          <CardDescription className="text-gray-600 leading-relaxed">
                            {statement.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">
                          {statement.category}
                        </Badge>
                        
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2">
                            <label className="text-sm font-medium text-gray-700">
                              Length (min):
                            </label>
                            <Input
                              type="number"
                              placeholder="10"
                              value={videoLengths[statement.id] || ''}
                              onChange={(e) => handleVideoLengthChange(statement.id, e.target.value)}
                              className="w-20"
                              min="1"
                              max="60"
                            />
                          </div>
                          <Button
                            onClick={() => handleGenerateScript(statement.id)}
                            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold"
                            disabled={!videoLengths[statement.id]?.trim()}
                            size="sm"
                          >
                            <Clock className="w-4 h-4 mr-2" />
                            Generate Script
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {filteredStatements.length === 0 && (
                  <Card className="text-center py-12">
                    <CardContent>
                      <p className="text-gray-500 text-lg mb-4">
                        No scripts match your current filters
                      </p>
                      <Button
                        onClick={() => setSelectedCategory('all')}
                        variant="outline"
                      >
                        Reset Filters
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
