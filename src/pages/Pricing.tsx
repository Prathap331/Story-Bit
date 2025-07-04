
import Header from '../components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Check, 
  Crown, 
  Zap, 
  Users, 
  Clock, 
  Star,
  Image,
  Film,
  CheckCircle
} from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "$9",
      period: "/month",
      description: "Perfect for individual creators getting started",
      features: [
        "10 scripts per month",
        "Basic AI generation",
        "Standard templates",
        "Email support",
        "Script export (PDF/Word)"
      ],
      popular: false,
      ctaText: "Start Free Trial"
    },
    {
      name: "Professional",
      price: "$29",
      period: "/month",
      description: "Ideal for serious content creators and small teams",
      features: [
        "100 scripts per month",
        "Advanced AI generation",
        "Premium templates",
        "Priority support",
        "Script export (PDF/Word)",
        "Team collaboration",
        "Custom branding",
        "Analytics dashboard"
      ],
      popular: true,
      ctaText: "Start Free Trial"
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "/month",
      description: "For agencies and large teams with advanced needs",
      features: [
        "Unlimited scripts",
        "AI customization",
        "White-label solution",
        "Dedicated support",
        "All export formats",
        "Advanced collaboration",
        "API access",
        "Custom integrations"
      ],
      popular: false,
      ctaText: "Contact Sales"
    }
  ];

  const faqs = [
    {
      question: "How does the AI script generation work?",
      answer: "Our AI analyzes your topic, target audience, and requirements to create engaging, well-structured scripts using advanced natural language processing and storytelling techniques."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time. You'll continue to have access to your plan features until the end of your current billing period."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact our support team for a full refund."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes! We offer a 7-day free trial for all paid plans so you can test our features before committing to a subscription."
    },
    {
      question: "Can I upgrade or downgrade my plan?",
      answer: "Absolutely! You can change your plan at any time. Changes will be reflected in your next billing cycle, and we'll prorate any differences."
    },
    {
      question: "What formats can I export my scripts in?",
      answer: "You can export scripts in PDF, Word document, plain text, and Final Draft formats. Enterprise users get access to additional custom export options."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Perfect Plan
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Start creating amazing video scripts today. All plans include our core AI features 
            with varying limits and advanced capabilities.
          </p>
          
          {/* Plan Toggle */}
          <div className="flex items-center justify-center mb-8">
            <span className="text-gray-600 mr-3">Monthly</span>
            <div className="relative">
              <input type="checkbox" className="sr-only" />
              <div className="w-12 h-6 bg-gray-300 rounded-full shadow-inner"></div>
              <div className="absolute w-4 h-4 bg-white rounded-full shadow left-1 top-1 transition-transform duration-300"></div>
            </div>
            <span className="text-gray-600 ml-3">
              Annual 
              <Badge variant="secondary" className="ml-2 bg-green-100 text-green-700">
                Save 20%
              </Badge>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative hover:shadow-xl transition-shadow duration-300 ${
                plan.popular ? 'border-2 border-purple-500 shadow-lg' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1">
                    <Crown className="w-4 h-4 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
                <CardDescription className="mt-2">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' 
                      : 'bg-gray-900 hover:bg-gray-800'
                  }`}
                  size="lg"
                >
                  {plan.ctaText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Why Choose ScriptAI?
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <Zap className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-gray-600">Generate scripts in under 30 seconds</p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Team Collaboration</h3>
              <p className="text-gray-600">Work together seamlessly with your team</p>
            </div>
            <div className="text-center">
              <Star className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600">Professional-grade scripts every time</p>
            </div>
            <div className="text-center">
              <Clock className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Save Time</h3>
              <p className="text-gray-600">Focus on creating, not writing</p>
            </div>
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

        {/* FAQ Section */}
        <div>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
