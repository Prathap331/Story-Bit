
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Video, 
  Zap, 
  Clock, 
  Users, 
  Sparkles, 
  TrendingUp, 
  FileText, 
  Play,
  Star,
  CheckCircle,
  Image,
  Film
} from 'lucide-react';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search/${encodeURIComponent(searchQuery)}`);
    }
  };

  const trendingTopics = [
    'Climate Change Impact',
    'AI in Healthcare',
    'Space Exploration',
    'Cryptocurrency Future',
    'Remote Work Revolution',
    'Sustainable Energy'
  ];

  const features = [
    {
      icon: <Video className="w-12 h-12 text-purple-600" />,
      title: "AI Script Generation",
      description: "Generate compelling video scripts with advanced AI that understands your audience and creates engaging narratives."
    },
    {
      icon: <Zap className="w-12 h-12 text-yellow-500" />,
      title: "Lightning Fast",
      description: "Create professional scripts in minutes, not hours. Our AI processes your ideas and delivers quality content instantly."
    },
    {
      icon: <Users className="w-12 h-12 text-blue-600" />,
      title: "Audience Targeting",
      description: "Tailor your scripts for specific demographics and platforms to maximize engagement and reach."
    },
    {
      icon: <Sparkles className="w-12 h-12 text-pink-500" />,
      title: "Creative Enhancement",
      description: "Add creative flair with built-in storytelling techniques, hooks, and calls-to-action that convert."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Content Creator",
      content: "ScriptAI has revolutionized my content creation process. I can now produce engaging scripts in half the time!",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Marketing Director",
      content: "The quality and speed of script generation is incredible. Our video campaigns have never been more effective.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "YouTuber",
      content: "Finally, a tool that understands storytelling. My audience engagement has increased by 200% since using ScriptAI.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Header />
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Create Compelling Video Scripts with{' '}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              AI Magic
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transform your ideas into engaging video scripts instantly. Our AI understands storytelling, 
            audience psychology, and platform-specific requirements to create content that captivates and converts.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
            <Input
              type="text"
              placeholder="Enter your video topic or idea..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-12 pr-4 py-6 text-lg rounded-full border-2 border-gray-200 focus:border-purple-500 shadow-lg"
            />
            <Button
              onClick={handleSearch}
              size="lg"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-3"
            >
              Generate Script
            </Button>
          </div>

          {/* Trending Topics */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <span className="text-sm text-gray-500 mr-2">Trending:</span>
            {trendingTopics.map((topic, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="cursor-pointer hover:bg-purple-100 transition-colors"
                onClick={() => {
                  setSearchQuery(topic);
                  navigate(`/search/${encodeURIComponent(topic)}`);
                }}
              >
                <TrendingUp className="w-3 h-3 mr-1" />
                {topic}
              </Badge>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">50K+</div>
            <div className="text-gray-600">Scripts Generated</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">2M+</div>
            <div className="text-gray-600">Words Written</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
            <div className="text-gray-600">User Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">30s</div>
            <div className="text-gray-600">Average Generation Time</div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Powerful Features for Content Creators
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Enter Your Topic</h3>
              <p className="text-gray-600">
                Simply describe your video idea, target audience, and desired length. Our AI will understand your vision.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Magic Happens</h3>
              <p className="text-gray-600">
                Our advanced AI analyzes trends, audience preferences, and storytelling techniques to craft your script.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Your Script</h3>
              <p className="text-gray-600">
                Receive a polished, engaging script ready for production. Edit, customize, and bring your vision to life.
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Coming Soon Section - Two Features Only */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Coming Soon: AI Digital Assets
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Image Generation */}
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <Image className="w-16 h-16 text-purple-600" />
                </div>
                <CardTitle className="text-xl text-center">AI Image Generation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center">
                  Generate custom thumbnails, graphics, and visual assets perfectly matched to your script content. 
                  Create eye-catching visuals that complement your narrative and boost engagement.
                </CardDescription>
                <div className="mt-6 space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Custom thumbnail generation
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Brand-consistent graphics
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Multiple style options
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Right Column - Video Clip Generation */}
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <Film className="w-16 h-16 text-blue-600" />
                </div>
                <CardTitle className="text-xl text-center">Video Clip Generation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center">
                  Transform your scripts into short video clips with AI-generated visuals, transitions, and effects. 
                  Perfect for social media teasers and promotional content.
                </CardDescription>
                <div className="mt-6 space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Automated video editing
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Platform-optimized formats
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Dynamic transitions
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Create Amazing Scripts?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of content creators who trust ScriptAI for their video production needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={handleSearch}
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Creating Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg font-semibold"
            >
              <FileText className="w-5 h-5 mr-2" />
              View Examples
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
