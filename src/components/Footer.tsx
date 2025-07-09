
import { Mail, Phone, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Details */}
          <div>
            <h3 className="text-xl font-bold mb-4">ScriptAI</h3>
            <p className="text-gray-300 mb-4">
              Revolutionary AI-powered scriptwriting platform for content creators worldwide.
            </p>
            <div className="text-gray-400 text-sm">
              <p>© 2024 ScriptAI. All rights reserved.</p>
            </div>
          </div>

          {/* Address */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Address</h4>
            <div className="text-gray-300 space-y-2">
              <p>123 Innovation Street</p>
              <p>Tech District, Suite 456</p>
              <p>San Francisco, CA 94105</p>
              <p>United States</p>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail className="w-4 h-4" />
                <span>contact@scriptai.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <MessageCircle className="w-4 h-4" />
                <span>+1 (555) 987-6543</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <p className="text-gray-300 hover:text-white cursor-pointer">Privacy Policy</p>
              <p className="text-gray-300 hover:text-white cursor-pointer">Terms of Service</p>
              <p className="text-gray-300 hover:text-white cursor-pointer">Support</p>
              <p className="text-gray-300 hover:text-white cursor-pointer">Documentation</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
