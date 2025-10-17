
import { Mail, Phone, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Details */}
          <div>
            <Link to="/" className="inline-block hover:opacity-90 transition-opacity">
              <img
                src="/White logo.png"
                alt="Storybit"
                className="mb-4 h-8 w-auto"
              />
            </Link>
            <p className="text-gray-300 mb-4">
              Revolutionary AI-powered scriptwriting platform for content creators worldwide.
            </p>
            <div className="text-gray-400 text-sm">
              <p>© 2025 Morpho Technologies Pvt Ltd. All rights reserved.</p>
            </div>
          </div>

          {/* Address */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Address</h4>
            <div className="text-gray-300 space-y-2">
              <p>Plot no. MIG 891,</p>
              <p>KPHB Phase 3, Kukatpally,</p>
              <p>Hyderabad, Telangana,</p>
              <p>India - 500072</p>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <a href="mailto:support@storybit.tech" className="flex items-center space-x-2 text-gray-300 hover:text-white">
                <Mail className="w-4 h-4" />
                <span>support@storybit.tech</span>
              </a>
              <a href="tel:+919000449855" className="flex items-center space-x-2 text-gray-300 hover:text-white">
                <Phone className="w-4 h-4" />
                <span>+91 90004 49855</span>
              </a>
              {/* <div className="flex items-center space-x-2 text-gray-300">
                <MessageCircle className="w-4 h-4" />
                <span>+1 (555) 987-6543</span>
              </div> */}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/privacy" className="block text-gray-300 hover:text-white">Privacy Policy</Link>
              <Link to="/terms" className="block text-gray-300 hover:text-white">Terms of Service</Link>
              <Link to="/support" className="block text-gray-300 hover:text-white">Support</Link>
              <a href="https://docs.storybit.tech" target="_blank" rel="noreferrer" className="block text-gray-300 hover:text-white">Documentation</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
