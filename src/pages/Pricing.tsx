import Header from '../components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Zap, Target, Sparkles, Video, Image, Music } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'One-time',
      description: 'Perfect for trying out our AI scriptwriting',
      features: [
        '100 minutes of script generation',
        'Basic analysis depth',
        'Standard latency (30-60 seconds)',
        'Basic templates',
        'Community support'
      ],
      limitations: [
        'One-time use per user',
        'Limited customization',
        'No priority support'
      ],
      buttonText: 'Get Started',
      buttonVariant: 'outline' as const,
      popular: false,
      icon: Target
    },
    {
      name: 'Basic',
      price: '$15',
      period: '/month',
      description: 'Great for regular content creators',
      features: [
        '500 minutes of script generation',
        'Enhanced analysis depth',
        'Fast latency (15-30 seconds)',
        'Advanced templates',
        'Priority email support',
        'Export options',
        'Custom branding'
      ],
      limitations: [],
      buttonText: 'Choose Basic',
      buttonVariant: 'default' as const,
      popular: true,
      icon: Zap
    },
    {
      name: 'Pro',
      price: '$25',
      period: '/month',
      description: 'For professional content creators and teams',
      features: [
        'Unlimited script generation',
        'Premium analysis depth',
        'Ultra-fast latency (5-15 seconds)',
        'Premium templates & customization',
        '24/7 priority support',
        'Advanced export options',
        'Team collaboration',
        'API access',
        'Custom integrations'
      ],
      limitations: [],
      buttonText: 'Choose Pro',
      buttonVariant: 'default' as const,
      popular: false,
      icon: Crown
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Choose Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
              Perfect Plan
            </span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Select the plan that best fits your content creation needs. Upgrade or downgrade anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <Card key={index} className={`relative shadow-xl ${plan.popular ? 'ring-2 ring-purple-500 scale-105' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-blue-600">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4">
                    <IconComponent className={`w-12 h-12 ${plan.name === 'Free' ? 'text-gray-600' : plan.name === 'Basic' ? 'text-purple-600' : 'text-blue-600'}`} />
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mb-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 text-green-700">What's included:</h4>
                      <ul className="space-y-2">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button 
                      className={`w-full ${plan.popular ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' : ''}`}
                      variant={plan.buttonVariant}
                    >
                      {plan.buttonText}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* FAQ or Additional Info */}
        <div className="mt-16 text-center max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">Need help choosing?</h3>
          <p className="text-gray-600 mb-8">
            Not sure which plan is right for you? Start with our free tier and upgrade when you're ready for more features.
          </p>
          <Button variant="outline" size="lg">
            Contact Sales
          </Button>
        </div>

        {/* Upcoming Features Section */}
        <section className="mt-20 py-16 bg-white/50 backdrop-blur-sm rounded-3xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center px-8">
            {/* Left Column - Images */}
            <div className="space-y-6">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop" 
                  alt="AI Video Creation" 
                  className="rounded-xl shadow-lg w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-semibold">AI-Generated B-Roll</h4>
                  <p className="text-sm opacity-90">Perfect footage for every scene</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=200&fit=crop" 
                  alt="Digital Assets" 
                  className="rounded-lg shadow-md h-32 object-cover"
                />
                <img 
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=200&fit=crop" 
                  alt="Video Editing" 
                  className="rounded-lg shadow-md h-32 object-cover"
                />
              </div>
            </div>

            {/* Right Column - Features */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Coming Soon: AI-Generated 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                    {' '}Digital Assets
                  </span>
                </h2>
                <p className="text-gray-600 text-lg">
                  Enhance your subscription with upcoming AI-powered video creation tools
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Video className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">AI B-Roll Generation</h3>
                    <p className="text-gray-600">Generate contextual video footage that perfectly matches your script</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Image className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Custom Graphics & Charts</h3>
                    <p className="text-gray-600">Auto-generate infographics and visual elements from your data</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-indigo-100 p-3 rounded-lg">
                    <Music className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Background Music & SFX</h3>
                    <p className="text-gray-600">AI-composed soundtracks tailored to your content's mood</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Sparkles className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Voice Synthesis</h3>
                    <p className="text-gray-600">Professional narration with customizable AI voices</p>
                  </div>
                </div>
              </div>

              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Join the Waitlist
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Pricing;
