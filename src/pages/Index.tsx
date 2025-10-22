import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ComingFeatures from '../components/ComingFeatures';
import Footer from '../components/Footer';
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
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section - White Background */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-6 leading-tight font-sans">
              Write Script for YouTube Video in{' '}
              <span className="bg-black text-white px-4 py-2 rounded text-3xl md:text-4xl font-bold">
                 3 Minutes
              </span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto font-sans">
              Generate factual and research-based YouTube scripts for any type of videos. 
              Transform your ideas into engaging content with AI-powered scriptwriting.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section - Dark Background */}
      <section className="bg-gray-800 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-10">

            {/* Type Selection Toggle */}
            <div className="flex justify-center mb-16">
              <div className="bg-white rounded-full py-2 px-4 shadow-sm border border-gray-200">
                <div className="flex">
                  <Button
                    variant="ghost"
                    onClick={() => setSelectedType('news')}
                    className={`px-6 py-3 text-sm font-medium font-sans transition-all duration-300 ease-in-out rounded-full ${
                      selectedType === 'news' 
                        ? 'bg-gray-100 text-gray-800 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    <Newspaper className="w-4 h-4 mr-2" />
                    New Stories
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setSelectedType('documentaries')}
                    className={`px-6 py-3 text-sm font-medium font-sans transition-all duration-300 ease-in-out rounded-full ${
                      selectedType === 'documentaries' 
                        ? 'bg-gray-100 text-gray-800 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    Documentaries
                  </Button>
                </div>
              </div>
            </div>

            {/* Search Section */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search for topics, current events, and documentary ideas"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                  className="pl-14 pr-32 py-6 text-lg rounded-full border-0 bg-gray-200 text-black placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-gray-400 hover:bg-gray-100 transition-all duration-300 ease-in-out font-sans w-full"
                />
                <Button
                  onClick={() => handleSearch(searchQuery)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full bg-black text-white hover:bg-gray-800 hover:shadow-xl hover:scale-105 px-8 py-3 font-medium font-sans transition-all duration-300 ease-in-out"
                >
                  Generate Ideas
                </Button>
              </div>
            </div>

            {/* Trending Topics Section */}
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <h2 className="flex items-center text-2xl font-bold text-white mb-6 font-sans">
                  <TrendingUp className="w-6 h-6 mr-3" />
                  Trending Topics
                </h2>
                <div className="flex flex-wrap gap-3">
                  {currentSuggestions.slice(0, 11).map((topic, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      onClick={() => handleSuggestionClick(topic)}
                      className="h-auto px-6 py-3 text-sm font-medium transition-all duration-300 ease-in-out transform rounded-full border-0 bg-white text-black hover:bg-gray-50 hover:shadow-lg hover:scale-105 hover:-translate-y-1 whitespace-nowrap font-sans group"
                    >
                      <span className="transition-colors duration-300 group-hover:text-gray-800">
                        {topic}
                      </span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
        </div>
      </section>

      {/* Coming Features Section */}
      <ComingFeatures />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
