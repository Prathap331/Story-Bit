
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
  Filter
} from 'lucide-react';

const SearchResults = () => {
  const { topic } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(topic || '');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [minutesInput, setMinutesInput] = useState('');

  const categories = [
    'All',
    'Technology',
    'Science',
    'Business',
    'Health',
    'Entertainment',
    'Education',
    'Politics',
    'Sports',
    'Travel'
  ];

  const mockResults = [
    {
      id: 1,
      title: "The Hidden Economic Impact of Climate Change",
      description: "Explore how rising temperatures and extreme weather events are reshaping local economies and what entrepreneurs can do to adapt.",
      snippet: "Did you know that 43% of small businesses affected by climate disasters never reopen? This comprehensive analysis reveals...",
      trending: true,
      tags: ["Economics", "Climate", "Business", "Current Events"],
      category: "Business"
    },
    {
      id: 2,
      title: "Why Climate Scientists Are More Worried Than Ever",
      description: "Latest research reveals accelerating climate patterns that have experts reconsidering previous projections and timelines.",
      snippet: "Three major climate tipping points may have already been crossed, according to new data from leading research institutions...",
      trending: false,
      tags: ["Science", "Research", "Climate Change", "Documentary"],
      category: "Science"
    },
    {
      id: 3,
      title: "The Unexpected Winners in a Warming World",
      description: "Some regions and industries are finding opportunities amid climate change challenges, creating complex ethical questions.",
      snippet: "While most suffer from climate change, some are quietly profiting from our warming planet. This investigation uncovers...",
      trending: true,
      tags: ["Economics", "Geography", "Adaptation", "Controversy"],
      category: "Business"
    }
  ];

  const filteredResults = selectedCategory === 'All' 
    ? mockResults 
    : mockResults.filter(result => result.category === selectedCategory);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/search/${encodeURIComponent(query)}`);
    }
  };

  const handleGenerateScript = (scriptId: number, minutes?: string) => {
    console.log(`Generating script ${scriptId} with ${minutes || 'default'} minutes`);
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

          {/* Search Input - Reduced width */}
          <div className="relative mt-6 max-w-2xl">
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

        <div className="flex gap-8">
          {/* Left Sidebar - Category Filters */}
          <div className="w-64 bg-white rounded-lg shadow-lg p-6 h-fit">
            <div className="flex items-center mb-4">
              <Filter className="w-5 h-5 mr-2 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Categories</h4>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    selectedCategory === category
                      ? 'bg-purple-100 text-purple-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Script Ideas</h2>
                <p className="text-gray-600 mt-1">
                  {filteredResults.length} script ideas found for "{topic}"
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

            {/* Script Cards - Single column vertical layout */}
            <div className="space-y-6">
              {filteredResults.map((script) => (
                <Card key={script.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg font-semibold text-blue-600 hover:text-blue-700 cursor-pointer">
                        {script.title}
                      </CardTitle>
                      {script.trending && (
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 ml-2">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Trending
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="text-gray-600 mt-2">
                      {script.description}
                    </CardDescription>
                    <p className="text-sm text-gray-500 italic mt-2">
                      {script.snippet}
                    </p>
                  </CardHeader>
                  <CardContent>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {script.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Minutes Input and Generate Button */}
                    <div className="flex gap-2 mt-4">
                      <Input
                        type="number"
                        placeholder="Minutes"
                        value={minutesInput}
                        onChange={(e) => setMinutesInput(e.target.value)}
                        className="flex-1"
                        min="1"
                        max="60"
                      />
                      <Button 
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                        onClick={() => handleGenerateScript(script.id, minutesInput)}
                      >
                        <PlayCircle className="w-4 h-4 mr-1" />
                        Generate Script
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
