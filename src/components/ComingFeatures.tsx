
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Image, Video, Sparkles, Zap } from 'lucide-react';

const ComingFeatures = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Coming{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
              Exciting Features
            </span>
          </h2>
          <p className="text-lg text-gray-600">
            Get ready for revolutionary AI capabilities that will transform your content creation experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* AI Generated Images */}
          <Card className="shadow-xl bg-white/70 backdrop-blur-sm border-0">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <Image className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-gray-900">AI Generated Images</CardTitle>
              <CardDescription className="text-gray-600">
                Create stunning visuals to complement your scripts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Sparkles className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Custom Scene Generation</h4>
                    <p className="text-sm text-gray-600">Generate images that perfectly match your script's narrative and tone</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Sparkles className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Character Visualization</h4>
                    <p className="text-sm text-gray-600">Bring your characters to life with AI-generated portraits and scenes</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Sparkles className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Multiple Art Styles</h4>
                    <p className="text-sm text-gray-600">Choose from various artistic styles to match your content's aesthetic</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Sparkles className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Thumbnail Creation</h4>
                    <p className="text-sm text-gray-600">Generate eye-catching thumbnails automatically for your videos</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Generated Videos */}
          <Card className="shadow-xl bg-white/70 backdrop-blur-sm border-0">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center">
                <Video className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-gray-900">AI Generated Video</CardTitle>
              <CardDescription className="text-gray-600">
                Transform your scripts into complete video productions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Zap className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Automated Video Creation</h4>
                    <p className="text-sm text-gray-600">Turn your scripts into full videos with AI-generated scenes and transitions</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Zap className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Voice Synthesis</h4>
                    <p className="text-sm text-gray-600">Choose from realistic AI voices or clone your own voice for narration</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Zap className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Dynamic Animations</h4>
                    <p className="text-sm text-gray-600">Add smooth animations and effects to enhance viewer engagement</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Zap className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Multi-format Export</h4>
                    <p className="text-sm text-gray-600">Export videos optimized for YouTube, TikTok, Instagram, and more</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ComingFeatures;
