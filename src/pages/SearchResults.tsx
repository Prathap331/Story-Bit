
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, FileText, TrendingUp } from 'lucide-react';

const SearchResults = () => {
  const { topic } = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data for problem statements related to the topic
  const problemStatements = [
    {
      id: 1,
      title: `The Hidden Impact of ${topic} on Global Economy`,
      description: 'Explore the economic implications and market disruptions caused by this trending topic',
      category: 'Economic Analysis',
      difficulty: 'Intermediate'
    },
    {
      id: 2,
      title: `${topic}: A Deep Dive into Public Opinion`,
      description: 'Analyze public sentiment and social media reactions to understand broader implications',
      category: 'Social Impact',
      difficulty: 'Beginner'
    },
    {
      id: 3,
      title: `Technology Behind ${topic}: Expert Analysis`,
      description: 'Technical breakdown and expert insights into the technological aspects',
      category: 'Technology',
      difficulty: 'Advanced'
    },
    {
      id: 4,
      title: `Historical Context: How ${topic} Relates to Past Events`,
      description: 'Drawing parallels with historical events to provide context and perspective',
      category: 'Historical',
      difficulty: 'Intermediate'
    },
    {
      id: 5,
      title: `Future Implications of ${topic}`,
      description: 'Predicting long-term consequences and potential future developments',
      category: 'Future Analysis',
      difficulty: 'Advanced'
    }
  ];

  const categories = ['all', 'Economic Analysis', 'Social Impact', 'Technology', 'Historical', 'Future Analysis'];

  const filteredStatements = problemStatements.filter(statement => {
    return selectedCategory === 'all' || statement.category === selectedCategory;
  });

  const handleStatementClick = (id: number) => {
    navigate(`/script/${id}`);
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
            <div className="mb-4 flex items-center justify-between">
              <p className="text-gray-600">
                Found {filteredStatements.length} script ideas
              </p>
              <Badge variant="secondary">
                <TrendingUp className="w-4 h-4 mr-1" />
                Trending Topic
              </Badge>
            </div>

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
                      <Badge variant="outline" className="ml-4">
                        {statement.difficulty}
                      </Badge>
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
