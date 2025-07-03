
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, FileText, TrendingUp, Clock } from 'lucide-react';

const SearchResults = () => {
  const { topic } = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [videoLength, setVideoLength] = useState('');

  // Mock data for problem statements related to the topic - with extended descriptions
  const problemStatements = [
    {
      id: 1,
      title: `The Hidden Impact of ${topic} on Global Economy`,
      description: 'Explore the comprehensive economic implications and market disruptions caused by this trending topic. This in-depth analysis will examine how various sectors are being affected, from traditional industries to emerging markets. We will investigate the ripple effects on employment, investment patterns, consumer behavior, and international trade relationships. The video will present statistical data, expert interviews, and case studies from different geographical regions to provide a holistic view of the economic transformation taking place.',
      category: 'Economic Analysis'
    },
    {
      id: 2,
      title: `${topic}: A Deep Dive into Public Opinion`,
      description: 'Analyze public sentiment and social media reactions to understand broader implications and societal shifts. This comprehensive examination will utilize sentiment analysis tools, survey data, and social media metrics to gauge public perception across different demographics. We will explore how opinions vary by age groups, geographical locations, and socioeconomic backgrounds. The analysis will also investigate how traditional media coverage influences public opinion and how grassroots movements are shaping the narrative around this topic.',
      category: 'Social Impact'
    },
    {
      id: 3,
      title: `Technology Behind ${topic}: Expert Analysis`,
      description: 'Technical breakdown and expert insights into the technological aspects, innovations, and future developments. This detailed exploration will feature interviews with leading technologists, researchers, and industry pioneers. We will examine the underlying scientific principles, engineering challenges, and breakthrough innovations that are driving progress in this field. The video will also discuss potential technological roadblocks, ethical considerations, and the timeline for future developments.',
      category: 'Technology'
    },
    {
      id: 4,
      title: `Historical Context: How ${topic} Relates to Past Events`,
      description: 'Drawing parallels with historical events to provide context, perspective, and lessons learned from similar situations in the past. This comprehensive historical analysis will trace the evolution of similar phenomena throughout history, examining patterns, outcomes, and long-term consequences. We will consult historical archives, academic research, and expert historians to provide a rich contextual framework that helps viewers understand the current situation within a broader historical perspective.',
      category: 'Historical'
    },
    {
      id: 5,
      title: `Future Implications of ${topic}`,
      description: 'Predicting long-term consequences and potential future developments based on current trends, expert forecasts, and scenario modeling. This forward-looking analysis will present multiple potential futures, examining best-case and worst-case scenarios. We will incorporate insights from futurists, trend analysts, and scenario planners to explore how current developments might unfold over the next decade. The video will also discuss preparation strategies and adaptation measures for individuals and organizations.',
      category: 'Future Analysis'
    }
  ];

  const categories = ['all', 'Economic Analysis', 'Social Impact', 'Technology', 'Historical', 'Future Analysis'];

  const filteredStatements = problemStatements.filter(statement => {
    return selectedCategory === 'all' || statement.category === selectedCategory;
  });

  const handleStatementClick = (id: number) => {
    navigate(`/script/${id}`);
  };

  const handleGenerateScript = () => {
    if (videoLength.trim()) {
      console.log(`Generating script with ${videoLength} minutes duration`);
      // Navigate to script generation with video length parameter
      navigate(`/script/1?duration=${videoLength}`);
    }
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
                Found {filteredStatements.length} script ideas
              </p>
              <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800">
                <TrendingUp className="w-4 h-4 mr-1" />
                Trending Topic
              </Badge>
            </div>

            {/* Video Length Input and Generate Script */}
            <Card className="mb-6 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Length of Video (Minutes)
                    </label>
                    <Input
                      type="number"
                      placeholder="Enter video duration in minutes"
                      value={videoLength}
                      onChange={(e) => setVideoLength(e.target.value)}
                      className="w-full"
                      min="1"
                      max="60"
                    />
                  </div>
                  <div className="pt-6">
                    <Button
                      onClick={handleGenerateScript}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      disabled={!videoLength.trim()}
                    >
                      <Clock className="w-4 h-4 mr-2" />
                      Generate Script
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              {filteredStatements.map((statement) => (
                <Card
                  key={statement.id}
                  className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm"
                  onClick={() => handleStatementClick(statement.id)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2 hover:text-purple-600 transition-colors">
                          {statement.title}
                        </CardTitle>
                        <CardDescription className="text-gray-600 leading-relaxed">
                          {statement.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4">
                      <Badge variant="secondary">
                        {statement.category}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

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
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
