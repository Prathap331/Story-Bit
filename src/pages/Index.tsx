import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ComingFeatures from '../components/ComingFeatures';
import Footer from '../components/Footer';
import ScriptGenerator from '../components/ScriptGenerator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, TrendingUp, Film, Newspaper, Clock, Users } from 'lucide-react';

const Index = () => {
  const [selectedType, setSelectedType] = useState('news');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const trendingNews = [
    'AI Revolution in Healthcare',
    'Climate Change Solutions 2024',
    'Space Exploration Updates',
    'Cryptocurrency Market Trends',
    'Remote Work Future',
    'Renewable Energy Breakthrough',
    'Electric Vehicle Adoption',
    'Social Media Privacy Laws',
    'Quantum Computing Advances',
    'Global Food Security Crisis',
    'Mental Health Awareness',
    'Cybersecurity Threats 2024',
    'Green Technology Innovation',
    'Digital Banking Evolution',
    'Artificial Intelligence Ethics',
    'Sustainable Fashion Movement',
    'Smart City Development',
    'Gene Therapy Breakthroughs',
    'Virtual Reality Education',
    'Ocean Plastic Pollution'
  ];

  const documentaryTopics = [
    'Ocean Conservation Efforts',
    'Ancient Civilizations Mystery',
    'Wildlife Protection Stories',
    'Technology Evolution Timeline',
    'Human Psychology Insights',
    'Cultural Heritage Preservation',
    'Space Race Documentary',
    'Indigenous Communities',
    'Environmental Activism',
    'Scientific Discoveries',
    'Art History Exploration',
    'Music Evolution Journey',
    'Food Culture Around World',
    'Urban Development Stories',
    'Adventure Sports Culture',
    'Traditional Crafts Revival',
    'Medical Breakthroughs',
    'Educational Innovation',
    'Social Justice Movements',
    'Archaeological Discoveries'
  ];

  const handleSearch = (topic: string) => {
    if (topic.trim()) {
      navigate(`/search/${encodeURIComponent(topic)}`);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSearch(suggestion);
  };

  // Show suggestions based on selected type
  const currentSuggestions = selectedType === 'news' ? trendingNews : documentaryTopics;
  const suggestionTitle = selectedType === 'news' ? 'Trending News Topics' : 'Documentary Ideas';
  const suggestionDescription = selectedType === 'news' 
    ? 'Latest trending topics perfect for news-style videos'
    : 'Compelling documentary subjects for in-depth exploration';

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Write Script for YouTube Video{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
              in 3 Minutes
            </span>
          </h1>
          <p className="text-base text-gray-600 mb-8 leading-relaxed">
            Generate factual and research-based YouTube scripts for any type of videos. 
            Transform your ideas into engaging content with AI-powered scriptwriting.
          </p>

          {/* Type Selection Buttons */}
          <div className="flex justify-center mb-6">
            <div className="bg-white rounded-full p-2 shadow-lg">
              <Button
                variant={selectedType === 'news' ? 'default' : 'ghost'}
                onClick={() => setSelectedType('news')}
                className={`rounded-full px-8 py-3 mx-1 ${
                  selectedType === 'news' 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Newspaper className="w-4 h-4 mr-2" />
                News Stories
              </Button>
              <Button
                variant={selectedType === 'documentaries' ? 'default' : 'ghost'}
                onClick={() => setSelectedType('documentaries')}
                className={`rounded-full px-8 py-3 mx-1 ${
                  selectedType === 'documentaries' 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Film className="w-4 h-4 mr-2" />
                Documentaries
              </Button>
            </div>
          </div>

          {/* Search Section */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for topics, current events, or documentary subjects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                className="pl-12 pr-4 py-5 text-lg rounded-full border-2 border-gray-200 focus:border-purple-500 shadow-lg"
              />
              <Button
                onClick={() => handleSearch(searchQuery)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6 py-2.5"
              >
                Generate Ideas
              </Button>
            </div>
          </div>

          {/* Topic Suggestions - Free flowing layout */}
          <div className="max-w-6xl mx-auto">
            <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-center text-xl">
                  {selectedType === 'news' ? (
                    <TrendingUp className="w-6 h-6 mr-2 text-purple-600" />
                  ) : (
                    <Film className="w-6 h-6 mr-2 text-blue-600" />
                  )}
                  {suggestionTitle}
                </CardTitle>
                <CardDescription className="text-center">
                  {suggestionDescription}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3 justify-center">
                  {currentSuggestions.map((topic, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      onClick={() => handleSuggestionClick(topic)}
                      className={`h-auto px-4 py-3 text-sm font-medium transition-all duration-200 rounded-full border-2 shadow-sm hover:shadow-md ${
                        selectedType === 'news' 
                          ? 'bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 hover:border-purple-300 text-purple-700 border-purple-200' 
                          : 'bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 hover:border-blue-300 text-blue-700 border-blue-200'
                      } whitespace-nowrap`}
                    >
                      {topic}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Features */}
          <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-6">
              <Clock className="w-12 h-12 mx-auto mb-4 text-purple-600" />
              <h3 className="text-lg font-semibold mb-2">Quick Generation</h3>
              <p className="text-gray-600">Create professional scripts in just 3 minutes</p>
            </div>
            <div className="text-center p-6">
              <Users className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-lg font-semibold mb-2">Research-Based</h3>
              <p className="text-gray-600">All content backed by factual research and data</p>
            </div>
            <div className="text-center p-6">
              <Film className="w-12 h-12 mx-auto mb-4 text-indigo-600" />
              <h3 className="text-lg font-semibold mb-2">Multiple Formats</h3>
              <p className="text-gray-600">News stories, documentaries, and more</p>
            </div>
          </div>
        </div>
      </section>

      {/* Script Generator Section */}
      <section className="container mx-auto px-2 sm:px-4 py-8 sm:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
            Start Creating Content
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            Use our AI-powered tools to generate scripts or process topics for your next video content.
            Choose between generating ideas or creating complete scripts.
          </p>
        </div>
        <ScriptGenerator />
      </section>

      {/* Coming Features Section */}
      <ComingFeatures />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
