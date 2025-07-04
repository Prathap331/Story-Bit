
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Clock, 
  TrendingUp, 
  FileText, 
  PlayCircle,
  Calendar,
  Eye,
  Heart,
  MessageCircle
} from 'lucide-react';

const SearchResults = () => {
  const { topic } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(topic || '');

  const mockResults = [
    {
      id: 1,
      title: "The Hidden Economic Impact of Climate Change on Small Businesses",
      description: "Explore how rising temperatures and extreme weather events are reshaping local economies and what entrepreneurs can do to adapt.",
      estimatedLength: "8-12 minutes",
      difficulty: "Intermediate",
      trending: true,
      engagement: { views: "2.3M", likes: "45K", comments: "1.2K" },
      tags: ["Economics", "Climate", "Business", "Current Events"],
      hook: "Did you know that 43% of small businesses affected by climate disasters never reopen?"
    },
    {
      id: 2,
      title: "Why Climate Scientists Are More Worried Than Ever in 2024",
      description: "Latest research reveals accelerating climate patterns that have experts reconsidering previous projections and timelines.",
      estimatedLength: "10-15 minutes",
      difficulty: "Advanced",
      trending: false,
      engagement: { views: "1.8M", likes: "38K", comments: "892" },
      tags: ["Science", "Research", "Climate Change", "Documentary"],
      hook: "Three major climate tipping points may have already been crossed, according to new data."
    },
    {
      id: 3,
      title: "The Unexpected Winners in a Warming World",
      description: "Some regions and industries are finding opportunities amid climate change challenges, creating complex ethical and economic questions.",
      estimatedLength: "6-10 minutes",
      difficulty: "Beginner",
      trending: true,
      engagement: { views: "3.1M", likes: "67K", comments: "2.4K" },
      tags: ["Economics", "Geography", "Adaptation", "Controversy"],
      hook: "While most suffer from climate change, some are quietly profiting from our warming planet."
    }
  ];

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/search/${encodeURIComponent(query)}`);
    }
  };

  const handleGenerateScript = (scriptId: number) => {
    navigate(`/script/${scriptId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Script Ideas
          </h1>
          <p className="text-gray-600">
            Discover engaging script ideas for your next video project
          </p>

          {/* Search Input */}
          <div className="relative mt-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for topics, keywords, or themes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
              className="pl-12 pr-4 py-4 text-lg rounded-full border-2 border-gray-200 focus:border-purple-500 shadow-lg"
            />
            <Button
              onClick={() => handleSearch(searchQuery)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6 py-2.5"
            >
              Search Ideas
            </Button>
          </div>
        </div>

        {/* Results Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Script Ideas</h2>
              <p className="text-gray-600 mt-1">
                {mockResults.length} script ideas found for "{topic}"
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-green-50 text-green-700">
                <TrendingUp className="w-3 h-3 mr-1" />
                Trending Topics
              </Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                <Clock className="w-3 h-3 mr-1" />
                Quick Generation
              </Badge>
            </div>
          </div>

          {/* Script Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockResults.map((script) => (
              <Card key={script.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">{script.title}</CardTitle>
                  <CardDescription className="text-gray-600 mt-2">
                    {script.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3 text-sm text-gray-500 mb-3">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {script.estimatedLength}
                    </div>
                    <div className="flex items-center">
                      <FileText className="w-4 h-4 mr-1" />
                      {script.difficulty}
                    </div>
                    {script.trending && (
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                  </div>

                  {/* Engagement Metrics */}
                  <div className="flex items-center space-x-4 text-gray-500 text-sm mb-4">
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {script.engagement.views}
                    </div>
                    <div className="flex items-center">
                      <Heart className="w-4 h-4 mr-1" />
                      {script.engagement.likes}
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      {script.engagement.comments}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {script.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Hook */}
                  <div className="text-gray-700 italic text-sm mb-4">
                    "{script.hook}"
                  </div>

                  {/* Generate Script Button */}
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700" onClick={() => handleGenerateScript(script.id)}>
                    Generate Script
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
