import Header from '../components/Header';
import ComingFeatures from '../components/ComingFeatures';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Zap, Target } from 'lucide-react';

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
      </div>

      {/* Coming Features Section */}
      <ComingFeatures />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Pricing;
