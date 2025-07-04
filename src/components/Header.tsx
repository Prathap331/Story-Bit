
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Crown } from 'lucide-react';

const Header = () => {
  return (
    <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Empty space for balance */}
          <div className="flex-1"></div>

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
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
