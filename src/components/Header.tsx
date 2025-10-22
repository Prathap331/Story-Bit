
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Crown, Home, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-16 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <img
              src="/Logo.png"
              alt="Storybit"
              className="h-8 sm:h-9 md:h-10 lg:h-12 w-auto max-w-full"
            />
          </Link>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Link to="/pricing">
              <Button variant="outline" className="flex items-center">
                <Crown className="w-4 h-4 mr-1 text-yellow-500" />
                Upgrade
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link to="/profile">
              <Button variant="outline" size="icon">
                <User className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
